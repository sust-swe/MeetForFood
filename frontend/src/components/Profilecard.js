import React from "react";
import {} from "react-router-dom";
import { Container, Image, Card, Badge } from "react-bootstrap";
import "../Styles/header.css";

class ProfileCard extends React.Component {
  render() {
    return (
      <div>
        <Card className="profile-dashboard " style={{ alignItems: "center" }}>
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
                <span style={{ fontWeight: "bold" }}>Favourite Food:</span>
              </Container>
              <Container style={{ padding: "0", margin: "0" }}>
                <Badge pill variant="info">
                  Pasta
                </Badge>
              </Container>
              <Container style={{ padding: "0", margin: "0" }}>
                <span style={{ fontWeight: "bold" }}>Favourite Drink:</span>
              </Container>
              <Container style={{ padding: "0", margin: "0" }}>
                <Badge pill variant="info">
                  Milkshake
                </Badge>
              </Container>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default ProfileCard;
