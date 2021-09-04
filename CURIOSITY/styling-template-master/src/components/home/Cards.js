import React, { Component } from "react";
import Card from "./Card";
import styled from "styled-components";
import Title from "../globals/Title";
import Section from "../globals/Section";
import cards from "./cards-data";
import { setColor, media, setRem } from "../../styles";

export default class Cards extends Component {
  state = {
    cards: cards
  };
  render() {
    return (
      <Section color={setColor.lightGrey}>
        <Title title="our cards" center />
        <CardsCenter>
          {this.state.cards.map(card => {
            return <Card key={card.id} card={card} />;
          })}
        </CardsCenter>
      </Section>
    );
  }
}

const CardsCenter = styled.div`
  width: 90vw;
  margin: 0 auto;
  ${media.tablet`
  display:grid;
  grid-template-columns:1fr 1fr;
  grid-column-gap:${setRem(32)};
  `};
  ${media.desktop`
  width:100vw;
  max-width:1170px;
  `};
  ${media.large`
    grid-template-columns:repeat(3,1fr);
  `};
`;
