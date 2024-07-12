/* 
Author: Nathaniel Wesener
Date: 2024-06-09
File Name: edit.js
File Description: File thatchanges the add.html form into an edit form and handles it.
*/
import { service } from './product.service.js';
import { validateProductInfo } from './add.js';

const params = new URL(document.location).searchParams;
const search = params.get("id");

if (search !== null) {
    setUpEditForm(await service.findProduct(search));
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

    form.addEventListener('submit', async (event) =>{
    
        const valid = validateProductInfo(event.target);
        
        event.preventDefault();
        const params = new URL(document.location).searchParams;
        const search = params.get("id");
    
        if (valid) {
            const worked =  await service.editProduct({
                
                name: event.target.formName.value,
                price: event.target.formPrice.value,
                stock: event.target.formStock.value,
                desc: event.target.formDesc.value
            }, search);


            if (worked) {
                window.location = "./list.html"
            }
        }
    });
}