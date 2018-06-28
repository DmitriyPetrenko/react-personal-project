import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import scheduler from '../reducers/index';

const store = createStore(
    scheduler,
    applyMiddleware(thunk)
);

export default store;
