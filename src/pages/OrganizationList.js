import React from 'react';
import { Grid, Row, Col, Table, Glyphicon, Button, OverlayTrigger, Tooltip, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import './Pages.css';
import SideNavBar from '../components/SideNavBar.js';
import { loadOrganizationInfo, deleteOrganizationInfo } from '../actions/organizationActions';

const tooltip = (
    <Tooltip id="tooltip">Add Organization</Tooltip>
);

class OrganizationList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            id: ""
        }
    }

    onhandleHide = () => {
        this.setState({ show: false });
    }

    componentDidMount = () => {
        this.props.loadOrganizationInfo();
    }

    deleteEmployee = (e, id) => {
        e.preventDefault();
        this.props.deleteOrganizationInfo(id);
        this.setState({ show: false });
    }

    render() {
        let hasEmployees = (this.props.organizationList.length !== 0) ? true : false;
        return (
            <div>
                <SideNavBar />
                <Grid>
                    <Row>
                        <Col lg={12}>
                            <div>
                                <Link to="organization">
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
                                                {this.props.tableHeader.organizationName}
                                            </th>
                                            <th>
                                                {this.props.tableHeader.address}
                                            </th>
                                            <th>
                                                {this.props.tableHeader.contactPerson}
                                            </th>
                                            <th>
                                                {this.props.tableHeader.email}
                                            </th>
                                            <th>
                                                {this.props.tableHeader.totalMember}
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
                                        {this.props.organizationList.map((organization, id) => {
                                            return (
                                                <tr key={organization.id}>
                                                    <td>{organization.id}</td>
                                                    <td>{organization.organizationName}</td>
                                                    <td>{organization.address}</td>
                                                    <td>{organization.firstName} {organization.lastName}</td>
                                                    <td>{organization.email}</td>
                                                    <td></td>
                                                    <td><Link to={{ pathname: "/organization", search: "id=" + organization.id }} className="icon-button"><Glyphicon glyph="edit" /></Link> </td>
                                                    <td onClick={() => { this.setState({ show: true, id: organization.id }) }}><Glyphicon glyph="remove" /> </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        {hasEmployees ? "" : <h4 align="center" style={{ color: 'grey' }}> No Organizations are available to display. Please add new employee</h4>}
                    </div>

                    <Modal show={this.state.show} onHide={this.onhandleHide} container={this} aria-labelledby="contained-modal-title" className="modal-width">
                        <Modal.Header closeButton>
                            <h3>
                                Are you sure?
                            </h3>
                        </Modal.Header>
                        <Modal.Body>
                            Do you want to delete this organization?
                            </Modal.Body>
                        <Modal.Footer>
                            <div>
                                <Button className="delete-modal-button" onClick={(e) => this.deleteOrganizationInfo(e, this.state.id)}>CONFIRM</Button>
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
    organizationList: state.app.organizationList,
    tableHeader: state.app.organizationHeaders
})

export default withRouter(connect(
    mapStateToProps,
    dispatch => bindActionCreators({
        loadOrganizationInfo, deleteOrganizationInfo
    }, dispatch),
)(OrganizationList));
