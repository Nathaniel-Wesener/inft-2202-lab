import { findProduct, editProduct } from './product.mock.service.js';
import { validateProductInfo } from './add.js';

const params = new URL(document.location).searchParams;
const search = params.get("name");

if (search !== null) {
    setUpEditForm(findProduct(search));
}


function setUpEditForm(product) {

    const eleAddHead = document.getElementById('add-heading');
    eleAddHead.textContent = "Edit Product";

    const form = document.getElementById('formAdd');

    form.formName.value = product.name;
    form.formName.disabled = true;
    form.formPrice.value = product.price;
    form.formStock.value = product.stock;
    form.formDesc.value = product.desc;
    form.formSubmit.value = "Edit Product";

    form.addEventListener('submit', (event) =>{
    
        const valid = validateProductInfo(event.target);
        
        event.preventDefault();
    
        if (valid) {
            const worked = editProduct({
                
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