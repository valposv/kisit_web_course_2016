var socket = io('http://localhost:3000');

		
socket.on("productAddedToBasket", function(data){
	var $productLineItems = $('.product-line-items');
	$productLineItems.empty();

	$(".js_place-order").show();

	// Визуально добавить продукт в Basket
	var products = "";
 
	$.each( data.basket.productLineItems, function( i, item ) {
 
    products += "<p>" + item.product.name + "</p>";
 
	});
	$productLineItems.prepend(products);

	console.log(data);
});

socket.on("hi", function(){
	console.log("Customer is online");
})

socket.on("addedNewProduct", function(){
	// Добавить контейнер с новым доступным продуктом
	console.log("New product is available");
})

$(function(){
	$(".js_add-to-cart").on("click", function(){
		socket.emit("addProduct", {
			pid : $(this).data("productId")
		});
	});
})

$(function(){
	$(".js_place-order").on("click", function(){
		socket.emit("placeOrder");
		console.log('Order placed');
	});
})

