let score = 0;
let remaining = 30;
let popTime = 3000;
let timeToHide;
let whackable = false;

function popUpRandomMole() {
  if (remaining <= 0) {
    document.querySelector('.sb__game-over').classList.remove('sb__game-over--hidden');
    return;
  }

  const moles = document.querySelectorAll('.wgs__mole-head:not(.wgs__mole-head--whacked)');
  if (moles.length === 0) {
    return;
  }
  const random = Math.floor(Math.random() * moles.length);
  const mole = moles[random];

  whackable = true;
  mole.classList.remove('wgs__mole-head--hidden');

  remaining -= 1;
  document.querySelector('.sb__moles').innerHTML = remaining;

  timeToHide = setTimeout(() => hideMole(mole), popTime);
}

function hideMole(mole) {
  whackable = false;
  mole.classList.add('wgs__mole-head--hidden');

  setTimeout(popUpRandomMole, 500);
}

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(popUpRandomMole, 0);

  const moles = document.querySelectorAll('.wgs__mole-head');
  for (let mole of moles) {
    mole.addEventListener('click', event => {
      if (!whackable) return;

      score += 1;
      document.querySelector('.sb__score').innerHTML = score;
      popTime -= popTime / 10;

      clearTimeout(timeToHide);
      hideMole(event.target);
    });
  }
});
