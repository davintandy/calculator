const display = document.getElementById("display");
const numbers = document.querySelectorAll(".number");

function updateDisplay(event) {
    const number = event.target.textContent;

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
    if (operator === "*") {
        return multiply(num1, num2);
    }
    if (operator === "/") {
        return divide(num1, num2);
    }
}

numbers.forEach(number => {
    number.addEventListener("click", updateDisplay);
})