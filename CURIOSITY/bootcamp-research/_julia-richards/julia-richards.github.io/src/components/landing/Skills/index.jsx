import React, { useContext } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { ThemeContext } from 'providers/ThemeProvider';
import { Container, Button } from 'components/common';
import dev from 'assets/illustrations/skills.svg';
import { Wrapper, SkillsWrapper, Details, Thumbnail } from './styles';

export const Skills = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Wrapper id="about">
      <SkillsWrapper as={Container}>
        {/* <Thumbnail>
          <img src={dev} alt="I’m Julia and I'm a Software Engineer!" />
        </Thumbnail> */}
        <Details theme={theme}>
          <h1>More about me</h1>
          <p>
          I'm a creative problem solver with a zeal to experiment with new ideas and technologies.
          I have experience working with Javascript, React, Redux, Python, Flask, PostgreSQL, HTML, and CSS.
          My previous experience in geospatial, environmental and avalanche sciences enables me to bring a scientific mindset to problems.
          When not coding, I can be found skiing, trail running, and drinking coffee.
          </p>
          <Button as={AnchorLink} href="#contact">
            Hire me
          </Button>
        </Details>
      </SkillsWrapper>
    </Wrapper>
  );
};
