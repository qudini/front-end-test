import React from 'react';
import CustomerCard from './CustomerCard';
import ProfilePicture from './ProfilePicture';
import Name from './Name';
import Content from './Content';
import Time from "./Time";

export default () =>
    <CustomerCard>
        <ProfilePicture />
        <Content>
            <Name></Name>
            <Time></Time>
        </Content>
    </CustomerCard>;
