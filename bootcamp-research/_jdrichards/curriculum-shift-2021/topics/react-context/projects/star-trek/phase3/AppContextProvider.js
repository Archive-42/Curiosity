import React, { useState, useCallback, useEffect } from "react";

import {
    initialCards,
    initialDecks,
    initialInventory
} from "./mockdata/CardData";

export const AppContext = React.createContext({});

const AppContextProvider = ({children}) => {
  const cards = initialCards;
  const [applicationState, updateApplicationState] = useState({
    decks: initialDecks,
    inventory: initialInventory,
  });

  const buyCardForPlayer = useCallback(
    (cardId) => {
      console.log('BUY CARD FOR PLAYER!', cardId)
      if (applicationState.inventory[cardId] === 0) {
          return;
      }

      // Make copy of the inventory
      // (to NOT update existing data which could cause unintentional rerenders)
      const newInventory = { ...applicationState.inventory };

      // Remove card from inventory
      newInventory[cardId]--;

      // Update inventory in a new instance of the application state object
        updateApplicationState({
            decks: applicationState.decks,
            inventory: newInventory,
        });
    },
    [applicationState]
  );

  // Useful for debugging deck updates
  useEffect(() => {
    console.log("DECKS UPDATED", applicationState.decks)
  }, [applicationState.decks]);

  // Useful for debugging inventory updates
  useEffect(() => {
    console.log("INVENTORY UPDATED", applicationState.inventory)
  }, [applicationState.inventory]);

  return (
    <AppContext.Provider value={{
      ...applicationState,
      cards: cards,
      buyCard: buyCardForPlayer,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
