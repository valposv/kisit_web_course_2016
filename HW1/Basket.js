var prodcuts = [{
    name: "mouse",
    price: 5,
    inventory: 1
    }, {
        name: "laptop",
        price: 275,
        inventory: 80
    }, {
        name: "usbAdapter",
        price: 3,
        inventory: 50
    }, {
        name: "keyboard",
        price: 6,
        inventory: 0
    }];

function ProductLineItem(product) {
    this.name = product.name;
    this.price = product.price;
    this.inventory = 1;
}

ProductLineItem.prototype = {
    ShowInfo: function () {
        console.log("Name: " + this.name + " ..price: " + this.price + " ..inventory: " + this.inventory);
    }
};

var basket = (function () {

    var productLineItems = [];

    return {
        addProduct: function (productId) {
            if (!(productId in prodcuts) || prodcuts[productId].inventory == 0)
                return false;
            
            var itemIndex = this.getIdOf(prodcuts[productId].name);

            if (itemIndex == -1)
                productLineItems.push(new ProductLineItem(prodcuts[productId]))
            else
                productLineItems[itemIndex].inventory++;

            prodcuts[productId].inventory--;
            
            return true;
        },

        removeProduct: function (productId) {

            if (!(productId in prodcuts))
                return false;

            var itemIndex = this.getIdOf(prodcuts[productId].name);

            if (itemIndex == -1)
                return false;

            if (productLineItems[itemIndex].inventory > 0)
                productLineItems[itemIndex].inventory--;
            else
                return false;
            
            prodcuts[productId].inventory++;
            
            if(productLineItems[itemIndex].inventory==0)
                productLineItems.splice(itemIndex,1); // delete obj from array

            return true;

        },

        updateProductQuantity: function (productId, newQuantity) {

            if (!(productId in prodcuts))
                return false;

            var itemIndex = this.getIdOf(prodcuts[productId].name);

            if (itemIndex == -1)
                return false;
                
            var actualQuantity=productLineItems[itemIndex].inventory;
                
            if(newQuantity==actualQuantity)
                return false;
            
            productLineItems[itemIndex].inventory = newQuantity;
           
            var difference=newQuantity-actualQuantity;
            
            if(difference>0){ // if we're adding
                if(difference>prodcuts[productId].inventory) // if we want to add more than available
                    return false;
                    
                prodcuts[productId].inventory-=difference; 
            }
                
            else
                prodcuts[productId].inventory+=difference; // add them to "storage" array
            
            if(productLineItems[itemIndex].inventory==0) 
                productLineItems.splice(itemIndex,1); // delete obj from array

            return true;
        },

        getTotalPrice: function () {

            var totalPrice = 0;

            for (var i = 0; i < productLineItems.length; i++) {

                totalPrice += productLineItems[i].price * productLineItems[i].inventory;
            }

            return totalPrice;
        },

        getIdOf: function (productName) {

            for (var i = 0; i < productLineItems.length; i++) {
                if (productLineItems[i].name == productName)
                    return i;
            }

            return -1;
        },

        showAllInfo: function () {
            for (var i = 0; i < productLineItems.length; i++) {
                productLineItems[i].ShowInfo();
            }
        }/*,
        contains : function(productName){
            return getIdOf(productName)!=1;
        } */
    }
})();

console.log("Adding 2.. " + basket.addProduct(2));
console.log("Removing 2.. " + basket.removeProduct(2));
console.log("Attempt to delete 2 (the item is deleted).. " + basket.removeProduct(2));
// client should use addProduct in this case:
console.log("Attempt to update 2 (the item is deleted).. " + basket.updateProductQuantity(2, 1));
console.log("Attempt to add unknown id.. " + basket.addProduct(228));
console.log("Adding 0.. " + basket.addProduct(0));
console.log("Attempt to add 0 (the item is over).. " + basket.addProduct(0));
console.log("\nTotal price.. " + basket.getTotalPrice());
basket.showAllInfo();
