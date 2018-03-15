import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore} from 'redux';
import {BrowserRouter as Router} from "react-router-dom";

import reducers from './reducers';
import routes from './config/routes';

const store = createStore(reducers);


ReactDOM.render(
    <Provider store={store}>
        <Router>
            {routes}
        </Router>
    </Provider>,
    document.getElementById('root')
);
