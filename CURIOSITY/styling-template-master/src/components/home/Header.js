import React from "react";
import Hero from "../globals/Hero";
import orange from "../../images/orange.jpeg";
import Banner from "../globals/Banner";
import { PrimaryBtn } from "../globals/Buttons";
const Header = () => {
  return (
    <Hero img={orange}>
      <Banner
        greeting="Header part 1"
        title="Header part 2"
        text="Text about my header, if I had some"
      >
        <PrimaryBtn t="1rem">Button</PrimaryBtn>
        {/* <PrimaryBtn as="a" href="https://www.google.com">
          view details
        </PrimaryBtn> */}
      </Banner>
    </Hero>
  );
};

export default Header;
