import React from 'react';
import styled from 'styled-components';

const StyledTime = styled.h1`
  font-size: 16px;
  color: darkslategrey;
`;

const Time = ({ dateTime }) => {
    const formattedTime = formatDateTime(dateTime); // Add a function to format the date
    return <StyledTime>{formattedTime}</StyledTime>;
};

// Function to format the date
const formatDateTime = (dateTime) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    return new Date(dateTime).toLocaleString('en-US', options);
};

export default Time;
