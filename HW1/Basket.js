//Installed node modules: jquery underscore request express jade shelljs passport http sys lodash async mocha chai sinon sinon-chai moment connect validator restify ejs ws co when helmet wrench brain mustache should backbone forever debug
var prodcuts = [{
    name: "mouse",
    price: 5,
    inventory: 20
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
            if (!(productId in prodcuts))
                return false;


            var itemIndex = this.indexOf(prodcuts[productId].name);


            if (itemIndex == -1)
                productLineItems.push(new ProductLineItem(prodcuts[productId]))
            else
                productLineItems[itemIndex].inventory++;


            return true;
        },

        removeProduct: function (productId) {

            if (!(productId in prodcuts))
                return false;

            var itemIndex = this.indexOf(prodcuts[productId].name);

            if (itemIndex == -1)
                return false;

            if (productLineItems[itemIndex].inventory > 0)
                productLineItems[itemIndex].inventory--;

            return true;

        },

        updateProductQuantity: function (productId, quantity) {

            if (!(productId in prodcuts))
                return false;

            var itemIndex = this.indexOf(prodcuts[productId].name);

            if (itemIndex == -1)
                return false;

            productLineItems[itemIndex].inventory = quantity;

            return true;
        },

        getTotalPrice: function () {

            var totalPrice = 0;

            for (var i = 0; i < productLineItems.length; i++) {

                totalPrice += productLineItems[i].price * productLineItems[i].inventory;
            }

            return totalPrice;
        },

        indexOf: function (productName) {

            for (var i = 0; i < productLineItems.length; i++) {
                if (productLineItems[i].name == productName)
                    return i;
            }

            return -1;
        },

        ShowAllInfo: function () {
            for (var i = 0; i < productLineItems.length; i++) {
                productLineItems[i].ShowInfo();
            }
        }/*,
        contains : function(productName){
            return indexOf(productName)!=1;
        } */
    }
})();

console.log("Adding 2.. " + basket.addProduct(2));
console.log("Removing 2.. " + basket.removeProduct(2));
console.log("Updating 2 quantity to 1.. " + basket.updateProductQuantity(2, 1));
console.log("Trying to add unknown id.. " + basket.addProduct(228));
console.log("Adding 0.. " + basket.addProduct(0));
console.log("Adding 0.. " + basket.addProduct(0));
console.log("Total price.. " + basket.getTotalPrice());
basket.ShowAllInfo();

