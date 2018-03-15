import React, {Component} from 'react';
import { Link } from "react-router-dom";

class Header extends Component {

    render() {
        return (
            <ul>
                <li>
                    <Link to="/">Main</Link>
                </li>
                <li>
                    <Link to="/bugs">Bugs</Link>
                </li>
                <li>
                    <Link to="/statistics">Statistics</Link>
                </li>
            </ul>
        )
    }
}

export default Header
