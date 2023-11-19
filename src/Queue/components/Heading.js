// components/Heading.js
import React from 'react';
import styled from 'styled-components';

const StyledHeading = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  color: darkslategrey;
  h1 {
    font-size: 2em;
  }

  h2 {
    font-size: 1.5em;
  }

  h3 {
    font-size: 1.2em;
  }
`;

const Heading = ({ level = 1, children }) => {
    const HeadingElement = `h${level}`;
    return <StyledHeading as={HeadingElement}>{children}</StyledHeading>;
};

export default Heading;
