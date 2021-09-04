import React, { useContext } from 'react';
import { levelUpContext } from '../../Context';

const PlayerCard = ({data}) => {

    const { ac, setAc, charisma, setCharisma,
        constitution, setConstitution, dex, setDex, intel, setIntel,
        strength, setStrength, wis, setWis, setPoints, points, hp, setHp } = useContext(levelUpContext);

    const skillLevel = (e) => {
        const stat = e.target.innerHTML.split(':')[0];
        if(points <= 0) return;
        if(stat === 'Armor Class'){
            setAc(ac + 1)
            setPoints(points - 1)
        }

        if(stat === 'Charisma'){
            setCharisma(charisma + 1)
            setPoints(points - 1)
        }

        if(stat === 'Constitution'){
            setConstitution(constitution + 1)
            setPoints(points - 1)
        }

        if(stat === 'Dexterity'){
            setDex(dex + 1);
            setPoints(points - 1);
        }

        if(stat === 'Hit Points'){
            setHp(hp + 1);
            setPoints(points - 1);
        }

        if(stat === 'Intelligence'){
            setIntel(intel + 1);
            setPoints(points - 1);
        }

        if(stat === 'Strength'){
            setStrength(strength + 1);
            setPoints(points - 1);
        }

        if(stat === 'Wisdom'){
            setWis(wis + 1);
            setPoints(points - 1)
        }
    }

    return (
        <div className='player-card-level-up-container'>
            <div className='player-card-level-up-header'>
                <div className='player-card-name'>{data.name}</div>
                <div className='player-card-class'>{data.Class.name}</div>
            </div>
            <div className='player-stats-container'>
                <div className='level-up-stat-button' onClick={skillLevel}>{`Armor Class: ${ac}`}</div>
                <div className='level-up-stat-button' onClick={skillLevel}>{`Charisma: ${charisma}`}</div>
                <div className='level-up-stat-button' onClick={skillLevel}>{`Constitution: ${constitution}`}</div>
                <div className='level-up-stat-button' onClick={skillLevel}>{`Dexterity: ${dex}`}</div>
                <div className='level-up-stat-button' onClick={skillLevel}>{`Hit Points: ${hp}`}</div>
                <div className='level-up-stat-button' onClick={skillLevel}>{`Intelligence: ${intel}`}</div>
                <div className='level-up-stat-button' onClick={skillLevel}>{`Strength: ${strength}`}</div>
                <div className='level-up-stat-button' onClick={skillLevel}>{`Wisdom: ${wis}`}</div>
            </div>
        </div>
    )
}

export default PlayerCard;