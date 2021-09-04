import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import { useDispatch, useSelector } from "react-redux";

import { ingredients } from "../data/data";
import Item from "../components/shared/Item";
import { addIngredient } from "../store/reducers/activeReducer";
import wetDrop from "../music/wetDrop.mp3"

const Ingredients = () => {
  const dispatch = useDispatch()
  const selections = useSelector(state => state.active.ingredients)
  const activePotion = useSelector((state) => state.active?.potion);
  const [disabled, setDisabled] = useState(false)
  const [playWetDrop] = useSound(wetDrop);

  useEffect(() => {
    if (selections.length === 3) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [selections])

  const handleAddSelection = (e) => {
    if (selections.length !== 3) {
      dispatch(addIngredient(e.target.dataset.id));
      playWetDrop() // When selecting successfully
      if (selections.length === 2) {
        setDisabled(false)
      }
    }
  }

  return (
    <div className="shelfContainer">
      <h2>Pick Three:</h2>
      <div className={`ingredientsContainer ${activePotion ? 'disabled' : ''}`}>
        {ingredients.map((ingredient) => (
            <Item
              id={ingredient.id}
              onClick={handleAddSelection}
              type="ingredient"
              name={ingredient.name}
              disabled={disabled}
            />
        ))}
      </div>
    </div>
  );
};

export default Ingredients;
