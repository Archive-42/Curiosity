function setup() {
    createCanvas(200, 500);
    background(0);
}

function draw() {
    switch (mouseX) {
        case 100:
            square(100, 25, 50);
            break;
        default:
            circle(100, 25, 50);
            break;
    }
}
