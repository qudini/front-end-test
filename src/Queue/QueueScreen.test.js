// QueueScreen.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer'
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { fetchQueueData } from '../mockApi';
import QueueScreen from './QueueScreen';

// Mocking the fetchQueueData function
jest.mock('../mockApi', () => ({
    fetchQueueData: jest.fn(),
}));

URL.createObjectURL = jest.fn();

describe('QueueScreen', () => {
    const initialState = {
        queue: {
            customers: [
                {
                    customer: {
                        id: 1,
                        name: 'John Doe',
                        emailAddress: 'john.doe@example.com',
                    },
                    gravatarUrl: 'mocked-url1',
                    expectedTime: '2023-11-20T12:00:00.000Z',
                },
                {
                    customer: {
                        id: 2,
                        name: 'Jane Doe',
                        emailAddress: 'jane.doe@example.com',
                    },
                    gravatarUrl: 'mocked-url2',
                    expectedTime: '2023-11-20T12:00:00.000Z',
                },

            ],
        },
    };
    const mockStore = configureStore();
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
        global.fetch = jest.fn();

        // Mocking a successful response
        fetch.mockResolvedValueOnce({
            ok: true,
            blob: () => Promise.resolve(new Blob()),
        });
    });

    it('renders the component with customer cards', async () => {
        fetchQueueData.mockResolvedValueOnce({
            status: 200,
            json: () => Promise.resolve({ queueData: { queue: { customersToday: [] } }, status: 'ok' }),
        });

        render(
            <Provider store={store}>
                <QueueScreen />
            </Provider>
        );
        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
        });
    });

    it('handles empty customers array', async () => {
        const initialStateWithEmptyArray = {
            queue: {
                customers: [],
            },
        };
        const storeWithEmptyArray = mockStore(initialStateWithEmptyArray);

        render(
            <Provider store={storeWithEmptyArray}>
                <QueueScreen />
            </Provider>
        );

        await waitFor(() => {
            expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
        });
    });
    it('handles when there is no customers array', async () => {
        const initialStateWithEmptyArray = {
            queue: {
                customers: null,
            },
        };
        const storeWithEmptyArray = mockStore(initialStateWithEmptyArray);

        render(
            <Provider store={storeWithEmptyArray}>
                <QueueScreen />
            </Provider>
        );

        await waitFor(() => {
            expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
        });
    });
    it('handles error when fetching Gravatar image', async () => {
        const mockCustomer = {
            customer: {
                id: 1,
                name: 'John Doe',
                emailAddress: 'john.doe@example.com',
            },
        };

        const initialState = {
            queue: {
                customers: [mockCustomer],
            },
        };
        const store = mockStore(initialState);

        // Mock a failed response
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 404,
            statusText: 'Not Found',
        });

        render(
            <Provider store={store}>
                <QueueScreen />
            </Provider>
        );

        await waitFor(() => {
            // Verify that the default image URL is used for the customer without images
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByAltText('John Doe')).toHaveAttribute('src', '/images/defaultPerson.jpeg');
        });
    });


    it('filters customers by name', async () => {
        fetchQueueData.mockResolvedValueOnce({
            status: 200,
            json: () => Promise.resolve({ queueData: { queue: { customersToday: initialState.queue.customers } }, status: 'ok' }),
        });

        render(
            <Provider store={store}>
                <QueueScreen />
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
        });

        await userEvent.type(screen.getByRole('textbox', {name: /filter/i}), 'John');

        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.queryByText('Jane Doe')).not.toBeInTheDocument();
        });

        await userEvent.clear(screen.getByRole('textbox', {name: /filter/i}));

        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('Jane Doe')).toBeInTheDocument();
        });
    });
    it('matches snapshot', () => {
        const tree = renderer.create(
            <Provider store={store}>
                <QueueScreen />
            </Provider>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
