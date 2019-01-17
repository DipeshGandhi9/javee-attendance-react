import React from 'react';
import {Grid,Row, Col, Table, Glyphicon , Button, OverlayTrigger,Tooltip , Modal} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import './Pages.css';
import SideNavBar from '../components/SideNavBar.js';
import { loadEmployeeInfo , deleteEmployeeInfo , updateEmployeeInfo  } from '../actions';

const tooltip = (
    <Tooltip id="tooltip">Add User</Tooltip>
);

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            show : false,
            id : ""
        }
    }

    onhandleHide=()=> {
        this.setState({ show: false});
      }

    componentDidMount=()=>{
        this.props.loadEmployeeInfo();
    }
 
    deleteEmployee=(e,id)=>{
        e.preventDefault();
        this.props.deleteEmployeeInfo(id);
        this.setState({show:false});
    }

    render() {
        return (
            <div>
                <SideNavBar />
                <Grid>
                    <Row>
                        <Col lg={12}>
                            <div>
                                <Link to="user">
                                    <OverlayTrigger placement="left" overlay={tooltip}>
                                        <Button className="pull-right">
                                            <Glyphicon glyph="plus"></Glyphicon>
                                        </Button>
                                    </OverlayTrigger>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                    <div className="mt-30">
                        <Row>
                            <Col lg={12} >
                                <Table responsive bordered condensed>
                                    <thead>
                                        <tr>
                                            <th>
                                                {this.props.tableHeader.id}
                                            </th>
                                            <th>
                                                {this.props.tableHeader.firstName}
                                            </th>
                                            <th>
                                                {this.props.tableHeader.lastName}
                                            </th>
                                            <th>
                                                {this.props.tableHeader.address}
                                            </th>
                                            <th>
                                                {this.props.tableHeader.gender}
                                            </th>
                                            <th>
                                                {this.props.tableHeader.email}
                                            </th>
                                            <th>
                                                {this.props.tableHeader.contact}
                                            </th>
                                            <th>
                                                {this.props.tableHeader.edit}
                                            </th>
                                            <th>
                                                {this.props.tableHeader.delete}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.userList.map((user, id) => {
                                            return (
                                                <tr key={user.id}>
                                                    <td>{user.id}</td>
                                                    <td>{user.firstName}</td>
                                                    <td>{user.lastName}</td>
                                                    <td>{user.address}</td>
                                                    <td>{user.gender}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.phoneNumber}</td>
                                                    <td><Link to={{pathname: "/user",search : "id=" +user.id }} className="icon-button"><Glyphicon glyph="edit"  /></Link> </td>
                                                    <td  onClick={()=>{this.setState({show:true,id : user.id})}}><Glyphicon glyph="remove" /> </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </div>

                    <Modal show={this.state.show} onHide={this.onhandleHide} container={this} aria-labelledby="contained-modal-title" className="modal-width">
                        <Modal.Header closeButton>
                            <h3>
                                Are you sure?
                            </h3>
                            </Modal.Header>
                            <Modal.Body>
                               Do you want to delete this employee? 
                            </Modal.Body>
                            <Modal.Footer>
                            <div>
                                <Button className="button" onClick={(e)=>this.deleteEmployee(e,this.state.id)}>CONFIRM</Button>
                                <Button className="button" onClick={this.onhandleHide}>CANCLE</Button>
                            </div>
                            </Modal.Footer>
                    </Modal>

                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userList: state.app.employees,
    tableHeader : state.app.employeeTaleHeaders
})


export default withRouter(connect(
    mapStateToProps,
    dispatch => bindActionCreators({
        loadEmployeeInfo,deleteEmployeeInfo,updateEmployeeInfo,
    }, dispatch),
)(UserList));