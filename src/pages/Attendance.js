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

    this.state = {
      attendanceObj: {
        "id": undefined,
        "month": new Date().getMonth() + 1,
        "year": new Date().getFullYear(),
        "startDate": Moment(new Date(new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-01")).format('YYYY-MM-DD hh:mm:ss'),
        "endDate": Moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
      },
      'month': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      'year': ['2019', '2018'],
      currentMonth: "",
      currentYear: ""
    };
  }

  componentDidMount = () => {
    this.props.loadEmployeeInfo();
    this.props.loadFilterAttendance(this.state.attendanceObj);
    this.setState({
      currentMonth: Moment(new Date()).format('MMMM'),
      currentYear: Moment(new Date()).format('YYYY')
    });
  }

  onEmployeeChangeHandler = (e) => {
    const { attendanceObj } = this.state;
    if (e.target.value === "") {
      attendanceObj["id"] = undefined;
    }
    else {
      attendanceObj["id"] = e.target.value;
    }
    this.setState({ attendanceObj });
  }

  onMonthChangeHandler = (e) => {
    const { attendanceObj } = this.state;
    attendanceObj["month"] = parseInt(e.target.value, 10) + 1;
    this.setState({ attendanceObj });
  }

  onYearChangeHandler = (e) => {
    const { attendanceObj } = this.state;
    attendanceObj["year"] = parseInt(e.target.value, 10);
    this.setState({ attendanceObj });
  }

  onSearch = () => {
    const { attendanceObj } = this.state;
    attendanceObj["startDate"] = Moment(new Date(attendanceObj.year + "-" + attendanceObj.month + "-01")).format("YYYY-MM-DD hh:mm:ss");
    if ((attendanceObj.month - 1 === new Date().getMonth()) && (attendanceObj.year === new Date().getFullYear())) {
      attendanceObj["endDate"] = Moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
    }
    else {
      attendanceObj["endDate"] = Moment(new Date(attendanceObj.year, attendanceObj.month, 0)).format("YYYY-MM-DD hh:mm:ss");
    }
    this.props.loadFilterAttendance(this.state.attendanceObj);
  }

  render() {

    let hasEmployee = (this.props.employeeList.length !== 0) ? true : false;
    let hasAttendances = (this.props.filterAttendance.length !== 0) ? true : false;
   
    return (
      <div>
        <SideNavBar />
        <Grid>
          <div className="flex">
            <Row className="mb-10 mr-15 width-100" >

              <Col lg={4} md={4} sm={4} className="mb-10">
                <Form horizontal>
                  <FormControl componentClass="select" name='employeeName' onChange={this.onEmployeeChangeHandler}>
                    <option value="">{hasEmployee ? "--Select Employee--" : "No Employees"}</option>
                    {this.props.employeeList.map((employee) => <option key={employee.id} value={employee.id} >{employee.firstName}</option>)}
                  </FormControl>
                </Form>
              </Col>

              <Col lg={4} md={4} sm={4} className="mb-10">
                <Form horizontal>
                  <FormControl componentClass="select" name="month" onChange={this.onMonthChangeHandler}>
                    {this.state.month.map((month, i) => (this.state.currentMonth === month) ? <option key={i} value={i} selected>{month}</option> : <option key={i} value={i} >{month}</option>)}
                  </FormControl>
                </Form>
              </Col>

              <Col lg={4} md={4} sm={4} className="mb-10">
                <Form horizontal>
                  <FormControl componentClass="select" name="year" onChange={this.onYearChangeHandler}>
                    {this.state.year.map((year, i) => (this.state.currentYear === year) ? <option key={i} value={year} selected>{year}</option> : <option key={i} value={year} >{year}</option>)}
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
