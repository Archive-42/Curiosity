//Problem 1: Set the square red
const redBtn = document.getElementById('turn-square-red');
const sqr = document.getElementById('red-outlined-square');
redBtn.addEventListener('click', () => {
    sqr.classList.add('red');
});

//Problem 2: Add some text
const txtBtn = document.getElementById('add-content-to-rectangle');
const xyz = document.getElementById('empty-rectangle');
txtBtn.addEventListener('click', () => {
    xyz.innerHTML = 'XYZ';
})

//Problem 3: Add an image
const imgBtn = document.getElementById('add-image-to-rectangle');
const imgDiv = document.getElementById('lonely-square');
imgBtn.addEventListener('click', () => {
    if (!imgDiv.hasChildNodes()) {
        const logo = document.createElement('img');
        logo.setAttribute('src', './images/logo-emblem-black.svg');
        logo.setAttribute('alt', 'App Academy black logo emblem');
        imgDiv.appendChild(logo);
    }
});

//Problem 4: No bubbling
const bubbler = document.getElementById('bubble-trouble');
bubbler.addEventListener('click', event => event.stopPropagation());

//Problem 5: Count by one
var counter = 0; //when named counterValue: 'Uncaught Syntax Error: Identifier 'counterValue' has already been declared'
const dbtn = document.getElementById('decrement');
const ibtn = document.getElementById('increment');
const zbtn = document.getElementById('zero-out');
const count = document.getElementById('counter-value');
count.innerHTML = counterValue;
dbtn.addEventListener('click', () => {
    counter--;
    count.innerHTML = counter;
});
ibtn.addEventListener('click', () => {
    counter++;
    count.innerHTML = counter;
});
zbtn.addEventListener('click', () => {
    counter = 0;
    count.innerHTML = counter;
});

//Problem 6: Storage and key presses
const nameIn = document.getElementById('my-name-is');
if (localStorage.getItem('name')) {
    nameIn.value = localStorage.getItem('name');
}
nameIn.addEventListener('keyup', () => {
    localStorage.setItem('name', nameIn.value);
});

//Problem 7: Don't go there!
const lnk = document.getElementById('going-away');
lnk.addEventListener('click', event => event.preventDefault());
