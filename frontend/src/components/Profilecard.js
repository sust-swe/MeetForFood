import React from "react";
import {} from "react-router-dom";
import ImageLoader from "react-load-image";
import { Container, Image, Card, Badge } from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "../redux_store/actions/dataAction";
import "../Styles/header.css";

class ProfileCard extends React.Component {
  componentDidMount() {
    this.props.getImage();
  }
  componentWillMount() {
    this.props.fetchUsers();
  }
  render() {
    const token = localStorage.getItem("token");
    console.log(token);
    return (
      <Card className="profile-dashboard " style={{ alignItems: "center" }}>
        <Image
          src={require("../Images/photo.jpg")}
          height="150px"
          width="150px"
          roundedCircle
        />
        <Card.Body style={{ justifyContent: "center" }}>
          <Card.Title>
            {/* <h3 style={{ textAlign: "center" }}>{this.props.users.name}</h3> */}
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
                {/* {this.props.users.what_you_crave_for} */}
              </Badge>
            </Container>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.dataReducer.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(actions.getUser()),
    getImage: () => dispatch(actions.getImage())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCard);
