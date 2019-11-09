import React from "react";
import {} from "react-router-dom";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import NavBar from "./Navbar";
import ProfileCard from "./Profilecard";
import "../Styles/header.css";

class Profile extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Container fluid>
          <Row>
            <Col sm={3}>
              <ProfileCard />
            </Col>
            <Col sm={8} id="profile-history">
              <h1 style={{ textAlign: "left", marginTop: "15px" }}>
                Visited Restaurants
              </h1>
              <div className="divider"></div>
              <div className="scroll">
                <Card style={{ margin: "10px" }}>
                  <Row>
                    <Col md={3}>
                      <Image
                        src={require("../Images/restaurants.jpg")}
                        height="200px"
                        width="200px"
                        rounded
                      />
                    </Col>
                    <Col md={8}>
                      <Card.Title
                        style={{ fontWeight: "bold", fontSize: "40px" }}
                      >
                        Moon House
                      </Card.Title>
                      <Card.Text
                        style={{ fontSize: "22px", fontStyle: "italic" }}
                      >
                        mid range restaurants
                        <br />
                        Visited 2 times
                      </Card.Text>
                    </Col>
                  </Row>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Profile;
