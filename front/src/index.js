import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore, compose, applyMiddleware} from 'redux';
import {BrowserRouter as Router} from "react-router-dom";
import thunk from 'redux-thunk';

import reducers from './reducers';
import Header from "./components/header/header";
import routes from "./config/routes";


const store = createStore(reducers, compose(applyMiddleware(thunk)));


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Header />
                { routes }
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);
