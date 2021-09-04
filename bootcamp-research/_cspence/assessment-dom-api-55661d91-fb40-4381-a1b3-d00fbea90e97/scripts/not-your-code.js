/* DO NOT CHANGE THE JS IN THIS FILE OR YOU MAY FAIL */

let counterValue = 0;

window.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('bubble-trouble')
    .parentElement
    .addEventListener('click', function (e) {
      if (e.target.id === 'bubble-trouble') {
        this.style.backgroundColor = 'black';
      }
    });
});
