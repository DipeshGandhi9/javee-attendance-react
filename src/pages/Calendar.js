import React from 'react';
import { Button, Form, Grid, FormControl, Row, Col, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { loadAttendance } from '../actions/attendanceActions';
import Moment from 'moment';

import './Pages.css';

import SideNavBar from '../components/SideNavBar.js';
import { loadEmployeeInfo } from '../actions/employeeActions'

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
    this.setState({ calenderObj });
    this.calenderCard();
  }

  calenderCard = () => {
    let startDate = new Date(this.state.calenderObj.month + "-01-" + this.state.calenderObj.year);
    let currentMonth = startDate.getMonth() + 1;
    while ((this.state.calenderObj.month !== "") && (this.state.calenderObj.year !== "") && (currentMonth === this.state.calenderObj.month)) {
      let weekDay = this.state.weekDays[new Date(new Date(startDate).getTime() - 24 * 60 * 60 * 1000).getDay()];
      let col = document.createElement("div");

      let card = document.createElement("div");
      card.className = "card mt-10 mb-10";

      let cardDate = document.createElement("div");
      let cardInfo = document.createElement("div");
      if (weekDay === "Sun") {
        col.className = "column fullColumn";
        cardDate.className = "card-text-sunday sunday-card";
      }
      else {
        col.className = "column";
        if ((this.state.calenderObj.year < new Date().getFullYear()) || (this.state.calenderObj.month - 1 < new Date().getMonth())) {
          cardDate.className = "card-text absentday-card";
        }
        else
          if (((this.state.calenderObj.month - 1 > new Date().getMonth()) && (this.state.calenderObj.year >= new Date().getFullYear())) || (startDate.getDate() >= new Date().getDate())) {
            cardDate.className = "card-text remainingday-card";
          }
          else {
            cardDate.className = "card-text absentday-card";
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

  onEmplopyeeChangeHandler = (e) => {
    const { calenderObj } = this.state;
    calenderObj["id"] = e.target.value;
    this.setState({ calenderObj });
  }

  onMonthChangeHandler = (e) => {
    let month = Number(e.target.value) + 1;
    const { calenderObj } = this.state;
    calenderObj["month"] = month;
    this.setState({ calenderObj });
  }

  onYearChangeHandler = (e) => {
    let year = e.target.value;
    const { calenderObj } = this.state;
    calenderObj["year"] = year;
    this.setState({ calenderObj });
  }

  calendarCardGenerator = () => {

    document.getElementById("date-card-box").innerHTML = "";
    if (this.props.attendance.length === 0) {
      this.calenderCard();
    }
    else {
      let startDate = new Date(this.state.calenderObj.month + "-01-" + this.state.calenderObj.year);
      let currentMonth = startDate.getMonth() + 1;

      let timeIn = [];
      for (var j = 0; j < this.props.attendance.length; j++) {
        if (this.props.attendance[j].employee.id.toString() === this.state.calenderObj.id) {
          timeIn.push(this.props.attendance[j].timeInDate);
        }
      }

      let timeOut = [];
      for (var k = 0; k < this.props.attendance.length; k++) {
        if (this.props.attendance[k].employee.id.toString() === this.state.calenderObj.id) {
          timeOut.push(this.props.attendance[k].timeOutDate);
        }
      }

      let DateTimeIn = [];
      let DateTimeOut = [];

      while ((this.state.calenderObj.month !== "") && (this.state.calenderObj.year !== "") && (currentMonth === this.state.calenderObj.month)) {
        let date = Moment(startDate).format('DD-MM-YYYY');
        let weekDay = this.state.weekDays[new Date(new Date(startDate).getTime() - 24 * 60 * 60 * 1000).getDay()];
        let col = document.createElement("div");

        let card = document.createElement("div");
        card.className = "card mt-10 mb-10";

        let cardDate = document.createElement("div");
        let cardInfo = document.createElement("div");
        let d;

        if (weekDay === "Sun") {
          col.className = "column fullColumn";
          cardDate.className = "card-text-sunday sunday-card";
        }

        else {
          for (var i = 0; i < this.props.attendance.length; i++) {
            if ((Moment(this.props.attendance[i].date).format('DD-MM-YYYY') === date) && (this.props.attendance[i].employee.id.toString() === this.state.calenderObj.id)) {
              d = date;
              col.className = "column";
              cardDate.className = "card-text presentday-card"
              DateTimeIn = [];
              for (var u = 0; u < timeIn.length; u++) {
                if (d === Moment(timeIn[u]).format("DD-MM-YYYY")) {
                  DateTimeIn.push(timeIn[u]);
                }
              }
              DateTimeOut = [];
              for (var v = 0; v < timeOut.length; v++) {
                if (d === Moment(timeOut[v]).format("DD-MM-YYYY")) {
                  DateTimeOut.push(timeOut[v]);
                }
              }
              cardInfo.innerHTML = "Time In : " + Moment(DateTimeIn[0]).format('h:mm:ss a') + "<br>Time Out : " + Moment(DateTimeOut[DateTimeOut.length - 1]).format('h:mm:ss a');
              cardInfo.className = "text-size";
              break;
            }
            else {
              col.className = "column";
              if ((this.state.calenderObj.year < new Date().getFullYear()) || (this.state.calenderObj.month - 1 < new Date().getMonth())) {
                cardDate.className = "card-text absentday-card";
              }
              else
                if (((this.state.calenderObj.month - 1 > new Date().getMonth()) && (this.state.calenderObj.year >= new Date().getFullYear())) || (startDate.getDate() >= new Date().getDate())) {
                  cardDate.className = "card-text remainingday-card";
                }
                else {
                  cardDate.className = "card-text absentday-card";
                }
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
  }

  render() {

    const { yearList } = this.state;
    let hasEmployee = (this.props.employeeList.length !== 0) ? true : false;

    return (
      <div>
        <SideNavBar />
        <Grid>
          <div className="flex">
            <Row className="mb-10 mr-15 width-100" >

              <Col lg={4} md={4} sm={4} className="mb-10">
                <Form horizontal>
                  <FormControl componentClass="select" name='employeeName' onChange={this.onEmplopyeeChangeHandler}>
                    <option>{hasEmployee ? "--Select Employee--" : "No Employees"}</option>
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
                    {yearList.map((year, i) => (this.state.currentYear === year.toString()) ? <option key={i} value={year} selected >{year}</option> : <option key={i} value={year} >{year}</option>)}
                  </FormControl>
                </Form>
              </Col>

            </Row>

            <div>
              <Button onClick={this.calendarCardGenerator}>
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
