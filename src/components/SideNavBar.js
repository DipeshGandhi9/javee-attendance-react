import React, { Component } from 'react';
import { Glyphicon, Navbar, Row, Col } from "react-bootstrap";
import SideNav from 'react-simple-sidenav';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

import './SideNavBar.css';
import '../global.css';

const cookies = new Cookies();

class SideNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNav: false,
    };
  }

  CloseSideNav = () => {
    this.setState({ showNav: false })
  }

  removeUserName = () => {
    cookies.remove('userName');
    cookies.remove("token");
  }

  render() {
    const userName = cookies.get('userName');
    return (
      <div>
        <Navbar fluid >
          <Row>
            <Col xs={5} sm={7}>
              <Navbar.Header>
                <div className="flex ml-20">
                  <div>
                    <Glyphicon glyph="menu-hamburger" className="menu" onClick={() => this.setState({ showNav: true })} />
                  </div>
                  <div>
                    <img src={require("../assets/images/header-logo.png")} alt="Javee Infotech" className="m-10" width="80"></img>
                  </div>
                </div>
              </Navbar.Header>
            </Col>
            <Col xs={7} sm={5}>
              <Navbar.Text pullRight className="pl-10 pr-10" onClick={this.removeUserName}>
                <Link to="">
                  <Glyphicon glyph="log-out" style={{ right: "5px", top: "2px" }}></Glyphicon>
                  <span>Logout</span>
                </Link>
              </Navbar.Text>
              <Navbar.Text pullRight className="pl-10 text">
                <Glyphicon glyph="user" style={{ right: "5px", top: "2px" }}></Glyphicon>
                <span className="userName">{userName}</span>
              </Navbar.Text>
            </Col>
          </Row>
        </Navbar>

        <SideNav
          navStyle={{ width: "70%", maxWidth: "310px" }}
          showNav={this.state.showNav}
          onHideNav={() => this.setState({ showNav: false })}
          title={<img src={require("../assets/images/sidebar-logo.png")} width="140" alt="Javee Infotech"></img>}
          items={
            [<Link to="dashboard"><div onClick={this.CloseSideNav}><Glyphicon glyph="th-large" className="mr-15"></Glyphicon>DashBoard</div></Link>,
            <Link to="attendance"><div onClick={this.CloseSideNav}><Glyphicon glyph="align-center" className="mr-15"></Glyphicon>Attendance</div></Link>,
            <Link to="employeelist"><div onClick={this.CloseSideNav}><Glyphicon glyph="user" className="mr-15"></Glyphicon>Employee</div></Link>,
            <Link to="userlist"><div onClick={this.CloseSideNav}><Glyphicon glyph="lock" className="mr-15"></Glyphicon>User</div></Link>,
            <Link to="calendar"><div onClick={this.CloseSideNav}><Glyphicon glyph="calendar" className="mr-15"></Glyphicon>Calendar</div></Link>
            ]
          }
          titleStyle={{ backgroundColor: '#fff', textAlign: "center" }}
          itemStyle={{ backgroundColor: '#fff', fontSize: "22px", padding: "18px" }}
        />
      </div>
    );
  }
}

export default SideNavBar;
