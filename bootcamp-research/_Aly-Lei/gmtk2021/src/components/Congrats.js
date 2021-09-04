import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Button from "./shared/Button";
import {clearData, loadResolvedNpcs} from "../store/reducers/saveReducer"
import {getRandomNpc} from "../utility/utility";
import {loadAllActive} from "../store/reducers/activeReducer";

const Congrats = () => {
    const dispatch = useDispatch();
    const npcs = useSelector((state) => state.npcs);

    const restartGame = () => {
        clearData();

        const randomNpcId = getRandomNpc(npcs, Object.keys(loadResolvedNpcs() || {}));
        const initialActive = {
            npc: randomNpcId,
            ailment: npcs[randomNpcId]?.ailment,
            ingredients: [],
            potion: "",
        };
        dispatch(loadAllActive(initialActive));
    };

    return (
        <div className="Congrats">
            <h2>Congrats!!</h2>
            <p>Everyone is happy now.</p>
            <Button className="reset" text="Restart game" onClick={restartGame} />
        </div>
    )
}

export default Congrats;