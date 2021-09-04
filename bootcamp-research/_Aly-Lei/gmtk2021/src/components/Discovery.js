import React from "react";
import { useSelector } from "react-redux";

import LightBox from './shared/LightBox'
import Item from "./shared/Item";

const Discovery = ({open, setOpen}) => {
  const potion = useSelector((state) => state.potions[state.active?.potion]);

  const onContinue = () => {
    setOpen(false)
  }

  if (!open || !potion) return null;
  return (
    <LightBox onExit={onContinue}>
      <article className="discoveryContainer">
        <p>You've concocted a...</p>
        <button className="discoveryBox absoluteCenter">
          <Item
            id={potion.id}
            type="potion"
            name={potion.name}
            onClick={onContinue}
          />
        </button>
        <h3>{potion.name}!</h3>
      </article>
    </LightBox>
  )
};

export default Discovery;
