import React, {Component} from 'react';
import Header from '../header/header'

import routes from '../../config/routes'


class Main extends Component {

    render() {
        return (
            <div>
                <Header />
                { routes }
            </div>
        )
    }
}

export default Main;
