//Assign one image to a click event - fill one of spaces with one of the images
//if the square is not already filled
//Start with X, alterante thereafter
// DOM content loaded event listener
// Click event would trigger, take div's id and update the
//id in css to include the background image
//addEvent Listener for each ind. space and the div has a class square, iterate through nodelist with forEach
//- can call the click on each ind square

window.addEventListener("DOMContentLoaded", () => {
	//Top-level Variables
	let counter = 0; //          //
	let sqrArray = ["", "", "", "", "", "", "", "", ""];
	let gameFull = 0;
	let gameStatus = "";
	const gameStatusDiv = document.getElementById("game-status");

	//Tie checker Function
	function tieChecker() {
		for (let i = 0; i < sqrArray.length; i++) {
			if (sqrArray[i] === "x" || sqrArray[i] === "o") {
				gameFull++;
			}

			if (gameStatus === "" && gameFull === 9) {
				//iterate through entire array before console.logging it's a tie
				//inside of array we don't
				gameStatusDiv.innerHTML = "It's a Tie :(";
			}
			return;
		}
	}

	///New Game///
	const newGameBtn = document.getElementById("new-game");

	const newGame = () => {
		if (gameFull === 9 || gameStatus !== "") {
			newGameBtn.removeAttribute("disabled");
			newGameBtn.addEventListener("click", (e) => {
				location.reload();
			});
		} else {
			newGameBtn.disabled = true;
		}
	};

	//////////Phase 2 ///////////
	const squareClass = document.querySelectorAll(".square");
	squareClass.forEach((square) => {
		square.addEventListener("click", (e) => {
			const clickedSquare = e.target.id[e.target.id.length - 1];

			if (e.target.style.backgroundImage) {
				return;
			}
			if (counter % 2 === 0) {
				const img = document.createElement("img");
				img.src =
					"https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg";
				e.target.appendChild(img);

				sqrArray[clickedSquare] = "x";
			} else {
				const img = document.createElement("img");
				img.src =
					"https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg";
				e.target.appendChild(img);

				sqrArray[clickedSquare] = "o";
			}
			counter++;
			console.log(sqrArray);
			//create function to see if the board is full
			//if board is full, and checkGameStatus function hasn't returned a winner, then return a tie
			checkGameStatus();
			tieChecker();
			newGame();
			console.log(gameStatus);
		});
	});

	/////////Phase 3 ////////////////

	const checkGameStatus = (array) => {
		if (
			sqrArray[0] === sqrArray[1] &&
			sqrArray[1] === sqrArray[2] &&
			sqrArray[2] !== ""
		) {
			gameStatus = sqrArray[0].toUpperCase();
			gameStatusDiv.innerHTML = `Winner ${gameStatus}`;
		} else if (
			sqrArray[3] === sqrArray[4] &&
			sqrArray[4] === sqrArray[5] &&
			sqrArray[5] !== ""
		) {
			gameStatus = sqrArray[3].toUpperCase();
			gameStatusDiv.innerHTML = `Winner ${gameStatus}`;
		} else if (
			sqrArray[6] === sqrArray[7] &&
			sqrArray[7] === sqrArray[8] &&
			sqrArray[8] !== ""
		) {
			gameStatus = sqrArray[6].toUpperCase();
			gameStatusDiv.innerHTML = `Winner ${gameStatus}`;
		} else if (
			sqrArray[0] === sqrArray[3] &&
			sqrArray[3] === sqrArray[6] &&
			sqrArray[6] !== ""
		) {
			gameStatus = sqrArray[0].toUpperCase();
			gameStatusDiv.innerHTML = `Winner ${gameStatus}`;
		} else if (
			sqrArray[1] === sqrArray[4] &&
			sqrArray[4] === sqrArray[7] &&
			sqrArray[7] !== ""
		) {
			gameStatus = sqrArray[1].toUpperCase();
			gameStatusDiv.innerHTML = `Winner ${gameStatus}`;
		} else if (
			sqrArray[2] === sqrArray[5] &&
			sqrArray[5] === sqrArray[8] &&
			sqrArray[8] !== ""
		) {
			gameStatus = sqrArray[2].toUpperCase();
			gameStatusDiv.innerHTML = `Winner ${gameStatus}`;
		} else if (
			sqrArray[0] === sqrArray[4] &&
			sqrArray[4] === sqrArray[8] &&
			sqrArray[8] !== ""
		) {
			gameStatus = sqrArray[0].toUpperCase();
			gameStatusDiv.innerHTML = `Winner ${gameStatus}`;
		} else if (
			sqrArray[2] === sqrArray[4] &&
			sqrArray[4] === sqrArray[6] &&
			sqrArray[6] !== ""
		) {
			gameStatus = sqrArray[2].toUpperCase();
			gameStatusDiv.innerHTML = `Winner ${gameStatus}`;
		} else {
			console.log("Continue playing");
		}

		//check to make sure that none of the array indices are an empty string -only way to tie
		//do in a for loop?
	};
});
