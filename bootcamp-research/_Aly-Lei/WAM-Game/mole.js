let score = 0;
let moleCount = 30;
let timeCount = 3500;

popUpRandomMole = () => {
  let moleArray = document.querySelectorAll(".wgs__mole-head");
  let chosen = moleArray[random(moleArray.length - 1, 0)];

  moleCount--;

  chosen.classList.remove("wgs__mole-head--hidden");

  setTimeout(() => {
    hideMole(chosen);
  }, timeCount);
};

hideMole = (mole) => {
  mole.classList.add("wgs__mole-head--hidden");
  if (moleCount === 0) {
    document.getElementById("result").innerText = `YOU SCORED ${score} POINTS!`;
    moleArray.forEach((mole) => {
      mole.classList.add("wgs__mole-head--hidden");
      return;
    });
  }

  setTimeout(() => {
    popUpRandomMole();
  }, 1000);
};

random = (max, min) => {
  return Math.floor(Math.random() * (max - min) + min);
};

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    popUpRandomMole();
  }, 0);

  let molePeople = document.querySelectorAll(".wgs__mole-head");
  for (let mole of molePeople) {
    mole.addEventListener("click", (event) => {
      mole.classList.add("wgs__mole-head--hidden");
      score++;
      if (timeCount > 200) {
        timeCount -= 200;
      }
      console.log(timeCount);
      let scoreEle = document.getElementById("score");
      let moleEle = document.getElementById("moles");
      let resultEle = document.getElementById("result");
      scoreEle.innerText = `Score: ${score}`;
      moleEle.innerText = `Moles: ${moleCount}`;
    });
  }
});
