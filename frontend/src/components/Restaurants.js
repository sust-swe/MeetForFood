import React from "react";
import "../Styles/header.css";
import NavBar from "./Navbar";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import ProfileCard from "./Profilecard";
import RestaurantCard from "./RestaurantCard";

class Restaurants extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Container style={{ margin: "0" }}>
          <Row>
            <Col sm={4}>
              <ProfileCard />
            </Col>

            <Col sm={8}>
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            </Col>
            
              

            {/* <Col sm={8}>
              <h1 style={{ textAlign: "left", marginTop: "15px" }}>
                Restaurants
              </h1>
              <div className="divider"></div>
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
                </Row>
              </Card>
            </Col> */}
          </Row>
        </Container>
      </div>
    );
  }
}

export default Restaurants;
