import React from "react";
import { SmallBtn } from "../globals/Buttons";
import styled from "styled-components";
import {
  setRem,
  setLetterSpacing,
  setTransition,
  setColor,
  setShadow,
  setBorder
} from "../../styles";
import PropTypes from "prop-types";
const Card = ({ className, card }) => {
  const { img = "", title = "", info = "", otherInfo = "" } = card;
  return (
    <article className={className}>
      <div className="img-container">
        <img src={img} alt="single card" />
      </div>
      <div className="card-info">
        <h4>{title}</h4>
        <p>{info}</p>
        <p>{otherInfo}</p>
        <SmallBtn>Hello</SmallBtn>
      </div>
    </article>
  );
};

export default styled(Card)`
  background: ${setColor.mainWhite};
  margin: ${setRem(32)} 0;
  .img-container {
    background: ${setColor.mainBlack};
    position: relative;
    img {
      width: 100%;
      display: block;
      ${setTransition};
    }
    &:hover img {
      opacity: 0.5;
    }
    .other-info {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: ${setColor.mainWhite};
      ${setLetterSpacing(5)};
      font-size: ${setRem(22)};
      padding: ${setRem(10)} ${setRem(33)};
      ${setBorder({ color: setColor.mainWhite })};
      opacity: 0;
      ${setTransition()};
    }
    &:hover .other-info {
      opacity: 1;
    }
  }
  .card-info {
    padding: ${setRem()};
    h4 {
      text-transform: capitalize;
      ${setLetterSpacing()};
    }
    p {
      ${setLetterSpacing()};
    }
  }
  ${setShadow.light};
  ${setTransition()};
  &:hover {
    ${setShadow.dark};
  }
`;

Card.propTypes = {
  card: PropTypes.shape({
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    otherInfo: PropTypes.string.isRequired
  })
};
