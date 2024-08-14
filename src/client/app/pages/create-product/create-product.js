import tmplCreateProduct from './create-product.ejs';
import { service } from '../../services/product.service.js';
import Product from '../../models/Product.js';

export default async () => {
    const strCreateProduct = tmplCreateProduct();
    document.getElementById('app').innerHTML = strCreateProduct;

    onRender();    
}

function onRender() {
    // get a reference to the form
    const formElement = document.getElementById('formAdd');
    // attach the event listener
    formElement.addEventListener('submit', formSubmitHandler);
}

const formSubmitHandler = async (event) =>{
    
    const valid = validateProductForm(event.target);
    
    event.preventDefault();

    if (valid) {
        try {
            const product = new Product({
                name: event.target.formName.value,
                price: event.target.formPrice.value,
                stock: event.target.formStock.value,
                description: event.target.formDesc.value,
            })
            await service.saveProduct(product);
            window.location = "/list"
        } catch (error) {
            const eleNameError = document.getElementById('nameError');
            eleNameError.classList.remove('d-none');
            eleNameError.textContent = "Product already added!";
        }

    }
}

export function validateProductForm(form) {
    
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