/* YOUR PERSON CLASS HERE */
class Person {
    constructor(lastName, firstName) {
        this.lastName = lastName;
        this.firstName = firstName;
    }
    getLastName() {
        return this.lastName;
    }
}

class Employee extends Person {
    constructor(lastName, firstName, employeeId) {
        super(lastName, firstName);
        this.employeeId = employeeId;
    }

    toString() {
        return `${this.employeeId}: ${this.getLastName()}`;
    }
}

const a = new Employee('Alvarez', 'Ana', 'A1');
const b = new Employee('Bazmani', 'Bey', 'B2');

console.log(a.toString()); // => "A1: Alvarez"
console.log(b.toString()); // => "B2: Bazmani"
