import React, { useState, useCallback } from "react";

import {
    initialCards,
    initialDecks,
    initialInventory
} from "./mockdata/CardData";

export const AppContext = React.createContext({});

const AppContextProvider = ({children}) => {
  const [applicationState, updateApplicationState] = useState({
    decks: initialDecks,
    inventory: initialInventory,
  });

  const buyCardForPlayer = useCallback(
    (cardId) => {
      console.log('BUY CARD FOR PLAYER!', cardId);
      updateApplicationState(applicationState);
    },
    [applicationState]
  );

  return (
    <AppContext.Provider value={{
      ...applicationState,
      cards: initialCards,
      buyCard: buyCardForPlayer,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
