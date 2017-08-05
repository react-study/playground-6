import React from 'react';
import App from './components/App';
import { Provider } from 'react-redux';
import store from 'store';

const Main = () => (
    <Provider store = {store}>
    </Provider>
);

export default Main;

// components / App.js, AccountList.js, InputBox.js
// actions / bankAction.js
// reducers / bankReducer.js
// store.js