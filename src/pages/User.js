import React, { Component } from 'react';
import { Button, Form, FormGroup, Grid, FormControl, Col, Well, Radio } from 'react-bootstrap';

import SideNavBar from '../components/SideNavBar.js';

export default class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'firstName': '',
            'lastName': '',
            'address': '',
            'gender': '',
            'email': '',
            'contact': ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleGender = this.handleGender.bind(this);
        this.handleNumber = this.handleNumber.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.onSubmitClick = this.onSubmitClick.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleNumber(e) {
        const re = /^[0-9\b]+$/;
        if ((e.target.value === '' || re.test(e.target.value)) && e.target.value.length <= 10) {
            this.setState({ 'contact': e.target.value })
        }
    }

    handleGender(e) {
        this.setState({ 'gender': e.currentTarget.value })
    }

    onSubmitClick() {
        window.alert(JSON.stringify(this.state));
    }

    handleReset(e) {
        e.preventDefault();
        this.setState((state) => {
            state.firstName = "";
            state.lastName = "";
            state.address = "";
            state.email = "";
            state.contact = "";
            return state;
        })
    }

    render() {
        return (
            <div>
                <SideNavBar />
                <Grid>
                    <Well className="m-auto mt-30" style={{ maxWidth: "600px" }}>
                        <Form horizontal className="m-auto mt-50" style={{ maxWidth: "450px" }} onSubmit={this.onSubmitClick} action="./userlist">
                            <FormGroup>
                                <Col sm={4} xs={12}><b>First Name</b> </Col>
                                <Col sm={8} xs={12}>
                                    <FormControl type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} required autoComplete="off" />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4} xs={12}><b>Last Name</b></Col>
                                <Col sm={8} xs={12}>
                                    <FormControl type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} required autoComplete="off" />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4} xs={12}><b>Address</b> </Col>
                                <Col sm={8} xs={12}>
                                    <FormControl componentClass="textarea" name="address" value={this.state.address} onChange={this.handleChange} required autoComplete="off" />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col xs={4}><b>Gender</b> </Col>
                                <Col xs={4}>
                                    <Radio inline name="gender" value="Male" checked={this.state.gender === 'Male'} onChange={this.handleGender} >
                                        <b>Male</b>
                                    </Radio>{' '}
                                </Col>
                                <Col xs={4} >
                                    <Radio inline name="gender" value="Female" checked={this.state.gender === 'Female'} onChange={this.handleGender}>
                                        <b>Female</b>
                                    </Radio>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4} xs={12}><b>Email</b> </Col>
                                <Col sm={8} xs={12}>
                                    <FormControl type="email" name="email" value={this.state.email} onChange={this.handleChange} required autoComplete="off" />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4} xs={12}><b>Contact No. </b></Col>
                                <Col sm={8} xs={12}>
                                    <FormControl type="text" name="contact" value={this.state.contact} onChange={this.handleNumber} required autoComplete="off" />
                                </Col>
                            </FormGroup>

                            <div align="center" className="mt-30">
                                <Button className="m-rl-5 button" onClick={this.handleReset}>RESET</Button>
                                <Button type="submit" className="m-rl-5 button" >SUBMIT</Button>
                            </div>
                        </Form>
                    </Well>
                </Grid>
            </div>
        );
    }
}
