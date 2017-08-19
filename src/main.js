import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import { Provider } from 'react-redux';
import AppContainer from './components/AppContainer';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={AppContainer} />
                <Route path="/:filter" component={AppContainer} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);
