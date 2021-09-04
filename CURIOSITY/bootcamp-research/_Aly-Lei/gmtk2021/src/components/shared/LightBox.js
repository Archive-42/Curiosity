import React from "react";
import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";

const LightBox = ({ onExit, children }) => {
  return (
    <div className="lightBoxContainer--Outer">
      <div className="lightBoxContainer--Inner absoluteCenter">
        <Icon
          style={{ position: "absolute", right: "1rem", top: "1rem", zIndex: "6",  }}
          onClick={onExit}
          path={mdiClose}
          title="User Profile"
          size={2}
          horizontal
          vertical
          rotate={90}
          color="black"
        />
        {children}
      </div>
    </div>
  );
};

export default LightBox;
