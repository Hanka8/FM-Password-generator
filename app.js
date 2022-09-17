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
function updateLength () {
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
    if (count == 0 || inputLength.value == 0 ) {
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
    } else if ( count == 2 || inputLength.value < 6 ) {
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

function generate () {
    const uppercase = document.getElementById("uppercase").checked;
    const lowercase = document.getElementById("lowercase").checked;
    const numbers = document.getElementById("numbers").checked;
    const symbols = document.getElementById("symbols").checked;
    
    let charSet = [];

    if (symbols) {
        const symbolsSet = ".?!*+-@#$€ß¤÷×~ˇ^°";
        for (let symbol of symbolsSet) {
            charSet.push(symbol);
        }
    } if (lowercase) {
        const lowercaseSet = "abcdefghijklmnopqrstuvwxyz";
        for (let char of lowercaseSet) {
            charSet.push(char);
        }
    } if (uppercase) {
        const uppercaseSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (let bigChar of uppercaseSet) {
            charSet.push(bigChar);
        }
    } if (numbers) {
        const numbersSet = "0123456789";
        for (let number of numbersSet) {
            charSet.push(number);
        }
    }
    //...now I have correct charset saved in charSet array, depending on checkboxes checked

    let result = [];
    for (let i = inputLength.value; i > 0; i--) {
        result.push(charSet[Math.floor(Math.random() * charSet.length)]);
    }

   password.textContent = result.join("");
}

generator.addEventListener("click", generate);
window.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        generate();
    }
})

