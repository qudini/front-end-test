import styled from 'styled-components';

export default styled.div`
  height: 290px;
  width: 290px;
  background-color: grey;
  border-top-left-radius: 0.2em;
  border-top-right-radius: 0.2em;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
