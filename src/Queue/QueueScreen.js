import React, {useEffect, useCallback, useState} from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchQueueData } from "../mockApi";
import md5 from 'md5';
import { setCustomers } from "./actions/customerActions";
import Name from "./components/Name";
import Time from "./components/Time";
import Content from "./components/Content";
import CustomerCard from "./components/CustomerCard";
import ProfilePicture from "./components/ProfilePicture";
import { SET_CUSTOMERS } from "./actions/actionTypes";
import Filter from "./components/Filter";
import Heading from "./components/Heading";

const defaultPerson = '/images/defaultPerson.jpeg';

const QueueScreen = ({ customers }) => {
    const [filterValue, setFilterValue] = useState('');
    const dispatch = useDispatch();

    const fetchGravatarImages = useCallback(async (customers) => {
        if (!customers || !Array.isArray(customers)) {
            return;
        }

        // Create an array to hold the updated customers
        const updatedCustomers = [];

        // Use Promise.all to wait for all image fetches to complete
        await Promise.all(customers.map(async (customer) => {
            const { emailAddress } = customer.customer;

            // Check if emailAddress is not null and not undefined
            if (emailAddress && typeof emailAddress === 'string' && emailAddress.trim() !== '') {
                const gravatarUrl = `https://www.gravatar.com/avatar/${md5(emailAddress)}?d=identicon`;
                try {
                    const response = await fetch(gravatarUrl);
                    if (!response.ok) {
                        console.error('Error fetching Gravatar image. HTTP status:', response.status);
                        // Assign the default image URL to customers without images
                        updatedCustomers.push({ ...customer, gravatarUrl: defaultPerson });
                    } else {
                        const blob = await response.blob();
                        const imageUrl = URL.createObjectURL(blob);
                        // Add the updated customer to the array
                        updatedCustomers.push({ ...customer, gravatarUrl: imageUrl });
                    }
                } catch (error) {
                    console.error("Error fetching Gravatar image:", error);
                }
            } else {
                // Assign the default image URL to customers without valid email addresses
                updatedCustomers.push({ ...customer, gravatarUrl: defaultPerson });
            }
        }));

        // Dispatch the action with the updated customers
        dispatch({
            type: SET_CUSTOMERS,
            payload: updatedCustomers,
        });
    }, [dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchQueueData();
                if (!response) {
                    console.error('Error fetching data: Response is undefined');
                    return;
                }
                const json = await response.json();
                if (!json) {
                    console.error('Error fetching data: JSON is undefined');
                    return;
                }
                const fetchedCustomers = json.queueData.queue.customersToday;
                dispatch(setCustomers(fetchedCustomers));
                await fetchGravatarImages(fetchedCustomers);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData()
    }, [dispatch, fetchGravatarImages]);

    const handleFilterChange = (value) => {
        setFilterValue(value);
    };

    const filteredCustomers = customers && Array.isArray(customers)
        ? customers.filter((customer) =>
            customer.customer.name.toLowerCase().includes(filterValue.toLowerCase())
        )
        : [];

    return (
        <Content>
            <Heading level={1}>Customer queue</Heading>
            <Filter filterValue={filterValue} onFilterChange={handleFilterChange} />
            {filteredCustomers.map((customer) =>
            (
                <CustomerCard key={customer.customer.id}>
                    <Name>{customer.customer.name}</Name>
                    <ProfilePicture imageUrl={customer.gravatarUrl ? customer.gravatarUrl : defaultPerson } alt={customer.customer.name}/>
                    <Time dateTime={customer.expectedTime} />
                </CustomerCard>
            ))}
        </Content>
    );
};

const mapStateToProps = (state) => ({
    customers: state.queue.customers,
});

export default connect(mapStateToProps, { setCustomers })(QueueScreen);
