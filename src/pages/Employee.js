import React, { Component } from 'react';
import { Button, Form, FormGroup, Grid, FormControl, Col, Well, Radio } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import queryString from 'query-string';

import { API_URL } from '../store/constants'
import SideNavBar from '../components/SideNavBar.js';
import { updateEmployeeInfo, addEmployeeInfo } from '../actions';

class Employee extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employeeObj: {
                'firstName': '',
                'lastName': '',
                'address': '',
                'gender': 'Male',
                'email': '',
                'phoneNumber': ''
            },
        }
    }

    componentDidMount() {
        var queryParameters = queryString.parse(this.props.location.search);
        if (queryParameters['id']) {
            this.getEmployeeObj(queryParameters['id']);
        }
    }
   
    getEmployeeObj = (id) => {
        fetch(API_URL + 'api/employee/' + id, { method: 'GET' ,headers : {"Authorization" : "Bearer "+localStorage.getItem('token')} })
            .then(response => response.json())
            .then(employeeObj => {
                this.setState((state) => {
                    state.employeeObj = employeeObj;
                    return state;
                })
            }
        )
    }

    handleChange = (e) => {
        const { employeeObj } = this.state;
        employeeObj[e.target.name] = e.target.value;
        this.setState({ employeeObj })
    }

    handleNumber = (e) => {
        const { employeeObj } = this.state;
        const re = /^[0-9\b]+$/;
        if ((e.target.value === '' || re.test(e.target.value)) && e.target.value.length <= 10) {
            employeeObj[e.target.name] = e.target.value;
            this.setState({ employeeObj })
        }
    }

    onSubmitClick = (e) => {
        const { addEmployeeInfo, history, updateEmployeeInfo } = this.props;
        e.preventDefault();
        if (this.state.employeeObj.id) {
            updateEmployeeInfo(this.state.employeeObj, (error) => {
                if (!error) {
                    history.push('./employeelist');
                }
                else {
                    this.setState({ isLoading: false })
                    console.error(error);
                }
            });
        }
        else {
            addEmployeeInfo(this.state.employeeObj, (error) => {
                if (!error) {
                    history.push('./employeelist');
                }
                else {
                    this.setState({ isLoading: false })
                    console.error(error);
                }
            });
        }
    }

    handleReset = (e) => {
        e.preventDefault();
        this.setState((state) => {
            state.employeeObj = {
                'firstName': '',
                'lastName': '',
                'address': '',
                'gender': 'Male',
                'email': '',
                'phoneNumber': ''
            }
            return state;
        })
    }

    render() {
        return (
            <div>
                <SideNavBar />
                <Grid>
                    <Well className="m-auto mt-30" style={{ maxWidth: "600px" }}>
                        <Form horizontal className="m-auto mt-50" style={{ maxWidth: "450px" }} onSubmit={this.onSubmitClick}  >
                            <FormGroup>
                                <Col sm={4} xs={12}><b>First Name</b> </Col>
                                <Col sm={8} xs={12}>
                                    <FormControl type="text" name="firstName" id="firstName" value={this.state.employeeObj.firstName} onChange={this.handleChange} required autoComplete="off" />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4} xs={12}><b>Last Name</b></Col>
                                <Col sm={8} xs={12}>
                                    <FormControl type="text" name="lastName" id="lastName" value={this.state.employeeObj.lastName} onChange={this.handleChange} required autoComplete="off" />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4} xs={12}><b>Address</b> </Col>
                                <Col sm={8} xs={12}>
                                    <FormControl componentClass="textarea" name="address" id="address" value={this.state.employeeObj.address} onChange={this.handleChange} required autoComplete="off" />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col xs={4}><b>Gender</b> </Col>
                                <Col xs={4}>
                                    <Radio inline name="gender" value="Male" checked={this.state.employeeObj.gender === 'Male'} onChange={this.handleChange} >
                                        <b>Male</b>
                                    </Radio>
                                </Col>
                                <Col xs={4} >
                                    <Radio inline name="gender" value="Female" checked={this.state.employeeObj.gender === 'Female'} onChange={this.handleChange}>
                                        <b>Female</b>
                                    </Radio>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4} xs={12}><b>Email</b> </Col>
                                <Col sm={8} xs={12}>
                                    <FormControl type="email" name="email" id="email" value={this.state.employeeObj.email} onChange={this.handleChange} required autoComplete="off" />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4} xs={12}><b>Contact No. </b></Col>
                                <Col sm={8} xs={12}>
                                    <FormControl type="text" name="phoneNumber" id="contact" value={this.state.employeeObj.phoneNumber} onChange={this.handleNumber} required autoComplete="off" />
                                </Col>
                            </FormGroup>

                            <div align="center" className="mt-30">
                                <Button className="m-rl-5 button" onClick={this.handleReset} >RESET</Button>
                                <Button type="submit" className="m-rl-5 button" id="submit"  >SUBMIT</Button>
                            </div>
                        </Form>
                    </Well>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    
})

export default withRouter(connect(
    mapStateToProps,
    dispatch => bindActionCreators({
        updateEmployeeInfo, addEmployeeInfo
    }, dispatch),
)(Employee));
