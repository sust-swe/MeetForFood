import React from "react";
import { Navbar, NavbarBrand, Image } from "react-bootstrap";

class EmptyNav extends React.Component {
  render() {
    return (
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
    );
  }
}

export default EmptyNav;
