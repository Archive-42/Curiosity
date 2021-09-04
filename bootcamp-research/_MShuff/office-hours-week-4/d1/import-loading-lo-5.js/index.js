// Method 2:  Run script after the DOM has loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log(`DOMContentLoaded fired`);
  console.log(document.getElementById('my-body')).id;
});

// Method 3: Handler function invoked after the page is loaded with all resources
window.onload = () => {
  console.log(`window.onload has fired. Everything ready!`);
  console.log(document.getElementById('my-body').id);
};

// What Not To Do:
let bodyId = window.document.getElementById('my-body').id; // my-body
console.log(bodyId);
