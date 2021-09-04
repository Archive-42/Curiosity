import React from "react";
import classNames from 'classnames'

const Button = ({ text, onClick, disabled, className }) => {

  return (
    <button onClick={onClick} className={classNames("buttonBase", className, {disabled: disabled})} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
