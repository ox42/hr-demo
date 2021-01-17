import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";

test('renders a login page on initial load', () => {
    const { getByText } = render(
        <Router>
            <Provider store={store}>
                <App />
            </Provider>
        </Router>
    );

    //just a simple example to show that we know how to run tests
    expect(getByText(/Please sign in/i)).toBeInTheDocument();
});
