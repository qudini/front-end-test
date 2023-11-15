import React, { Component } from 'react';
import { fetchQueueData } from "../mockApi";
import md5 from 'md5'
// eslint-disable-next-line
import base64 from 'base-64';
import Name from "./components/Name";
import Time from "./components/Time";


export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: []
        };
    }

    componentDidMount() {
        fetchQueueData()
            .then(response => response.json())
            .then(json => {
                const customers = json.queueData.queue.customersToday;
                this.setState({ customers });
                this.fetchGravatarImages(customers);
                // console.log(JSON.stringify(response.json())); // Add this line to log the response
            })
    }
    fetchGravatarImages(customers) {
        // Use the Gravatar API to fetch images for each customer
        customers.forEach(customer => {
            const { emailAddress } = customer.customer;
            const gravatarUrl = `https://www.gravatar.com/avatar/${md5(emailAddress)}?d=identicon`;

            // Fetch the Gravatar image
            fetch(gravatarUrl)
                .then(response => response.blob())
                .then(blob => {
                    // Create a URL for the blob and update the customer's state
                    const imageUrl = URL.createObjectURL(blob);
                    this.setState(prevState => ({
                        customers: prevState.customers.map(cust => {
                            if (cust.customer.id === customer.customer.id) {
                                return { ...cust, gravatarUrl: imageUrl };
                            }
                            return cust;
                        })
                    }));
                })
                .catch(error => console.error("Error fetching Gravatar image:", error));
        });
    }

    render() {
        // const custs = this.state.customers.map((cust)=> {
        //     console.log(cust)
        //     <div>{custs}</div>
        // })

        const customers = this.state.customers.map(customer => {
            console.log(customer); // Add this line to log the customer data
            return (
                <div key={customer.customer.id}>
                    <img src={customer.gravatarUrl} alt="Gravatar" />
                    <Name>{customer.customer.name}</Name>
                    <Time>{customer.expectedTime}</Time>
                </div>
            );
        });

        return (
            <div>
                {customers}
            </div>
        );
    }
}
