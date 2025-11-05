const displayEls = document.querySelectorAll('.display');
const inputEls = document.querySelectorAll('input');

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