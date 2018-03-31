import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore, compose, applyMiddleware} from 'redux';
import {BrowserRouter as Router} from "react-router-dom";
import Main from './components/main_page/main_page';
import thunk from 'redux-thunk';

import reducers from './reducers';


const store = createStore(reducers, compose(applyMiddleware(thunk)));


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Main />
        </Router>
    </Provider>,
    document.getElementById('root')
);
