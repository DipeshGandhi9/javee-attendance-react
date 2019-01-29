import React from 'react';
import { Button, Form, Grid, FormControl, Row, Col, Table, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import Moment from 'moment';

import './Pages.css';

import SideNavBar from '../components/SideNavBar.js';
import { loadAttendance  } from '../actions/attendanceActions';
import {loadEmployeeInfo} from '../actions/employeeActions'


class Attendance extends React.Component {
  constructor(props) {
    super(props);
    
    this.state= {
      'month': ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      'year': ['2018', '2017', '2016', '2015']
    };
  }

  componentDidMount=()=>{
    this.props.loadEmployeeInfo();
    this.props.loadAttendance();
  }

  onChangeHandler=(e)=> {
    this.setState((state) => {
      state.history[e.target.name] = e.target.value;
      return state;
    });
  }

  render() {
    return (
      <div>
        <SideNavBar />
        <Grid>
          <div className="flex">
            <Row className="mb-10 mr-15 width-100" >

              <Col lg={4} md={4} sm={4} className="mb-10">
                <Form horizontal>
                  <FormControl componentClass="select" name='employeeName' onChange={this.onChangeHandler}>
                    {this.props.employeeList.map((employee) => <option key={employee.id} value={employee.firstName} >{employee.firstName}</option>)}
                  </FormControl>
                </Form>
              </Col>

              <Col lg={4} md={4} sm={4} className="mb-10">
                <Form horizontal>
                  <FormControl componentClass="select" name="month" onChange={this.onChangeHandler}>
                    {this.state.month.map((month, i) => <option key={i} value={month} >{month}</option>)}
                  </FormControl>
                </Form>
              </Col>

              <Col lg={4} md={4} sm={4} className="mb-10">
                <Form horizontal>
                  <FormControl componentClass="select" name="year" onChange={this.onChangeHandler}>
                    {this.state.year.map((year, i) => <option key={i} value={year} >{year}</option>)}
                  </FormControl>
                </Form>
              </Col>
            </Row>

            <div>
              <Button>
                <Glyphicon glyph="search" />
              </Button>
            </div>
          </div>

          <Row>
            <Col lg={12}>
              <Table responsive bordered condensed>
                <thead>
                  <tr>
                    <th>
                      {this.props.tableHeader.date}
                    </th>
                    <th>
                      {this.props.tableHeader.employeeName}
                    </th>
                    <th>
                      {this.props.tableHeader.timeIn}
                    </th>
                    <th>
                      {this.props.tableHeader.timeOut}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.attendances.map((user, id) => {
                    console.log({user});
                    console.log()
                    return (
                      <tr key={user.id}>
                        <td>{Moment(user.date).format('DD-MM-YYYY')}</td>
                        <td>{user.employee ? user.employee.firstName + " " + user.employee.lastName : ""}</td>
                        <td>{user.timeInDate ? Moment(user.timeInDate).format('h:mm:ss a'):""}</td>
                        <td>{user.timeOutDate ? Moment(user.timeOutDate).format('h:mm:ss a'):""}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  employeeList: state.app.employees,
  tableHeader : state.app.attendancesHeaders,
  attendances :state.app.attendances
})

export default withRouter(connect(
  mapStateToProps,
  dispatch => bindActionCreators({
      loadAttendance,loadEmployeeInfo
  }, dispatch)
)(Attendance));

