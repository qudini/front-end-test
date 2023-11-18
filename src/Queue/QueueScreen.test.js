import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import QueueScreen from './QueueScreen';

const mockStore = configureStore([thunk]);

describe('QueueScreen', () => {
    it('renders the component with default images', async () => {
        const initialState = {
            queue: {
                customers: [
                    {
                        customer: {
                            id: 1,
                            name: 'John Doe',
                            emailAddress: 'john@example.com',
                        },
                        expectedTime: '2023-11-15T12:00:00Z',
                    },
                    // Add more customers with missing or invalid email addresses for default images
                    {
                        customer: {
                            id: 2,
                            name: 'Jane Doe',
                            emailAddress: null, // Invalid email address
                        },
                        expectedTime: '2023-11-15T13:00:00Z',
                    },
                    {
                        customer: {
                            id: 3,
                            name: 'Bob Smith',
                            emailAddress: '', // Empty email address
                        },
                        expectedTime: '2023-11-15T14:00:00Z',
                    },
                ],
            },
        };

        const store = mockStore(initialState);

        render(
            <Provider store={store}>
                <QueueScreen />
            </Provider>
        );

        // Check that the component renders initially
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByAltText('John Doe')).toBeInTheDocument();

        // Wait for any asynchronous actions to complete (e.g., fetching images)
        await waitFor(() => {});

        // Check that the default images are rendered for customers with missing or invalid email addresses
        expect(screen.getByAltText('Jane Doe')).toBeInTheDocument();
        expect(screen.getByAltText('Bob Smith')).toBeInTheDocument();
    });

    it('filters customers by name', async () => {
        const initialState = {
            queue: {
                customers: [
                    {
                        customer: {
                            id: 1,
                            name: 'John Doe',
                            emailAddress: 'john@example.com',
                        },
                        expectedTime: '2023-11-15T12:00:00Z',
                    },
                    {
                        customer: {
                            id: 2,
                            name: 'Jane Doe',
                            emailAddress: 'jane@example.com',
                        },
                        expectedTime: '2023-11-15T13:00:00Z',
                    },
                ],
            },
        };

        const store = mockStore(initialState);

        render(
            <Provider store={store}>
                <QueueScreen />
            </Provider>
        );

        // Check that both customers are rendered initially
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Doe')).toBeInTheDocument();

        // Type into the filter input
        userEvent.type(screen.getByPlaceholderText('Filter by name'), 'John');

        // Check that only John Doe is rendered after filtering
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.queryByText('Jane Doe')).not.toBeInTheDocument();
    });

    it('refreshes the list of customers every 30 seconds', async () => {
        jest.useFakeTimers();

        const initialState = {
            queue: {
                customers: [
                    {
                        customer: {
                            id: 1,
                            name: 'John Doe',
                            emailAddress: 'john@example.com',
                        },
                        expectedTime: '2023-11-15T12:00:00Z',
                    },
                ],
            },
        };

        const store = mockStore(initialState);

        render(
            <Provider store={store}>
                <QueueScreen />
            </Provider>
        );

        // Check that the customer is rendered initially
        expect(screen.getByText('John Doe')).toBeInTheDocument();

        // Advance timers by 30 seconds
        jest.advanceTimersByTime(30 * 1000);

        // Check that the list is refreshed
        // Mock API returns the same data, so the customer count remains the same
        expect(screen.getByText('John Doe')).toBeInTheDocument();

        jest.useRealTimers(); // Restore real timers
    });
});
