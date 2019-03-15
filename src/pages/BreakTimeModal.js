import React, { Component } from 'react';
import { Button, Modal, Row ,Col } from 'react-bootstrap';
import Moment from 'moment';
//import DateTimePicker from 'react-datetime-picker';

class BreakTimeModal extends Component {
    constructor() {
        super();

        this.state = {
            isLoggedIn: true,
            time : {}
        };
    }

    handleHide = () => {
        this.setState({ show: false });
    }

    render() {
        const {time} =this.state;
        return (
            <div>
                <Button bsSize="large" className="button" onClick={() => this.setState({ show: true })}>
                    Break
          </Button>

                <Modal show={this.state.show} onHide={this.handleHide} container={this} aria-labelledby="contained-modal-title">
                    <Modal.Header closeButton>
                        <h3 className="mt-10">Break Time</h3>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col xs={6} >
                            <Button className="button pull-right" onClick ={()=>{
                                time["timeIn"] = new Date();
                                this.setState({time});
                            }} >Break Time In</Button>
                            </Col>
                            <Col xs={6}>
                            <Button className="button" onClick ={()=>{
                                time["timeOut"] = new Date();
                                this.setState({time});
                            }} >Break Time Out</Button>
                            </Col>
                        </Row>
                        <Row>
                            <br></br>
                        <div>{this.state.time.timeIn ? "Break Time In : " + Moment(this.state.time.timeIn).format("DD/MM/YYYY hh:mm:ss a"):""}</div>
                        <div>{this.state.time.timeOut ? "Break Time Out : "+Moment(this.state.time.timeOut).format("DD/MM/YYYY hh:mm:ss a"):""}</div>
                        </Row>
                       
                    </Modal.Body>

                </Modal>
            </div>
        );
    }
}
export default BreakTimeModal;
