var socket = io('http://localhost:3000');

		
socket.on("productAddedToBasket", function(data){
	// Визуально добавить продукт в Basket
	$(".product-line-items").append("<p>"+data.productName+"</p>");
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

