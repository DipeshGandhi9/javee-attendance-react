import React, { Component } from 'react';
import { Button, Form, FormGroup, Grid, FormControl, Col, Well, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import Cookies from 'universal-cookie';

import { API_URL } from '../store/constants'
import SideNavBar from '../components/SideNavBar.js';
import { updateOrganizationInfo, addOrganizationInfo } from '../actions/organizationActions';

const cookies = new Cookies();

class Organization extends Component {
    constructor(props) {
        super(props);

        this.state = {
            organizationObj: {
                'organizationName': '',
                'firstName': '',
                'lastName': '',
                'address': '',
                'email': '',
                'phoneNumber': ''
            },
        }
    }

    componentDidMount() {
        var queryParameters = queryString.parse(this.props.location.search);
        if (queryParameters['id']) {
            this.getorganizationObj(queryParameters['id']);
        }
    }

    getorganizationObj = (id) => {

        fetch(API_URL + 'api/organization/' + id, { method: 'GET', headers: { "Authorization": "Bearer " + cookies.get('token') } })
            .then(response => response.json())
            .then(organizationObj => {
                this.setState((state) => {
                    state.organizationObj = organizationObj;
                    return state;
                })
            }
            )
    }

    handleChange = (e) => {
        const { organizationObj } = this.state;
        organizationObj[e.target.name] = e.target.value;
        this.setState({ organizationObj })
    }

    handleNumber = (e) => {
        const { organizationObj } = this.state;
        const re = /^[0-9\b]+$/;
        if ((e.target.value === '' || re.test(e.target.value)) && e.target.value.length <= 10) {
            organizationObj[e.target.name] = e.target.value;
            this.setState({ organizationObj })
        }
    }

    onSubmitClick = (e) => {
        const { addOrganizationInfo, history, updateOrganizationInfo } = this.props;
        e.preventDefault();
        if (this.state.organizationObj.id) {
            updateOrganizationInfo(this.state.organizationObj, (error) => {
                if (!error) {
                    history.push('./organizationlist');
                }
                else {
                    this.setState({ isLoading: false })
                    console.error(error);
                }
            });
        }
        else {
            addOrganizationInfo(this.state.organizationObj, (error) => {
                if (!error) {
                    history.push('./organizationlist');
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
            state.organizationObj = {
                'organizationName': '',
                'firstName': '',
                'lastName': '',
                'address': '',
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
                    <Row>
                        <Col lg={12}>
                            <div>
                                <Link to="organizationlist">
                                    <Button className=" button pull-right" style={{ width: "130px" }}>
                                        Organization List
                                        </Button>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                    <Well className="m-auto mt-30" style={{ maxWidth: "600px" }}>
                        <Form horizontal className="m-auto mt-50" style={{ maxWidth: "450px" }} onSubmit={this.onSubmitClick}  >
                            <FormGroup>
                                <Col sm={4} xs={12}><b>Organization Name</b> </Col>
                                <Col sm={8} xs={12}>
                                    <FormControl type="text" name="organizationName" id="organizationName" value={this.state.organizationObj.organizationName} onChange={this.handleChange} required autoComplete="off" />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4} xs={12}><b>Address</b> </Col>
                                <Col sm={8} xs={12}>
                                    <FormControl componentClass="textarea" name="address" id="address" value={this.state.organizationObj.address} onChange={this.handleChange} required autoComplete="off" />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={4} xs={12}>
                                    <b>Contact Person:</b>
                                </Col>
                                <Col sm={8} xs={12}></Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4} xs={12}><b>First Name</b></Col>
                                <Col sm={8} xs={12}>
                                    <FormControl type="text" name="firstName" id="firstName" value={this.state.organizationObj.firstName} onChange={this.handleChange} required autoComplete="off" />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4} xs={12}><b>Last Name</b></Col>
                                <Col sm={8} xs={12}>
                                    <FormControl type="text" name="lastName" id="lastName" value={this.state.organizationObj.lastName} onChange={this.handleChange} required autoComplete="off" />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4} xs={12}><b>Email</b> </Col>
                                <Col sm={8} xs={12}>
                                    <FormControl type="email" name="email" id="email" value={this.state.organizationObj.email} onChange={this.handleChange} required autoComplete="off" />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4} xs={12}><b>Contact No. </b></Col>
                                <Col sm={8} xs={12}>
                                    <FormControl type="text" name="phoneNumber" id="contact" value={this.state.organizationObj.phoneNumber} onChange={this.handleNumber} required autoComplete="off" />
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
        updateOrganizationInfo, addOrganizationInfo
    }, dispatch),
)(Organization));
