import React from 'react';
import { Button, Form, Grid, FormControl, Row, Col, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { loadAttendance } from '../actions/attendanceActions';
import Moment from 'moment';
import Cookies from 'universal-cookie';

import './Pages.css';

import SideNavBar from '../components/SideNavBar.js';
import { loadEmployeeInfo } from '../actions/employeeActions'

let cookies = new Cookies();

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    let yearList = [];
    var start = new Date().getFullYear() - 1;
    var end = new Date().getFullYear();
    for (var year = end; year >= start; year--) {
      yearList.push(year);
    }
    this.state = {
      yearList,
      calenderObj: {},
      'month': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      'weekDays': ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
      'currentMonth': "",
      'currentYear': "",
      'isSearchClick': false
    };
  }

  componentDidMount = () => {
    const { calenderObj } = this.state;
    this.props.loadEmployeeInfo();
    this.props.loadAttendance();
    this.setState({
      'currentMonth': Moment(new Date()).format('MMMM'),
      'currentYear': Moment(new Date()).format('YYYY')
    });
    calenderObj["month"] = new Date().getMonth() + 1;
    calenderObj["year"] = new Date().getFullYear();
    calenderObj["id"] = cookies.get("employeeId");
    this.setState({ calenderObj });
    this.setState({ isSearchClick: true });
    this.calendarCardGenerator();
  }

  componentDidUpdate = () => {
    if (this.state.isSearchClick) {
      this.calendarCardGenerator();
    }
  }

  onChangeHandler = (e) => {
    this.setState({ isSearchClick: false });
    const { calenderObj } = this.state;
    if (e.target.name === "month") {
      calenderObj["month"] = Number(e.target.value) + 1;
    }
    else {
      calenderObj[e.target.name] = e.target.value;
    }
    this.setState({ calenderObj });
  }

  calendarCardGenerator = () => {
    document.getElementById("date-card-box").innerHTML = "";

    let startDate = new Date(this.state.calenderObj.month + "-01-" + this.state.calenderObj.year);
    let currentMonth = startDate.getMonth() + 1;

    let timeIn = [], timeOut = [], DateTimeIn = [], DateTimeOut = [], totalHours, timeInterval, hours;

    for (var j in this.props.attendance) {
      if (this.props.attendance[j].employee.id.toString() === this.state.calenderObj.id) {
        timeIn.push(this.props.attendance[j].timeInDate);
      }
    }

    for (var k in this.props.attendance) {
      if (this.props.attendance[k].employee.id.toString() === this.state.calenderObj.id) {
        timeOut.push(this.props.attendance[k].timeOutDate);
      }
    }

    while ((currentMonth === this.state.calenderObj.month)) {
      let newTime = 0, getHours;
      let date = Moment(startDate).format('DD-MM-YYYY');
      let weekDay = this.state.weekDays[new Date(new Date(startDate).getTime() - 24 * 60 * 60 * 1000).getDay()];
      let col = document.createElement("div");

      let card = document.createElement("div");
      card.className = "card mt-10 mb-10";

      let cardDate = document.createElement("div");
      let cardInfo = document.createElement("div");

      col.className = "column";
      if ((this.state.calenderObj.year < new Date().getFullYear()) || (this.state.calenderObj.month - 1 < new Date().getMonth())) {
        cardDate.className = "card-text absentday-card";
      }
      else {
        if (((this.state.calenderObj.month - 1 > new Date().getMonth()) && (this.state.calenderObj.year >= new Date().getFullYear())) || (startDate.getDate() >= new Date().getDate())) {
          cardDate.className = "card-text remainingday-card";
        }
        else {
          cardDate.className = "card-text absentday-card";
        }
      }

      if (weekDay === "Sun") {
        col.className = "column fullColumn";
        cardDate.className = "card-text-sunday sunday-card";
      }

      if (this.state.calenderObj.id !== undefined) {
        for (var i in this.props.attendance) {
          if ((Moment(this.props.attendance[i].date).format('DD-MM-YYYY') === date) && (this.props.attendance[i].employee.id.toString() === this.state.calenderObj.id)) {
            cardDate.className = "card-text presentday-card"
            DateTimeIn = [];
            for (var u in timeIn) {
              if (date === Moment(timeIn[u]).format("DD-MM-YYYY")) {
                DateTimeIn.push(timeIn[u]);
              }
            }
            DateTimeOut = [];
            for (var v in timeOut) {
              if (date === Moment(timeOut[v]).format("DD-MM-YYYY")) {
                DateTimeOut.push(timeOut[v]);
              }
            }

            for (var h in DateTimeIn) {
              timeInterval = Moment(DateTimeOut[h]).diff(Moment(DateTimeIn[h]));
              hours = Moment.utc(Moment.duration(timeInterval).asMilliseconds());
              getHours = newTime + hours;
              newTime = getHours;
            }
            totalHours = Moment.utc(Moment.duration(getHours).asMilliseconds()).format("H:mm:ss");
            cardInfo.innerHTML = "<div class='text-size'><span class='glyphicon glyphicon-log-in'> " + Moment(DateTimeIn[0]).format('h:mmA') + "</div><div class='text-size'><span class='glyphicon glyphicon-log-out'> " + Moment(DateTimeOut[DateTimeOut.length - 1]).format('h:mmA') + "</div><div class='text-size'><span class='glyphicon glyphicon-time'> " + totalHours + "</div>";
            cardInfo.className = "mt-5 m-rl-5";
            break;
          }

        }
      }
      cardDate.innerHTML = startDate.getDate() + "  " + weekDay;

      card.appendChild(cardDate);
      card.appendChild(cardInfo);
      col.appendChild(card);
      document.getElementById("date-card-box").appendChild(col);

      let nextDate = new Date(new Date(startDate).getTime() + 24 * 60 * 60 * 1000);
      startDate = nextDate;
      currentMonth = startDate.getMonth() + 1;
    }
  }

  render() {

    const { yearList } = this.state;
    let hasEmployee = false;
    if (this.props.employeeList.length !== undefined)
      hasEmployee = (this.props.employeeList.length !== 0) ? true : false;

    return (
      <div>
        <SideNavBar />
        <Grid>
          <div className="flex">
            <Row className="mb-10 mr-15 width-100" >

              <Col lg={4} md={4} sm={4} className="mb-10">
                <Form horizontal>
                  {hasEmployee ?
                    <FormControl componentClass="select" name='id' onChange={this.onChangeHandler}>
                      <option value="">{hasEmployee ? "--Select Employee--" : "No Employees"}</option>
                      {this.props.employeeList.map((employee) => <option key={employee.id} value={employee.id} >{employee.firstName}</option>)}
                    </FormControl> :
                    <FormControl componentClass="select" name='id' onChange={this.onEmployeeChangeHandler}>
                      <option>{this.props.employeeList.firstName}</option>
                    </FormControl>}
                </Form>
              </Col>

              <Col lg={4} md={4} sm={4} className="mb-10">
                <Form horizontal>
                  <FormControl componentClass="select" name="month" onChange={this.onChangeHandler}>
                    {this.state.month.map((month, i) => (this.state.currentMonth === month) ? <option key={i} value={i} selected>{month}</option> : <option key={i} value={i} >{month}</option>)}
                  </FormControl>
                </Form>
              </Col>

              <Col lg={4} md={4} sm={4} className="mb-10">
                <Form horizontal>
                  <FormControl componentClass="select" name="year" onChange={this.onChangeHandler}>
                    {yearList.map((year, i) => (this.state.currentYear === year.toString()) ? <option key={i} value={year} selected >{year}</option> : <option key={i} value={year} >{year}</option>)}
                  </FormControl>
                </Form>
              </Col>
            </Row>
            <div>
              <Button onClick={() => { this.setState({ isSearchClick: true }) }}>
                <Glyphicon glyph="search" />
              </Button>
            </div>
          </div>

          <div id="date-card-box" className="calendar-box ">
          </div>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  employeeList: state.app.employees,
  attendance: state.app.attendances
})

export default withRouter(connect(
  mapStateToProps,
  dispatch => bindActionCreators({
    loadEmployeeInfo, loadAttendance
  }, dispatch)
)(Calendar));
