import React, {useCallback, useEffect, useState} from "react";
import { initialCards, initialDecks, initialInventory } from "./mockdata/CardData";

export const AppContext = React.createContext({});

const AppContextProvider = ({children}) => {
    const [applicationState, updateApplicationState] = useState({
        cards: initialCards,
        decks: initialDecks,
        inventory: initialInventory,
    });

    const buyCardForPlayer = useCallback(
        (cardId) => {
            if (applicationState.inventory[cardId] === 0) {
                return;
            }

            const playerDeck = applicationState.decks[0];
            const cardToAdd = applicationState.cards.find(
                (card) => card.id === cardId
            );
            applicationState.inventory[cardId]--;

            updateApplicationState({
                ...applicationState,
                decks: [
                    { ...playerDeck, cards: [...playerDeck.cards, cardToAdd] },
                    ...applicationState.decks.slice(1),
                ],
            });
        },
        [applicationState]
    );

    // Useful for debugging
    useEffect(() => {
        console.log("DECKS UPDATED", applicationState.decks)
    }, [applicationState.decks]);

    return (
        <AppContext.Provider
            value={{ ...applicationState, buyCard: buyCardForPlayer }}
        >
            {children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;
