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
try {
    spinner.classList.add('d-none');
    products =  await service.getProduct();
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

    const remainder = products.records.length % perPage;
    let numPages;

    if (remainder === 0) {
        numPages = products.records.length / perPage;
    } else {
        numPages = (( products.records.length - remainder ) / perPage ) + 1;
    }
    await drawProductCardsPagination(products, page, perPage);
    setPage(products, page, numPages, perPage);
}

let select = document.getElementById('drop2');
select.addEventListener('click', (event) => {
    event.preventDefault();
    let url = new URL("http://127.0.0.1:5500/src/client/list.html");
    url.searchParams.set('perPage', 2);
    window.history.pushState("", "", url);
    const page = 1
    const remainder = products.records.length % 2;
    let numPages;

    if (remainder === 0) {
        numPages = products.records.length / 2;    
    } else {
        numPages = ((products.records.length - remainder ) / 2 ) + 1;
    }
    drawProductCardsPagination(products, page, 2);
});

select = document.getElementById('drop4');
select.addEventListener('click', (event) => {
    event.preventDefault();
    let url = new URL("http://127.0.0.1:5500/src/client/list.html");
    url.searchParams.set('perPage', 4);
    window.history.pushState("", "", url);
    const page = 1
    const remainder = products.records.length % 4;
    let numPages;

    if (remainder === 0) {
        numPages = products.records.length / 4;    
    } else {
        numPages = ((products.records.length - remainder ) / 4 ) + 1;
    }
    drawProductCardsPagination(products, page, 4);
});
select = document.getElementById('drop8');
select.addEventListener('click', (event) => {
    event.preventDefault();
    let url = new URL("http://127.0.0.1:5500/src/client/list.html");
    url.searchParams.set('perPage', 8);
    window.history.pushState("", "", url);
    const page = 1
    const remainder = products.records.length % 8;
    let numPages;

    if (remainder === 0) {
        numPages = products.records.length / 8;    
    } else {
        numPages = ((products.records.length - remainder ) / 8 ) + 1;
    }
    drawProductCardsPagination(products, page, 8);
});
select = document.getElementById('drop12');
select.addEventListener('click', (event) => {
    event.preventDefault();
    let url = new URL("http://127.0.0.1:5500/src/client/list.html");
    url.searchParams.set('perPage', 12);
    window.history.pushState("", "", url);
    const page = 1
    const remainder = products.records.length % 12;
    let numPages;

    if (remainder === 0) {
        numPages = products.records.length / 12;    
    } else {
        numPages = ((products.records.length - remainder ) / 12 ) + 1;
    }
    drawProductCardsPagination(products, page, 12);
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
    newText = document.createTextNode(`Listed by: ${product.owner.name}`);
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

    if (product.owner.bannerId == 100726411) {
        const newEdit = document.createElement("button");
        newEdit.textContent = "Edit"
        newEdit.title = "click this button to be taken to a form where you can edit the product"
        newEdit.classList.add('btn');
        newEdit.classList.add('btn-secondary');
        newEdit.addEventListener('click', (event) => {
            event.preventDefault();

            const url = new URL("http://127.0.0.1:5500/src/client/add.html");
            url.searchParams.set('id', product.productId);
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
            const deleted = await service.deleteProduct(product.productId);
    
            if (deleted) {
                window.location.reload();
            }
        });

        });
        newDiv.appendChild(newDelete);
    }
    
    newCard.appendChild(newDiv);
    div.appendChild(newCard);
    const space = document.createElement("br");
    div.appendChild(space);
}

function drawProductCardsPagination(list, page, perPage) {
    
    const remainder = list.records.length % perPage;
    let numPages;

    if (remainder === 0) {
        numPages = list.records.length / perPage;    
    } else {
        numPages = ((list.records.length - remainder ) / perPage ) + 1;
    }
    
    
    
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
        currentPage  = setPage(list, page - 1, numPages, perPage);
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
            setPage(list, index + 1, numPages, perPage);
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
        setPage(list, page + 1, numPages, perPage);
    });
    newItem.appendChild(newLink);
    eleNav.appendChild(newItem);

    setPage(list, page, numPages, perPage);
}

function setPage(list, page, numPages, perPage) {
    
    let url = new URL("http://127.0.0.1:5500/src/client/list.html");
    url.searchParams.set('page', page);
    url.searchParams.set('perPage', perPage)
    window.history.pushState("", "", url);
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
    
    for (let index = 0; index < perPage; index++) {
        
        if (( (page - 1 ) * perPage )  + index > list.records.length - 1) {
            break;
        }
        addCard(list.records[ ( (page - 1 ) * perPage )  + index], div);
    }
    
    return page;
}