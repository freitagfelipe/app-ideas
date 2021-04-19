const buttons = document.querySelectorAll("button");
const homeButton = document.querySelector(".homeButton");
const sections = document.querySelectorAll("section");
const introParagraph = document.querySelector("p");
const imagesInput = document.querySelector("#link");
const images = document.querySelectorAll("img");

let oldRotateY = "scaleY(1)";
let oldRotateX = "scaleX(1)";
let imageNumber = "";

buttons.forEach(i => {
    i.addEventListener("click", event => {
        if (i.classList.contains("homeButton") || i.classList.contains("send")) {
            displaySection(event.target);
        } else {
            rotateButtons(event.target);
        }
    });
});

images.forEach(i => {
    i.addEventListener("click", event => {
        trigger(event.target);
    });
});

function displaySection(wichButton) {
    if (imagesInput.value.startsWith("https://")) {
        if (wichButton.classList.contains("send")) {
            sections.forEach(i => {
                i.classList.toggle("display");
            });

            showImage();
        } else if(wichButton.classList.contains("homeButton") && !(sections[1].classList.contains("display"))) {
            defaultFunction()
        }

        if (!(window.matchMedia("(max-width: 1200px)").matches)) {
            introParagraph.classList.toggle("display");
        }

        homeButton.classList.toggle("display");
    }
}

function showImage() {
    if (window.matchMedia("(max-width: 1200px)").matches) {
        sections[1].style.backgroundImage = `url(${imagesInput.value})`;
    } else {
        images.forEach(i => {
            i.src = imagesInput.value;
            i.classList.remove("display");
        });

        images[0].parentElement.classList.add("displayFlex");
    }
}

function defaultFunction() {
    sections.forEach(i => {
        i.classList.toggle("display");
    });

    images.forEach(i => {
        i.classList.add("display");
        i.style.transform = "scaleY(1) scaleX(1)";
    });

    if (window.matchMedia("(min-width: 1201px)").matches) {
        images[imageNumber].style.border = "0px";
    }

    images[0].parentElement.classList.remove("displayFlex");
    sections[1].style.transform = "scaleY(1) scaleX(1)";
    imagesInput.value = "";
    oldRotateX = "scaleX(1)";
    oldRotateY = "scaleY(1)";
    imageNumber = "";
}

function trigger(imageNum) {
    if (window.matchMedia("(min-width: 1201px)").matches) {
        imageNumber = Number(imageNum.classList[0]);

        images.forEach(i => {
            if (i.classList[0] === imageNum.classList[0]) {
                images[imageNumber].style.border = "1px solid red";
            } else {
                i.style.border = "0px";
            }
        });

        oldRotateX = "scaleX(1)";
        oldRotateY = "scaleY(1)";
    }
}

function rotateButtons(rotateDirection) {
    switch (rotateDirection.classList[0]) {
        case "up":
            if (window.matchMedia("(max-width: 1200px)").matches) {
                sections[1].style.transform = "scaleY(-1) " + oldRotateX;
            } else if(imageNumber !== "") {
                images[Number(imageNumber)].style.transform = "scaleY(-1) " + oldRotateX;
            }

            oldRotateY = "scaleY(-1)";
            break;
        case "left":
            if (window.matchMedia("(max-width: 1200px)").matches) {
                sections[1].style.transform = "scaleX(1) " + oldRotateY;
            } else if(imageNumber !== "") {
                images[Number(imageNumber)].style.transform = "scaleX(1) " + oldRotateY;
            }

            oldRotateX = "scaleX(1)";
            break;
        case "right":
            if (window.matchMedia("(max-width: 1200px)").matches) {
                sections[1].style.transform = "scaleX(-1) " + oldRotateY;
            } else if(imageNumber !== "") {
                images[Number(imageNumber)].style.transform = "scaleX(-1) " + oldRotateY;
            }

            oldRotateX = "scaleX(-1)";
            break;
        case "down":
            if (window.matchMedia("(max-width: 1200px)").matches) {
                sections[1].style.transform = "scaleY(1) " + oldRotateX;
            } else if(imageNumber !== "") {
                images[Number(imageNumber)].style.transform = "scaleY(1) " + oldRotateX;
            }

            oldRotateY = "scaleY(1)"
            break;
    }
}