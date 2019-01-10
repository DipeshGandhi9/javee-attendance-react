import React from 'react';
import { Col, Table, Glyphicon } from 'react-bootstrap';

import './Pages.css';
import SideNavBar from '../components/SideNavBar.js';

export default class UserList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userList: []
        }

        let userList = [...this.state.userList];
        userList.push({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            gender: this.state.gender,
            email: this.state.email,
            contact: this.state.contact
        });
    }

    render() {
        var userList = this.state.userList;
        return (
            <div>
                <SideNavBar />

                <div className="mt-10">
                    <Col lg={12} >
                        <Table responsive bordered condensed>
                            <thead>
                                <tr>
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

                                {userList.map((user, id) => {
                                    console.log("id.. " + (id + 1));
                                    return (
                                        <tr key={(id + 1)}>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.address}</td>
                                            <td>{user.gender}</td>
                                            <td>{user.email}</td>
                                            <td>{user.contact}</td>
                                            <td><Glyphicon glyph="edit" /> </td>
                                            <td><Glyphicon glyph="remove" /> </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </div>
            </div>
        );
    }
}

UserList.defaultProps = {
    tableHeader: {
        'firstName': 'First Name',
        'lastName': 'Last Name',
        'address': 'Address',
        'gender': 'Gender',
        'email': 'Email',
        'contact': 'Phone Number',
        'edit': 'Edit',
        'delete': 'Delete'
    }
}