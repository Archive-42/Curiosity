import React, { useEffect, useContext } from 'react';
import { subtractUse } from '../../helpers/useAbility';
import { statusSetter } from '../../helpers/statusSetter';
import InfoButton from '../../helpers/InfoButton';
import InventoryItem from './InventoryItem';
import { survivalPlayer } from '../../Context';
import customSort from '../../helpers/customSort';
import hpBarChanger from '../../helpers/hpBarChanger';

const Player = ({ playerData, setPlayerData, status, setStatus, setTurn,
    turnList, setTurnList, data, damageType, setDamageType}) => {

    const { items, setItems, healthRef,  currentHealth, setCurrentHealth, weapon } = useContext(survivalPlayer);

    useEffect(() => {
        if(turnList.length <= 0){
            setCurrentHealth(data.hitPoints)
        }
    }, [status, healthRef])

    const newTurnList = [...turnList]

    let abilityBoolean = turnList.length > 0 && turnList[0] === data.turn;

    if(currentHealth <= 0){
        abilityBoolean = false;
    }


    const useAbility = () => {
        if(data.Ability.name === 'Prayer'){
            if(currentHealth + 5 > playerData[0].hitPoints){
                setCurrentHealth(playerData[0].hitPoints)
                hpBarChanger(healthRef, playerData[0].hitPoints, currentHealth)
                subtractUse(playerData[0], setPlayerData);
                return;
            }
            setCurrentHealth(currentHealth + 5);
            hpBarChanger(healthRef, playerData[0].hitPoints, currentHealth)
            subtractUse(playerData[0], setPlayerData);
            return;
        }

        if(data.Ability.name === status) return;
        if(data.Ability.uses <= 0) return;

        subtractUse(playerData[0], setPlayerData);
        statusSetter(data.Ability.name, setStatus)

        if(data.Ability.name === 'Poison Bite') return;
        if(data.Ability.name === 'Nightmares') return;
        if(data.Ability.name === 'Blazing Vortex') return;

        const turnSpent = newTurnList.shift()
        newTurnList.push(turnSpent)
        setTurnList(newTurnList)
        setTurn(newTurnList[0])
    }

    const itemElements = items.map((item) => {
        return (
            <InventoryItem key={item.id} healthRef={healthRef} bool={abilityBoolean} item={item}
            setDamageType={setDamageType} setStatus={setStatus}
            items={items} setItems={setItems} ogHealth={playerData[0].hitPoints}
            currentHealth={currentHealth} setCurrentHealth={setCurrentHealth}/>
        )
    })

    itemElements.sort(customSort);

    return (
        <>
            <div className='char-card-game-container'>
                <div className='survival-char-card-header'>
                    <div>{data.name}</div>
                    <div className='char-card-class-name'>{data.Class.name}</div>
                </div>
                <div className='HP-bar' ref={healthRef}>{currentHealth}</div>
                <div className='survival-char-card-stats'>
                    <div className='survival-char-card-stat1'>{`Armor Class: ${data.armorClass}`}</div>
                    <div className='survival-char-card-stat2'>{`Charisma: ${data.charisma}`}</div>
                    <div className='survival-char-card-stat1'>{`Constitution: ${data.constitution}`}</div>
                    <div className='survival-char-card-stat2'>{`Dexterity: ${data.dexterity}`}</div>
                    <div className='survival-char-card-stat1'>{`Hit Points: ${data.hitPoints}`}</div>
                    <div className='survival-char-card-stat2'>{`Intelligence: ${data.intelligence}`}</div>
                    <div className='survival-char-card-stat1'>{`Strength: ${data.strength}`}</div>
                    <div className='survival-char-card-stat2'>{`Wisdom: ${data.wisdom}`}</div>
                </div>
                <div className='survival-char-card-footer'>
                    <div>{!data.turn ? '' : `Initiative: ${data.turn}`}</div>
                    <div>{`Ability: ${data.Ability.name}`}</div>
                    <div>{`Weakness: ${data.Class.weakness}`}</div>
                    <div>{!status ? '' : status}</div>
                    <div>{!damageType ? '' : damageType}</div>
                </div>
            </div>
            <div className='inventory-container'>
                <div className='equipment-header'>Equipment</div>
                <div className='use-ability-container'>
                    <InfoButton data={data.Ability} />
                    {!abilityBoolean ? null : <div className='use-ability-button' onClick={useAbility}>{`Use: ${data.Ability.uses}x`}</div>}
                </div>
                <div>
                    {itemElements}
                    <div className='weapon-container'>
                        {/*<div className='weapon-header'>Weapon: </div> */}
                        <InfoButton data={weapon} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Player;