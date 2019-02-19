import React, { Component } from 'react';
import { Grid, Row, Col, Panel, Table } from "react-bootstrap";
import Calendar from 'react-calendar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import Moment from 'moment';

import "./Pages.css";

import SideNavBar from '../components/SideNavBar.js';
import { loadDashBoard } from '../actions/dashBoardActions';

class DashBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dashBoardObject: {
                date: new Date()
            }
        };
    }

    componentDidMount = () => {
        this.props.loadDashBoard(this.state.dashBoardObject);
    }

    onChange = (d) => {
        const { dashBoardObject } = this.state;
        dashBoardObject["date"] = d;
        this.setState({ dashBoardObject });
        this.props.loadDashBoard(this.state.dashBoardObject);
    }

    render() {
        let attendanceList = [];
        if (this.props.dashBoard.attendances !== undefined) {

            attendanceList = this.props.dashBoard.attendances.map((user, id) => {
                return (
                    <tr key={id}>
                        <td>{id + 1}</td>
                        <td>{user.employee ? user.employee.firstName + " " + user.employee.lastName : ""}</td>
                        <td>{user.timeInDate ? Moment(user.timeInDate).format('h:mm:ss a') : ""}</td>
                        <td>{user.timeOutDate ? Moment(user.timeOutDate).format('h:mm:ss a') : ""}</td>
                    </tr>
                );
            })
        }

        return (
            <div>
                <SideNavBar />
                <Grid fluid>
                    <br></br>
                    <Row>

                        <Col lg={3} md={3} sm={6} xs={12}>
                            <Panel >
                                <Panel.Body className="h-150 background-image img-1" >
                                    <div>
                                        <h1>{this.props.dashBoard.totalEmployee}</h1>
                                        <h3>Total Employee</h3>
                                    </div>
                                </Panel.Body>
                            </Panel>
                        </Col>

                        <Col lg={3} md={3} sm={6} xs={12}>
                            <Panel >
                                <Panel.Body className="h-150 background-image img-2" >
                                    <div>
                                        <h1>{this.props.dashBoard.presentCount}</h1>
                                        <h3>Today Present's</h3>
                                    </div>
                                </Panel.Body>
                            </Panel>
                        </Col>

                        <Col lg={3} md={3} sm={6} xs={12}>
                            <Panel >
                                <Panel.Body className="h-150 background-image img-3" >
                                    <div>
                                        <h1>{this.props.dashBoard.leaveCount}</h1>
                                        <h3>Today on Leave</h3>
                                    </div>
                                </Panel.Body>
                            </Panel>
                        </Col>

                        <Col lg={3} md={3} sm={6} xs={12}>
                            <Panel >
                                <Panel.Body className="h-150 background-image img-4" >
                                    <div>
                                        <h1>3</h1>
                                        <h3>Total Projects</h3>
                                    </div>
                                </Panel.Body>
                            </Panel>
                        </Col>

                    </Row>
                    <br></br>
                    <Row>

                        <Col lg={6} md={6} sm={12}>
                            <Panel>
                                <Panel.Body className="h-300 p-0">
                                    <Calendar id="calender"
                                        onChange={this.onChange}
                                        calendarType="US"
                                        value={this.state.dashBoardObject.date}
                                    />
                                </Panel.Body>
                            </Panel>
                        </Col>

                        <Col lg={6} md={6} sm={12}>
                            <Panel >
                                <Panel.Body className="h-300">
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th>{this.props.tableHeader.id}</th>
                                                <th>{this.props.tableHeader.employeeName}</th>
                                                <th>{this.props.tableHeader.timeIn}</th>
                                                <th>{this.props.tableHeader.timeOut}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {attendanceList}
                                        </tbody>
                                    </Table>
                                </Panel.Body>
                            </Panel>
                        </Col>
                        
                    </Row>
                </Grid>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    tableHeader: state.app.presentEmployeeHeader,
    dashBoard: state.app.loadDashBoard,
})

export default withRouter(connect(
    mapStateToProps,
    dispatch => bindActionCreators({
        loadDashBoard
    }, dispatch)
)(DashBoard));
