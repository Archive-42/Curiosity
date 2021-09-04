window.addEventListener('DOMContentLoaded', () => {
    const cell = document.getElementById('tic-tac-toe-board');
    const newGame = document.getElementById('new-game');
    const giveUp = document.getElementById('give-up');
    const winner = document.getElementById('game-status');
    let gameOver = false;
    let player1Turn = true;
    let grid = ['', '', '', '', '', '', '', '', ''];

    const resumeGame = () => {
        grid = JSON.parse(localStorage.getItem('gameState'));
        player1Turn = JSON.parse(localStorage.getItem('turn'));
        gameOver = JSON.parse(localStorage.getItem('status'));
        let cells = document.querySelectorAll('.square');
        cells.forEach((c) => {
            cellNum = c.id[c.id.length - 1];
            if (grid[cellNum] !== '') {
                let mark = document.createElement('img');
                c.appendChild(mark);
                if (grid[cellNum] === 'X') {
                    mark.setAttribute('src', `assets/player-x.svg`);
                } else if (grid[cellNum] === 'O') {
                    mark.setAttribute('src', 'assets/player-o.svg');
                }
                mark.setAttribute('alt', grid[cellNum]);
            }
        });
    };

    const checkStatus = function () {
        let gameTied = true;
        for (let i = 0; i < grid.length; i += 3) {
            if (grid[i] !== '' && grid[i] === grid[i + 1] && grid[i] === grid[i + 2]) {
                gameOver = true;
                winner.innerHTML = 'Winner: ' + grid[i];
                newGame.disabled = false;
                giveUp.disabled = true;
            }
            if (grid[i] !== '' && grid[i] === grid[i + 3] && grid[i] === grid[i + 6]) {
                gameOver = true;
                winner.innerHTML = 'Winner: ' + grid[i];
                newGame.disabled = false;
                giveUp.disabled = true;
            }
        }
        if (grid[0] !== '' && grid[0] === grid[4] && grid[0] === grid[8]) {
            gameOver = true;
            winner.innerHTML = 'Winner: ' + grid[0];
            newGame.disabled = false;
            giveUp.disabled = true;
        }
        if (grid[2] !== '' && grid[2] === grid[4] && grid[2] === grid[6]) {
            gameOver = true;
            winner.innerHTML = 'Winner: ' + grid[2];
            newGame.disabled = false;
            giveUp.disabled = true;
        }
        for (let i = 0; i < grid.length; i++) {
            if (grid[i] === '') {
                gameTied = false;
            }
        }
        if (gameTied && !gameOver) {
            winner.innerHTML = 'Winner: None'
            gameOver = true;
            newGame.disabled = false;
            giveUp.disabled = true;
        }
        localStorage.setItem('gameState', JSON.stringify(grid));
        localStorage.setItem('turn', player1Turn);
        localStorage.setItem('status', gameOver);
    };

    const markCell = function (event) {
        let myCell = event.target;
        let cellId = myCell.id;
        let cellNum = Number(cellId[cellId.length - 1]);
        if (!cellId.startsWith('square') || grid[cellNum] !== '') {
            return;
        }
        const moveImg = document.createElement('img');
        myCell.appendChild(moveImg);
        if (player1Turn && grid[cellNum] == '' && !gameOver) {
            moveImg.setAttribute('src', 'assets/player-x.svg');
            moveImg.setAttribute('alt', 'X');
            grid[cellNum] = 'X';
            player1Turn = false;
        } else if (!player1Turn && grid[cellNum] == '' && !gameOver) {
            moveImg.setAttribute('src', 'assets/player-o.svg');
            moveImg.setAttribute('alt', 'O');
            grid[cellNum] = 'O';
            player1Turn = true;
        }
        moveImg.setAttribute('class', 'myMark');
        checkStatus();
        localStorage.setItem('gameState', JSON.stringify(grid));
        localStorage.setItem('turn', player1Turn);
        localStorage.setItem('status', gameOver);
    };

    const startNew = (event) => {
        player1Turn = true;
        grid = ['', '', '', '', '', '', '', '', ''];
        gameOver = false;
        localStorage.setItem('gameState', JSON.stringify(grid));
        localStorage.setItem('turn', JSON.stringify(player1Turn));
        localStorage.setItem('status', JSON.stringify(gameOver));
        const cells = document.querySelectorAll('.square');
        cells.forEach((c) => {
            if (c.children[0]) {
                c.removeChild(c.children[0]);
            }
        });
        winner.innerHTML = '';
        event.target.disabled = true;
        giveUp.disabled = false;
    };

    const quit = (event) => {
        gameOver = true;
        newGame.disabled = false;
        if (player1Turn) {
            winner.innerHTML = 'Winner: O';
        } else {
            winner.innerHTML = 'Winner: X';
        }
        event.target.disabled = true;
    }

    resumeGame();
    cell.addEventListener('click', markCell);
    newGame.addEventListener('click', startNew);
    giveUp.addEventListener('click', quit);

});
