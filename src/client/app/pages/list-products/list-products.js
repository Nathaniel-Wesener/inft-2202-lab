import tmplListProducts from './list-products.ejs';
import { service } from '../../services/product.service.js';
import Product from '../../models/Product.js';

export default async () => {
    const {products} = await onInit();
    const strListProducts = tmplListProducts({products});
    document.getElementById('app').innerHTML = strListProducts
    onRender();    
}

function onRender(){

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
    products = products.records;
    console.log(products);
    return { products };
}