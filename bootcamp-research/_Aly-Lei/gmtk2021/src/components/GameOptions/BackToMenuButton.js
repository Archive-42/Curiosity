import React from "react";
import { Link } from "react-router-dom";
// import Music from './Music'

export default function BackToMenuButton() {
  return (
    // the background image scaling is off, but will come back to it.
        <div className="optionButton">
          <Link to={"/"} className="link absoluteCenter">
            {"<"}
          </Link>
    </div>
  );
};

