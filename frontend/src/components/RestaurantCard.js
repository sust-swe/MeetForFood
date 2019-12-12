import React, { Component } from "react";
import { Container, Row, Col, Card, Image, Badge } from "react-bootstrap";

import axios from "axios";

import { MdLocationOn } from "react-icons/md";

export default class RestaurantCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [
        { id: 1, title: "The Shawshank Redemption (1994)" },
        { id: 2, title: "The Godfather (1972)" },
        { id: 3, title: "The Godfather: Part II (1974)" },
        { id: 4, title: "The Dark Knight (2008)" },
        { id: 5, title: "12 Angry Men (1957)" },
        { id: 6, title: "Schindler's List (1993)" },
        {
          id: 7,
          title: "The Lord of the Rings: The Return of the King (2003)"
        },
        { id: 8, title: "Pulp Fiction (1994)" }
      ]
    };
  }

  // componentDidMount(){
  //     axios.get('')
  // }
  render() {
    return (
      <Card
        className="profile-dashboard "
        style={{ alignItems: "left", paddingTop: "0px" }}
      >
        <Image
          src={require("../Images/photo.jpg")}
          height="150px"
          //  width="350px"
          rounded
        />
        <Card.Body
          style={{ justifyContent: "space-evenly", backgroundColor: "#ff6600" }}
        >
          <Card.Title>
            <h4
              style={{
                textAlign: "left",
                fontWeight: "bold",
                display: "inline"
              }}
            >
              {this.state.movies.title}
            </h4>
            <h5
              style={{
                textAlign: "Right",
                display: "inline",
                paddingLeft: "40px",
                fontStyle: "initial",
                color: "Green"
              }}
            >
              $$
            </h5>
            <h5 style={{ textAlign: "left" }}> Bangladeshi,Indian</h5>
          </Card.Title>
          <Card.Text>
            <span>
              <span style={{ fontWeight: "bold" }}>
                {" "}
                <MdLocationOn style={{ color: "Green" }} />
              </span>{" "}
              Zindabazar,Sylhet, Bangladesh
            </span>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}
