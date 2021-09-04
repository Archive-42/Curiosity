import React from 'react';
import { NavLink } from 'react-router-dom';
import { useFavFruit } from '../context/FavFruitContext.js';

const FavoriteFruit = ({ fruits }) => {
  const { favFruitId } = useFavFruit();
  const fruit = fruits.find(fruit => fruit.id === favFruitId);

  return (
    <div className="fav-fruit">
      <h2>Favorite Fruit</h2>
      <NavLink to={`/fruits/${favFruitId}`}>{fruit.name}</NavLink>
    </div>
  );
}

export default FavoriteFruit;
