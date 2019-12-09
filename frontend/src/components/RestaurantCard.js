import React, { Component } from 'react';
import { Container, Row, Col, Card, Image, Badge } from "react-bootstrap";

export default class RestaurantCard extends Component{
    render(){
        return (
            <Card className="profile-dashboard " style={{ alignItems: "left" }}>
        <Image
          src={require("../Images/photo.jpg")}
          // height="150px"
          // width="150px"
          fluid
        />
        <Card.Body style={{ justifyContent: "center" }}>
          <Card.Title>
            <h3 style={{ textAlign: "center" }}>Panshi</h3>
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
              <span style={{ fontWeight: "bold" }}>Favourite Food:</span>
            </Container>
            <Container style={{ padding: "0", margin: "0" }}>
              <Badge pill variant="info">
                Pasta
              </Badge>
            </Container>
          </Card.Text>
        </Card.Body>
      </Card>



          
        );
    }
}
