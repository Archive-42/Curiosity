import { d20 } from './dice';

const turns = (cards) => {
    const catchDuplicates = [];
    let i = 0;

    while(i < cards.length){
        const value = d20.roll(1);
        if(!catchDuplicates.includes(value)){
            catchDuplicates.push(value)
            cards[i]['turn'] = value;
            i += 1;
        }
    }
    return cards
}


export default turns;
