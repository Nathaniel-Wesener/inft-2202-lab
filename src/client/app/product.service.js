/* 
Author: Nathaniel Wesener
Date: 2024-06-19
File Name: product.service.js
File Description: JS file that creates and exports a product service object with methods that interface with an api.
*/

function productService()
{
    
}

productService.prototype.getProduct = async function(query) {

    console.log(query);
    const url = new URL('http://localhost:3000/api/products');
    url.searchParams.set('page', query.page);
    url.searchParams.set('perPage', query.perPage);
    const headers = new Headers({
        'Content-Type': 'application/json',
        'apikey': '6671bdbff37f86c6ae70326f'
    });
    const request = new Request(url, {
        headers,
        method: 'GET',
    })
    try {
        const response = await fetch(request);
        const products = await response.json();
        return products;
    } catch (error) {
        //console.error('ERROR:', error);
        return error;
    }
}

productService.prototype.findProduct = async function(productId){
    const api = 'products';
    productId = api.concat('/', productId);
    const url = new URL(productId, 'http://localhost:3000/api/products');
    console.log(url);
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
            return error;
        }
        return product;
    } catch (error) {
        console.error('ERROR:', error);
        return error;
    }
}

productService.prototype.saveProduct = async function(product) {
    
    const url = new URL('http://localhost:3000/api/products');
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
        return error;
    }

}

// productService.prototype.findProduct = function(id) {
//     let list = this.getProduct();
// 
//     if (list === null) {// 
//        return null;
//     } else{
//         for (let value of list) {
//             if (value.productId === id){
//                 return value;
//             }
//         }
//         return null;
//     }
// }


productService.prototype.editProduct = async function(product, productId) {
    let oldProduct =  await this.findProduct(productId);


    if (oldProduct === false){
        return false;
    }
    const api = 'products';
    oldProduct._id = api.concat('/', oldProduct._id);
    const url = new URL(oldProduct._id, 'http://localhost:3000/api/products');
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
        return error;
    }
}


productService.prototype.deleteProduct = async function(productId) {
    
    const api = 'api/products';
    productId = api.concat('/', productId);
    const url = new URL(productId, 'http://localhost:3000');
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
        return error;
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