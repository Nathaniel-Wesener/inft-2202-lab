/* 
Author: Nathaniel Wesener
Date: 2024-06-09
File Name: add.js
File Description: File that handles the add form in the add.html file. (Image fuctionality pending).
*/

import { service } from './product.service.js';

const params = new URL(document.location).searchParams;
const search = params.get("id")

const form = document.getElementById('formAdd');



const handleSubmitClick = async (event) =>{
    
    event.preventDefault();
    const valid = validateProductInfo(event.target);

    if (valid){
        
        console.log(event.target.formName.value);
        console.log(event.target.formPrice.value);
        console.log(event.target.formStock.value);
        console.log(event.target.formDesc.value);
        console.log(event.target.formImg.value);

        const form = document.getElementById('formAdd');
        const spinner = document.getElementById('loading');
        form.classList.add('d-none');
        spinner.classList.remove('d-none');
        
        try {
            await service.saveProduct({
                name: event.target.formName.value,
                description: event.target.formDesc.value,
                price: event.target.formPrice.value,
                stock: event.target.formStock.value
                
            });
            form.classList.remove('d-none');
            spinner.classList.add('d-none');
            window.location = "./list.html";
            
    
        } catch (error) {
            form.classList.remove('d-none');
            spinner.classList.add('d-none');
            const eleNameError =document.getElementById('nameError');
            eleNameError.classList.remove('d-none');
            const eleServer = document.getElementById('serverError')
            eleServer.classList.remove('d-none');
            eleNameError.textContent = "Error: product must have a unique name";
        }
        

        event.target.formName.value = "";
        event.target.formPrice.value = "";
        event.target.formStock.value = "";
        event.target.formDesc.value = "";
        event.target.formImg.value = "";
        
    }

}

if (search === "" || search === null) {
    form.addEventListener('submit', handleSubmitClick);
    const title = document.getElementById('title');
    title.textContent = 'add';
}



export function validateProductInfo(form) {
    
    let formValid = true;


    const name = form.formName.value;
    const eleNameError =document.getElementById('nameError');

    if (name === "") {
        formValid = false;
        eleNameError.classList.remove('d-none');
        eleNameError.textContent = "All products must have names!";
    } else {
        eleNameError.classList.add('d-none');
    }

    let price = form.formPrice.value;
    price = Number(price);
    const elePriceError =document.getElementById('priceError');
    
    if (price === "") {
        formValid = false;
        elePriceError.classList.remove('d-none');
        elePriceError.textContent = "All products must be priced!";
    }  else if (isNaN(price)) {
        formValid = false;
        elePriceError.classList.remove('d-none');
        elePriceError.textContent = "Your price must be a number!";
    } else if (price < 0.01) {
        formValid = false;
        elePriceError.classList.remove('d-none');
        elePriceError.textContent = "Products can not be free or worth negative money!";
    }else {
        elePriceError.classList.add('d-none');
    }

    let stock = form.formStock.value;
    stock = Number(stock);
    const eleStockError =document.getElementById('stockError');
    
    if (stock === "") {
        formValid = false;
        eleStockError.classList.remove('d-none');
        eleStockError.textContent = "You must specify your stock of product!";
    } else if (isNaN(stock)) {
        formValid = false;
        eleStockError.classList.remove('d-none');
        console.log(typeof stock);
        eleStockError.textContent = "Your stock must be a number!";
    } else if (stock < 1) {
        formValid = false;
        eleStockError.classList.remove('d-none');
        eleStockError.textContent = "Your stock must be greater than zero!";

    }else {
        eleStockError.classList.add('d-none');
    }

    const desc = form.formDesc.value;
    const eleDescError =document.getElementById('descError');
    
    if (desc === "") {
        formValid = false;
        eleDescError.classList.remove('d-none');
        eleDescError.textContent = "You must submit a product description!";
    } else {
        eleDescError.classList.add('d-none');
    }
    
    return formValid;
}

