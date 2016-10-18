var socket = io('http://localhost:3000/merchant');

$(function(){
	$(".js_add-product").on("click", function(){
		//$(".product-container border").append( $())
		socket.emit("addNewProduct");
	});
})

socket.on("addedNewProduct", function(){
	// Добавить контейнер с новым продуктом
	console.log("Added new product");
});

socket.on("orderPlaced", function(basket){
	// Получили заказ, визуально отобразить в Orders
	console.log("Order placed");
});