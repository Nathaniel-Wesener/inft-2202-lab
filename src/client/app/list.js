/* 
Author: Nathaniel Wesener
Date: 2024-06-09
File Name: list.js
File Description: file that displays the products stored in local storage as cards. (Image fuctionality pending).
*/
import { service } from "./product.service.js";

const spinner = document.getElementById('loading');
spinner.classList.remove('d-none')
let products;
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
try {
    spinner.classList.add('d-none');
    products =  await service.getProduct(query);
} catch (error) {
    spinner.classList.add('d-none');
    console.error(error);
    const eleServer = document.getElementById('serverError')
    eleServer.classList.remove('d-none');
}

console.log(products);
if (products.records.length === 0 || products === null) {
    const eleDisclaimer = document.getElementById('noProduct');
    eleDisclaimer.classList.remove('d-none');
} else{
    
    await drawProductCardsPagination(products);
    setPage(products, products.pagination.page, products.pagination.perPage);
}

let select = document.getElementById('drop2');
select.addEventListener('click', (event) => {
    event.preventDefault();
    let url = new URL("http://127.0.0.1:5500/src/client/list.html");
    products.pagination.perPage = 2;
    drawProductCardsPagination(products);
});

select = document.getElementById('drop4');
select.addEventListener('click', (event) => {
    event.preventDefault();
    let url = new URL("http://127.0.0.1:5500/src/client/list.html");
    const page = 1
    products.pagination.perPage = 4;
    drawProductCardsPagination(products);
});
select = document.getElementById('drop8');
select.addEventListener('click', (event) => {
    event.preventDefault();
    const page = 1
    products.pagination.perPage = 8;
    drawProductCardsPagination(products);
});
select = document.getElementById('drop12');
select.addEventListener('click', (event) => {
    event.preventDefault();
    let url = new URL("http://127.0.0.1:5500/src/client/list.html");
    url.searchParams.set('perPage', 12);
    window.history.pushState("", "", url);
    const page = 1
    products.pagination.perPage = 12;
    drawProductCardsPagination(products);
});

function drawProductCards(list) {
    const div = document.getElementById('product-display');

    for (let value of list) {
        addCard(value, div);
    }
    
}


async function addCard(product, div) {
    const newCard = document.createElement("div");
    newCard.classList.add('card');
    newCard.style.width = '18rem';
    
    const newImg = document.createElement("img");
    newImg.classList.add('card-img-top');
    newImg.src = "./img/default-img.png";
    newImg.alt = `image of ${product.name}`;
    newCard.appendChild(newImg);

    const newDiv = document.createElement("div");
    newDiv.classList.add('card-body');

    const newHead = document.createElement("h5");
    newHead.classList.add('card-title');
    let newText = document.createTextNode(product.name);
    newHead.appendChild(newText);
    newDiv.appendChild(newHead);

    const newDesc = document.createElement("p");
    newDesc.classList.add('card-text');
    newText = document.createTextNode(product.description);
    newDesc.appendChild(newText);
    newDiv.appendChild(newDesc);

    const newStock = document.createElement("p");
    newStock.classList.add('card-text');
    newText = document.createTextNode(`In Stock: ${product.stock}`);
    newStock.appendChild(newText);
    newDiv.appendChild(newStock);

    const newPrice = document.createElement("p");
    newPrice.classList.add('card-text');
    newText = document.createTextNode(`Price: $${product.price}`);
    newPrice.appendChild(newText);
    newDiv.appendChild(newPrice);

    const newOwner = document.createElement("p");
    newOwner.classList.add('card-text');
    //newText = document.createTextNode(`Listed by: ${product.owner.name}`);
    newOwner.appendChild(newText);
    newDiv.appendChild(newOwner);

    const newTime = document.createElement("p");
    newTime.classList.add('card-text');
    newText = document.createTextNode(`Listed at: ${product.createdAt}`);
    newTime.appendChild(newText);
    newDiv.appendChild(newTime);

    const newBuy = document.createElement("button");
    const newButtonCartImg = document.createElement("img");
    newButtonCartImg.src = "../../node_modules/@fortawesome/fontawesome-free/svgs/solid/cart-shopping.svg";
    newButtonCartImg.width = "20";
    newButtonCartImg.height = "20";
    newBuy.appendChild(newButtonCartImg);
    newBuy.classList.add('btn');
    newBuy.classList.add('btn-primary');
    newDiv.appendChild(newBuy);

    newText = document.createTextNode("   ");
    newDiv.appendChild(newText);

    //if (product.owner.bannerId == 100726411) {
        const newEdit = document.createElement("button");
        newEdit.textContent = "Edit"
        newEdit.title = "click this button to be taken to a form where you can edit the product"
        newEdit.classList.add('btn');
        newEdit.classList.add('btn-secondary');
        newEdit.addEventListener('click', (event) => {
            event.preventDefault();

            const url = new URL("http://localhost:3000/add.html");
            url.searchParams.set('id', product._id);
            window.location.replace(url);
        });
        newDiv.appendChild(newEdit);
    
        const newDelete = document.createElement("button");
        newText = document.createTextNode("   ");
        newDiv.appendChild(newText);
    
        newDelete.classList.add('btn');
        newDelete.classList.add('btn-danger');
        const newButtonTrashImg = document.createElement("img");
        newButtonTrashImg.src = "../../node_modules/@fortawesome/fontawesome-free/svgs/regular/trash-can.svg";
        newButtonTrashImg.width = "20";
        newButtonTrashImg.height = "20";
        newDelete.appendChild(newButtonTrashImg);
        newDelete.addEventListener('click', (event) =>{
            const eleModal = document.getElementById('confirm-modal');
            eleModal.style.display = "block";
            const eleModalClose = document.getElementById('modal-close');
            eleModalClose.addEventListener('click', (event) =>{
                eleModal.style.display = "none";
        });
        const eleModalX = document.getElementById('modal-x');
        eleModalX.addEventListener('click', (event) =>{
            eleModal.style.display = "none";
        });
        const eleModalDelete = document.getElementById('modal-delete');
        eleModalDelete.addEventListener('click', async (event) =>{
            console.log(product);
            const deleted = await service.deleteProduct(product._id);
    
            if (deleted) {
                window.location.reload();
            }
        });

        });
        newDiv.appendChild(newDelete);
    //}
    
    newCard.appendChild(newDiv);
    div.appendChild(newCard);
    const space = document.createElement("br");
    div.appendChild(space);
}

function drawProductCardsPagination(list) {

    let numPages = list.pagination.pages;
    let page = list.pagination.page;
    let perPage = list.pagination.perPage;
    
    
    
    const eleMaster = document.getElementById('pagination-master')
    eleMaster.classList.remove('d-none');

    const eleNav = document.getElementById('page-links');
    while (eleNav.firstChild) {
        eleNav.removeChild(eleNav.firstChild);
    }
    
    let newItem = document.createElement("li");
    newItem.classList.add('page-item');
    let newLink = document.createElement("a");
    newLink.classList.add('page-link');
    newLink.textContent = "Prev";
    newLink.href = "";
    newLink.addEventListener('click', (event) => {
        event.preventDefault();
        setPage(list, page - 1, perPage);
    });
    newItem.appendChild(newLink);
    eleNav.appendChild(newItem);
    
    for (let index = 0; index < numPages ; index++) {
        newItem = document.createElement("li");
        newItem.classList.add('page-item');
        newLink = document.createElement("a");
        newLink.classList.add('page-link');
        newLink.textContent = `${ index + 1 }`;
        newLink.href = "";
        newLink.addEventListener('click', (event) => {
            event.preventDefault();
            setPage(list, index + 1, perPage);
        });
        newItem.appendChild(newLink);
        eleNav.appendChild(newItem);  
    }

    newItem = document.createElement("li");
    newItem.classList.add('page-item');
    newLink = document.createElement("a");
    newLink.classList.add('page-link');
    newLink.textContent = "Next";
    newLink.href = "";
    newLink.addEventListener('click', (event) => {
        event.preventDefault();
        setPage(list, page + 1, perPage);
    });
    newItem.appendChild(newLink);
    eleNav.appendChild(newItem);

    setPage(list, page, perPage);
}

async function setPage(list, page, perPage) {
    
    const query = {
        page: page,
        perPage: perPage
    }
    try {
        spinner.classList.add('d-none');
        products =  await service.getProduct(query);
    } catch (error) {
        spinner.classList.add('d-none');
        console.error(error);
        const eleServer = document.getElementById('serverError')
        eleServer.classList.remove('d-none');
    }
    let numPages = products.pagination.pages;
    let url = new URL("http://127.0.0.1:5500/src/client/list.html");
    url.searchParams.set('page', products.pagination.page);
    url.searchParams.set('perPage', products.pagination.perPage)
    //window.history.pushState("", "", url);
    const eleNav = document.getElementById('page-links');

    for (let iterator of eleNav.children) {
        iterator.classList.remove('active');
    }
    
    if ( page === 1 ) {
        eleNav.children[0].classList.add('disabled');
        
    } else {
        eleNav.children[0].classList.remove('disabled');
    }

    if ( page === numPages ) {
        eleNav.children[numPages + 1].classList.add('disabled');
    } else {
        eleNav.children[numPages + 1].classList.remove('disabled');
    }

    eleNav.children[page].classList.add('active');

    const div = document.getElementById('product-display');
    div.innerHTML = "";
    
    for (const product of products.records) {
        addCard(product, div)
    }
    
    return page;
}