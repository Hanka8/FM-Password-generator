const copyBtn = document.getElementById("copy");
const labelLength = document.getElementById("label");
const inputLength = document.getElementById("length");


// ***** COPY BTN FUNCTIONALITY*****

function copyPassword() {
    const password = document.getElementById("password");
    // ...copy the text inside the text field
    navigator.clipboard.writeText(password.textContent);
}

copyBtn.addEventListener("click", copyPassword);

// ***** INPUT RANGE FUNCTIONALITY *****

// changing character length value
function updateLength() {
    return labelLength.textContent = inputLength.value;
}

inputLength.addEventListener("mousemove", updateLength);
inputLength.addEventListener("change", updateLength);

//changing tracks 
const leftTrack = document.querySelector(".leftTrack");
const rightTrack = document.querySelector(".rightTrack");

function updateSlider() {
    return leftTrack.style.width = `${inputLength.value * 5}%`;
}

inputLength.addEventListener("mousemove", updateSlider);
inputLength.addEventListener("change", updateSlider);


// ***** PASSWORD STRENGTH *****

const inputs = document.querySelectorAll(".includeCheckbox");
const strengthText = document.getElementById("strengthText");
const lines = [line1, line2, line3, line4];

line1 = document.getElementById("line1");
line2 = document.getElementById("line2");
line3 = document.getElementById("line3");
line4 = document.getElementById("line4");

function changeStrength() {
    let count = 0;
    //...to know how many checkboxes are checked
    inputs.forEach(input => {
        if (input.checked == true) {
            count++;
        }
    })
    //...to change styles depending on number of checked checkboxes + length of the password
    if (count == 0 || inputLength.value == 0) {
        strengthText.textContent = "";
        lines.forEach(line => {
            line.classList.remove("weak", "medium", "strong", "tooWeak")
        });
    } else if (count == 1 || inputLength.value < 4) {
        strengthText.textContent = "too weak!";
        line1.classList.add("tooWeak");
        lines.forEach(line => {
            line.classList.remove("weak", "medium", "strong");
        });
    } else if (count == 2 || inputLength.value < 6) {
        strengthText.textContent = "weak";
        line1.classList.add("weak");
        line2.classList.add("weak");
        lines.forEach(line => {
            line.classList.remove("tooWeak", "medium", "strong")
        });
    } else if (count == 3 || inputLength.value < 10) {
        strengthText.textContent = "medium";
        line1.classList.add("medium");
        line2.classList.add("medium");
        line3.classList.add("medium");
        lines.forEach(line => {
            line.classList.remove("tooWeak", "weak", "strong")
        });
    } else {
        strengthText.textContent = "strong";
        line1.classList.add("strong");
        line2.classList.add("strong");
        line3.classList.add("strong");
        line4.classList.add("strong");
        lines.forEach(line => {
            line.classList.remove("tooWeak", "weak", "medium")
        });
    }
}

//...changes on clicking checkboxes
inputs.forEach(input => input.addEventListener("click", changeStrength));
//...changes on changing input range
inputLength.addEventListener("mousemove", changeStrength);
inputLength.addEventListener("change", changeStrength);


/* **********************************
********GENERATE THE PASSWORD********
************************************* */

const generator = document.getElementById("generator");
const password = document.getElementById("password");

//function to generate password
function generate() {
    const uppercase = document.getElementById("uppercase").checked;
    const lowercase = document.getElementById("lowercase").checked;
    const numbers = document.getElementById("numbers").checked;
    const symbols = document.getElementById("symbols").checked;

    //create sets
    const symbolsSet = ".?!*+@#$€÷×~";
    const lowercaseSet = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbersSet = "0123456789";

    //if nothing is checked 
    if (inputLength.value == 0 || (!uppercase && !lowercase && !numbers && !symbols)) {
        password.textContent = "P4$5W0rD!";
        password.style.color = "#817D92";
        return;
    }

    let charSet = [];
    //change charset depending on how many checkboxes are checked
    generateCharSet(symbols, symbolsSet, charSet);
    generateCharSet(lowercase, lowercaseSet, charSet);
    generateCharSet(uppercase, uppercaseSet, charSet);
    generateCharSet(numbers, numbersSet, charSet);

    //generate result
    let result = [];
    for (let i = inputLength.value; i > 0; i--) {
        result.push(charSet[Math.floor(Math.random() * charSet.length)]);
    }

    //check if it contains all it shouls
    checkIfContains(lowercase, lowercaseSet, result);
    checkIfContains(uppercase, uppercaseSet, result);
    checkIfContains(numbers, numbersSet, result);
    checkIfContains(symbols, symbolsSet, result);

    //we have result!
    password.textContent = result.join("");

    //brighten the password
    password.style.color = "#E6E5EA";

    //change the font for mobile if its too long
    if (inputLength.value > 13) {
        password.classList.add("smaller");
    } else {
        password.classList.remove("smaller");
    }
}


// function to check if it contains what it should
function checkIfContains(what, whatSet, arr) {
       if (what) {
      let arrayIncludesThis = false;
    for (let char of arr) {
        if (whatSet.includes(char)) {
            arrayIncludesThis = true;
        }
    }
    if (lowercase && !arrayIncludesThis) {
        arr[Math.floor(Math.random() * arr.length)] = whatSet[Math.floor(Math.random() * whatSet.length)];
    }  
    }
}

//function to change charset depending on how many checkboxes are checked
function generateCharSet(whatIsChecked, wantedSet, desiredResult) {
    if (whatIsChecked) {
        for (let i of wantedSet) {
            desiredResult.push(i);
        }
    }
}

// add the functionality to the button and enter keypress
generator.addEventListener("click", generate);
window.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        generate();
    }
})
