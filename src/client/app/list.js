import { getProduct, deleteProduct } from "./product.service.js";

let products = getProduct();
if (products.length === 0) {
    const eleDisclaimer = document.getElementById('noProduct');
    eleDisclaimer.classList.remove('d-none');
}
else{
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

    const newBuy = document.createElement("button")
    newBuy.textContent = "Add to Cart";
    newBuy.classList.add('btn');
    newBuy.classList.add('btn-primary');
    newDiv.appendChild(newBuy);
    
    const newDelete = document.createElement("button");
    newDelete.textContent = "Delete"
    newDelete.classList.add('btn');
    newDelete.classList.add('btn-danger');
    newDiv.appendChild(newDelete);

    newCard.appendChild(newDiv);
    div.appendChild(newCard);
}