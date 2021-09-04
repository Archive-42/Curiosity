import React from 'react'
import { NavLink } from 'react-router-dom';


const SetupCards = ({char}) => {

    return (
        <div className='char-card-container'>
            <div className='survival-char-card-header'>
                <div>{char.name}</div>
                <div className='char-card-class-name'>{char.Class.name}</div>
            </div>
            <div className='survival-char-card-stats'>
                <div className='survival-char-card-stat1'>{`Armor Class: ${char.armorClass}`}</div>
                <div className='survival-char-card-stat2'>{`Charisma: ${char.charisma}`}</div>
                <div className='survival-char-card-stat1'>{`Constitution: ${char.constitution}`}</div>
                <div className='survival-char-card-stat2'>{`Dexterity: ${char.dexterity}`}</div>
                <div className='survival-char-card-stat1'>{`Hit Points: ${char.hitPoints}`}</div>
                <div className='survival-char-card-stat2'>{`Intelligence: ${char.intelligence}`}</div>
                <div className='survival-char-card-stat1'>{`Strength: ${char.strength}`}</div>
                <div className='survival-char-card-stat2'>{`Wisdom: ${char.wisdom}`}</div>
            </div>
            <div className='survival-char-card-footer'>
                <div>{`Ability: ${char.Ability.name}`}</div>
                <div>{`Weakness: ${char.Class.weakness}`}</div>
            </div>
            <NavLink to={`/survival/${char.id}`} className='button-links'>
                <div className='button-area-wrapper'>
                    <div className='select-button'>Select</div>
                </div>
            </NavLink>
        </div>
    )
}

export default SetupCards;