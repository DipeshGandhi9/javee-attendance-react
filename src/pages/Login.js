import React, { Component } from 'react';
import { Button, ButtonToolbar, Row, Col, Image, Modal, Grid, Form, FormGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import './Pages.css';

import {authUser} from '../actions/userActions';
import {addAttendanceInfo} from '../actions/attendanceActions';
import ModalManual from './ModalManual.js';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
    
      show: false,
      'username': '',
      'password': '',
      isLoggedIn: true,
      isLoggedOut : true,
      'date': new Date().toLocaleString(),
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

  onSiteLoginClick=(e)=>{
    if(this.state.username && this.state.password)  {
      this.props.authUser(this.state.username,this.state.password);    
      this.setState({showSiteLogin : false}); 
      window.open("./dashboard","_SELF");
    }
  }

  onLoginClick=()=> { 
   
    this.props.authUser(this.state.username,this.state.password);
    
      this.setState({ show: false ,isLoggedIn: false , 'timeInDate' : new Date().toUTCString() });
      document.getElementById("user").innerHTML = "User Name : " + this.state.username;
      document.getElementById("timein").innerHTML = "Time In : " + this.state.date; 
      this.props.addAttendanceInfo(this.state);
  }

  handleChange=(e)=> {
    this.setState({ [e.target.id]: e.target.value });
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
                    <FormControl type="text" id="username" value={this.state.username} onChange={this.handleChange} autoComplete="off" autoFocus="autofocus"/>
                  </Col>
                </FormGroup>
                <FormGroup className="mt-10" >
                  <Col lg={2} md={2} sm={2} xs={12}>
                    <b>Password</b>
                  </Col>
                  <Col lg={10} md={10} sm={10} xs={12}>
                    <FormControl type="password" id="password" value={this.state.password} onChange={this.handleChange}  onKeyPress={this.onLoginKeyPress} autoComplete="off"/>
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
                    <FormControl type="text" id="username" value={this.state.username} onChange={this.handleChange} autoComplete="off" autoFocus="autofocus" />
                  </Col>
                </FormGroup>
                <FormGroup className="mt-10" >
                  <Col lg={2} md={2} sm={2} xs={12}>
                    <b>Password</b>
                  </Col>
                  <Col lg={10} md={10} sm={10} xs={12}>
                    <FormControl type="password" id="password" value={this.state.password} onChange={this.handleChange} onKeyPress={this.onSiteLoginKeyPress } autoComplete="off" />
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
})

export default withRouter(connect(
  mapStateToProps,
  dispatch => bindActionCreators({
    authUser,addAttendanceInfo
  },dispatch)
)(Login));