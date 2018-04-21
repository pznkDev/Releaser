import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getRelease} from '../../actions/release';
import {Header} from "semantic-ui-react";


class TagBlock extends Component {

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.getRelease();
    }

    render() {
        if (this.props.release.tag) {
            return (
                <div>
                    <Header as='h1' inverted>
                        <p>Current tag: {this.props.release.tag}</p>
                    </Header>
                    <Header as='h4' inverted color='grey'>
                        <p>Next tag: 18.17.1</p>
                    </Header>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.release.isFetching,
        release: state.release.release,
        errorMessage: state.release.errorMessage
    }
}

export default connect(mapStateToProps, {getRelease})(TagBlock);
