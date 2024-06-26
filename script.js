const form = document.getElementById('form');
const fields = ['username', 'mood', 'telephone', 'email', 'date', 'password', 'password2', 'privacy policy'];

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

// Fonction pour valider un champ
function validateField(input) {
    const fieldName = input.id.charAt(0).toUpperCase() + input.id.slice(1);
    if (input.type === 'text') {
        if (!input.value.trim()) {
            showError(input, `${fieldName} is required`);
        } else if (!checkEmail(input.value)) {
            showError(input, 'Email is not valid');
        } else {
            showSuccess(input);
        }
    } else if (input.type === 'tel') {
        if (!input.value.trim()) {
            showError(input, `${fieldName} is required`);
        } else if (!validateTelephone(input.value.trim())) {
            showError(input, 'Please enter a valid phone number');
        } else {
            showSuccess(input);
        }
    } else if (input.type === 'number') {
        if (!input.value.trim()) {
            showError(input, `${fieldName} is required`);
        } else {
            const value = parseFloat(input.value);
            if (value < 1 || value > 10 || isNaN(value)) {
                showError(input, `${fieldName} must be between 1 and 10`);
            } else {
                showSuccess(input);
            }
        }
    } else if (input.type === 'checkbox') {
        if (!input.checked) {
            showError(input, `${fieldName} acceptance is required`);
        } else {
            showSuccess(input);
        }
    } else if (input.id === 'password' || input.id === 'password2') {
        checkLength(input, 6, 25);
    } else {
        if (!input.value.trim()) {
            showError(input, `${fieldName} is required`);
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
}

// Fonction pour vérifier la longueur d'un champ
function checkLength(input, min, max) {
    const fieldName = input.id.charAt(0).toUpperCase() + input.id.slice(1);
    if (!input.value.trim()) {
        showError(input, `${fieldName} is required`);
    } else if (input.value.length < min) {
        showError(input, `${fieldName} must be at least ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${fieldName} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }      
}

// Fonction pour vérifier la validité de l'email
function checkEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Fonction pour vérifier la validité du numéro de téléphone
function validateTelephone(telephone) {
    const re = /^\+?[0-9\s()-]{3,}$/;
    return re.test(telephone);
}

// Fonction pour vérifier la concordance des mots de passe
function checkPasswordsMatch(password, password2) {
    if (password.value !== password2.value) {
        showError(password2, 'Passwords do not match');
        return false;
    }
    return true;
}

// Événement de soumission du formulaire
form.addEventListener('submit', function(e) {
    e.preventDefault();
    validateForm();

    checkLength(username, 3, 15);
    checkPasswordsMatch(password, password2);

    if (checkPasswordsMatch(password, password2)) {
        const user = {
            username: document.getElementById('username').value.trim(),
            mood: parseFloat(document.getElementById('mood').value),
            telephone: document.getElementById('telephone').value.trim(),
            email: document.getElementById('email').value.trim(),
            date: document.getElementById('date').value.trim(),
            privacy_policy: document.getElementById('privacy policy').checked
        };
        localStorage.setItem("user", JSON.stringify(user));
    }
});
