import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './state';
import App from './index';

describe('App', () => {
    it('renders the App component', () => {
        const { getByText, getByAltText } = render(
            <Provider store={store}>
                <App />
            </Provider>
        );
        expect(getByText(/Customer Queue/i)).toBeInTheDocument();
        expect(getByAltText(/Qudini logo/i)).toBeInTheDocument();
        expect(getByAltText(/Qudini Logo/i)).toHaveAttribute('src', 'qudini-logo.png');
    });
});
