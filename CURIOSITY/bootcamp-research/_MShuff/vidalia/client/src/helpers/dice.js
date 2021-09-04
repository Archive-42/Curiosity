export class Dice {
    constructor(name, sides) {
        this.name = name;
        this.sides = sides;
    };

    roll(rolls) {
        const possibilities = [];
        for(let i = 1; i <= this.sides; i++) {
            possibilities.push(i)
        }
        let result = 0;
        for(let i = 0; i < rolls; i++){
            result += possibilities[Math.floor((Math.random() * (possibilities.length -1)) + 1)];
        };
        return result;
    };
};


export const d20 = new Dice('d20', 20);
export const d12 = new Dice('d12', 12);
export const d10 = new Dice('d10', 10);
export const d8 = new Dice('d8', 8);
export const d6 = new Dice('d6', 6);
export const d4 = new Dice('d4', 4);
