import styled from 'styled-components';

const LogoImage = styled.img`
    width: 100px;
`;

const Logo = ({ alt, ...props }) => {
    return <LogoImage alt={alt} {...props} />;
};

export default Logo;
