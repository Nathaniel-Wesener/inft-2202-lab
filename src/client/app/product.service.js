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
    list = getProduct();

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
    let oldProduct = findProduct(animal.name);

    if (oldProduct === null){
        return false;
    }

    let list = getAnimal();

    let index = list.findIndex(oldProduct);

    list[index] = product;

    localStorage.setItem('products', JSON.stringify(list));

    return true;

}


export function deleteProduct(name){
    list = getProduct();

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