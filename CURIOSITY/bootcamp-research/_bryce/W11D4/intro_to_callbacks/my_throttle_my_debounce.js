Function.prototype.myThrottle = function(interval) {
  let tooSoon = false;
  const origFunc = this;
  const throttledFunc = function (...args) {
    if (!tooSoon) {
      tooSoon = true;
      setTimeout(function () {
        tooSoon = false;
      }, interval);
      origFunc(...args);
    }
  };
  return throttledFunc;
};

class Neuron {
  constructor() {
    this.fire = this.fire.myThrottle(1000);
  }

  fire(num) {
    console.log(`Firing! ${num}`);
  }
};

const neuron = new Neuron();

const interval = setInterval(() => {
  neuron.fire(5);
}, 10);


Function.prototype.myDebounce = function(interval) {
  let prevInterval;
  const origFunc = this;
  const debouncedFunc = function (...args) {
    if (prevInterval) clearInterval(prevInterval);
    const intervalFunc = function () { origFunc(...args);};
    prevInterval = setInterval(intervalFunc, interval);
  };
  return debouncedFunc;
};




class SearchBar {
  constructor() {
    this.query = "";

    this.type = this.type.bind(this);
    this.search = this.search.bind(this);
  }
  
  type(letter) {
    this.query += letter;
    this.search();
  }

  search() {
    console.log(`searching for ${this.query}`);
  }
}

const searchBar = new SearchBar;

const queryForHelloWorld = () => {
  searchBar.type("h");
  searchBar.type("e");
  searchBar.type("l");
  searchBar.type("l");
  searchBar.type("o");
  searchBar.type(" ");
  searchBar.type("w");
  searchBar.type("o");
  searchBar.type("r");
  searchBar.type("l");
  searchBar.type("d");
}

searchBar.search = searchBar.search.myDebounce(500);
queryForHelloWorld();
