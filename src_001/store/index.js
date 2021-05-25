import { createStore,applyMiddleware } from 'redux';
import incrementReducer from '../reducers/index';
import thunk from 'redux-thunk'

const store = createStore(incrementReducer,applyMiddleware(thunk));

export default store;