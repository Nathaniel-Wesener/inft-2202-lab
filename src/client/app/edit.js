/* 
Author: Nathaniel Wesener
Date: 2024-06-09
File Name: edit.js
File Description: File thatchanges the add.html form into an edit form and handles it.
*/
import { productService } from './product.mock.service.js';
import { validateProductInfo } from './add.js';

const params = new URL(document.location).searchParams;
const search = params.get("name");

if (search !== null) {
    setUpEditForm(productService.findProduct(search));
}


function setUpEditForm(product) {

    const eleAddHead = document.getElementById('add-heading');
    eleAddHead.textContent = "Edit Product";

    const form = document.getElementById('formAdd');

    form.formName.value = product.name;
    form.formName.disabled = true;
    form.formPrice.value = product.price;
    form.formStock.value = product.stock;
    form.formDesc.value = product.description;
    form.formSubmit.value = "Edit Product";

    form.addEventListener('submit', (event) =>{
    
        const valid = validateProductInfo(event.target);
        
        event.preventDefault();
    
        if (valid) {
            const worked = productService.editProduct({
                
                name: event.target.formName.value,
                price: event.target.formPrice.value,
                stock: event.target.formStock.value,
                desc: event.target.formDesc.value
            });


            if (worked) {
                window.location = "./list.html"
            }
        }
    });
}