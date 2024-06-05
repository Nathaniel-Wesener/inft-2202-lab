import { getProduct, deleteProduct } from "./product.mock.service.js";

let products = getProduct();
if (products.length === 0) {
    const eleDisclaimer = document.getElementById('noProduct');
    eleDisclaimer.classList.remove('d-none');
}
else if (products.length > 4){
    drawProductCardsPagination(products);
} else {
    drawProductCards(products);
}

function drawProductCards(list) {
    const div = document.getElementById('product-display');

    for (let value of list) {
        addCard(value, div);
    }
    
}


function addCard(product, div) {
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
    newText = document.createTextNode(product.desc);
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

    const newEdit = document.createElement("button");
    newEdit.textContent = "Edit"
    newEdit.title = "click this button to be taken to a form where you can edit the product"
    newEdit.classList.add('btn');
    newEdit.classList.add('btn-secondary');
    newEdit.addEventListener('click', (event) => {
        event.preventDefault();

        const url = new URL("http://127.0.0.1:5500/src/client/add.html");
        url.searchParams.set('name', product.name);
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
        eleModalDelete.addEventListener('click', (event) =>{
            const deleted = deleteProduct(product.name);
    
            if (deleted) {
                window.location.reload();
            }
        });

    });
    newDiv.appendChild(newDelete);

    newCard.appendChild(newDiv);
    div.appendChild(newCard);
    const space = document.createElement("br");
    div.appendChild(space);
}

function drawProductCardsPagination(list) {
    
    const remainder = list.length % 4;
    let numPages;

    if (remainder === 0) {
        numPages = list.length / 4;    
    } else {
        numPages = ((list.length - remainder ) / 4 ) + 1;
    }
    
    
    let currentPage = 1;
    const eleMaster = document.getElementById('pagination-master')
    eleMaster.classList.remove('d-none');

    const eleNav = document.getElementById('page-links');
    
    let newItem = document.createElement("li");
    newItem.classList.add('page-item');
    let newLink = document.createElement("a");
    newLink.classList.add('page-link');
    newLink.textContent = "Prev";
    newLink.href = "#";
    newLink.addEventListener('click', (event) => {
        currentPage  = setPage(list, currentPage - 1, numPages);
    });
    newItem.appendChild(newLink);
    eleNav.appendChild(newItem);
    
    for (let index = 0; index < numPages ; index++) {
        newItem = document.createElement("li");
        newItem.classList.add('page-item');
        newLink = document.createElement("a");
        newLink.classList.add('page-link');
        newLink.textContent = `${ index + 1 }`;
        newLink.href = "#";
        newLink.addEventListener('click', (event) => {
            currentPage  = setPage(list, index + 1, numPages);
        });
        newItem.appendChild(newLink);
        eleNav.appendChild(newItem);  
    }

    newItem = document.createElement("li");
    newItem.classList.add('page-item');
    newLink = document.createElement("a");
    newLink.classList.add('page-link');
    newLink.textContent = "Next";
    newLink.href = "#";
    newLink.addEventListener('click', (event) => {
        currentPage  = setPage(list, currentPage + 1, numPages);
    });
    newItem.appendChild(newLink);
    eleNav.appendChild(newItem);

    setPage(list, currentPage, numPages);
}

function setPage(list, page, numPages) {
    
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
    
    for (let index = 0; index < 4; index++) {
        
        if (( (page - 1 ) * 4 )  + index > list.length - 1) {
            break;
        }
        addCard(list[ ( (page - 1 ) * 4 )  + index], div);
    }
        
    
    return page;
}