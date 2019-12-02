import React from "react";
import { Navbar, NavbarBrand, Image, Nav } from "react-bootstrap";
<<<<<<< HEAD
=======
import { NavLink } from "react-router-dom";
>>>>>>> gui
import * as actions from "../redux_store/actions/authenticate";
import { connect } from "react-redux";
import "../Styles/header.css";

export class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.onLogout();
  }

  render() {
    return (
      <Navbar
        id="navtheme"
        fixed="top"
        sticky="top"
        inverse
        style={{ zIndex: "9999" }}
      >
        <NavbarBrand href="/">
          <Image
            src={require("../Images/logo.png")}
            height="39px"
            width="150px"
            style={{ paddingLeft: "15px" }}
          />
        </NavbarBrand>
        <Nav className="ml-auto">
<<<<<<< HEAD
          <Nav.Item>
            <Nav.Link onClick={this.handleLogout} justify>
=======
          <Nav.Item style={{ padding: "10px" }}>
            <NavLink to="/" onClick={this.handleLogout} justify>
>>>>>>> gui
              <Image
                src={require("../Images/logout.png")}
                roundedCircle
                height="25px"
                width="25px"
              />
<<<<<<< HEAD
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/restaurants" className="menuItem" justify>
              Explore Restaurants
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="menuItem" justify>
              Inbox
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="menuItem" justify>
              Friend request
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/" justify>
=======
            </NavLink>
          </Nav.Item>
          <NavLink to="/restaurants" style={{ textDecoration: "none" }}>
            <Nav.Item className="menuItem">Explore Restaurants</Nav.Item>
          </NavLink>
          <NavLink to="/inbox" style={{ textDecoration: "none" }}>
            <Nav.Item className="menuItem">Inbox</Nav.Item>
          </NavLink>
          <NavLink to="/friendrequest" style={{ textDecoration: "none" }}>
            <Nav.Item className="menuItem">Friend request</Nav.Item>
          </NavLink>

          <NavLink to="/" justify>
            <Nav.Item>
>>>>>>> gui
              <Image
                src={require("../Images/photo.jpg")}
                roundedCircle
                height="45px"
                width="45px"
              />
<<<<<<< HEAD
            </Nav.Link>
          </Nav.Item>
=======
            </Nav.Item>
          </NavLink>
>>>>>>> gui
        </Nav>
      </Navbar>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
};

<<<<<<< HEAD
export default connect(null, mapDispatchToProps)(NavBar);
=======
export default connect(
  null,
  mapDispatchToProps
)(NavBar);
>>>>>>> gui
