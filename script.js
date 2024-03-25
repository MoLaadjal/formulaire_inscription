const form = document.getElementById('form');
const username = document.getElementById('username');
const telephone = document.getElementById('telephone');
const email = document.getElementById('email');
const date = document.getElementById('date-of-birth')
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


// Even listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (username.value === '') {
        showError(username, 'Username is required');
    } else {
        showSuccess(username);
    }

    if (telephone.value === '') {
        showError(telephone, 'Phone number is required');
    } else {
        showSuccess(telephone);
    }


    if (email.value === '') {
        showError(email, 'Email is required');
    } else if (!checkEmail(email)) {
        showError(email, 'Email is not valid');
    } else {
        showSuccess(email);
    }

    if (password.value === '') {
        showError(password, 'Password is required');
    } else {
        showSuccess(password);
    }

    if (password2.value === '') {
        showError(password2, 'Password 2 is required');
    } else {
        showSuccess(password2);
    }

    if (!privacy_policy.checked) {
        showError(privacy_policy, 'Privacy policy acceptance is required');
    } else {
        showSuccess(privacy_policy);
    }
});




 
