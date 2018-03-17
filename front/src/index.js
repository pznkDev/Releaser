import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore} from 'redux';
import {BrowserRouter as Router} from "react-router-dom";
import Main from './components/main_page/main_page';

import reducers from './reducers';


const store = createStore(reducers);


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Main />
        </Router>
    </Provider>,
    document.getElementById('root')
);
