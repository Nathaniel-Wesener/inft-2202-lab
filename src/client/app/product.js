/**
 * Function that creates a JSON product object
 * @param {string} name The name of the product.
 * @param {number} price The price of the product.
 * @param {number} stock How much of the product is in stock.
 * @param {string} desc A description of the product.
 * @returns A JSON object.
 */
export function createProduct(name, price, stock, desc) {
    
    // Create the product object.
    const product = {
        name: name,
        price: price,
        stock: stock,
        desc: desc,

        /**
         * Function that returns a string description of the product.
         * @returns A string describing the product.
         */
        toString: function() {
            const string = `The ${name} product costs $${price} dollars. We have ${stock} in currently stock. ${desc}`;
            return string;
        }
    }
    
    // Return the product object.
    return product
}