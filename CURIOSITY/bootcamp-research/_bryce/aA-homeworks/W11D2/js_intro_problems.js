function mysteryScoping1() {
    var x = 'out of block';
    if (true) {
        var x = 'in block'; //modifies x declared above
        console.log(x);
    }
    console.log(x);
}
mysteryScoping1();

function mysteryScoping2() {
    const x = 'out of block';
    if (true) {
        const x = 'in block'; //scope is constrained to block
        console.log(x);
    }
    console.log(x);
}

function mysteryScoping3() {
    const x = 'out of block';
    if (true) {
        var x = 'in block'; //syntax (declared const)
        console.log(x);
    }
    console.log(x);
}

function mysteryScoping4() {
    let x = 'out of block';
    if (true) {
        let x = 'in block'; //scope constrained to block
        console.log(x);
    }
    console.log(x);
}

function mysteryScoping5() {
    let x = 'out of block';
    if (true) {
        let x = 'in block';
        console.log(x);
    }
    let x = 'out of block again'; //syntax (already declared)
    console.log(x);
}

function madLib(verb, adjective, noun) {
    return `We shall ${verb.toUpperCase()} the ${adjective.toUpperCase()} ${noun.toUpperCase()}`;
}

function isSubstring(searchString, subString) {
    return searchString.includes(subString);
}

function fizzBuzz(array) {
    newArray = [];
    array.forEach(el => {
        if ((el % 3 === 0) ^ (el % 5 === 0)) {
            newArray.push(el);
        }
    })
    return newArray;
}

function isPrime(number) {
    if (number < 2) { return false; }
    for(let i = 2; i < number; i++) {
        if (number % i === 0) { return false; }
    }
    return true;
}

function firstNPrimes(n) {
    primes = [];
    for(let i = 2; primes.length < n; i++) {
        if (isPrime(i)) { primes.push(i); }
    }
    return primes;
}

function sumOfNPrimes(n) {
    sum = 0;
    primes = firstNPrimes(n);
    primes.forEach(el => sum += el);
    return sum;
}