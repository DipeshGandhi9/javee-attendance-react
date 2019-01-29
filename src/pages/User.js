import React, { Component } from 'react';
import { Grid, Well, Form, FormGroup, Col, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import Cookies from 'universal-cookie';

import { API_URL } from '../store/constants'
import SideNavBar from '../components/SideNavBar';
import { loadUserInfo , addUserInfo ,updateUserInfo} from '../actions/userActions';
import {loadEmployeeInfo} from '../actions/employeeActions'

const cookies = new Cookies();

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userObj: {
                'userName': "",
                'password': "",
                'confirmPassword':""  
            }
        }
    }

    componentDidMount() {
        this.props.loadEmployeeInfo();
        var queryParameters = queryString.parse(this.props.location.search);
        console.log(this.state.userObj);
        if (queryParameters['id']) {
            this.getUserObj(queryParameters['id']);
        }
    }

    getUserObj = (id) => {
        fetch(API_URL + 'api/user/' + id, { method: 'GET' ,headers : {"Authorization" : "Bearer "+cookies.get('token')} })
            .then(response => response.json())
            .then(userObj => {
                this.setState((state) => {
                    userObj.sort((a, b) => a.id - b.id);
                    state.userObj.userName = userObj.userName;
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


    onChangeHandeler = (e) => {
        var div = document.getElementById("id");
        let id = e.target.value;
        console.log(id);
        let selectedEmployee = this.props.employeeList.filter(function (item) {
            return item.id.toString() === id;
        });
        if (id === "") {
            div.innerHTML = "";
            div.removeAttribute("class");
        }
        else {
            var name = selectedEmployee[0].firstName + " " + selectedEmployee[0].lastName;
            console.log(name);
            div.innerHTML = "Id : " + id + "&nbsp;&nbsp; Name : " + name + " &nbsp;&nbsp;Department : ";
            div.className = "mb-10";
        }
        const { userObj } = this.state;
        userObj["employee"] = { "id": id,"firstName" : selectedEmployee[0].firstName , "lastName" : selectedEmployee[0].lastName };
        this.setState({userObj})
        console.log(this.state);
    }

    onReset = () => {
        var div = document.getElementById("id");
        div.innerHTML = "";
        div.removeAttribute("class");
        document.getElementById("select").selectedIndex = 0;
        this.setState((state) => {
            state.userObj = {
                'userName': "",
                'password': "",
                'confirmPassword' :""
            }
            return state;
        })
    }

    onSubmit = (e) => {
        const { addUserInfo, history } = this.props;
        e.preventDefault();
        if (this.state.userObj.password === this.state.userObj.confirmPassword) {
            if (this.state.employeeObj.id) {
                updateUserInfo(this.state.userObj, (error) => {
                    if (!error) {
                        history.push('./userlist');
                    }
                    else {
                        this.setState({ isLoading: false })
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
            console.log(this.state);
        }
        else {
            window.alert("password must be same");
        }
        console.log(this.state.userObj);
    }

    render() {
        return (
            <div>
                <SideNavBar />
                <Grid>
                    <Well className="m-auto mt-30" style={{ maxWidth: "600px" }}>
                        <Form horizontal className="m-auto mt-50" onSubmit ={this.onSubmit}>
                            <FormGroup>
                                <Col sm={4} xs={12}>
                                    <b>Employee Name</b>
                                </Col>
                                <Col sm={8} xs={12}>
                                    <FormControl componentClass="select"  id="select" onChange={this.onChangeHandeler} required >
                                        <option value=""></option>
                                        {this.props.employeeList.map((employee,id) => {
                                            return (
                                                <option key={id} value={employee.id} name={employee.firstName}>
                                                    {employee.firstName} {employee.lastName}
                                                </option>
                                            );
                                        })}
                                    </FormControl>
                                </Col>
                            </FormGroup>
                            <Col sm={4} xs={12}></Col>
                            <Col sm={8} xs={12}>
                                <div id="id"></div>
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
    employeeList: state.app.employees
})

export default withRouter(connect(
    mapStateToProps,
    dispatch => bindActionCreators({
        loadUserInfo,loadEmployeeInfo,addUserInfo,updateUserInfo
    }, dispatch)
)(User));