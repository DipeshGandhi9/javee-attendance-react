import React from 'react';
import { Button, Form, Grid, FormControl, Row, Col, Table, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import Moment from 'moment';

import './Pages.css';

import SideNavBar from '../components/SideNavBar.js';
import { loadFilterAttendance } from '../actions/attendanceActions';
import { loadEmployeeInfo } from '../actions/employeeActions'

class Attendance extends React.Component {
  constructor(props) {
    super(props);

    let yearList = [];
    var start = new Date().getFullYear() - 1;
    var end = new Date().getFullYear();
    for (var year = end; year >= start; year--) {
      yearList.push(year);
    }

    this.state = {
      attendanceObj: {
        "startDate": new Date(new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-01"),
        "endDate": new Date(),
      },
      monthYearObject: {
        "month": new Date().getMonth() + 1,
        "year": new Date().getFullYear(),
      },
      'monthList': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      yearList,
      'currentMonth': "",
      'currentYear': "",
    };
  }

  componentDidMount = () => {
    this.props.loadEmployeeInfo();
    this.props.loadFilterAttendance(this.state.attendanceObj);
    this.setState({
      'currentMonth': Moment(new Date()).format('MMMM'),
      'currentYear': Moment(new Date()).format('YYYY')
    });
  }

  onEmployeeChangeHandler = (e) => {
    const { attendanceObj } = this.state;
    if (e.target.value !== "") {
      attendanceObj["employeeId"] = e.target.value;
    }
    else {
      delete attendanceObj["employeeId"];
    }
    this.setState({ attendanceObj });
  }

  onMonthChangeHandler = (e) => {
    const { monthYearObject } = this.state;
    monthYearObject["month"] = parseInt(e.target.value, 10) + 1;
    this.setState({ monthYearObject });
    console.log(this.state);
  }

  onYearChangeHandler = (e) => {
    const { monthYearObject } = this.state;
    monthYearObject["year"] = parseInt(e.target.value, 10);
    this.setState({ monthYearObject });
    console.log(this.state);
  }

  onSearch = () => {
    const { attendanceObj, monthYearObject } = this.state;
    attendanceObj["startDate"] = new Date(monthYearObject.year + "-" + monthYearObject.month + "-01");
    if ((monthYearObject.month - 1 === new Date().getMonth()) && (monthYearObject.year === new Date().getFullYear())) {
      attendanceObj["endDate"] = new Date();
    }
    else {
      attendanceObj["endDate"] = new Date(monthYearObject.year, monthYearObject.month, 0);
    }
    this.props.loadFilterAttendance(this.state.attendanceObj);
  }

  render() {
    let hasEmployee;
    if (this.props.employeeList.length !== undefined) {
      hasEmployee = (this.props.employeeList.length !== 0) ? true : false;
    }
    let hasAttendances = (this.props.filterAttendance.length !== 0) ? true : false;

    return (
      <div>
        <SideNavBar />
        <Grid>
          <div className="flex">
            <Row className="mb-10 mr-15 width-100" >

              <Col lg={4} md={4} sm={4} className="mb-10">
                <Form horizontal>
                  {hasEmployee ?
                    <FormControl componentClass="select" name='employeeName' onChange={this.onEmployeeChangeHandler}>
                      <option value="">{hasEmployee ? "--Select Employee--" : "No Employees"}</option>
                      {this.props.employeeList.map((employee) => <option key={employee.id} value={employee.id} >{employee.firstName}</option>)}
                    </FormControl> :
                    <FormControl componentClass="select" name='employeeName'>
                      <option>{this.props.employeeList.firstName}</option>
                    </FormControl>}
                </Form>
              </Col>

              <Col lg={4} md={4} sm={4} className="mb-10">
                <Form horizontal>
                  <FormControl componentClass="select" name="month" onChange={this.onMonthChangeHandler}>
                    {this.state.monthList.map((month, i) => (this.state.currentMonth === month) ? <option key={i} value={i} selected >{month}</option> : <option key={i} value={i} >{month}</option>)}
                  </FormControl>
                </Form>
              </Col>

              <Col lg={4} md={4} sm={4} className="mb-10">
                <Form horizontal>
                  <FormControl componentClass="select" name="year" onChange={this.onYearChangeHandler}>
                    {this.state.yearList.map((year, i) => (this.state.currentYear === year) ? <option key={i} value={year} selected>{year}</option> : <option key={i} value={year} >{year}</option>)}
                  </FormControl>
                </Form>
              </Col>
            </Row>

            <div>
              <Button onClick={this.onSearch}>
                <Glyphicon glyph="search" />
              </Button>
            </div>
          </div>

          <Row>
            <Col lg={12}>
              <Table responsive bordered striped >
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
                  {this.props.filterAttendance.map((user) => {
                    return (
                      <tr key={user.id}>
                        <td>{Moment(user.date).format('DD-MM-YYYY')}</td>
                        <td>{user.employee ? user.employee.firstName + " " + user.employee.lastName : ""}</td>
                        <td>{user.timeInDate ? Moment(user.timeInDate).format('h:mm:ss a') : ""}</td>
                        <td>{user.timeOutDate ? Moment(user.timeOutDate).format('h:mm:ss a') : ""}</td>
                      </tr>
                    );
                  })}
                </tbody>
                
              </Table>
            </Col>
          </Row>
        </Grid>
        {hasAttendances ? "" : <h4 align="center" style={{ color: 'grey' }}> No Attendance are available to display.</h4>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  employeeList: state.app.employees,
  tableHeader: state.app.attendancesHeaders,
  filterAttendance: state.app.filterAttendance,
})

export default withRouter(connect(
  mapStateToProps,
  dispatch => bindActionCreators({
    loadEmployeeInfo, loadFilterAttendance
  }, dispatch)
)(Attendance));
