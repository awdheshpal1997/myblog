import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootreducer from './Reducer'

const intialState = {};

const middleware = [thunk];

const store = createStore(
    rootreducer,
    intialState,
    composeWithDevTools(applyMiddleware(...middleware))
);   
export default store