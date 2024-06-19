/* 
Author: Nathaniel Wesener
Date: 2024-06-19
File Name: product.service.js
File Description: JS file that creates and exports a product service object with methods that interface with an api.
*/

function productService()
{

}

productService.prototype.getProduct = async function() {

    const url = new URL('https://inft2202.paclan.net/api/products');
    const headers = new Headers({
        'Content-Type': 'application/json',
        'apikey': '6671bdbff37f86c6ae70326f'
    });
    const request = new Request(url, {
        headers,
        method: 'GET'
    })
    try {
        const response = await fetch(request);
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('ERROR:', error);
        return false;
    }
}

productService.prototype.getProduct = async function(productId){
    const url = new URL(productId, 'https://inft2202.paclan.net/api/products');
    const headers = new Headers({
        'Content-Type': 'application/json',
        'apikey': '6671bdbff37f86c6ae70326f'
    });
    const request = new Request(url, {
        headers,
        method: 'GET'
    })
    try {
        const response = await fetch(request);
        const product = await response.json();

        if(product === null){
            console.error("ERROR: product does not exist.")
            return false;
        }
        return product;
    } catch (error) {
        console.error('ERROR:', error);
        return false;
    }
}

productService.prototype.saveProduct = async function(product) {
    
    let valid = true;
    let existProducts =  await this.getProduct().records;

    for(let value of existProducts){
        if (value.name === product.name) {
            valid = false;
        }
    }

    if (valid) {
        const url = new URL('https://inft2202.paclan.net/api/products');
        const headers = new Headers({
            'Content-Type': 'application/json',
            'apikey': '6671bdbff37f86c6ae70326f'
        });
        const request = new Request(url, {
            headers,
            method: 'POST',
            body: JSON.stringify(product)
        })
        try {
            const response = await fetch(request);
            console.log('Success: ', response);
            return true;
        } catch (error) {
            console.error('ERROR:', error);
            return false;
        }
    }
    return valid;
}

productService.prototype.findProduct = function(name) {
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


productService.prototype.editProduct = async function(product) {
    let oldProduct =  await this.getProduct(product.productId);

    if (oldProduct === false){
        return false;
    }
    
    const url = new URL(oldProduct.productId, 'https://inft2202.paclan.net/api/products');
    const headers = new Headers({
        'Content-Type': 'application/json',
        'apikey': '6671bdbff37f86c6ae70326f'
    });
    const request = new Request(url, {
        headers,
        method: 'PUT',
        body: JSON.stringify(product)
    })
    try {
        const response = await fetch(request);
        console.log('Success: ', response);
        return true;
    } catch (error) {
        console.error('ERROR:', error);
        return false;
    }
}


productService.prototype.deleteProduct = async function(productId) {
    const url = new URL(productId, 'https://inft2202.paclan.net/api/products');
    const headers = new Headers({
        'Content-Type': 'application/json',
        'apikey': '6671bdbff37f86c6ae70326f'
    });
    const request = new Request(url, {
        headers,
        method: 'DELETE'
    })
    try {
        const response = await fetch(request);
        console.log('Success: ', response);
        return true;
    } catch (error) {
        console.error('ERROR:', error);
        return false;
    }
}

productService.prototype.saveMessage = function(msg) {
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

export const service = new productService();