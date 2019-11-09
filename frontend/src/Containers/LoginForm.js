import React from "react";
import "../Styles/header.css";
import { Navbar, NavbarBrand, Image } from "react-bootstrap";
import Login from "../components/Login";

class LoginForm extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <Navbar id="navtheme" fixed="top">
          <NavbarBrand>
            <Image
              src={require("../Images/logo.png")}
              height="39px"
              width="150px"
              style={{ paddingLeft: "15px" }}
            />
          </NavbarBrand>
        </Navbar>
        <div className="overlay"></div>
        <div id="form-container">
          <Login />
        </div>
      </div>
    );
  }
}

export default LoginForm;
