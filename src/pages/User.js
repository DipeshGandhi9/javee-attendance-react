import React, { Component } from 'react';
import { Grid, Well, Form, FormGroup, Col, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import SideNavBar from '../components/SideNavBar';
import { loadEmployeeInfo } from '../actions';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userObj: {
                'employee': "",
                'userName': "",
                'password': "",
            }
        }
    }

    componentDidMount = () => {
      //  this.props.loadUserInfo();
    }

    handleChange=(e)=> {
        this.setState({ [e.target.name]: e.target.value })
    }

    onChangeHandeler = (e) => {
        var div = document.getElementById("id");
        let id = e.target.value;
        console.log(id);
        this.props.employeeList.filter(function (item) {
            return item.id === e.target.value;
        })
        if (e.target.value === "") {
            div.innerHTML = "";
            div.removeAttribute("class");
        }
        else {
            var name = this.props.employeeList[id - 1].firstName + " " + this.props.employeeList[id - 1].lastName;
            console.log(name);
            div.innerHTML = "Id : " + id + "&nbsp;&nbsp; Name : " + name + " &nbsp;&nbsp;Department : ";
            div.className = "mb-10";  
        }
        console.log(this.state)
    }

    onReset = () => {
        var div = document.getElementById("id");
        div.innerHTML = "";
        div.removeAttribute("class");
        document.getElementById("select").selectedIndex = 0;
    }

    onSubmit=()=>{
        if(this.state.password === this.state.confirmPassword ){
            console.log("submit clicked");
        }
        else{
            console.log("password must be same");
        }
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
                                    <FormControl componentClass="select" name="employee" id="select" onChange={this.onChangeHandeler} required >
                                        <option value=""></option>
                                        {this.props.employeeList.map((employee) => {
                                            return (
                                                <option key={employee.id} value={employee.id} name={employee.firstName}>
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
                                    <FormControl type="text" onChange={this.handleChange} name="userName"  required></FormControl>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={4} xs={12}>
                                    <b>Password</b>
                                </Col>
                                <Col sm={8} xs={12}>
                                    <FormControl type="password" id="password" name="password" onChange={this.handleChange} required></FormControl>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={4} xs={12}>
                                    <b>Confirm Password</b>
                                </Col>
                                <Col sm={8} xs={12}>
                                    <FormControl type="password" id="confirmPassword" name="confirmPassword" onChange={this.handleChange}  required></FormControl>
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
        loadEmployeeInfo
    }, dispatch)
)(User));