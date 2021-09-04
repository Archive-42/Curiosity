import React, { useState } from "react";
import LightBox from "./shared/LightBox";
import { loadRecipeBook } from "../store/reducers/saveReducer";
import { potions } from "../data/data";
import { connect } from "react-redux";
import { get } from "lodash";
import images from "../images/images";
import Item from "../components/shared/Item";

const RecipeBook = ({ title, onClick, potionsById }) => {
  const data = loadRecipeBook();
  const unlocked = Object.keys(data);
  const [preview, setPreview] = useState({});
  console.log(loadRecipeBook());

  const showPreview = (e) => {
    const potionId = e.target.dataset.id;
    setPreview(data[potionId]);
  };

  return (
    <LightBox onExit={onClick}>
      <div className="recipeContainer">
        <div className="recipeContainer--list">
          <h1>{title}</h1>
          {potions.map((potion) => {
            const discovered = unlocked.includes(potion.id);
            return (
              <span>
                <Item
                  key={potion.id}
                  id={potion.id}
                  type="potion"
                  name={potion.name}
                  disabled={!discovered}
                  onClick={discovered ? showPreview : undefined}
                />
                {discovered ? potion.name : "Undiscovered"}
              </span>
            );
          })}
        </div>
        <div className="recipeContainer--preview">
          {preview && preview.name && (
            <>
              <img src={images[preview.id]} alt={preview.name} />
              <h2>{preview.name}</h2>
              <h3>Unlocked on {preview.date}</h3>
              <h4>Crafted {preview.count} times</h4>
            </>
          )}
        </div>
      </div>
    </LightBox>
  );
};

const mapStateToProps = (state) => {
  return {
    potionsById: get(state, "potions", {}),
  };
};

export default connect(mapStateToProps, {})(RecipeBook);
