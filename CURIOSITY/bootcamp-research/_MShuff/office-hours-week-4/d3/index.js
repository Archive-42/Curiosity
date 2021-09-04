/*******************************************************************************
   #01 - Given an HTML page that includes <button id="increment-count">I have been clicked <span id="clicked-count">0</span> times</button>, write JavaScript that increases the value of the content of span#clicked-count by 1 every time button#increment-count is clicked. 
 ******************************************************************************/
let count = 0;
const button = document.getElementById('increment-count');
const span = document.getElementById('clicked-count');

button.addEventListener('click', (event) => {
  count++;
  span.innerHTML = count;
});

/*******************************************************************************
   #02 - Given an HTML page that includes <input type="checkbox" id="on-off"><div id="now-you-see-me">Now you see me</div>, write JavaScript that sets the display of div#now-you-see-me to "none" when input#on-off is checked and to "block" when input#on-off is not checked. 
 ******************************************************************************/
let checkbox = document.getElementById('on-off');
let div = document.getElementById('now-you-see-me');

checkbox.addEventListener('click', (event) => {
  if (checkbox.checked) {
    div.style.display = 'none';
  } else {
    div.style.display = 'block';
  }
});

/*******************************************************************************
   #03 - Given an HTML file that includes <input id="stopper" type="text" placeholder="Quick! Type STOP">, write JavaScript that will change the background color of the page to cyan five seconds after a page loads unless the field input#stopper contains only the text "STOP".
 ******************************************************************************/
setTimeout(() => {
  let stopperInput = document.getElementById('stopper').value;
  if (stopperInput === 'STOP') return;
  document.body.style.backgroundColor = 'cyan';
}, 5000);

/*******************************************************************************
   #04 - Given an HTML page with that includes <input type=”text” id=”fancypants”>, write JavaScript that changes the background color of the textbox to #E8F5E9 when the caret is in the textbox and turns it back to its normal color when focus is elsewhere.
 ******************************************************************************/
let fancyInput = document.getElementById('fancypants');

fancyInput.addEventListener('focusin', (event) => {
  fancyInput.style.backgroundColor = '#E8F5E9';
});

fancyInput.addEventListener('focusout', (event) => {
  fancyInput.style.backgroundColor = 'initial';
});

/*******************************************************************************
   #05 - Given an HTML page that includes a form with two password fields, write JavaScript that subscribes to the forms submission event and cancels it if the values in the two password fields differ.
 ******************************************************************************/
const form = document.getElementById('my-form');

form.addEventListener('submit', (event) => {
  const password = document.getElementById('my-form-password').value;
  const passwordConfirm = document.getElementById('my-form-password-confirm')
    .value;

  if (password !== passwordConfirm) {
    event.preventDefault();
    alert('Passwords must match!');
  }
});

/*******************************************************************************
   #07 - Given an HTML page that has 300 DIVs, create one click event subscription that will print the id of the element clicked on to the console
 ******************************************************************************/
document.addEventListener('click', (event) => {
  event.target.id ? console.log(event.target.id) : '';
});
