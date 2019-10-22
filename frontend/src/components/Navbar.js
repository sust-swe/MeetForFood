import React from "react";
import { Navbar, NavbarBrand, Image, Nav } from "react-bootstrap";
import "../Styles/header.css";

export class NavBar extends React.Component {
  render() {
    return (
      <div>
        <Navbar id="navtheme" fixed="top">
          <NavbarBrand>
            <Image
              src={require("../Images/logo.png")}
              height="39px"
              width="150px"
              style={{ paddingLeft: "15px" }}
            />
          </NavbarBrand>
          <Nav className="ml-auto">
            <Nav.Item>
              <Nav.Link href="/login" className="menuItem" justify>
                Find Companion
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/login" className="menuItem" justify>
                Explore Restaurants
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/login" className="menuItem" justify>
                Friends
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/login" justify>
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
      </div>
    );
  }
}

export default NavBar;
