import React, { Component } from 'react';
import { Button, Form, FormGroup, Grid, FormControl, Col, Well, Radio } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import queryString from 'query-string';

import { API_URL } from '../store/constants'
import SideNavBar from '../components/SideNavBar.js';
import { updateEmployeeInfo, addEmployeeInfo } from '../actions';

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userObj: {
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
            this.getUserObj(queryParameters['id']);
        }
    }
   
    getUserObj = (id) => {
        fetch(API_URL + 'employee/' + id, { method: 'GET' })
            .then(response => response.json())
            .then(userObj => {
                this.setState((state) => {
                    state.userObj = userObj;
                    return state;
                })
            }
        )
    }

    handleChange = (e) => {
        const { userObj } = this.state;
        userObj[e.target.name] = e.target.value;
        this.setState({ userObj })
    }

    handleNumber = (e) => {
        const { userObj } = this.state;
        const re = /^[0-9\b]+$/;
        if ((e.target.value === '' || re.test(e.target.value)) && e.target.value.length <= 10) {
            userObj[e.target.name] = e.target.value;
            this.setState({ userObj })
        }
    }

    onSubmitClick = (e) => {
        const { addEmployeeInfo, history, updateEmployeeInfo } = this.props;
        e.preventDefault();
        if (this.state.userObj.id) {
            updateEmployeeInfo(this.state.userObj) 
                    history.push('./userlist');
                }
        else {
            addEmployeeInfo(this.state.userObj)
                history.push('./userlist');
        }
    }

    handleReset = (e) => {
        e.preventDefault();
        this.setState((state) => {
            state.userObj = {
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
                                    <FormControl type="text" name="firstName" id="firstName" value={this.state.userObj.firstName} onChange={this.handleChange} required autoComplete="off" />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4} xs={12}><b>Last Name</b></Col>
                                <Col sm={8} xs={12}>
                                    <FormControl type="text" name="lastName" id="lastName" value={this.state.userObj.lastName} onChange={this.handleChange} required autoComplete="off" />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4} xs={12}><b>Address</b> </Col>
                                <Col sm={8} xs={12}>
                                    <FormControl componentClass="textarea" name="address" id="address" value={this.state.userObj.address} onChange={this.handleChange} required autoComplete="off" />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col xs={4}><b>Gender</b> </Col>
                                <Col xs={4}>
                                    <Radio inline name="gender" value="Male" checked={this.state.userObj.gender === 'Male'} onChange={this.handleChange} >
                                        <b>Male</b>
                                    </Radio>
                                </Col>
                                <Col xs={4} >
                                    <Radio inline name="gender" value="Female" checked={this.state.userObj.gender === 'Female'} onChange={this.handleChange}>
                                        <b>Female</b>
                                    </Radio>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4} xs={12}><b>Email</b> </Col>
                                <Col sm={8} xs={12}>
                                    <FormControl type="email" name="email" id="email" value={this.state.userObj.email} onChange={this.handleChange} required autoComplete="off" />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4} xs={12}><b>Contact No. </b></Col>
                                <Col sm={8} xs={12}>
                                    <FormControl type="text" name="phoneNumber" id="contact" value={this.state.userObj.phoneNumber} onChange={this.handleNumber} required autoComplete="off" />
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
    // employee: state.app.employee,
    // userList: state.app.employees
})

export default withRouter(connect(
    mapStateToProps,
    dispatch => bindActionCreators({
        updateEmployeeInfo, addEmployeeInfo
    }, dispatch),
)(User));
