import React from 'react';
import { Button, Form, Grid, FormControl, Row, Col, Table, Glyphicon } from 'react-bootstrap';

import SideNavBar from '../components/SideNavBar.js';
import './Pages.css';

export default class History extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { history: props.history, list: {} }
    this.state.list = {
      'employeeName': ['Mayur', 'Priya', 'Unnati'],
      'month': ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      'year': ['2018', '2017', '2016', '2015']
    };
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
                    {this.state.list.employeeName.map((employeeName, i) => <option key={i} value={employeeName} >{employeeName}</option>)}
                  </FormControl>
                </Form>
              </Col>

              <Col lg={4} md={4} sm={4} className="mb-10">
                <Form horizontal>
                  <FormControl componentClass="select" name="month" onChange={this.onChangeHandler}>
                    {this.state.list.month.map((month, i) => <option key={i} value={month} >{month}</option>)}
                  </FormControl>
                </Form>
              </Col>

              <Col lg={4} md={4} sm={4} className="mb-10">
                <Form horizontal>
                  <FormControl componentClass="select" name="year" onChange={this.onChangeHandler}>
                    {this.state.list.year.map((year, i) => <option key={i} value={year} >{year}</option>)}
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
                      {this.props.tableHeader.name}
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
                  <tr>
                    <td>10/30/2018</td>
                    <td>Mayur</td>
                    <td>9:00 AM</td>
                    <td>7:00 PM</td>
                  </tr>
                  <tr>
                    <td>10/30/2018</td>
                    <td>Priya</td>
                    <td>9:00 AM</td>
                    <td>7:00 PM</td>
                  </tr>
                  <tr>
                    <td>10/30/2018</td>
                    <td>Unnati</td>
                    <td>9:00 AM</td>
                    <td>7:00 PM</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

History.defaultProps = {
  tableHeader: {
    'date': 'Date',
    'name': 'Name',
    'timeIn': 'Time-In',
    'timeOut': 'Time-Out'
  }
}
