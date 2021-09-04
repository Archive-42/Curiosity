import hpBarChanger from './hpBarChanger';
import {addUse} from './useAbility';

const itemButton = (item, statusMethod, currentUses, usesMethod, itemSetter, itemList, ogHealth, health, setHealth, ref, obj, objSetter) => {
    if(currentUses <= 1){
        const temp = [];
        for(let i = 0; i < itemList.length; i++){
            let itemObj = itemList[i];
            if(itemObj.name !== item.name) temp.push(itemObj);
        }
        itemSetter(temp);
    }

    if(item.name === 'Black Powder Bomb'){
        statusMethod('explosion')
        usesMethod(currentUses - 1);
        return;
    } else if(item.name === 'Healing Potion (S)'){
        let newHealth = health + 10;
        usesMethod(currentUses - 1);
        if(newHealth >= ogHealth){
            setHealth(ogHealth)
            hpBarChanger(ref, ogHealth, ogHealth)
        } else {
            setHealth(newHealth)
            hpBarChanger(ref, ogHealth, newHealth)
        }
        return;
    } else if(item.name === 'Healing Potion (M)'){
        let newHealth = health + 20;
        usesMethod(currentUses - 1);
        if(newHealth > ogHealth){
            setHealth(ogHealth)
            hpBarChanger(ref, ogHealth, ogHealth)

        } else {
            setHealth(newHealth)
            hpBarChanger(ref, ogHealth, newHealth)
        }
        return;
    }else if(item.name === 'Healing Potion (L)'){
        let newHealth = health + 60;
        usesMethod(currentUses - 1);
        if(newHealth > ogHealth){
            setHealth(ogHealth)
            hpBarChanger(ref, ogHealth, ogHealth)
        } else {
            setHealth(newHealth)
            hpBarChanger(ref, ogHealth, newHealth)
        }
        return;
    } else if(item.name === 'Orange Cake'){
        addUse(obj, objSetter)
        usesMethod(currentUses - 1);
    }
}

export default itemButton;