import React, {useEffect} from 'react';
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

const defaultPerson = '/images/defaultPerson.jpeg';

const QueueScreen = ({ customers }) => {
    const dispatch = useDispatch();
    // const [loadingStatus, setLoadingStatus] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchQueueData();
                const json = await response.json();
                const fetchedCustomers = json.queueData.queue.customersToday;
                console.log('fetchedCustomers', fetchedCustomers)
                dispatch(setCustomers(fetchedCustomers));
                await fetchGravatarImages(fetchedCustomers);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData()
            // .then((fetchedCustomers) => {
            //     // Continue with other logic or fetchGravatarImages
            //     return fetchGravatarImages(fetchedCustomers);
            // }
    }, [dispatch, fetchGravatarImages]);

    const fetchGravatarImages = async (customers) => {
        if (!customers || !Array.isArray(customers)) {
            console.error("Invalid 'customers' array:", customers);
            return;
        }

        // Create an array to hold the updated customers
        const updatedCustomers = [];

        // Use Promise.all to wait for all image fetches to complete
        await Promise.all(customers.map(async (customer) => {
            console.log('customer', customer);
            const { emailAddress } = customer.customer;

            // Check if emailAddress is not null and not undefined
            if (emailAddress && typeof emailAddress === 'string' && emailAddress.trim() !== '') {
                const gravatarUrl = `https://www.gravatar.com/avatar/${md5(emailAddress)}?d=identicon`;
                console.log('gravatarUrl', gravatarUrl);

                try {
                    const response = await fetch(gravatarUrl);
                    if (!response.ok) {
                        console.error('Error fetching Gravatar image. HTTP status:', response.status);
                        // Assign the default image URL to customers without images
                        updatedCustomers.push({ ...customer, gravatarUrl: defaultPerson });
                    } else {
                        const blob = await response.blob();
                        const imageUrl = URL.createObjectURL(blob);

                        console.log('Gravatar image fetched successfully. Image URL:', imageUrl);

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
    };

    return (
        <Content>
            {customers.map((customer) => (
                <CustomerCard key={customer.customer.id}>
                    <ProfilePicture imageUrl={customer.gravatarUrl ? customer.gravatarUrl: defaultPerson }></ProfilePicture>
                    <Name>{customer.customer.name}</Name>
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
