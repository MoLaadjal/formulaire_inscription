const form = document.getElementById('form');
const username = document.getElementById('username');
const telephone = document.getElementById('telephone');
const email = document.getElementById('email');
const date = document.getElementById('date of birth')
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const privacy_policy = document.getElementById('privacy_policy');

// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';    
}

// Check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(input.value.trim());
}

// Check required fields
function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
        if(input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input)
        }
    });
}

// Get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Even listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    checkRequired([username, telephone, email, date, password, password2, privacy_policy]);    
});




 
