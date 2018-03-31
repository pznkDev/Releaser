import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBugs } from '../../actions/bugs';
import { Header, Table} from 'semantic-ui-react'
import styles from './css/bugs.css';


class Bugs extends Component {

    constructor(props) {
        super(props);

        this.state = {currentPage: 0};
    }

    componentWillMount() {
        this.props.getBugs();
    }

    fetchMessagesPaginated() {
        this.props.getBugs(this.state.currentPage)
    }

    renderBugs(){
        if (this.props.bugs.length === 0){
            return (
                <div>
                    There are no more bugs
                </div>
            )
        }

        return this.props.bugs.map((bug, key) =>{
            return (
                <Table.Row key={key}>
                    <Table.Cell>{bug.name}</Table.Cell>
                    <Table.Cell>{bug.team_id}</Table.Cell>
                    <Table.Cell>{bug.priority}</Table.Cell>
                    <Table.Cell>{bug.description}</Table.Cell>
                    <Table.Cell>{bug.time_created}</Table.Cell>
                </Table.Row>
            )
        });
    }

    render() {
        if (this.props.bugs) {
            return (
                <div className={styles.container_full}>
                    <h2 className={styles.block_name}>Bugs History</h2>
                    <div className={styles.container}>
                        <Table fixed inverted size='large'>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell><Header as='h2' inverted>Name</Header></Table.HeaderCell>
                                    <Table.HeaderCell><Header as='h2' inverted>Team</Header></Table.HeaderCell>
                                    <Table.HeaderCell><Header as='h2' inverted>Priority</Header></Table.HeaderCell>
                                    <Table.HeaderCell><Header as='h2' inverted>Description</Header></Table.HeaderCell>
                                    <Table.HeaderCell><Header as='h2' inverted>Time created</Header></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {this.renderBugs()}
                            </Table.Body>
                        </Table>
                    </div>
                </div>
            )
        }
        else {
            return(
                <div>
                    <h2>Bugs history is empty</h2>
                </div>
            )
        }

    }
}


function mapStateToProps(state) {
    return {
        isFetching: state.bugs.isFetching,
        bugs: state.bugs.bugs,
        errorMessage: state.bugs.errorMessage,
        pages: state.bugs.pages
    }
}

export default connect(mapStateToProps, {getBugs})(Bugs);
