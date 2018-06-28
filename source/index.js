// Core
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// Instruments
import './theme/init';

// App
import App from './containers/App';

//Store
import store from './store/index';

render(
    <Provider store = { store }>
        <App />
    </Provider>,
    document.getElementById('app')
);
