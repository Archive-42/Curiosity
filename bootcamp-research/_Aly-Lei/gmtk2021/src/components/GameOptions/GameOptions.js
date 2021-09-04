import React from "react";
import RecipeBookButton from './RecipeBookButton';
import BackToMenuButton from './BackToMenuButton';

const GameOptions = () => {

  return (
    <aside className="GameOptions">
      <BackToMenuButton />
      <RecipeBookButton />
    </aside>
  );
};

export default GameOptions;
