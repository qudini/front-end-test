import PropTypes from 'prop-types';
import md5 from 'blueimp-md5';

import React, { useEffect, useState } from 'react';
import CustomerCard from './CustomerCard';
import ProfilePicture from './ProfilePicture';
import Name from './Name';
import Content from './Content';

export default function Customer({ customer }) {
    const [imagePath, setImagePath] = useState('')
    const handleExpectedTime = (expecteddate) => {
        const date = new Date(expecteddate);
        const time = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
        return time

    }
    useEffect(() => {
        const email = customer?.customer?.emailAddress?.trim().toLowerCase();
        if (email) {
            const hash = md5(email);
            setImagePath(`https://www.gravatar.com/avatar/${hash}?s=290&d=identicon`);
        }
    }, [customer]);

    return (
        <CustomerCard>
            <ProfilePicture src={imagePath} />
            <Content>
                <Name>{customer.customer.name}</Name>
                <p><strong>Expected Time:</strong> <span>{handleExpectedTime(customer.expectedTime)}</span></p>
            </Content>
        </CustomerCard>)

}


Customer.propTypes = {
    customer: PropTypes.object.isRequired
};
