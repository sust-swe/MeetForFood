import React from "react";
import {} from "react-router-dom";
import { Container, Row, Col, Image, Card, Badge } from "react-bootstrap";
import NavBar from "./Navbar";
import "../Styles/header.css";

class Profile extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Container fluid>
          <Row>
            <Col sm={3}>
              <Card
                className="profile-dashboard "
                style={{ alignItems: "center" }}
              >
                <Image
                  src={require("../Images/photo.jpg")}
                  height="150px"
                  width="150px"
                  roundedCircle
                />
                <Card.Body style={{ justifyContent: "center" }}>
                  <Card.Title>
                    <h3 style={{ textAlign: "center" }}>Rakib Hasan</h3>
                    <h5 style={{ textAlign: "center" }}>Love to eat</h5>
                  </Card.Title>
                  <Card.Text>
                    <span>
                      <span style={{ fontWeight: "bold" }}>City: </span> Sylhet,
                      Bangladesh
                    </span>
                    <br />
                    <br />
                    <Container style={{ padding: "0", margin: "0" }}>
                      <span style={{ fontWeight: "bold" }}>
                        Favourite Food:
                      </span>
                    </Container>
                    <Container style={{ padding: "0", margin: "0" }}>
                      <Badge pill variant="info">
                        Pasta
                      </Badge>
                    </Container>
                    <Container style={{ padding: "0", margin: "0" }}>
                      <span style={{ fontWeight: "bold" }}>
                        Favourite Drink:
                      </span>
                    </Container>
                    <Container style={{ padding: "0", margin: "0" }}>
                      <Badge pill variant="info">
                        Milkshake
                      </Badge>
                    </Container>
                  </Card.Text>
                </Card.Body>
              </Card>
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
