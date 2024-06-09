function productMockService()
{
    let list = [];

    if (localStorage.getItem('products') === null) {
        localStorage.setItem('products', list);
    }
}

productMockService.prototype.getProduct = function() {

    const list = JSON.parse(localStorage.getItem('products'));

    return list;
}

productMockService.prototype.saveProduct = function(product) {
    
    let valid = true;
    let existProducts = this.getProduct();

    for(let value of existProducts){
        if (value.name === product.name) {
            valid = false;
        }
    }

    if (valid) {
        existProducts.push(product);
        localStorage.setItem('products', JSON.stringify(existProducts));
    }
    return valid;
}

productMockService.prototype.findProduct = function(name) {
    let list = this.getProduct();

    if (list === null) {
        return null;
    } else{
        for (let value of list) {
            if (value.name === name){
                return value;
            }
        }
        return null;
    }
}


productMockService.prototype.editProduct = function(product) {
    let oldProduct = this.findProduct(product.name);

    if (oldProduct === null){
        return false;
    }
    
    const getOldProduct = (element) => element.name === product.name;
    let list = this.getProduct();

    let index = list.findIndex(getOldProduct);

    list[index] = product;

    localStorage.setItem('products', JSON.stringify(list));

    return true;

}


productMockService.prototype.deleteProduct = function(name) {
    let list = this.getProduct();

    if (list === null) {
        return false;
    } else{
        for (let key in list) {
            if (list[key].name === name){
                list.splice(key, 1);
                localStorage.setItem('products', JSON.stringify(list));
                return true;
            }
        }
        return false;
    }
}

productMockService.prototype.saveMessage = function(msg) {
    if (localStorage.getItem('messages') === null) {
        const newMsg = [msg];
        localStorage.setItem('messages', JSON.stringify(newMsg));
    }
    else{
        
        let array = JSON.parse(localStorage.getItem('messages'));
        
        
        array.push(msg);
        localStorage.setItem('messages', JSON.stringify(array));
    }
}

export const productService = new productMockService();