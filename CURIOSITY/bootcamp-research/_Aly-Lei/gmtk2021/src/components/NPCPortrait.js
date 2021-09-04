import React from "react";
import images from "../images/images";

const NPCPortrait = ({ id, mode }) => {
  const resolveMood = () => {
    switch (mode) {
      case "standard":
        return id;
      case "happy":
        return `${id}_happy`;
      default:
        return;
    }
  };

  return <img src={images[resolveMood()]} alt={id} />;
};

export default NPCPortrait;
