var socket = io('http://localhost:3000/merchant');

$(function(){
	$(".js_add-product").on("click", function(){
		//$(".product-container border").append( $())
		socket.emit("addNewProduct");
	});
});

$(function(){
	$(".js_remove-product").on("click", function(){
		var productName = $(this).parent().parent().attr('name');
		socket.emit("removeProduct",productName);

		// удалить контейнер с продуктом
		$(this).parent().parent().remove();
	});
});



socket.on("addedNewProduct", function(){
	// Добавить контейнер с новым продуктом
	console.log("Added new product");
});

socket.on("orderPlaced", function(order){
	//console.log(order);
	
	$(".orders-container").append("<p> Total price "+order+"</p>");
});