const buttons = document.querySelectorAll("button");
const previousOperation = document.querySelector(".last-operation");
const currentNumber = document.querySelector(".number");

buttons.forEach(i => {
    i.addEventListener("click", () => {
        if (i.innerHTML.match(/^[0-9]+$/)) {
            number(i.innerHTML);
        } else {
            others(i.innerHTML);
        }

        if (i.innerHTML != ".") {
            changestyle();
        }
    });
});

const state = {
    numbers: ["", ""],
    action: "first",
    dotCheck: false,
    dotLength: 0,
    currentInput: "",
    currentOperator: "",
    decLength: 0,
    positivityLength: 0
}

const operators = {
    "+": (n1, n2) => (Number(n1) + Number(n2)).toFixed(state.decLength),
    "-": (n1, n2) => (Number(n1) - Number(n2)).toFixed(state.decLength),
    "x": (n1, n2) => (Number(n1) * Number(n2)).toFixed(state.decLength),
    "÷": (n1, n2) => (Number(n1) / Number(n2)).toFixed(state.decLength == 0 ? state.decLength = 1 : state.decLength += 0)
}

function number(num) {
    if (state.currentInput == "0") {
        state.currentInput = "";
    }

    if (state.action == "operator") {
        state.action = "second";
    }

    if (state.action == "equal") {
        previousOperation.innerHTML = "";
        state.action = "first";
        state.numbers = ["", ""];
        state.dotCheck = false;
        state.decLength = 0;
        state.currentOperator = "";
        state.positivityLength = 0;
        state.error = false;
    }

    if (state.dotCheck) {
        decLength(num);
    } else if (state.currentInput.length < 8 + state.positivityLength) {
        state.currentInput += num;
    }

    displayNumber();
}

function changestyle() {
    if (state.currentInput != "" || currentNumber.innerHTML != "00000000") {
        currentNumber.style.opacity = 1;
    }

    if (state.previousInput != "") {
        previousOperation.style.visibility = "visible";
    }
}

function displayNumber() {
    if (state.currentInput != "") {
        currentNumber.innerHTML = state.currentInput;
    }
}

function others(type) {
    if (type == "AC" || type == "C") {
        clearButtons(type);
    } else if (type == ".") {
        dot();
    } else if (type == "=") {
        equal();
    } else if (type == "+/-") {
        changePositivity();
    } else {
        arithmeticOperators(type);
    }
}

function clearButtons(clearType) {
    if (clearType == "AC" || state.action == "equal") {
        previousOperation.innerHTML = "";
        state.previousInput = "";
        state.action = "first";
        state.numbers[0] = "";
    }

    state.dotCheck = false;
    currentNumber.innerHTML = "0";
    state.currentInput = "0";
    state.decLength = 0;
    state.numbers[1] = "";
    state.positivityLength = 0;
    state.dotLength;
}

function dot() {
    if (state.currentInput.length != 0 && state.dotCheck != true && state.currentInput.length <= 7) {
        state.currentInput += ".";
        state.dotCheck = true;
    }

    displayNumber();
}

function decLength(num) {
    if (state.currentInput.split(".")[1].length < 3 && state.currentInput.length < 9 + state.positivityLength) {
        state.currentInput += num;
    }

    if (state.action == "first") {
        state.decLength = state.currentInput.split(".")[1].length;
    } else if (state.action == "second") {
        state.decLength < state.currentInput.split(".")[1].length ? state.decLength = state.currentInput.split(".")[1].length : state.decLength += 0;
    }
}

function changePositivity() {
    if ((state.action == "first" || state.action == "second") && state.currentInput.length != 0 && currentNumber.innerHTML != "0") {
        if (state.currentInput.includes("-")) {
            state.currentInput = state.currentInput.replace("-", "");
            state.positivityLength = 0;
        } else {
            state.currentInput = "-" + state.currentInput;
            state.positivityLength = 1;
        }

        displayNumber();
    } else if (state.action == "operator" && currentNumber.innerHTML.length != 0 && currentNumber.innerHTML != "0") {
        if (currentNumber.innerHTML.includes("-")) {
            currentNumber.innerHTML = currentNumber.innerHTML.replace("-", "");
        } else {
            currentNumber.innerHTML = "-" + currentNumber.innerHTML;
            state.positivityLength = 1;
        }
    }
}

function arithmeticOperators(operator) {
    if (state.action == "first" && state.currentInput != "") {
        state.numbers[0] = state.currentInput;
        state.action = "operator";
        previousOperation.innerHTML = state.currentInput + " " + operator;
        state.currentInput = "";
        state.currentOperator = operator;
        state.dotCheck = false;
    } else if (state.action == "operator") {
        previousOperation.innerHTML = state.numbers[0] + " " + operator;
        state.currentOperator = operator;
    } else if (state.action == "second" && !(state.error)) {
        currentNumber.innerHTML = answer(operators[state.currentOperator](state.numbers[0], currentNumber.innerHTML));
        if (currentNumber.innerHTML != "ERR") {
            previousOperation.innerHTML = currentNumber.innerHTML + " " + operator;
        }

        state.numbers[0] = currentNumber.innerHTML;
        state.currentInput = "";
        state.action = "operator";
    } else if (state.action == "equal" && !(state.error)) {
        state.currentOperator = operator;
        state.numbers[0] = currentNumber.innerHTML;
        state.numbers[1] = "";
        previousOperation.innerHTML = currentNumber.innerHTML + " " + operator;
        state.action = "operator";
    }
}

function equal() {
    if (state.action == "equal") {
        state.numbers[0] = currentNumber.innerHTML;
        if (state.numbers[1].includes("-")) {
            previousOperation.innerHTML = state.numbers[0] + " " + state.currentOperator + " (" + state.numbers[1] + ") =";
        } else {
            previousOperation.innerHTML = state.numbers[0] + " " + state.currentOperator + " " + state.numbers[1] + " =";
        }
        currentNumber.innerHTML = answer(operators[state.currentOperator](state.numbers[0], state.numbers[1]));
    } else if (state.numbers[0] != "" && state.currentOperator != "") {
        if (state.currentInput != "") {
            state.numbers[1] = state.currentInput;
        } else {
            state.numbers[1] = currentNumber.innerHTML; // mudei aqui state.numbers[0]
        }

        if (state.numbers[1].includes("-")) {
            previousOperation.innerHTML = state.numbers[0] + " " + state.currentOperator + " (" + state.numbers[1] + ") =";
        } else {
            previousOperation.innerHTML = state.numbers[0] + " " + state.currentOperator + " " + state.numbers[1] + " =";
        }

        currentNumber.innerHTML = answer(operators[state.currentOperator](state.numbers[0], state.numbers[1]));
        state.action = "equal";
        state.currentInput = "";
    }
}

function answer(answer) {
    if (state.numbers[0].includes(".") || state.numbers[1].includes(".")) {
        state.dotLength++;
    }

    if (String(answer).length > 8) {
        state.error = true;
    }

    return answer == Infinity || answer == "NaN" ? "Undefined" : String(answer).length <= 8 + state.positivityLength + state.dotLength ? answer : "ERR";
}