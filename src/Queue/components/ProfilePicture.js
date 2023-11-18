import React from "react";
import styled from 'styled-components';

const StyledProfilePicture = styled.div`
  height: 290px;
  width: 290px;
  background-color: grey;
  border-top-left-radius: 0.2em;
  border-top-right-radius: 0.2em;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
`;

const ProfilePicture = ({ imageUrl, alt }) => {
    return <StyledProfilePicture imageUrl={imageUrl} alt={alt} />;
};

export default ProfilePicture;
