class Rectangle {
  constructor(length, width) {
    this.length = length;
    this.width = width;
  }

  getArea() {
    return this.length * this.width;
  }
}

const rectangle = new Rectangle(12, 15);

console.log("length:", rectangle.length);
console.log("width:", rectangle.width);
console.log("area:", rectangle.getArea());
