/***********************************************************************
 * #01 - Given HTML that includes <div id=”catch-me-if-you-can”>HI!</div>, write a JavaScript statement that stores a reference to the HTMLDivElement with the id “catch-me-if-you-can” in a variable named “divOfInterest”
 ***********************************************************************/
const divOfInterest = document.getElementById('catch-me-if-you-can');
console.log('divOfInterest:', divOfInterest);

/***********************************************************************
 * #02 - Given HTML that includes seven SPAN elements each with the class “cloudy”, write a JavaScript statement that stores a reference to a NodeList filled with references to the seven HTMLSpanElements in a variable named “cloudySpans”
 ***********************************************************************/
const cloudySpans = document.querySelectorAll('.cloudy');
console.log('cloudySpans:', cloudySpans);

/***********************************************************************
 * #03 - Given an HTML file with HTML, HEAD, TITLE, and BODY elements,
 * create and reference a JS file that in which the JavaScript will create
 * and attach to the BODY element an H1 element with the id
 * "sleeping-giant" with the content "Jell-O, Burled!"
 ***********************************************************************/
//   - Create the Element Node
const ourH1Element = document.createElement('h1');
//   - Give our Element node the id of 'sleeping-giant'
ourH1Element.setAttribute('id', 'sleeping-giant');
//      - Alternative
ourH1Element.id = 'sleeping-giant';
//   - Give our Element node content "Jell-O, Burled!"
ourH1Element.innerHTML = 'Jell-O, Burled!';
//   - Attach to body
document.body.appendChild(ourH1Element);
// // - Alternative 1
// document.body.append(ourH1Element);
// // - Alternative 2
// document.body.prepend(ourH1Element);

/***********************************************************************
 * #04 - Given an HTML file with HTML, HEAD, TITLE, SCRIPT, and BODY elements with the SCRIPT's SRC attribute referencing an empty JS file, write a script in the JS file to create a DIV element with the id "lickable-frog" and add it as the last child to the BODY element.
 ***********************************************************************/
const ourDiv = document.createElement('div');
ourDiv.id = 'lickable-frog';
document.body.appendChild(ourDiv);

/***********************************************************************
 * #06 - Write JavaScript to add the CSS class "i-got-loaded" to the BODY element when the window fires the DOMContentLoaded event.
 ***********************************************************************/
// document.addEventListener('DOMContentLoaded', (event) => {
//   document.body.classList.add('i-got-loaded');
//   // Alternative 1
//   document.body.setAttribute('class', 'i-got-loaded');
//   // Alternative 2
//   document.body.className = 'i-got-loaded';
// });

/***********************************************************************
 * #7 - Given an HTML file with a UL element with the id "your-best-friend" that has six non-empty LIs as its children, write JavaScript to write the content of each LI to the console.
 ***********************************************************************/
const ourUL = document.getElementById('your-best-friend');
console.dir(ourUL);
const ourULChildren = Array.from(ourUL.children); // Return an HTML Collection
console.log(ourULChildren);

// Alternative
// const ourLIs = document.querySelectorAll('#your-best-friend>li');
// console.log(ourLIs);

/***********************************************************************
 * #8 - Given an HTML file with a UL element with the id "your-worst-enemy" that has no children, write JavaScript to construct a string that contains six LI tags each containing a random number and set the inner HTML property of ul#your-worst-enemy to that string.
 ***********************************************************************/
function generateRandom(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

let yourWorstEnemyUL = document.getElementById('your-worst-enemy');

const myListItems = [
  `<li>${generateRandom(100)}</li>`,
  `<li>${generateRandom(100)}</li>`,
  `<li>${generateRandom(100)}</li>`,
  `<li>${generateRandom(100)}</li>`,
  `<li>${generateRandom(100)}</li>`,
  `<li>${generateRandom(100)}</li>`,
];

yourWorstEnemyUL.innerHTML = myListItems.join(' ');

/***********************************************************************
 * #9 - Write JavaScript to update the title of the document to the current time at a reasonable interval such that it looks like a real clock.
 ***********************************************************************/
function setTime() {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  document.title = `${hours}:${minutes}:${seconds}`;
}

setInterval(setTime, 1000);
