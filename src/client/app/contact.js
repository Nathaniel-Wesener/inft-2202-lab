import { productService } from "./product.mock.service.js";

const handleSubmitClick = (event) =>{
    
    event.preventDefault();
    const valid = validateContactInfo(event.target);

    if (valid){
        productService.saveMessage({
            name: event.target.formName.value,
            phone: event.target.formPhone.value,
            email: event.target.formEmail.value,
            message: event.target.formMessage.value
        });

        alert("Message Submitted! Thank you for your feedback.")

        event.target.formName.value = "";
        event.target.formPhone.value = "";
        event.target.formEmail.value = "";
        event.target.formMessage.value = "";
    }

}

const form = document.getElementById('formContact');

form.addEventListener('submit', handleSubmitClick);

function validateContactInfo(form) {
    
    let formValid = true;


    const name = form.formName.value;
    const eleNameError = document.getElementById('nameError');

    if (name === "") {
        formValid = false;
        eleNameError.classList.remove('d-none');
        eleNameError.textContent = "To submit a message you must leave a name!";
    } else {
        eleNameError.classList.add('d-none');
    }

    const phone = form.formPhone.value;
    const elePhoneError =document.getElementById('phoneError');
    
    if (phone === "") {
        formValid = false;
        elePhoneError.classList.remove('d-none');
        elePhoneError.textContent = "To submit a message you must leave a phone number!";
    } else if (phone.length != 10) {
        formValid = false;
        elePhoneError.classList.remove('d-none');
        elePhoneError.textContent = "Phone numbers must have ten digits!";
    }else {
        elePhoneError.classList.add('d-none');
    }

    const email = form.formEmail.value;
    const eleEmailError =document.getElementById('emailError');
    
    if (email === "") {
        formValid = false;
        eleEmailError.classList.remove('d-none');
        eleEmailError.textContent = "To submit a message you must leave an email address!";
    } else {
        eleEmailError.classList.add('d-none');
    }

    const msg = form.formMessage.value;
    const eleMsgError =document.getElementById('messageError');
    
    if (msg === "") {
        formValid = false;
        eleMsgError.classList.remove('d-none');
        eleMsgError.textContent = "To submit a message you must leave a message (obviously)!";
    } else {
        eleMsgError.classList.add('d-none');
    }
    
    return formValid;
}
