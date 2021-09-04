import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NPCPortrait from "./NPCPortrait";
import NPCDialogue from "./NPCDialogue";
import Line from "./svgs/Line";
import {clearAllActive, clearIngredients, clearPotion, incrementCount, updateNpc} from "../store/reducers/activeReducer";
import {getRandomNpc} from "../utility/utility";
import {updateSaveLog} from "../store/actions/potionsActions";
import {loadResolvedNpcs} from "../store/reducers/saveReducer";

const NPC = () => {
  const dispatch = useDispatch();
  const { npcs, ailments } = useSelector((state) => state);
  const activePotion = useSelector((state) => state.active.potion);
  const npcId = useSelector((state) => state.active.npc);
  const [npc, setNpc] = useState(npcs[npcId]);
  const [isMatchingPotion, setIsMatchingPotion] = useState(false);
  const [dialogue, setDialogue] = useState("");
  const [reaction, setReaction] = useState("standard");

  useEffect(() => {
    if (activePotion && activePotion === ailments[npc.ailment].cure) {
      setIsMatchingPotion(true);
    }
  }, [activePotion, npc, ailments, npcId]);

  useEffect(() => {
    if (!activePotion) {
      setDialogue(npc?.intro);

    } else {

      if (isMatchingPotion) {
        setDialogue(npc.success)
        setReaction("happy")
        dispatch(incrementCount('requestsFulfilled'))
      dispatch(incrementCount('potionsBrewed'))
    } else {
        setDialogue(npc.failure)
        setReaction("standard")
      dispatch(incrementCount('potionsBrewed'))
    }
    }
  }, [npc, isMatchingPotion, activePotion, npcId]);

  useEffect(() => {
    if (activePotion && activePotion !== 'smelly-potion') {
      dispatch(updateSaveLog({npc: npcs[npc?.id]}));
    }
  }, [activePotion])

  useEffect(() => {
    const girl = npcs[npcId];
    setNpc(girl);
    setReaction("standard");
  }, [npcId, npcs]);

  if (!npc) return null;

  const updateDialogue = () => {
    if (isMatchingPotion) {
      dispatch(clearAllActive())
      dispatch(updateNpc(getRandomNpc(npcs, Object.keys(loadResolvedNpcs() || {}))))
      setIsMatchingPotion(false)
    } else {
      dispatch(clearIngredients());
      dispatch(clearPotion());
      setDialogue(npc?.intro)
    }
  }

  return (
    <div className="Npc">
      <Line />
      <div className="imageContainer">
        <NPCPortrait id={npc.id} mode={reaction} />
        <NPCDialogue body={dialogue} name={npc.name} updateDialogue={updateDialogue} />
      </div>
      <Line />
    </div>
  );
};

export default NPC;
