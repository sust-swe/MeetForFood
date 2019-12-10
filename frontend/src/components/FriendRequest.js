import React from "react";
import { Affix } from "antd";
import NavBar from "./Navbar";
import ProfileCard from "./Profilecard";
import { connect } from "react-redux";
import * as friendRequestAction from "../redux_store/actions/friendRequest";

import { Row, Col, Card, Image, Button, Container } from "react-bootstrap";

class FriendRequests extends React.Component {
  componentWillMount() {
    this.props.getRequests();
  }

  acceptRequest = key => {
    console.log(key);
    this.props.acceptFriendRequest(key);
    window.location.reload();
  };

  rejectRequest = key => {
    console.log(key);
    this.props.rejectFriendRequest(key);
    window.location.reload();
  };

  render() {
    const token = localStorage.getItem("token");
    console.log(token);
    const requestList = this.props.requestLists.map(data => (
      <list key={data.id}>
        <Card style={{ margin: "15px" }}>
          <Card.Header id="suggested-profile-header">
            <Image
              src={require("../Images/photo.jpg")}
              height="60px"
              width="60px"
              roundedCircle
            />
            <Card.Title style={{ color: "#FFFFFF", paddingLeft: "10px" }}>
              {data.name}
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Body
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignContent: "center"
              }}
            >
              <Button
                id="normal_button"
                onClick={() => this.acceptRequest(data.id)}
              >
                Accept
              </Button>
              <Button
                id="inner-button"
                onClick={() => this.rejectRequest(data.id)}
              >
                Reject
              </Button>
            </Card.Body>
          </Card.Body>
        </Card>
      </list>
    ));
    return (
      <div>
        <Affix offsetTop={0}>
          <NavBar />
        </Affix>
        <div style={{ margin: "5px" }}>
          <Row>
            <Col xs={3}>
              <Affix offsetTop={90}>
                <ProfileCard />
              </Affix>
            </Col>
            <Col xs={6} id="profile-history">
              <h2 style={{ textAlign: "left", marginTop: "15px" }}>
                Friend Requests
              </h2>
              <div className="divider"></div>
              <Container className="inner-scroll">{requestList}</Container>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    requestLists: state.friendRequestReducer.requestList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRequests: () => dispatch(friendRequestAction.getFriendRequests()),
    acceptFriendRequest: requestID =>
      dispatch(friendRequestAction.acceptRequest(requestID)),
    rejectFriendRequest: requestID =>
      dispatch(friendRequestAction.rejectRequest(requestID))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendRequests);
