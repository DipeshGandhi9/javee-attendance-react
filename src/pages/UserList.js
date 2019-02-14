import React from 'react';
import { Grid, Row, Col, Table, Glyphicon, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import './Pages.css';
import SideNavBar from '../components/SideNavBar.js';
import { loadUserInfo, deleteUserInfo } from '../actions/userActions';

const tooltip = (
    <Tooltip id="tooltip">Add User</Tooltip>
);

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            id: ""
        }
    }
    componentDidMount() {
        this.props.loadUserInfo();
    }

    onhandleHide = () => {
        this.setState({ show: false });
    }

    render() {
        let hasUsers = (this.props.userList.length !== 0) ? true : false;
        return (
            <div>
                <SideNavBar />
                <Grid>
                    <Row>
                        <Col lg={12}>
                            <div>
                                <Link to="user">
                                    <OverlayTrigger placement="left" overlay={tooltip}>
                                        <Button className="pull-right">
                                            <Glyphicon glyph="plus"></Glyphicon>
                                        </Button>
                                    </OverlayTrigger>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                    <div className="mt-30">
                        <Row>
                            <Col lg={12} >
                                <Table responsive bordered condensed>
                                    <thead>
                                        <tr>
                                            <th>
                                                {this.props.tableHeader.id}
                                            </th>
                                            <th>
                                                {this.props.tableHeader.employeeName}
                                            </th>
                                            <th>
                                                {this.props.tableHeader.userName}
                                            </th>
                                            <th>
                                                {this.props.tableHeader.role}
                                            </th>
                                            <th>
                                                {this.props.tableHeader.department}
                                            </th>
                                            <th>
                                                {this.props.tableHeader.edit}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.userList.map((user, id) => {
                                            return (
                                                <tr key={user.id}>
                                                    <td>{user.id}</td>
                                                    <td>{user.employee ? user.employee.firstName + " " + user.employee.lastName : ""}</td>
                                                    <td>{user.userName}</td>
                                                    <td>{user.role}</td>
                                                    <td></td>
                                                    <td>{user.role === "ADMIN" ? "" : <Link to={{ pathname: "/user", search: "id=" + user.id }} className="icon-button"><Glyphicon glyph="edit" /></Link>}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        {hasUsers ? "" : <h4 align="center" style={{ color: 'grey' }}> No Users are available to display. Please add new user</h4>}
                    </div>
                </Grid>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    userList: state.app.userList,
    tableHeader: state.app.userTaleHeaders
})

export default withRouter(connect(
    mapStateToProps,
    dispatch => bindActionCreators({
        loadUserInfo, deleteUserInfo
    }, dispatch),
)(UserList));
