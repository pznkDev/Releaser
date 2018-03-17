import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react'
import styles from './css/header.css';


class Header extends Component {

    constructor(props) {
        super(props);

        this.handleItemClick = this.handleItemClick.bind(this);
        this.state = {
            activeItem: 'Timer'
        }
    }

    handleItemClick(_, { name }) {
        this.setState({ activeItem: name });
    }

    render() {
        const { activeItem } = this.state;

        return (
            <div className={styles.nav_header}>
                <Segment inverted>
                    <Menu inverted pointing secondary>
                        <Link to="/">
                            <Menu.Item name='Timer'
                                       active={activeItem === 'Timer'}
                                       onClick={this.handleItemClick} />
                        </Link>
                        <Link to="/bugs">
                            <Menu.Item name='Bugs'
                                       active={activeItem === 'Bugs'}
                                       onClick={this.handleItemClick}/>
                        </Link>
                        <Link to="/statistics">
                            <Menu.Item name='Statistic'
                                       active={activeItem === 'Statistic'}
                                       onClick={this.handleItemClick} />
                        </Link>
                    </Menu>
                </Segment>
            </div>
        )
    }
}

export default Header
