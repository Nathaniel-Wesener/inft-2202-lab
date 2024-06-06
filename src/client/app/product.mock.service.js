export function getProduct() {
    let list = [];

    if (localStorage.getItem('products') !== null) {
        list = JSON.parse(localStorage.getItem('products'));
    } 
    return list;
}

export function saveProduct(product) {
    
    let valid = true;
    let existProducts = getProduct();

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

export function findProduct(name){
    let list = getProduct();

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


export function editProduct(product){
    let oldProduct = findProduct(product.name);

    if (oldProduct === null){
        return false;
    }
    
    const getOldProduct = (element) => element.name === product.name;
    let list = getAnimal();

    let index = list.findIndex(getOldProduct);

    list[index] = product;

    localStorage.setItem('products', JSON.stringify(list));

    return true;

}


export function deleteProduct(name){
    let list = getProduct();

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

export function saveMessage(msg) {
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