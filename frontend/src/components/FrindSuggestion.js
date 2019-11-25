import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Card, Navbar, Nav, Image, Container } from "react-bootstrap";
import CustomScroll from "react-custom-scroll";
import "../Styles/header.css";

class FriendSuggestion extends React.Component {
  render() {
    return (
      <PerfectScrollbar style={{ zIndex: "-999" }}>
        <Card>
          <Navbar id="suggested-profile-header">
            <Nav>
              <Nav.Item>
                <Image
                  src={require("../Images/photo.jpg")}
                  height="60px"
                  width="60px"
                  roundedCircle
                />
              </Nav.Item>
            </Nav>
          </Navbar>
          <Card.Body></Card.Body>
        </Card>
        <Card>
          <Navbar id="suggested-profile-header">
            <Nav>
              <Nav.Item>
                <Image
                  src={require("../Images/photo.jpg")}
                  height="60px"
                  width="60px"
                  roundedCircle
                />
              </Nav.Item>
            </Nav>
          </Navbar>
          <Card.Body></Card.Body>
        </Card>
        <Card>
          <Navbar id="suggested-profile-header">
            <Nav>
              <Nav.Item>
                <Image
                  src={require("../Images/photo.jpg")}
                  height="60px"
                  width="60px"
                  roundedCircle
                />
              </Nav.Item>
            </Nav>
          </Navbar>
          <Card.Body></Card.Body>
        </Card>
        <Card>
          <Navbar id="suggested-profile-header">
            <Nav>
              <Nav.Item>
                <Image
                  src={require("../Images/photo.jpg")}
                  height="60px"
                  width="60px"
                  roundedCircle
                />
              </Nav.Item>
            </Nav>
          </Navbar>
          <Card.Body></Card.Body>
        </Card>
        <Card>
          <Navbar id="suggested-profile-header">
            <Nav>
              <Nav.Item>
                <Image
                  src={require("../Images/photo.jpg")}
                  height="60px"
                  width="60px"
                  roundedCircle
                />
              </Nav.Item>
            </Nav>
          </Navbar>
          <Card.Body></Card.Body>
        </Card>
        <Card>
          <Navbar id="suggested-profile-header">
            <Nav>
              <Nav.Item>
                <Image
                  src={require("../Images/photo.jpg")}
                  height="60px"
                  width="60px"
                  roundedCircle
                />
              </Nav.Item>
            </Nav>
          </Navbar>
          <Card.Body></Card.Body>
        </Card>
        <Card>
          <Navbar id="suggested-profile-header">
            <Nav>
              <Nav.Item>
                <Image
                  src={require("../Images/photo.jpg")}
                  height="60px"
                  width="60px"
                  roundedCircle
                />
              </Nav.Item>
            </Nav>
          </Navbar>
          <Card.Body></Card.Body>
        </Card>
      </PerfectScrollbar>
    );
  }
}
export default FriendSuggestion;
