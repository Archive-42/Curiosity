import React from "react";
import classNames from "classnames";
import useSound from "use-sound";

import images from "../../images/images";
import softClick from "../../music/softclick.mp3";

const Item = ({ id, type, name, onClick, disabled = false }) => {
  const [playSoft] = useSound(softClick);

  return (
    <div className="itemContainer ingredientContainer" key={id}>
      <img
        src={images[id]}
        alt={name}
        data-id={id}
        data-name={name}
        onClick={onClick}
        className={classNames("absoluteCenter", {
          disabled: disabled,
        })}
        // onMouseEnter={playSoft}
      />
      <div className={classNames("itemCard", { hidden: type === "potion" })}>
        <p>{name}</p>
      </div>
    </div>
  );
};

export default Item;
