import React from 'react';
import {Grid,Row, Col, Table, Glyphicon , Button, OverlayTrigger,Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import './Pages.css';
import SideNavBar from '../components/SideNavBar.js';

const tooltip = (
    <Tooltip id="tooltip">Add User</Tooltip>
);

class UserList extends React.Component{
    render(){
        return(
            <div>
                <SideNavBar/>
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
                                            <th>
                                                {this.props.tableHeader.delete}
                                            </th>
                                        </tr>
                                    </thead>
                                </Table>
                            </Col>
                        </Row>
                    </div>

                </Grid>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    userList: state.app.employees,
    tableHeader : state.app.userTaleHeaders
})

export default withRouter(connect(
    mapStateToProps
)(UserList));