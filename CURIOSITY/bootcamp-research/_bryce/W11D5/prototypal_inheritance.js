Function.prototype.inherits1 = function(ParentClass) {
  function Surrogate() {}
  Surrogate.prototype = ParentClass.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
};

Function.prototype.inherits2 = function (ParentClass) {
  this.prototype = Object.create(ParentClass.prototype);
  this.prototype.constructor = this;
};


function MovingObject() { }
MovingObject.prototype.move = function() {
  console.log("I'm moving");
};

function Ship() { }
Ship.inherits2(MovingObject);
Ship.prototype.fire = function () {
  console.log("shooting lasers");
};

function Asteroid() { }
Asteroid.inherits2(MovingObject);
Asteroid.prototype.explode = function () {
  console.log("exploding");
};

const shippy = new Ship();
const aster = new Asteroid();
shippy.move();
aster.move();
shippy.fire();
// aster.fire(); // gives an error