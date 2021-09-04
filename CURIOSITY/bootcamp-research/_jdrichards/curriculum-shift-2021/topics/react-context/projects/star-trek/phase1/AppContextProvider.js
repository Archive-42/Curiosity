import React from "react";

import { initialCards } from "./mockdata/CardData";

export const AppContext = React.createContext({});

const AppContextProvider = ({children}) => {
  return (
    <AppContext.Provider value={{
      cards: initialCards
    }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
