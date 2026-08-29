const display = document.getElementById("display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

let firstNum = null;
let currentOperator = null;
let operatorPressed = false;


function updateDisplay(event) {
    const number = event.target.textContent;

    if (operatorPressed) {
        display.value = "";
        operatorPressed = false;
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

numbers.forEach(number => {
    number.addEventListener("click", updateDisplay);
})

operators.forEach(operator => {
    operator.addEventListener("click", handleOperator);
})