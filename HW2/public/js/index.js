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

socket.on("orderPlaced", function(order){
	$('.product-line-items').empty();
	$('.js_place-order').hide();

	alert('Order placed!\n\n Total price: '+order);
})

socket.on("hi", function(){
	console.log("Customer is online");
})

socket.on("addedNewProduct", function(){
	// Добавить контейнер с новым доступным продуктом
	console.log("New product is available");
})

socket.on("productRemoved", function(productName){
	// Убрать неактуальный контейнер (продукта нету на складе)
	$('[name='+productName+']').remove();
})

$(function(){
	$(".js_add-to-cart").on("click", function(){
		socket.emit("addProduct", {
			productName : $(this).attr("productName")
		});
	});
})

$(function(){
	$(".js_place-order").on("click", function(){
		var products="";
		var counter=1;
		$('div[class^="product-line-items"] p').each(function(){
    		products+=counter+". "+$(this).text()+"\n";
			++counter;
		});

		var confirmed=confirm('Place this order?\n\n'+products);
		
		if(confirmed)
			socket.emit("placeOrder");
	});
})

