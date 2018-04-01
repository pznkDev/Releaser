import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBugs } from '../../actions/bugs';
import { Header, Table } from 'semantic-ui-react'
import styles from './css/bugs.css';


class Bugs extends Component {

    constructor(props) {
        super(props);

        this.state = {currentPage: 0};

        this.handlePageClick = this.handlePageClick.bind(this);
        this.fetchBugsPaginated = this.fetchBugsPaginated.bind(this);
    }

    componentWillMount() {
        this.props.getBugs();
    }

    renderBugs() {
        return this.props.bugs.map((bug, key) => {
            return (
                <Table.Row key={key}>
                    <Table.Cell>{bug.name}</Table.Cell>
                    <Table.Cell>{bug.team_name}</Table.Cell>
                    <Table.Cell>{bug.priority}</Table.Cell>
                    <Table.Cell>{bug.description}</Table.Cell>
                    <Table.Cell>{bug.time_created}</Table.Cell>
                    <Table.Cell>{bug.time_closed}</Table.Cell>
                </Table.Row>
            )
        });
    }

    renderBugsTable() {
        if (this.props.bugs.length === 0) {
            return (
                <div>
                    <h2>Bugs history is empty</h2>
                </div>
            )
        }

        return (
            <Table fixed inverted size='large'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell><Header as='h3' inverted>Name</Header></Table.HeaderCell>
                        <Table.HeaderCell><Header as='h3' inverted>Team</Header></Table.HeaderCell>
                        <Table.HeaderCell><Header as='h3' inverted>Priority</Header></Table.HeaderCell>
                        <Table.HeaderCell><Header as='h3' inverted>Description</Header></Table.HeaderCell>
                        <Table.HeaderCell><Header as='h3' inverted>Time created</Header></Table.HeaderCell>
                        <Table.HeaderCell><Header as='h3' inverted>Time closed</Header></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {this.renderBugs()}
                </Table.Body>
            </Table>

        )
    }

    fetchBugsPaginated() {
        this.props.getBugs(this.state.currentPage)
    }

    handlePageClick(event) {
        let page = event.currentTarget.dataset.id;
        this.setState({...this.state,
                       currentPage: page - 1},
                       this.fetchBugsPaginated
        );
    }

    renderPagesList() {
        let pageList = new Array(this.props.pages).fill(null).map((u, i) => i + 1);
        return pageList.map((page, key) => {
            return (
                <a className={this.state.currentPage+1 === page ? 'active item' : 'item'}
                   key={ key }
                   onClick={this.handlePageClick}
                   data-id={ page }>
                    { page }
                </a>
            )
        });
    }

    renderPages() {
        if (this.props.pages > 0) {
            return (
                <div className="ui pagination menu">
                    {this.renderPagesList()}
                </div>
            )
        }
        return (<div></div>)
    }

    render() {
        return (
            <div className={styles.container_full}>
                <h2 className={styles.block_name}>Bugs History</h2>
                <div className={styles.container}>
                    <div className={styles.table}>
                        {this.renderBugsTable()}
                    </div>
                    <div className={styles.pagination}>
                        {this.renderPages()}
                    </div>
                </div>
            </div>
        )
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
