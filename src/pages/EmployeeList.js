import React from 'react';
import { Grid, Row, Col, Table, Glyphicon, Button, OverlayTrigger, Tooltip, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import './Pages.css';
import SideNavBar from '../components/SideNavBar.js';
import { loadEmployeeInfo, deleteEmployeeInfo } from '../actions/employeeActions';

const tooltip = (
    <Tooltip id="tooltip">Add Employee</Tooltip>
);

class EmployeeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            id: "",
            noEmployee: ""
        }
    }

    onhandleHide = () => {
        this.setState({ show: false });
    }

    componentDidMount = () => {
        this.props.loadEmployeeInfo();
    }

    deleteEmployee = (e, id) => {
        e.preventDefault();
        this.props.deleteEmployeeInfo(id);
        this.setState({ show: false });
    }

    render() {
        let hasEmployees = (this.props.employeeList.length !== 0) ? true : false;
        return (
            <div>
                <SideNavBar />
                <Grid>
                    <Row>
                        <Col lg={12}>
                            <div>
                                <Link to="employee">
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
                                    <tbody >
                                        {this.props.employeeList.map((employee, id) => {
                                            return (
                                                <tr key={employee.id}>
                                                    <td>{employee.id}</td>
                                                    <td>{employee.firstName}</td>
                                                    <td>{employee.lastName}</td>
                                                    <td>{employee.address}</td>
                                                    <td>{employee.gender}</td>
                                                    <td>{employee.email}</td>
                                                    <td>{employee.phoneNumber}</td>
                                                    <td><Link to={{ pathname: "/employee", search: "id=" + employee.id }} className="icon-button"><Glyphicon glyph="edit" /></Link> </td>
                                                    <td onClick={() => { this.setState({ show: true, id: employee.id }) }}><Glyphicon glyph="remove" /> </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        {hasEmployees ? "" : <h4 align="center" style={{ color: 'grey' }}> No Employees are available to display. Please add new employee</h4>}
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
                                <Button className="delete-modal-button" onClick={(e) => this.deleteEmployee(e, this.state.id)}>CONFIRM</Button>
                                <Button className="delete-modal-button" onClick={this.onhandleHide}>CANCLE</Button>
                            </div>
                        </Modal.Footer>
                    </Modal>

                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    employeeList: state.app.employees,
    tableHeader: state.app.employeeTaleHeaders
})

export default withRouter(connect(
    mapStateToProps,
    dispatch => bindActionCreators({
        loadEmployeeInfo, deleteEmployeeInfo
    }, dispatch),
)(EmployeeList));