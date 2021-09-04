import React, { useState, useEffect, useRef } from 'react';
import Monster from './Monster';
import Player from './Player';
import turns from '../../helpers/turns';
import { NavLink } from 'react-router-dom';
import ItemDrop from './ItemDrop';
import { survivalPlayer } from '../../Context';
import LevelUp from './LevelUp';


const SurvivalGame = (props) => {
    const charId = Number(props.match.url[props.match.url.length - 1])

    const initiativeRollButn = useRef();
    const lootRef = useRef();

    const [playerData, setPlayerData] = useState([]);
    const [currentHealth, setCurrentHealth] = useState(10);
    const [enemies, setEnemies] = useState([]);
    const [lower, setLower] = useState(0);
    const [upper, setUpper] = useState(0.5);
    const [depth, setDepth] = useState(0);
    const [items, setItems] = useState([]);
    const [weapon, setWeapon] = useState({})
    const [killSets, setKillSets] = useState(0);
    const [clearedRoom, setClearedRoom] = useState(false);
    const [status, setStatus] = useState('');
    const [damageType, setDamageType] = useState('');
    const [turnList, setTurnList] = useState([]);
    const [turn, setTurn] = useState(null)
    const [xp, setXp] = useState(0);
    const [nextXp, setNextXp] = useState(50);
    const [levelBool, setLevelBool] = useState(false);
    const [copyObj, setCopyObj] = useState({})

    const deadBoolean = currentHealth <= 0;

    useEffect(() => {
        getPlayerData();
        getEnemies();
    }, [])

    const healthRef = useRef();
    const levelRef = useRef()

    const getPlayerData = async() => {
        const res = await fetch('/api/character/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json' ,
            },
            body: JSON.stringify({ id: charId })
        })
        const data = await res.json();
        setItems([data.Class.Starter.Item]);
        setWeapon(data.Class.Starter.Weapon);
        setPlayerData([data]);
    }

    const getEnemies = async() => {
        const res = await fetch('/api/beasts/get-enemies', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json' ,
            },
            body: JSON.stringify({ lower, upper })
        })
        const data = await res.json();
        setEnemies(data);
    }

    const monsters = enemies.map((enemy) =>
    <Monster key={enemy.id} currentHealth={currentHealth} setCurrentHealth={setCurrentHealth}
    playerData={playerData} turnList={turnList} setTurnList={setTurnList}
     setTurn={setTurn} turn={turn} data={enemy} enemies={enemies} setEnemies={setEnemies}
     status={status} setStatus={setStatus} clearedRoom={clearedRoom} weapon={weapon} setClearedRoom={setClearedRoom}/>)

    const playerBar = playerData.map((data) => <Player key={data.name} currentHealth={currentHealth}
    setCurrentHealth={setCurrentHealth} status={status} setStatus={setStatus}
    setTurn={setTurn} turn={turn} turnList={turnList} setTurnList={setTurnList}
    playerData={playerData} setPlayerData={setPlayerData} data={data} items={items}
    damageType={damageType} setDamageType={setDamageType} setItems={setItems}/>)

    const handleTurns = (e) => {
        initiativeRollButn.current.classList.add('hide');
        const cards = [...enemies, ...playerData]
        const objects = turns(cards)
        let arr = []
        objects.forEach(el => {
            arr.push(el.turn)
        });
        arr.sort((a, b) => b - a)
        setTurnList(arr);
        setTurn(arr[0])
        const updatedPlayerData = objects.pop();
        setPlayerData([updatedPlayerData]);
        setEnemies(objects)
    }

    if(deadBoolean){
        return (
            <div>
                <div className='survival-nav-bar'>
                    <div className='back-button2'>
                        <NavLink to='/' className='button-links2'>
                            <i className="fas fa-arrow-circle-left back-icon"></i>
                            <div>Quit</div>
                        </NavLink>
                    </div>
                    <div className='depth-rank'>{`Current Depth: ${depth}`}</div>
                </div>
                <div className='monster-cards'>
                    {monsters}
                </div>
                <div className='death-container'>
                    <div className='you-died'>You Died...</div>
                    <div className='back-button3'>
                        <NavLink to='/survival-start' className='button-links2'>
                            <div>Try Again?</div>
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }

    const playerContext = { setTurnList, turn, setTurn, getEnemies,
        initiativeRollButn, playerData, currentHealth, setLower, setUpper, upper, lower, depth, setDepth,
        setCurrentHealth, setPlayerData, items, setItems, weapon, setWeapon, killSets, setKillSets,
        clearedRoom, lootRef, xp, setXp, nextXp, setNextXp, levelBool, setLevelBool, healthRef, levelRef,
        copyObj, setCopyObj};

    return (
        <survivalPlayer.Provider value={playerContext}>
                <div className='survival-nav-bar'>
                    <div className='back-button2'>
                        <NavLink to='/' className='button-links2'>
                            <i className="fas fa-arrow-circle-left back-icon"></i>
                            <div>Quit</div>
                        </NavLink>
                    </div>
                    <div className='depth-rank'>{`Current Depth: ${depth}`}</div>
                </div>
                <div className='loot-button-container'>
                    {!clearedRoom ? null: <ItemDrop setWeapon={setWeapon} name={playerData[0].Class.name} depth={depth} />}
                </div>
                <div className='monster-cards'>
                    {monsters}
                    {levelBool ? <LevelUp /> : null}
                </div>
                <div className='roll-container' ref={initiativeRollButn}>
                    <div className='roll-button' onClick={handleTurns}>Roll for initiative</div>
                </div>
                <div className='player-bar'>
                    {playerBar}
                </div>
            </survivalPlayer.Provider>
    )
}

export default SurvivalGame;