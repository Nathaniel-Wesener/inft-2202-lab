const handleSubmitClick = (event) =>{
    
    event.preventDefault();
    const valid = validateProductInfo(event.target);

    if (valid){
        storeProduct({
            name: event.target.formName.value,
            price: event.target.formPrice.value,
            stock: event.target.formStock.value,
            desc: event.target.formDesc.value
        });

        alert("Product Submitted! Thank you using our website.")

        event.target.formName.value = "";
        event.target.formPrice.value = "";
        event.target.formStock.value = "";
        event.target.formDesc.value = "";
    }

}

const form = document.getElementById('formAdd');

form.addEventListener('submit', handleSubmitClick);

function validateProductInfo(form) {
    
    let formValid = true;


    const name = form.formName.value;
    const eleNameError =document.getElementById('nameError');

    if (name === "") {
        formValid = false;
        eleNameError.classList.remove('d-none');
        eleNameError.textContent = "All products must have names!";
    } else if (localStorage.getItem('products') !== null){
        const names = JSON.parse(localStorage.getItem('products'));
        for (let value of names){
            if (value.name === name) {
                eleNameError.classList.remove('d-none');
                eleNameError.textContent = "A product already has this Name";
                formValid = false;
                break;
            } else {
                eleNameError.classList.add('d-none');
            }
        }
    } else {
        eleNameError.classList.add('d-none');
    }

    const price = form.formPrice.value;
    const elePriceError =document.getElementById('priceError');
    
    if (price === "") {
        formValid = false;
        elePriceError.classList.remove('d-none');
        elePriceError.textContent = "All products must be priced!";
    } else if (price < 0.01) {
        formValid = false;
        elePriceError.classList.remove('d-none');
        elePriceError.textContent = "Products can not be free or worth negative money!";
    }else {
        elePriceError.classList.add('d-none');
    }

    const stock = form.formStock.value;
    const eleStockError =document.getElementById('stockError');
    
    if (stock === "") {
        formValid = false;
        eleStockError.classList.remove('d-none');
        eleStockError.textContent = "You must specify your stock of product!";
    } else {
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

function storeProduct(product) {
    
    if (localStorage.getItem('products') === null) {
        const newProduct = [product];
        localStorage.setItem('products', JSON.stringify(newProduct));
    }
    else{
        
        let array = JSON.parse(localStorage.getItem('products'));
        
        
        array.push(product);
        localStorage.setItem('products', JSON.stringify(array));
    }
}