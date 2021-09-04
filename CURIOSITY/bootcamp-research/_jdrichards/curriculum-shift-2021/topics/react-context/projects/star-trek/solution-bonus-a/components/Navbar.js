import React from "react";
import { NavLink } from "react-router-dom";

import { useAppContext} from "../AppContextProvider";

const Navbar = () => {
    const { decks } = useAppContext();

    return (
        <div className="navbar">
            <div className="navbar-menu">
                <NavLink
                    to={`/store`}
                    activeClassName="is-selected"
                    className="navbar-item"
                >
                    Shop
                </NavLink>
                {decks.map((deck, i) => {
                    return (
                        <NavLink
                            to={`/deck/${i}`}
                            className="navbar-item"
                            activeClassName="is-selected"
                            key={i}
                        >
                            {deck.name}
                        </NavLink>
                    );
                })}
            </div>
        </div>
    );
}

export default Navbar;
