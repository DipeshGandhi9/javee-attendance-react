import React, { Component } from 'react';
import { Grid, Well, Form, FormGroup, Col, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import queryString from 'query-string';

import { API_URL } from '../store/constants'
import SideNavBar from '../components/SideNavBar';
import { loadUserInfo ,loadEmployeeInfo , addUserInfo } from '../actions';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userObj: {
                'employee': "",
                'userName': "",
                'password': ""
            }
        }
    }

    componentDidMount() {
        this.props.loadEmployeeInfo();
        var queryParameters = queryString.parse(this.props.location.search);
        if (queryParameters['id']) {
            this.getEmployeeObj(queryParameters['id']);
        }
    }

    getEmployeeObj = (id) => {
        fetch(API_URL + 'api/user/' + id, { method: 'GET' ,headers : {"Authorization" : "Bearer "+localStorage.getItem('token')} })
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
        userObj["employee"] = name;
        this.setState({userObj})
        console.log(this.state);
    }

    onReset = () => {
        var div = document.getElementById("id");
        div.innerHTML = "";
        div.removeAttribute("class");
        document.getElementById("select").selectedIndex = 0;
    }

    onSubmit = (e) => {
        const { addUserInfo, history } = this.props;
        
        if(this.state.password === this.state.confirmPassword ){
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
        else{
            window.alert("password must be same");
        }
        console.log(this.state);
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
                                    <FormControl type="text" onChange={this.handleChange} name="userName" value={this.state.userName}  required></FormControl>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={4} xs={12}>
                                    <b>Password</b>
                                </Col>
                                <Col sm={8} xs={12}>
                                    <FormControl type="password" id="password" name="password" onChange={this.handleChange} value={this.state.password} required></FormControl>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={4} xs={12}>
                                    <b>Confirm Password</b>
                                </Col>
                                <Col sm={8} xs={12}>
                                    <FormControl type="password" id="confirmPassword" name="confirmPassword" onChange={this.handleChange} value={this.state.confirmPassword} required></FormControl>
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
        loadUserInfo,loadEmployeeInfo,addUserInfo
    }, dispatch)
)(User));