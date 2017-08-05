import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import Main from './reduxPractice/Main';

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/:filter" component={Main} />
        </Switch>
    </Router>,
    document.getElementById('root')
);
