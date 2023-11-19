import React from "react";
import styled from 'styled-components';

const StyledProfilePicture = styled.img`
  height: 290px;
  width: 290px;
  background-color: grey;
  border-top-left-radius: 0.2em;
  border-top-right-radius: 0.2em;
`;

const ProfilePicture = ({ imageUrl, alt }) => {
    return <StyledProfilePicture src={imageUrl} alt={alt} />;
};

export default ProfilePicture;
