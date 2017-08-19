import { createStore, applyMiddleware, compose } from 'redux';
import todoReducer from './reducer/todoReducer';
import thunk from 'redux-thunk';

const store = createStore(
    todoReducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;
