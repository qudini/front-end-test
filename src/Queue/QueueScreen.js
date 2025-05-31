import React, { useEffect, useState } from 'react';
import { fetchQueueData } from "../mockApi";
import Customer from './components/Customer';
import InputField from './components/InputField';
import Loading from '../components/Loading';

const Component = () => {
    const [customers, setCustomers] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [allCustomers, setAllCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [noData, setNoData] = useState(false);
    const fetchData = () => {
        fetchQueueData()
            .then(response => response.json())
            .then(json => {
                setCustomers(json.queueData.queue.customersToday);
                setAllCustomers(json.queueData.queue.customersToday);
            });
    };
    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 30000);
        console.log("checked")
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (userInput.length > 3) {
            setIsLoading(true)
            const filtered = allCustomers.filter(customer =>
                customer.customer.name.toLowerCase().includes(userInput.toLowerCase())
            );
            setIsLoading(false)
            setCustomers(filtered);
            setNoData(filtered.length === 0);
        } else {
            setCustomers(allCustomers);
            setNoData(false);
        }
    }, [userInput, allCustomers, customers.length]);


    return (
        <div>
            <InputField type="text" label="Search By Name" setUserInput={setUserInput} />
            {isLoading ? <Loading /> : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: ' 30px' }}>
                    {customers.map(customer => (
                        <div key={customer.id} style={{ flexGrow: '4' }}>
                            <Customer customer={customer} />
                        </div>
                    ))}
                </div>
            )}
            {noData && <h2>NO RECORD FOUND! </h2>}
        </div>
    )

}
export default Component;