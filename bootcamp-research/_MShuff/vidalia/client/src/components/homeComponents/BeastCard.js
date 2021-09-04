import React from 'react';


const BeastCard = ({beast}) => {

    return (
        <>
            <div className='beast-card'>
                <div  className='beast-name'>{beast.name}</div>
                <div className='beast-card-header'>
                    <div>{`Type: ${beast.type}`}</div>
                    <div>{`Alignment: ${beast.alignment}`}</div>
                </div>
                <div>
                    <div className='beast-card-stat1'>{`Armor Class: ${beast.armorClass}`}</div>
                    <div className='beast-card-stat2'>{`Charisma: ${beast.charisma}`}</div>
                    <div className='beast-card-stat1'>{`Constitution: ${beast.constitution}`}</div>
                    <div className='beast-card-stat2'>{`Dexterity: ${beast.dexterity}`}</div>
                    <div className='beast-card-stat1'>{`Dice: ${beast.hitDice}`}</div>
                    <div className='beast-card-stat2'>{`Hit Points: ${beast.hitPoints}`}</div>
                    <div className='beast-card-stat1'>{`Intelligence: ${beast.intelligence}`}</div>
                    <div className='beast-card-stat2'>{`Strength: ${beast.strength}`}</div>
                    <div className='beast-card-stat1'>{`Wisdom: ${beast.wisdom}`}</div>
                </div>
                <div className='beast-card-footer'>
                    <div>{`Weakness: ${beast.weakness}`}</div>
                    <div>{`Reward: ${beast.xpReward}:XP`}</div>
                </div>
            </div>
        </>
    )
}

export default BeastCard