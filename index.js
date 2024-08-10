const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculatorKeys');
const display = document.querySelector('.calculatorDisplay');
let firstValue = '';
let operator = '';
let secondValue = '';
let shouldResetDisplay = false;

function formatNumber(number) {
    const maxLength = 10;
    if (number.toString().length > maxLength) {
        return Number(number).toExponential(5);
    }

    return parseFloat(number.toFixed(10));
}

function adjustFontSize() {
    const length = display.textContent.length;
    if (length > 10) {
        display.style.fontSize = `${Math.max(1, 2 - 0.1 * (length - 10))}em`;
    } else {
        display.style.fontSize = '2em';
    }
}

keys.addEventListener('click', event => {
    if (event.target.matches('button')) {
        const key = event.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;

        if (!action) {
            if (displayedNum === '0' || shouldResetDisplay) {
                display.textContent = keyContent;
                shouldResetDisplay = false;
            } else {
                display.textContent = displayedNum + keyContent;
            }
            adjustFontSize();
        }

        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            firstValue = displayedNum;
            operator = action;
            shouldResetDisplay = true;
        }

        if (action === 'decimal') {
            if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.';
            } else if (shouldResetDisplay) {
                display.textContent = '0.';
                shouldResetDisplay = false;
            }
            adjustFontSize();
        }

        if (action === 'clear') {
            display.textContent = '0';
            firstValue = '';
            operator = '';
            secondValue = '';
            adjustFontSize();
        }

        if (action === 'calculate') {
            secondValue = displayedNum;
            display.textContent = calculate(firstValue, operator, secondValue);
            firstValue = display.textContent;
            operator = '';
            secondValue = '';
            shouldResetDisplay = true;
            adjustFontSize();
        }
    }
});

function calculate(n1, operator, n2) {
    let result = '';

    if (operator === 'add') {
        result = parseFloat(n1) + parseFloat(n2);
    } else if (operator === 'subtract') {
        result = parseFloat(n1) - parseFloat(n2);
    } else if (operator === 'multiply') {
        result = parseFloat(n1) * parseFloat(n2);
    } else if (operator === 'divide') {
        result = parseFloat(n1) / parseFloat(n2);
    }

    return result.toString();
}
