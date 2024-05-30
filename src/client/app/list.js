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
        const deleted = deleteProduct(product.name);
        if (deleted) {
            window.location.reload();
        }
    });
    newDiv.appendChild(newDelete);

    newCard.appendChild(newDiv);
    div.appendChild(newCard);
}