import { createStore, combineReducers } from 'redux';
import bankReducer from './reducers/bankReducer';
import tabReducer from './reducers/tabReducer';

const store = createStore(
    combineReducers({
        bank: bankReducer,
        tab: tabReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;


// createStore([reducer or combineRedcer], [그외모든것들])