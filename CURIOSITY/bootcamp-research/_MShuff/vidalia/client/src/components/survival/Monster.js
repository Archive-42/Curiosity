import React, { useState, useEffect, useContext, useRef } from 'react';
import { Dice, d20 } from '../../helpers/dice'
import { survivalPlayer } from '../../Context';
import confirmLevel from '../../helpers/confirmLevel';
import hpBarChanger from '../../helpers/hpBarChanger';


const Monster = ({ playerData, currentHealth, setCurrentHealth, turnList, setTurnList, turn, setTurn, data, enemies, setEnemies, setStatus, status, setClearedRoom, clearedRoom}) => {

    const initiative = data.turn;
    const newTurnList = [...turnList]
    const [monstHealth, setMonstHealth] = useState(data.hitPoints);
    const [monstStatus, setMonstStatus] = useState('');
    const [timer, setTimer] = useState(0);
    const { weapon, lootRef, xp, setXp, nextXp, setNextXp, setLevelBool, healthRef } = useContext(survivalPlayer);
    const monstHpRef = useRef();

    let attackBoolean = turnList.length > 0 && turnList[0] === playerData[0].turn;
    const highlighter = useRef();

    if(currentHealth <= 0){
        attackBoolean = false;
    }

    useEffect(() => {
        if(turn === initiative){
            highlighter.current.classList.add('highlight-card')
            setTimeout(() => {
                highlighter.current.classList.remove('highlight-card')
                attackPlayer();
                const turnSpent = newTurnList.shift()
                newTurnList.push(turnSpent)
                setTurnList(newTurnList)
                setTurn(newTurnList[0])
                setStatus('');
                if(timer > 0){
                    setTimer(timer - 1)
                } else {
                    setMonstStatus('');
                }
            }, 800);
        }
    }, [turn, initiative, monstHealth])

    const rolls = Number(data.hitDice.split('d')[0])
    const sides = Number(data.hitDice.split('d')[1])
    let diceName = [data.hitDice.split('d')[1]]
    diceName.unshift('d')
    diceName = diceName.join('')

    const attackPlayer = () => {
        if(status === 'Teleport') return;
        if(status === 'Dispair') return;
        if(status === 'Lullaby'){
            setTimer(2);
            setMonstStatus('sleeping');
            return;
        }
        if(monstStatus === 'poisoned') {
            setMonstHealth(monstHealth - 5);
            let temp = monstHealth - 5;
            if(monstHealth <= 0){
                killMonster();
                return;
            }
            hpBarChanger(monstHpRef, data.hitPoints, temp);

        }
        if(monstStatus === 'burned') {
            setMonstHealth(monstHealth - 5);
            let temp = monstHealth - 5;
            if(monstHealth <= 0){
                killMonster();
                return;
            }
            hpBarChanger(monstHpRef, data.hitPoints, temp);

        }
        if(status === 'Nightmares') setMonstStatus('nightmares')
        if(monstHealth <= 0) {
            killMonster();
            return;
        }
        const attackDice = new Dice(diceName, sides)
        const initialDamage = attackDice.roll(rolls);
        let damage = initialDamage - (Math.floor(playerData[0].armorClass / 2))
        if(status === 'Crushing Blow') damage = Math.floor(damage / 2);

        if(damage < 0){
            damage = 0
        }

        let monsterAccuracy = d20.roll(1) + (data.strength - 10)
        const playerDodge = d20.roll(1) + (playerData[0].armorClass)
        if(status === 'Nightmares') monsterAccuracy = (monsterAccuracy / 2)

        if(monsterAccuracy > playerDodge){
            if(currentHealth <= 0) return;
            const newHealth = currentHealth - damage;
            setCurrentHealth(newHealth);
            hpBarChanger(healthRef, playerData[0].hitPoints, newHealth);
        }

    }

    const handleAttack = () => {
        const base = weapon.hitDice;
        const pRolls = Number(base.split('d')[0])
        const pSides = Number(base.split('d')[1])
        let pDiceName = [base.split('d')[1]]
        pDiceName.unshift('d')
        pDiceName = pDiceName.join('')

        const attackDice = new Dice(diceName, pSides)
        const initialDamage = attackDice.roll(pRolls);
        let damage = initialDamage - (Math.floor(data.armorClass / 2));

        if(damage < 0) damage = 0;
        if(status === 'explosion') damage += 100;
        if(status === 'Poison Bite'){
            const monsterDodge = d20.roll(1)
            const playerAccuracy = d20.roll(1)
            if(monsterDodge < playerAccuracy) setMonstStatus('poisoned')
        }
        if(status === 'Blazing Vortex'){
            const monsterDodge = d20.roll(1)
            const playerAccuracy = d20.roll(1)
            if(monsterDodge < playerAccuracy) setMonstStatus('burned')
        }
        const monsterDodge = d20.roll(1) + (data.armorClass - 10)
        let playerAccuracy;
        if(playerData[0].Class.name === 'Ranger') playerAccuracy = d20.roll(1) + (playerData[0].dexterity - 10)
        if(playerData[0].Class.name === 'Assassin') playerAccuracy = d20.roll(1) + (playerData[0].dexterity - 10)
        if(playerData[0].Class.name === 'Barbarian') playerAccuracy = d20.roll(1) + (playerData[0].strength - 10)
        if(playerData[0].Class.name === 'Fighter') playerAccuracy = d20.roll(1) + (playerData[0].strength - 10)
        if(playerData[0].Class.name === 'Cleric') playerAccuracy = d20.roll(1) + (playerData[0].strength - 10)
        if(playerData[0].Class.name === 'Sorcerer') playerAccuracy = d20.roll(1) + (playerData[0].intelligence - 10)

        if(playerAccuracy > monsterDodge){
            const newHealth = monstHealth - damage;

            if(newHealth <= 0){
                let newXp = data.xpReward + xp;
                setXp(newXp);
                killMonster();
                return;
            } else {
                hpBarChanger(monstHpRef, data.hitPoints, newHealth)
                setMonstHealth(newHealth);
            }
        }
        const turnSpent = newTurnList.shift()
        newTurnList.push(turnSpent)
        setTurnList(newTurnList)
        setTurn(newTurnList[0])
    }

    const killMonster = () => {
        let newEnemies = []
        for(let i = 0; i < enemies.length; i++){
            const enemy = enemies[i]
            if(enemy.name !== data.name) newEnemies.push(enemy)
        }
        let newTurns = []
        for(let i = 0; i < turnList.length; i++){
            let x = turnList[i]
            if(x !== initiative) newTurns.push(x)
        }

        if(newEnemies.length <= 0){
            if(lootRef.current){
                lootRef.current.classList.remove('hide')
            }
            setClearedRoom(true)
            confirmLevel(xp, setLevelBool, nextXp, setNextXp);
        }
        const turnSpent = newTurnList.shift()
        newTurnList.push(turnSpent)
        let newTurnListFinal = []
        for(let i = 0; i < newTurnList.length; i++){
            if(newTurnList[i] !== initiative) newTurnListFinal.push(newTurnList[i])
        }
        setTurnList(newTurnListFinal)
        setTurn(newTurnListFinal[0])
        setEnemies(newEnemies)
    }

    return (
        <div className='monster-card' ref={highlighter}>
            <div className='monster-card-name'>{data.name}
                <div className='monster-type'>{data.type}</div>
            </div>
            <div className='monster-health' ref={monstHpRef}>{monstHealth}</div>
            <div className='monster-initiative'>{!data.turn ? '' : `Initiative: ${data.turn}`}</div>
            <div className='monster-status'>{!monstStatus ? '' : monstStatus}</div>
            {!attackBoolean ? null : <div className='attack-buttn' onClick={handleAttack}>Attack</div>}
        </div>
    )
}

export default Monster;