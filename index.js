const form = document.querySelector('form');
const expMonthField = document.getElementById('exp-month');
const expYearField = document.getElementById('exp-year');

const confirmationMsg = document.querySelector('.confirmation');
const continueBtn = confirmationMsg.querySelector('button');

const displayEls = document.querySelectorAll('.display');
const inputEls = document.querySelectorAll('input');

function showError(inputEl, errorOutEl, message) {
    if (errorOutEl.classList.contains('empty')) {
        errorOutEl.classList.remove('empty');
    }

    inputEl.setAttribute('aria-invalid', 'true');
    errorOutEl.textContent = message;
}

function validateDateField(dateField, errorOutEl) {
    if (dateField.validity.valueMissing) {
        showError(dateField, errorOutEl, "Can't be blank");
        return false;

    } else if (dateField.validity.patternMismatch) {
        showError(dateField, errorOutEl, 'Wrong format');
        return false;
    } 

    dateField.setAttribute('aria-invalid', 'false');
    return true;
}

function validateDate() {
    let valid = true;

    const errorOutEl = expYearField.nextElementSibling;
    const expMonth = Number(expMonthField.value);

    if (!validateDateField(expMonthField, errorOutEl)) {
        valid = false;
    }

    if (!validateDateField(expYearField, errorOutEl)) {
        valid = false;
    }

    if (valid && (expMonth < 1 || expMonth > 12)) {
        showError(expMonthField, errorOutEl, 'Invalid date');
        valid = false;
    }

    if (valid) {
        errorOutEl.textContent = '';
    }

    return valid;
}

function validateInputEl(inputEl) {
    let errorOutEl = inputEl.nextElementSibling;

    while (errorOutEl && !errorOutEl.classList.contains('error')) {
        errorOutEl = errorOutEl.nextElementSibling;
    }

    if (inputEl.validity.valueMissing) {
        showError(inputEl, errorOutEl, "Can't be blank");
        return false;

    } else if (inputEl.validity.tooShort) {
        showError(inputEl, errorOutEl, `Must be at least ${inputEl.minLength} characters long`);
        return false;

    } else if (inputEl.validity.patternMismatch) {
        showError(inputEl, errorOutEl, 'Wrong format');
        return false;
    }

    if (!errorOutEl.classList.contains('empty')) {
        errorOutEl.classList.add('empty');
    }

    inputEl.setAttribute('aria-invalid', 'false');
    errorOutEl.textContent = '';

    return true;
}

inputEls.forEach((inputEl, index) => {
    inputEl.addEventListener('change', () => {
        const displayEl = displayEls[index];

        const inputVal = inputEl.value.trim();
        const defaultValue = displayEl.dataset.default;
        
        displayEl.classList.remove('fade-out');
        void displayEl.offsetWidth;

        displayEl.innerHTML = inputVal.length > 0 ? inputVal : defaultValue;
        displayEl.classList.add('fade-out');
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;

    inputEls.forEach(inputEl => {
        const name = inputEl.name;

        if (name !== 'exp-month' && name !=='exp-year' && !validateInputEl(inputEl)) {
            if (valid) inputEl.focus();
            valid = false;
        }
    });

    // Validate the date
    if (!validateDate()) {
        if (valid) expMonthField.focus();
        valid = false;
    }

    if (valid) {
        form.reset();
        form.setAttribute('aria-hidden', 'true');
        confirmationMsg.setAttribute('aria-hidden', 'false');
    }
});

continueBtn.addEventListener('click', () => {
    form.setAttribute('aria-hidden', 'false');
    confirmationMsg.setAttribute('aria-hidden', 'true');
});