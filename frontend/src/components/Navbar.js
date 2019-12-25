import React from "react";
import { Navbar, NavbarBrand, Image, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { DualRing } from "react-spinners-css";
import * as actions from "../redux_store/actions/authenticate";
import * as profileActions from "../redux_store/actions/dataAction";
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

  componentWillMount() {
    this.props.getProfileImage();
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
          <Nav.Item style={{ padding: "10px" }}>
            <NavLink to="/" onClick={this.handleLogout} justify>
              <Image
                src={require("../Images/logout.png")}
                roundedCircle
                height="25px"
                width="25px"
              />
            </NavLink>
          </Nav.Item>
          <NavLink to="/restaurants" style={{ textDecoration: "none" }}>
            <Nav.Item className="menuItem">Explore Restaurants</Nav.Item>
          </NavLink>
          <NavLink to="/connections" style={{ textDecoration: "none" }}>
            <Nav.Item className="menuItem">Connections</Nav.Item>
          </NavLink>
          <NavLink to="/friendrequest" style={{ textDecoration: "none" }}>
            <Nav.Item className="menuItem">Friend request</Nav.Item>
          </NavLink>

          <NavLink
            to="/"
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center"
            }}
            justify
          >
            <Nav.Item
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center"
              }}
            >
              {this.props.loadingImage ? (
                <DualRing color="#FFFFFF" size={30} />
              ) : (
                <Image
                  src={this.props.image.image}
                  roundedCircle
                  height="45px"
                  width="45px"
                />
              )}
            </Nav.Item>
          </NavLink>
        </Nav>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    image: state.dataReducer.image,
    loadingImage: state.dataReducer.imageLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout()),
    getProfileImage: () => {
      dispatch(profileActions.getImage());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
