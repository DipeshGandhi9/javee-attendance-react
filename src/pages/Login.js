import React, { Component } from 'react';
import { Button, ButtonToolbar, Row, Col, Image, Modal, Grid, Form, FormGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import Moment from 'moment';

import './Pages.css';

import {authUser} from '../actions/userActions';
import {addAttendance , updateAttendance} from '../actions/attendanceActions';
import ModalManual from './ModalManual.js';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attendanceObj:{
        'userName': '',
        'password': ''
      },
      show: false,
      isLoggedIn: true,
      isLoggedOut : true,
      showSiteLogin : false,
      submitted : false
  }
}

  onLoginKeyPress=(e)=>{
    if(e.key === 'Enter'){
      this.onLoginClick();
    }
  }

  onSiteLoginKeyPress=(e)=>{
    if(e.key === 'Enter'){
      this.onSiteLoginClick();
    }
  }

  onhandleHide=()=> {
    this.setState({ show: false , showSiteLogin : false });
  }

  onSiteLoginClick=()=>{
      this.props.authUser(this.state.attendanceObj.userName,this.state.attendanceObj.password ,(error)=>{
        if(!error){
          this.setState({showSiteLogin : false}); 
          window.open("./dashboard","_SELF");
        }
        else{
          console.error(error);  
        }
      });    
  }

  onLoginClick = () => {
    const { attendanceObj } = this.state;
    if (this.state.isLoggedIn === false) {
      attendanceObj["timeOutDate"] = new Date();
      this.setState({ attendanceObj });
      this.setState({ show: false, isLoggedIn: true });
      document.getElementById("timeout").innerHTML = "Time Out : " + Moment(this.state.attendanceObj.timeOutDate).format('h:mm:ss a');
      this.props.updateAttendance(this.state.attendanceObj);
    }
    else {
      attendanceObj["employee"] = { "id": "1", "firstName": "Unnati", "lastName": "Modi" };
      attendanceObj["date"] = new Date();
      attendanceObj["timeInDate"] = new Date();
      this.setState({ attendanceObj });
      this.setState({ show: false, isLoggedIn: false });
      console.log(this.state);
      document.getElementById("user").innerHTML = "User Name : " + this.state.attendanceObj.userName;
      document.getElementById("timein").innerHTML = "Time In : " + Moment(this.state.attendanceObj.timeInDate).format('h:mm:ss a');
      this.props.addAttendance(this.state.attendanceObj);
    }
  }

  handleChange=(e)=> {
    const { attendanceObj } = this.state;
    attendanceObj[e.target.name] = e.target.value;
    this.setState({ attendanceObj })
  }

  render() {
    return (
      <div>
        <Grid >
          <Row className="mt-140" align="center">
            <Image src={require("../assets/images/main-logo.png")} className="logo-image"></Image>
            <Row>
              <div className="block mt-30" >
                <h4><div id="user"></div></h4>
                <h4><div id="timein"></div></h4>
                <h4><div id="timeout"></div></h4>
              </div>
            </Row>
          </Row>

          <Row className="mt-10">
            <ButtonToolbar>
              <Col xs={6}>
                <Button className="pull-right button" bsSize="large" onClick={() => this.setState({ showSiteLogin: true , 'username' : "" , 'password' : ""})}  >Site Login</Button>
              </Col>
              <Col xs={6} className="seperator">
                <Button bsSize="large" id="login" className="button " onClick={() => this.setState({ show: true, 'username' : "" , 'password' : "" })} >{this.state.isLoggedIn  ? 'Login ' : 'Logout'}</Button>
              </Col>
            </ButtonToolbar>
          </Row>

          <Modal show={this.state.show} onHide={this.onhandleHide} container={this} aria-labelledby="contained-modal-title" className="modal-width">
            <Modal.Header closeButton>
              <h3 className="mt-10" >{this.state.isLoggedIn ? 'Log In' : 'Log Out'}</h3>
            </Modal.Header>
            
            <Modal.Body>
              <Form horizontal>
                <FormGroup className="mt-10" >
                  <Col lg={2} md={2} sm={2} xs={12}>
                    <b>Username</b>
                  </Col>
                  <Col lg={10} md={10} sm={10} xs={12}>
                    <FormControl type="text" id="userName" name="userName" value={this.state.attendanceObj.userName} onChange={this.handleChange} autoComplete="off" autoFocus="autofocus"/>
                  </Col>
                </FormGroup>
                <FormGroup className="mt-10" >
                  <Col lg={2} md={2} sm={2} xs={12}>
                    <b>Password</b>
                  </Col>
                  <Col lg={10} md={10} sm={10} xs={12}>
                    <FormControl type="password" id="password" name="password" value={this.state.attendanceObj.password} onChange={this.handleChange}  onKeyPress={this.onLoginKeyPress} autoComplete="off"/>
                  </Col>
                </FormGroup>
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button  className="pull-right button"  onClick={this.onLoginClick} >{this.state.isLoggedIn ? 'LOGIN' : 'LOGOUT'}</Button>
            </Modal.Footer>
          </Modal>

          <Modal show={this.state.showSiteLogin} onHide={this.onhandleHide} container={this} aria-labelledby="contained-modal-title" className="modal-width">
            <Modal.Header closeButton>
              <h3 className="mt-10" >Site Login</h3>
            </Modal.Header>

            <Modal.Body>
              <Form horizontal>
                <FormGroup className="mt-10" >
                  <Col lg={2} md={2} sm={2} xs={12}>
                    <b>Username</b>
                  </Col>
                  <Col lg={10} md={10} sm={10} xs={12}>
                    <FormControl type="text" id="userName" name="userName" value={this.state.attendanceObj.userName} onChange={this.handleChange} autoComplete="off" autoFocus="autofocus" />
                  </Col>
                </FormGroup>
                <FormGroup className="mt-10" >
                  <Col lg={2} md={2} sm={2} xs={12}>
                    <b>Password</b>
                  </Col>
                  <Col lg={10} md={10} sm={10} xs={12}>
                    <FormControl type="password" id="password" name="password" value={this.state.attendanceObj.password} onChange={this.handleChange} onKeyPress={this.onSiteLoginKeyPress } autoComplete="off" />
                  </Col>
                </FormGroup>
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button className="pull-right button" onClick={this.onSiteLoginClick} >LOGIN</Button>
            </Modal.Footer>
          </Modal>

          <br />
          <div>
            {this.state.isLoggedIn ?
              '' :
              <Row >
                <ButtonToolbar>
                  <Col xs={6}></Col>
                  <Col xs={6}><ModalManual /></Col>
                </ButtonToolbar>
              </Row>}
          </div>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  employeeList : state.app.employees,
})

export default withRouter(connect(
  mapStateToProps,
  dispatch => bindActionCreators({
    authUser,addAttendance,updateAttendance
  },dispatch)
)(Login));