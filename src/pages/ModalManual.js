import React, { Component } from 'react';
import { Button, Modal, Form, FormGroup, FormControl, Row, Col } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';

class ModalManual extends Component {
  constructor() {
    super();

    this.state = {
      show: false,
      'time': "",
      'reason': "",
      date: new Date(),
      isLoggedIn: true
    };
  }

  handleHide = () => {
    this.setState({ show: false });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = () => {
    if (this.state.reason !== "") {
      this.setState({ show: false });
      this.setState({ isLoggedIn: false });
      document.getElementById("ManualTimeIn").innerHTML = "Manual Time In  &nbsp; &nbsp;: " + this.state.date.toLocaleString();
    }
    if (this.state.isLoggedIn === false) {
      this.setState((state) => {
        state.date = new Date();
        document.getElementById("ManualTimeOut").innerHTML = "Manual Time Out : " + state.date.toLocaleString();
        return state;
      });
    }
  }

  render() {
    return (
      <div className="flex">
        <div>
          <Button bsSize="large" className="button" onClick={() => this.setState({ show: true })}>
            Manually
          </Button>
        </div>
        <div className="ml-10">
          <div id="ManualTimeIn"></div>
          <div id="ManualTimeOut"></div>
        </div>
        <Modal show={this.state.show} onHide={this.handleHide} container={this} aria-labelledby="contained-modal-title">
          <Modal.Header closeButton>
            <h3 className="mt-10">Manually TimeZone</h3>
          </Modal.Header>

          <Modal.Body>
            <Row>
              <Col>
                <Form>
                  <FormGroup >
                    <Col lg={2} md={2} sm={2} xs={2}>
                      <b>Time</b>
                    </Col>
                    <Col lg={10} md={10} sm={10} xs={10}>
                      <DateTimePicker className="date-time-picker"
                        onChange={date => this.setState({ date })}
                        value={this.state.date} />
                    </Col>
                  </FormGroup>
                </Form>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form>
                  <FormGroup >
                    <Col lg={2} md={2} sm={2} xs={2}>
                      <b>Reason</b>
                    </Col>
                    <Col lg={10} md={10} sm={10} xs={10}>
                      <FormControl componentClass="textarea" value={this.state.reason} name="reason" onChange={this.handleChange} />
                    </Col>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            {this.props.children}
            <Button className="pull-right button" onClick={this.onSubmit}> SUBMIT </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default ModalManual;
