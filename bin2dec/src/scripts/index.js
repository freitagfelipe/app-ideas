const binaryNumber = document.querySelector("#number")
const output = document.querySelector(".output")
const showAnswer = document.querySelector(".answer")
const regex = /^[0-1]+$/

binaryNumber.addEventListener("input", event => {
    numberCheck();
})

function numberCheck() {
    if(binaryNumber.value.length === 0) {
        output.innerHTML = "Waiting for a valid binary number."
        output.style.color = "#fff"
        showAnswer.classList.add("visibility")
    }else {
        if(binaryNumber.value.match(regex)) {
            decValue()
            output.innerHTML = "Here is your decimal"
            output.style.color = "#007D57"
        }else {
            output.innerHTML = "You entered a non-binary digit (please enter only 0 or 1)."
            output.style.color = "#640B22"
            showAnswer.classList.add("visibility")
        }
    }
}

function decValue() {
    let binaryArray = binaryNumber.value
    binaryArray = binaryArray.split("")
    let answer = 0

    for(let i = Number(binaryNumber.value.length) - 1, p = 0; i >= 0; i--, p++) {
        answer += binaryArray[i] * Math.pow(2, p)
    }

    showAnswer.innerHTML = answer
    showAnswer.classList.remove("visibility")
}