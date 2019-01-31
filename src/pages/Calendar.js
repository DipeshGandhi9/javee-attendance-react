import React from 'react';
import { Button, Form, Grid, FormControl, Row, Col, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import './Pages.css';

import SideNavBar from '../components/SideNavBar.js';
import { loadEmployeeInfo } from '../actions/employeeActions'

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      calenderObj: {},
      'month': ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      'weekDays': ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
    };
  }

  componentDidMount = () => {
    this.props.loadEmployeeInfo();
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

    let startDate = new Date(this.state.calenderObj.month + "-01-" + this.state.calenderObj.year);
    let currentMonth = startDate.getMonth() + 1;
  
    while ((this.state.calenderObj.month !== "") && (this.state.calenderObj.year !== "") && (currentMonth === this.state.calenderObj.month)) {
      let weekDay =this.state.weekDays[new Date(new Date(startDate).getTime() - 24 * 60 * 60 * 1000).getDay()];
      let col = document.createElement("div");

      let card = document.createElement("div");
      card.className = "card mt-10 mb-10";

      let cardData = document.createElement("div");
      
      if(weekDay === "Sun" ){
        col.className = "column fullColumn";
        cardData.className = "card-text sunday-card";
      }
      else{
        col.className = "column";
        cardData.className = "card-text weekday-card";
      }

      cardData.innerHTML = startDate.getDate() + "  " + weekDay;
      
      card.appendChild(cardData);
      col.appendChild(card);
      document.getElementById("date-card-box").appendChild(col);
      
      let nextDate = new Date(new Date(startDate).getTime() + 24 * 60 * 60 * 1000);
      startDate = nextDate;
      currentMonth = startDate.getMonth() + 1;
    }
  }

  render() {
    let yearList = [];
    var start = 1990;
    var end = new Date().getFullYear();
    for (var year = end; year >= start; year--) {
      yearList.push(year);
    }
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
                  <FormControl componentClass="select" name="month" onChange={this.onMonthChangeHandler}>
                    <option></option>
                    {this.state.month.map((month, i) => <option key={i} value={i} >{month}</option>)}
                  </FormControl>
                </Form>
              </Col>

              <Col lg={4} md={4} sm={4} className="mb-10">
                <Form horizontal>
                  <FormControl componentClass="select" name="year" onChange={this.onYearChangeHandler}>
                    <option></option>
                    {yearList.map((year, i) => <option key={i} value={year} >{year}</option>)}
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
          
          <div id="date-card-box" className="calendar-box "></div>

        </Grid>
      </div>
    );
  }
}
 
const mapStateToProps = state => ({
  employeeList: state.app.employees
})

export default withRouter(connect(
  mapStateToProps,
  dispatch => bindActionCreators({
    loadEmployeeInfo
  }, dispatch)
)(Calendar));