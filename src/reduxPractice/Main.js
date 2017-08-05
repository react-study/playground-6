import React from 'react';
import AppContainer from './components/AppContainer';
import { Provider } from 'react-redux';
import store from './store';

const Main = () => (
    <Provider store={store}>
        <AppContainer/>
    </Provider>
);

export default Main;
