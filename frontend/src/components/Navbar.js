import React from "react";
import { Navbar, NavbarBrand, Image, Nav } from "react-bootstrap";
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
          <Nav.Item>
            <Nav.Link onClick={this.handleLogout} justify>
              <Image
                src={require("../Images/logout.png")}
                roundedCircle
                height="25px"
                width="25px"
              />
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
              <Image
                src={require("../Images/photo.jpg")}
                roundedCircle
                height="45px"
                width="45px"
              />
            </Nav.Link>
          </Nav.Item>
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

export default connect(null, mapDispatchToProps)(NavBar);
