import React, { Component } from 'react';
import { Grid, Well, Form, FormGroup, Col, FormControl, Button, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import Cookies from 'universal-cookie';

import { API_URL } from '../store/constants'
import SideNavBar from '../components/SideNavBar';
import { loadUserInfo, addUserInfo, updateUserInfo } from '../actions/userActions';
import { loadEmployeeInfo } from '../actions/employeeActions';

const cookies = new Cookies();

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "Role": ["EMPLOYEE", "ADMIN", "HR"],
            userObj: {
                'userName': "",
                'password': "",
                'confirmPassword': "",
                "Role": "EMPLOYEE"
            }
        }
    }

    componentDidMount() {
        this.props.loadEmployeeInfo();
        this.props.loadUserInfo();
        var queryParameters = queryString.parse(this.props.location.search);
        if (queryParameters['id']) {
            this.getUserObj(queryParameters['id']);
        }
    }

    getUserObj = (id) => {
        
        fetch(API_URL + 'api/user/' + id, { method: 'GET', headers: { "Authorization": "Bearer " + cookies.get('token') } })
            .then(response => response.json())
            .then(user => {
                const { userObj } = this.state;
                userObj["userName"] = user.userName;
                userObj["id"] = user.id;
                userObj["Role"] = user.role;
                userObj["employee"] =
                    {
                        "id": user.employee.id,
                        "firstName": user.employee.firstName,
                        "lastName": user.employee.lastName
                    }
                this.setState({ userObj });
            }
            );
    }

    handleChange = (e) => {
        const { userObj } = this.state;
        userObj[e.target.name] = e.target.value;
        this.setState({ userObj })
    }

    onChangeHandeler = (e) => {
        const { userObj } = this.state;
        let id = e.target.value;
        let selectedEmployee = this.props.employeeList.filter(function (item) {
            return item.id.toString() === id;
        });
        if (id === "") {
            userObj["employee"] = "";
            this.setState({ userObj });
        }
        else {
            userObj["employee"] = {
                "id": id,
                "firstName": selectedEmployee[0].firstName,
                "lastName": selectedEmployee[0].lastName
            };
            this.setState({ userObj });
        }
    }

    onRoleChange = (e) => {
        const { userObj } = this.state;
        userObj["Role"] = e.target.value;
        this.setState({ userObj });
    }

    onReset = () => {
        document.getElementById("select").selectedIndex = 0;
        document.getElementById("employee").selectedIndex = 0;
        this.setState((state) => {
            state.userObj = {
                'userName': "",
                'password': "",
                'confirmPassword': "",
                'Role': "EMPLOYEE"
            }
            return state;
        });
    }

    onSubmit = (e) => {
        const { addUserInfo, history, updateUserInfo } = this.props;
        e.preventDefault();
        if (this.state.userObj.password === this.state.userObj.confirmPassword) {
            if (this.state.userObj.id) {
                updateUserInfo(this.state.userObj, (error) => {
                    if (!error) {
                        history.push('./userlist');
                    }
                    else {
                        console.error(error);
                    }
                });
            }
            else {
                addUserInfo(this.state.userObj, (error) => {
                    if (!error) {
                        history.push('./userlist');
                    }
                    else {
                        this.setState({ isLoading: false })
                        console.error(error);
                    }
                });
            }
        }
        else {
            const { userObj } = this.state;
            userObj["error"] = "Password and confirmed password must be same."
            this.setState({ userObj });
        }
    }

    render() {
        let hasEmployee = (this.props.employeeList.length !== 0) ? true : false;

        let selectedEmployee = [];
        for (var keyValue in this.state.userObj.employee) {
            selectedEmployee.push(this.state.userObj.employee[keyValue]);
        }

        return (
            <div>
                <SideNavBar />
                <Grid>
                    <Row>
                        <Col lg={12}>
                            <div>
                                <Link to="userlist">
                                    <Button className=" button pull-right">
                                        User List
                                        </Button>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                    <Well className="m-auto mt-30" style={{ maxWidth: "600px" }}>
                        <Form horizontal className="m-auto mt-50" onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Col sm={4} xs={12}>
                                    <b>Employee Name</b>
                                </Col>
                                <Col sm={8} xs={12}>
                                    <FormControl componentClass="select" id="employee" onChange={this.onChangeHandeler} required >
                                        <option value="" >{hasEmployee ? "--Select Employee--" : "No Employees"}</option>
                                        {this.props.employeeList.map((employee, id) =>
                                            (selectedEmployee[0] === employee.id) ?
                                                <option key={id} value={employee.id} name={employee.firstName} selected>
                                                    {employee.firstName} {employee.lastName}
                                                </option> :

                                                <option key={id} value={employee.id} name={employee.firstName}>
                                                    {employee.firstName} {employee.lastName}
                                                </option>
                                        )}
                                    </FormControl>
                                </Col>
                            </FormGroup>

                            <Col sm={4} xs={12}></Col>
                            <Col sm={8} xs={12}>
                                {this.state.userObj.employee ?
                                    <div className="mb-10">Id : {this.state.userObj.employee.id} &nbsp;&nbsp;Name : {this.state.userObj.employee.firstName} {this.state.userObj.employee.lastName} &nbsp;&nbsp;Department : </div> : ""}
                            </Col>

                            <FormGroup>
                                <Col sm={4} xs={12}>
                                    <b>User Name</b>
                                </Col>
                                <Col sm={8} xs={12}>
                                    <FormControl type="text" onChange={this.handleChange} name="userName" value={this.state.userObj.userName} autoComplete="off" required></FormControl>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4} xs={12}>
                                    <b>Password</b>
                                </Col>
                                <Col sm={8} xs={12}>
                                    <FormControl type="password" id="password" name="password" onChange={this.handleChange} value={this.state.userObj.password} required></FormControl>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4} xs={12}>
                                    <b>Confirm Password</b>
                                </Col>
                                <Col sm={8} xs={12}>
                                    <FormControl type="password" id="confirmPassword" name="confirmPassword" onChange={this.handleChange} value={this.state.userObj.confirmPassword} required></FormControl>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4} xs={12}>
                                    <b>Role</b>
                                </Col>
                                <Col sm={8} xs={12}>
                                    <FormControl componentClass="select" id="select" onChange={this.onRoleChange} required >
                                        {this.state.Role.map((role, id) =>
                                            <option key={id} value={role} name={role}>
                                                {role}
                                            </option>
                                        )}
                                    </FormControl>
                                </Col>
                            </FormGroup>

                            <FormGroup >
                                <Col sm={4} xs={12}>
                                </Col>
                                <Col sm={8} xs={12}>
                                    <div className="error"><b>{this.state.userObj.error}</b></div>
                                </Col>
                            </FormGroup>

                            <div align="center" className="mt-30">
                                <Button className="m-rl-5 button" onClick={this.onReset}>RESET</Button>
                                <Button type="submit" className="m-rl-5 button" id="submit">SUBMIT</Button>
                            </div>

                        </Form>
                    </Well>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userList: state.app.userList,
    employeeList: state.app.employees
})

export default withRouter(connect(
    mapStateToProps,
    dispatch => bindActionCreators({
        loadUserInfo, loadEmployeeInfo, addUserInfo, updateUserInfo
    }, dispatch)
)(User));
