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
    
    const form = document.getElementById('formAdd');
    const spinner = document.getElementById('loading');
    form.classList.add('d-none');
    spinner.classList.remove('d-none');

    try {
        form.classList.remove('d-none');
        spinner.classList.add('d-none');
        setUpEditForm(await service.findProduct(search));
    } catch (error) {
        const eleServer = document.getElementById('serverError')
        eleServer.classList.remove('d-none');
        console.error(error);
        form.classList.remove('d-none');
        spinner.classList.add('d-none');
    }
    
    const title = document.getElementById('title');
    title.textContent = 'edit';
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
            
            const form = document.getElementById('formAdd');
            const spinner = document.getElementById('loading');
            form.classList.add('d-none');
            spinner.classList.remove('d-none');
            
            try {
                await service.editProduct({
                
                    name: event.target.formName.value,
                    price: event.target.formPrice.value,
                    stock: event.target.formStock.value,
                    description: event.target.formDesc.value
                }, search);
                form.classList.remove('d-none');
                spinner.classList.add('d-none');
                window.location = "./list.html";
            } catch (error) {
                const eleServer = document.getElementById('serverError')
                eleServer.classList.remove('d-none');
                form.classList.remove('d-none');
                spinner.classList.add('d-none');
                console.error(error);
            }

        }
    });
}