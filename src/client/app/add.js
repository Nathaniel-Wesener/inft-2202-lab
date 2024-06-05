import { saveProduct } from './product.mock.service.js';

const params = new URL(document.location).searchParams;
const search = params.get("name")

if (search === "" || search === null) {
    form.addEventListener('submit', handleAddClick);
}

const handleSubmitClick = (event) =>{
    
    event.preventDefault();
    const valid = validateProductInfo(event.target);

    if (valid){
        
        console.log(event.target.formName.value);
        console.log(event.target.formPrice.value);
        console.log(event.target.formStock.value);
        console.log(event.target.formDesc.value);
        console.log(event.target.formImg.value);

        
        
        const unique = saveProduct({
            name: event.target.formName.value,
            price: event.target.formPrice.value,
            stock: event.target.formStock.value,
            desc: event.target.formDesc.value
        });

        if (unique) {
            alert("Product Submitted! Thank you using our website.");    
        }
        else{
            const eleNameError =document.getElementById('nameError');
            eleNameError.classList.remove('d-none');
            eleNameError.textContent = "Error: product must have a unique name";
        }
        

        event.target.formName.value = "";
        event.target.formPrice.value = "";
        event.target.formStock.value = "";
        event.target.formDesc.value = "";
        event.target.formImg.value = "";
        
    }

}

const form = document.getElementById('formAdd');

form.addEventListener('submit', handleSubmitClick);

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

