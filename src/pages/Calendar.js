import React from 'react';
import { Button, Form, Grid, FormControl, Row, Col, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import './Pages.css';

import SideNavBar from '../components/SideNavBar.js';
import {loadEmployeeInfo} from '../actions/employeeActions'

class Calendar extends React.Component {
    constructor(props) {
      super(props);
      
      this.state= {
        'month': ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        'year': ['2018', '2017', '2016', '2015']
      };
    }

    componentDidMount=()=>{
      this.props.loadEmployeeInfo();
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