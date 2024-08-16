import tmplEditProduct from './edit-product.ejs';
import { service } from '../../services/product.service.js';
//import Product from '../../models/Product.js';

export default async () => {
    const { product } = await onInit();
    const strEditProduct = tmplEditProduct({product});
    document.getElementById('app').innerHTML = strEditProduct;

    onRender();    
}

async function onInit(){

    await setTimeout(() => {
        console.log('delay for 1 second');
    }, 1000);
    const params = await new URL(document.location).searchParams;
    console.log(new URL(document.location));
    const search =  await params.get("id");
    console.log(search);
    try {
        const product = await service.findProduct(search);
        return { product };
    } catch (error) {
        window.location = '/list';
        return null;
    }
    

}

function onRender() {
    // get a reference to the form
    const formElement = document.getElementById('formEdit');
    // attach the event listener
    formElement.addEventListener('submit', formSubmitHandler);
}

const formSubmitHandler = async (event) =>{
    
}
