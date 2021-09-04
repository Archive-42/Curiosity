import React, { useContext, useEffect, useRef, useState } from 'react';
import { survivalPlayer } from '../../Context';


const Drop = ({data}) => {
    const { items, setItems, setWeapon, setCopyObj } = useContext(survivalPlayer);
    const itemRef = useRef();
    const [pickedUp, setPickedUp] = useState(false);

    useEffect(() => {
        setPickedUp(false)
    }, [data])

    const pickUpItem = () => {
        setPickedUp(true)
        for(let i = 0; i < items.length; i++){
            let item = items[i];
            if(item.name === data.name){
                setCopyObj(item);
                return;
            }
        }
        setItems([...items, data])
    }

    const equipWeapon = () => {
        setPickedUp(true)
        setWeapon(data)
    }

    return(
        <div className='drop-item-container' ref={itemRef}>
            <div className='drop-name'>{data.name}</div>
            <div className='drop-description'>{data.description}</div>
            <div className='drop-body'>
                {!data.damageType ? null : <div className='drop-info1'>{`Damage Type: ${data.damageType}`}</div>}
                {!data.hitDice ? null : <div className='drop-info2'>{`Hit Dice: ${data.hitDice}`}</div>}
            </div>
            <div className='item-button-wrapper'>
                {pickedUp ? null : !data.damageType ? <div className='item-button' onClick={pickUpItem}>{`Pick up ${data.name}`}</div> : <div className='item-button' onClick={equipWeapon}>{`Equip ${data.name}`}</div>}
            </div>
        </div>
    )
}

export default Drop;
