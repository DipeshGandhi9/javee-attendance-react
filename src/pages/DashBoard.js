import React, { Component } from 'react';
import { Grid, Row, Col, Panel, Table } from "react-bootstrap";
import Calendar from 'react-calendar';

import "./Pages.css";

import SideNavBar from '../components/SideNavBar.js';

class DashBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date()
        };
    }

    onChange = (date) => {
        this.setState({ date });
    }

    render() {
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
                                        <h1>3</h1>
                                        <h3>Total Employee</h3>
                                    </div>
                                </Panel.Body>
                            </Panel>
                        </Col>
                        <Col lg={3} md={3} sm={6} xs={12}>
                            <Panel >
                                <Panel.Body className="h-150 background-image img-2" >
                                    <div>
                                        <h1>3</h1>
                                        <h3>Today Present's</h3>
                                    </div>
                                </Panel.Body>
                            </Panel>
                        </Col>
                        <Col lg={3} md={3} sm={6} xs={12}>
                            <Panel >
                                <Panel.Body className="h-150 background-image img-3" >
                                    <div>
                                        <h1>0</h1>
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
                                    <Calendar
                                        onChange={this.onChange}
                                        calendarType="US"
                                        value={this.state.date}
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
                                                <th>Sr. No</th>
                                                <th>Employee Name</th>
                                                <th>Gender</th>
                                                <th>Contact</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Priya Rathod</td>
                                                <td>Female</td>
                                                <td>9876543210</td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Mayur Jain</td>
                                                <td>Male</td>
                                                <td>9876543210</td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>Unnati Modi</td>
                                                <td>Female</td>
                                                <td>9876543210</td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>Priya Rathod</td>
                                                <td>Female</td>
                                                <td>9876543210</td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td>Mayur Jain</td>
                                                <td>Male</td>
                                                <td>9876543210</td>
                                            </tr>
                                            <tr>
                                                <td>6</td>
                                                <td>Unnati Modi</td>
                                                <td>Female</td>
                                                <td>9876543210</td>
                                            </tr>
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
export default DashBoard;
