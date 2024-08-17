import tmplListProducts from './list-products.ejs';
import { service } from '../../services/product.service.js';

export default async () => {
    const { products } = await onInit();
    const strListProducts = tmplListProducts({products});
    document.getElementById('app').innerHTML = strListProducts
    onRender(products);    
}

async function onRender(products){
    
    let deleteElement;
    let eleModal;
    let eleModalClose;
    let eleModalX;
    let eleModalDelete;
    for (const product of products.records) {
        deleteElement = document.getElementById(product._id);
        deleteElement.addEventListener('click', (event) =>{
            eleModal = document.getElementById('confirm-modal');
            eleModal.style.display = "block";
            eleModalClose = document.getElementById('modal-close');
            eleModalClose.addEventListener('click', (event) =>{
                eleModal.style.display = "none";
        });
        eleModalX = document.getElementById('modal-x');
        eleModalX.addEventListener('click', (event) =>{
            eleModal.style.display = "none";
        });
        eleModalDelete = document.getElementById('modal-delete');
        eleModalDelete.addEventListener('click', async (event) =>{
            console.log(product);
            const deleted = await service.deleteProduct(product._id);
    
            if (deleted) {
                window.location.reload();
            }
        });

        });
    
    }
}

async function onInit() {
    
    const params = new URL(document.location).searchParams;
    const search = params.get("page");
    const search2 = params.get("perPage");

    let page;
    let perPage;

    if (search === null){
        page = 1;
    } else {
        page = search;
    }

    if (search2 === null){
        perPage = 4;
    } else {
        perPage = search2;
    }
    const query = {
        page: page,
        perPage: perPage
    }
    
    let products = await service.getProduct(query);
    console.log(products);
    return { products };
}
