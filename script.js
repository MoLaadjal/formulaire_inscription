const form = document.getElementById('form');
const fields = ['username', 'telephone', 'email', 'date', 'password', 'password2', 'privacy_policy'];

// Fonction pour afficher un message d'erreur
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Fonction pour afficher un message de succès
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';    
}

// Fonction pour vérifier si un email est valide
function checkEmail(input) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(input.value.trim());
}

// Fonction pour valider un champ
function validateField(input) {
    if (input.type === 'email') {
        if (input.value === '') {
            showError(input, 'Email is required');
        } else if (!checkEmail(input)) {
            showError(input, 'Email is not valid');
        } else {
            showSuccess(input);
        }
    } else if (input.type === 'checkbox') {
        if (!input.checked) {
            showError(input, 'Privacy policy acceptance is required');
        } else {
            showSuccess(input);
        }
    } else {
        if (input.value === '') {
            showError(input, `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} is required`);
        } else {
            showSuccess(input);
        }
    }
}

// Fonction pour valider tous les champs du formulaire
function validateForm() {
    fields.forEach(field => {
        const input = document.getElementById(field);
        validateField(input);
    });

// Vérification de la validité de l'email avec le regex
    const emailInput = document.getElementById('email');
    if (emailInput.value !== '' && !checkEmail(emailInput)) {
        showError(emailInput, 'Email is not valid');
    }
}

// Fonction pour vérifier la longueur d'un champ
function checkLength(input, min, max) {
    if (input.value === '') {
        showError(input, `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} is required`);
    } else if (input.value.length < min) {
        showError(input, `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }      
}

// Fonction pour vérifier la concordance des deux mots de passe
function checkPasswordsMatch(input1, input2) {
    if(input1.value !== input2.value) {
        showError(input2, 'Passwords do not match')
    }
}

// Événement de soumission du formulaire
form.addEventListener('submit', function(e) {
    e.preventDefault();
    validateForm();

    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkPasswordsMatch(password, password2);
});
