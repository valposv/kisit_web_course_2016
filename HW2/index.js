"use strict"
var express = require('express'),
	app = express(),
	http = require('http').Server(app),
	shop = require("./shop"),
	io = require("socket.io")(http);
	
app.use(express.static('public'));
app.set('view engine', 'ejs'); 


//Customer
app.get('/', function (req, res) {
	res.render("index", {
		products : shop.products
	});
});
io.on('connection', function (socket) {
	//console.log(socket.request.headers);
	var basket = new shop.Basket();
	socket.join("customers");

	socket.on("addProduct", function(data) {
		basket.addProduct(data.pid);

		socket.emit("productAddedToBasket", {
			success : true,
			basket : basket
		});
	});

	// "Слушаем" подтверждение заказа
	socket.on("placeOrder",function(){
		var order=basket.placeOrder();
		console.log(order);
		merchantIO.to("merchants").emit("orderPlaced",order); // отправляем заказ продавцу
	})
});



//Merchant
var merchantIO = io.of('/merchant');
app.get('/merchant', function (req, res) {
	res.render("merchant", {
		products : shop.products,
		orders : shop.orders
	});
}); 

merchantIO.on("connection", function(socket) {
	
	io.to("customers").emit("hi");
	socket.join("merchants");

	socket.on("addNewProduct", function(data) {

		socket.emit("addedNewProduct");
		io.to("customers").emit("addedNewProduct") // Уведомляем пользователей о новом продукте 
	});
});

var server = http.listen(3000);


























