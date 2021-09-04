import React, { useContext, useState, useEffect } from 'react';
import InfoButton from '../../helpers/InfoButton';
import itemButton from '../../helpers/useItem';
import { survivalPlayer } from '../../Context';


const InventoryItem = ({item, setDamageType, setStatus, items, ogHealth,
    setItems, bool, currentHealth, setCurrentHealth, healthRef}) => {

    const {copyObj, setCopyObj, playerData, setPlayerData} = useContext(survivalPlayer)

    const [uses, setUses] = useState(1)

    useEffect(() => {
        if(copyObj.name === item.name){
            setUses(uses + 1)
            setCopyObj({});
        }
    }, [copyObj])

    const arrowBoolean = item.name.includes('Arrow');

    const handleQuiver = () => {
        if(item.name.includes('Poison')){
            setDamageType('poison')
        } else if(item.name.includes('Shock')){
            setDamageType('lightning')
        } else if(item.name.includes('Fire')){
            setDamageType('fire')
        } else {
            return;
        }
    }

    const itemUser = () => {
        itemButton(item, setStatus, uses, setUses,
            setItems, items, ogHealth, currentHealth,
            setCurrentHealth, healthRef, playerData[0], setPlayerData);

    }

    return(
        <div className='player-item-container'>
            <InfoButton data={item} />
            {arrowBoolean ? <div className='use-item-button' onClick={handleQuiver}>{`Equip`}</div> :
            !bool ? null : <div className='use-item-button' onClick={itemUser}>{`Use: ${uses}x`}</div>}
        </div>
    )
}

export default InventoryItem;