import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getRelease} from '../../actions/release';


class TagBlock extends Component {

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.getRelease();
    }

    render() {
        return (
            <h2>
                {this.props.release.tag}
            </h2>
        )
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
