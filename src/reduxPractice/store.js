import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import bankReducer from './reducers/bankReducer';
import tabReducer from './reducers/tabReducer';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const logger = createLogger({
    collapsed: true,
    diff: true,
    timestamp: true
});

const reducers = combineReducers({
    bank: bankReducer,
    tab: tabReducer
});

const others = compose(
    applyMiddleware(thunk, logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(reducers, others);
export default store;


// createStore([reducer or combineRedcer], [그외모든것들])