<script>Javascript content</script>

<script src="script.js"></script>

Scripts are most commonly placed in the <head> or at the end of the <body>. Using at the end of the body in particular is valuable because the browser will first finish parsing the HTML document and its DOM structure. This allows the scripts to execute faster, having what they need already available to work on. Having scripts execute at the beginning also blocks the rendering of the page until it's finished, so overall, putting scripts at the end is more efficient.
Some cases may benefit from occuring in the head before the body completely loads, depending on the script's nature. 

Build-in JavaScript functions:
alert()
confirm()
prompt()



JavaScript is a client-side scripting language. It runs on the user's machine, not the server, unlike other web programming languages like PHP and Ruby. Thus, JavaScript is also reliant on the browser's capabilities and settings.

JavaScript is a dynamic programming language. It doesn't need to be run through a compiler to be interpreted into machine-readable format.

JavaScript is loosely typed. It doesn't require the programmer to define what each variable's type is.

JavaScript is case-sensitive.

JS ignores whitespace, like tabs and spaces, except in "strings".

A statement is a command that tells that browser what to do. In JS, you must put a semicolon at the end of a statement to tell JS it is the end of the comman. A line break will also trigger the end of a command, but the semicolon is a best practice.

// Single-line comments can be made with double slashes.

/* Multi-line comments can be made with the slash-star combo, like in CSS. */

JS Variables:
Variables can be declared without the var keyword, which impacts what part of the script has access to the information they contain. 

Variable names must start with a letter or _ underscore. It can contain letters, digits, and underscores. It cannot contain spaces or special characters. Use either underscores or camelCase.

var <i>variable_name</i> = value;

Data Types
Undefined
This is created when declaring a variable with a name but giving it no value.
var variable-name;
alert(variable-name); // This will open a dialogue containing 'undefined'.

Null
Assigning this variable means 'Define this variable, but give it no value.'
var variable-name = null;
alert(variable-name); // This will open a dialog containing 'null'.

Numbers
var variable-name = 5
alert(variable-name + foo); // This will alert '10'.

String
"Single quotes" or 'double quotes'.

If concatenating a string and number together, JS will assume the number should be treated as a string as well, instead of returning an error due to incompatible types.

Booleans
true
False: false null undefined 0 " "

Arrays
A group of multiple values, called members, assigned to a single variable. The values are indexed in an array.

Comparison Operators
==
!=
=== is identical to (equal to and of the same data type)
!== is not identical to
>
>=
<
<=

+=
++ plus 1
-- minus 1

if/else statements
if( true ) {
  // action.
  }

var foo = [5, "five", "5"];
if (foo[1] === "five" ) {
  alert("This is the word five, written in English.");
} else {
    alert("This is not the word five written in English.";
}

Loops

for( initialize the variable; test the condition; alter the value; ) {
  //statement behavior;
}

for var i = 0; i < 2; i++ ) {
  alert(i) //This loop will trigger three alerts, reading "0", "1", and "2" respectively.
}

.length. An array method.
var items = ["foo", "bar", "baz"];
for (var i = 0; i < items.length; i++) {
  alert( items[i] ); // This will alert each item in the array.
}

Functions
A piece of code for performing a task that doesn't run until it is referenced or called.

functionName(args,args) {
  script;
}

Native Functions (out of the box JS)
alert(), confirm(), prompt()
  Trigger browser-level dialog boxes.
Date() 
Returns the current date and time.
parseInt("123")
  Convert a string data type containing numbers into a number data type.

setTimeout(functionName, 5000)
Executes a function after a delay. Specify in milliseconds. 5000 milliseconds is 5 seconds.

Defining Functions
function functionName(args) {
  return ++ args;
}


Variable Scope & var Keyword
globally scoped
A variable that can be used by any of the scripts in the program. Variables defined outside of a function are globally scoped.

locally scoped
A variable that is only available within its parent function. Variables defined inside a function can be created to be locally scoped by using the var keyword. Omitting the var keyword makes the variable globally scoped.

Since JS often has different scripts from different sources working together, such as from plugins, it is best practice to locally scope variables as much as possible to avoid variable collisions.

IIFE (Immediately Invoked Functional Expression)
One technique to ensure all the variables within a program stay out of the global scope is to place the entire script into a function, like so:
<script>
(function() {
  //script
}());
</script>




Browser Object
The browser is known as the window object.

window properties and methods
event
history
location
status
alert()
close()
confirm()
focus()

Events
An action that can be detected with JavaScript, such as when the docuent loads or when the user clicks an element or moves her mouse over it.

Event binding
Trying a script to the events on the page, whether initiated by the user, the browser itself, or other scripts.

In scripts, events are handled by event handlers.

Event Handlers
onblur
onchange
onclick
onerror
onfocus
onkeydown
onkeypress
onkeyup
onload
onmousedown
onmousemove
onmouseout
onmouseover
onmouseup
onsubmit

Three common methods to apply event handlers to items on the page are:
as an HTML attribute
as a method attached to the element
using addEventListener()

HTML Attribute
This technique should generally be avoided, since it provides the same drawbacks as applying style attributes within the HTML instead of separately.

<body onclick="myFunction();"> /* myFunction will run when the user clicks on anything within 'body'. */


As a Method
window.onclick = myFunction; /* myFunction will run when the user clicks anything within the browser window. */

The drawback of this method is that only one event can be binded at a time. For example, the second method will overwrite the first method here, not apply both of them at the same time. Thus, the second function, myOtherFunction, will overwrite the first, and only myOtherFunction will end up happening.

window.onlick = myFunction;
window.onclick = myOtherFunction;


addEventListener
This technique allows the best of both worlds. 

Call the addEventListener() method of the target object, then specify the event in quetion and the function to be executed as two arguments.

window.addEventListener("click", myFunction);

This can be used with an anonymous function as well,

window.addEventListener("click", function(e) {
});

Example 1:
greatestOfTwo( first, second ) {
  if( first > second ) {
    return first;
  } else {
    return second;
  }
}

Example 2:
longestWord( strings ) {
  var longest = strings[0];
  
  for( i = 1; i < strings.length; i++ ) {
    if ( strings[i].length > longest.length ) {
      longest = strings[i];
    }
  }
  return longest;
}






DOM (Document Object Model)
An API (programming interface) for HTML and XML pages. Provides a way to access and manipulate the contents of a document, like HTML documents. The DOM can be accessed by not only JS, but languages like PHP, Ruby, and C++.

It provides a structured map of the document and a set of methods to interface with the elements contained within. It essentially translates the markup into a format that JS can understand.




The Node Tree
Each element on a page is a node. DOMs allow deeper access than CSS by also treating content within elements as nodes. Most DOM scripting involves reading from and writing to the document.

Accessing DOM Nodes
document object
Identifies the page itself, often providing the starting part for DOM crawling.

This examples looks on the page (document) to find the element with the id value "beginner", find the HTML content within that element (innerHTML), then save those contents to the variable foo.

var foo = document.getElementById("beginner").innerHTML;

ALT WRITING FOR READABILITY
var foo = document
  .getElementById("beginner")
    .innerHTML;

By Element Name:
getElementsByTagName()

var paragraphs = document.getElementsByTagName("p")
Returns every paragraph on the page, wrapped in a collection or noeList, in the order they appear in the document from top to bottom. nodeLists are like arrays, and thus can be accessed via index.

By ID Attribute Value:
getElementById()

<img src="photo.jp" alt="" id="lead-photo">

var photo = document.getElementById("lead-photo");


By Class Attribute Value:
getElementsByClassName()

var firstColumn = document.getElementsByClassName("column-a");

Works similar to getElementsByTagName(), creating an array-like nodeList.

By Selector:
querySelectorAll()
Accesses nodes based on a CSS-style selector. Returns a nodeList even if only a single element is matched.

var sidebarPara = document.querySelectorAll(".sidebar p");

var textInput = document.querySelectorAll("input[type='text']");

Accessing an Attribute Value:
getAttribute()
Use an attribute name in order to retrieve the value of the attribute within an element node.

<img src="stratocaster.jpg" alt="electric guitar" id="lead-image">

var bigImage = document.getElementById("lead-image");

alert(bigImage.getAttribute"src")); // Alerts "stratocaster.jpg"




MANIPULATING NODES
setAttribute()

var bigImage = document.getElementById("lead-image");

bigImage.setAttribute("src", "lespaul.jpg");


innerHTML:
accesses the text and markup inside an element.

var introDive = document.getElementsByClassName("intro");

introDiv[0].innerHTML = "<p>This is our intro text.</p>";

This examples adds the content of the string to introDiv as a real live element because innerHTML tells JS to parse the strings <p></p> as markup.

style
Allows changes to the CSS.

document.getElementById("intro").style.color = "#fff";

document.getElementById("intro").style.backgroundColor = "#f58220";

CSS property names change from being hyphenated to being camelCase in JS and the DOM. background-color > backgroundColor. border-top-width > borderTopWidth. This property can be used to set styles for the node or even for elsewhere in the script outside of the present node.

var brandColor = document.getElementById("intro").style.backgroundColor;

ADDING AND REMOVING ELEMENTS:
createElement

var newDiv = document.createElement("div");

createTextNode()

var ourText = document.createTextNode("This is our text.");

appendChild()

<div id="our-div"></div>

var ourDiv = document.getElementById("our-div");
var newParagraph = document.createElement("p");
var copy = document.createTextNode("Hello, world!");

newParagraph.appendChild( copy );
ourDiv.appendChild( newParagraph );


insertBefore()
ourDiv.insertBefore(newHeading, para );

replaceChild()
ourDiv.replaceChild(newImg, swapMe);

removeChild()













