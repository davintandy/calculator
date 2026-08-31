const display = document.getElementById("display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equal = document.getElementById("equal");
const clear = document.getElementById("clear");
const backspace = document.getElementById("backspace");
const percent = document.getElementById("percent");

let firstNum = null;
let currentOperator = null;
let operatorPressed = false;


function updateDisplay(event) {
    const number = event.target.textContent;

    if (operatorPressed) {
        display.value = "";
        operatorPressed = false;

        if (currentOperator === null) {
            firstNum = null;
        }
    }

    const digitsCount = display.value.length;
    if (digitsCount >= 15) {
        return;
    }

    if (number !== "." || !display.value.includes(".")) {
        display.value += event.target.textContent;
    }
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(num1, num2, operator) {
    if (operator === "+") {
        return add(num1, num2);
    }
    if (operator === "-") {
        return subtract(num1, num2);
    }
    if (operator === "×") {
        return multiply(num1, num2);
    }
    if (operator === "÷") {
        return divide(num1, num2);
    }
}

function handleOperator(event) {
    const selectedOperator = event.target.textContent;
    const currentNum = parseFloat(display.value);

    if (isNaN(currentNum)) {
        return
    }

    if (operatorPressed) {
        currentOperator = selectedOperator;
        return;
    }

    if (firstNum === null) {
        firstNum = currentNum;
    } else if (currentOperator) {
        const result = operate(firstNum, currentNum, currentOperator);
        display.value = result;
        firstNum = result;
    }

    currentOperator = selectedOperator;
    operatorPressed = true;
}

function handleEqual(event) {
    if (firstNum === null || currentOperator === null || operatorPressed) {
        return;
    }

    const currentNum = parseFloat(display.value);
    if (isNaN(currentNum)) {
        return;
    }

    const result = operate(firstNum, currentNum, currentOperator);
    display.value = result;
    firstNum = result;
    currentOperator = null;
    operatorPressed = true;
}

function handleClear() {
    firstNum = null;
    currentOperator = null;
    operatorPressed = false;
    display.value = "";
}

function handleBackspace() {
    if (operatorPressed) {
        return;
    }

    display.value = display.value.slice(0, -1);
}

function handlePercent() {
    const currentNum = parseFloat(display.value);
    if (isNaN(currentNum)) {
        return;
    }

    let result;
    if (firstNum !== null && currentOperator !== null) {
        result = (firstNum * currentNum) / 100;
    } else {
        result = currentNum / 100;
    }

    display.value = result;
}

function handleKeyboard(event) {
    const key = event.key;

    if ((key >= "0" && key <= "9") || key === ".") {
        updateDisplay({ target: { textContent: key } });
    }

    if (key === "+" || key === "-") {
        handleOperator({ target: { textContent: key } });
    } else if (key === "*") {
        handleOperator({ target: { textContent: "×" } });
    } else if (key === "/") {
        handleOperator({ target: { textContent: "÷" } });
    }

    if (key === "Enter" || key === "=") {
        handleEqual();
    }

    if (key === "Backspace") {
        handleBackspace();
    }
    if (key === "Delete") {
        handleClear();
    }
    if (key === "%") {
        handlePercent();
    }
}


numbers.forEach(number => {
    number.addEventListener("click", updateDisplay);
})

operators.forEach(operator => {
    operator.addEventListener("click", handleOperator);
})

equal.addEventListener("click", handleEqual);
clear.addEventListener("click", handleClear);
backspace.addEventListener("click", handleBackspace);
percent.addEventListener("click", handlePercent);
window.addEventListener("keydown", handleKeyboard)