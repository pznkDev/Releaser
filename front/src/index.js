import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {applyMiddleware, compose, createStore} from 'redux';
import {BrowserRouter as Router} from "react-router-dom";
import thunk from 'redux-thunk';

import styles from './css/index.css';
import reducers from './reducers';
import Header from "./components/header/header";
import routes from "./config/routes";


const store = createStore(reducers, compose(applyMiddleware(thunk)));


ReactDOM.render(
    <div className={styles.main_container}>
        <Provider store={store}>
            <Router>
                <div>
                    <Header/>
                    {routes}
                </div>
            </Router>
        </Provider>
    </div>,
    document.getElementById('root')
);
