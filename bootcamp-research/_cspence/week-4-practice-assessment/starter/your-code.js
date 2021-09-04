
window.addEventListener("DOMContentLoaded", () => {
    // Problem 1: make the circle blue
    const blueBtn = document.getElementById('make-circle-blue');
    const circle = document.getElementById('blue-circumference-circle');
    const makeCircleBlue = () => {
        circle.classList.add('blue');
    }
    blueBtn.addEventListener('click', makeCircleBlue);

    //Problem 2: Remove Text
    const rmApplesBtn = document.getElementById('remove-content-from-apples');
    const apple = document.getElementById('apples-div');
    const removeTheApples = () => {
        apple.innerHTML = '';
    }
    rmApplesBtn.addEventListener('click', removeTheApples);

    //Problem 3: Add an image
    const addImgBtn = document.getElementById('add-image-btn');
    const imgDiv = document.getElementById('add-image');
    const addTheImg = () => {
        if (!imgDiv.hasChildNodes()) {
            const logo = document.createElement('img');
            logo.setAttribute('src', './images/logo-emblem-black.svg');
            imgDiv.appendChild(logo);
        }
    }
    addImgBtn.addEventListener('click', addTheImg);

    //Problem 4: Stop the bubbling!
    const noRed = document.getElementById('bubble-friend');
    noRed.addEventListener('keydown', event => event.stopPropagation());

    //Problem 5: Adding and Multiplying
    let total = 1;
    const multiplyBtn = document.getElementById('multiply');
    const addBtn = document.getElementById('add-two');
    const resetBtn = document.getElementById('reset-total');
    const totalDisp = document.getElementById('total-value');
    totalDisp.innerHTML = total;
    multiplyBtn.addEventListener('click', () => {
        total *= 2;
        totalDisp.innerHTML = total;
    });
    addBtn.addEventListener('click', () => {
        total += 2;
        totalDisp.innerHTML = total;
    });
    resetBtn.addEventListener('click', () => {
        total = 1;
        totalDisp.innerHTML = total;
    });

    //Problem 6: Storage and key presses
    const flavorInput = document.getElementById('fav-flavor');
    const storeBtn = document.getElementById('store-flavor');
    if (localStorage.getItem('flavor')) {
        flavorInput.value = (localStorage.getItem('flavor') === null) ? '' : localStorage.getItem('flavor');
    }
    storeBtn.addEventListener('click', () => {
        localStorage.setItem('flavor', flavorInput.value);
    });

    //Problem 7: Can't click this!
    const checkBox = document.getElementById('will-not-check');
    checkBox.addEventListener('click', (event) => {
        event.preventDefault();
    });


});
