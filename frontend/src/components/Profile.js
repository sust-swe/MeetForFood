import React from "react";
import {} from "react-router-dom";
import { Container, Row, Col, Card, Image, Button } from "react-bootstrap";
import NavBar from "./Navbar";
import ProfileCard from "./Profilecard";
import FilterCard from "./FilterCard.js";
import { connect } from "react-redux";
import { Affix } from "antd";

import * as actions from "../redux_store/actions/dataAction";
import * as filterActions from "../redux_store/actions/filterAction";
import "../Styles/header.css";

class Profile extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }
  render() {
    const suggestionList = this.props.suggestedFriend.map(data => (
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
            <Card.Text>{data.email}</Card.Text>
            <Card.Body style={{ display: "flex" }}>
              <Button>Send Request</Button>
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
                Suggested friends
              </h2>
              <div className="divider"></div>
              <Container className="inner-scroll">{suggestionList}</Container>
            </Col>
            <Col id="profile-history">
              <FilterCard />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.dataReducer.data,
    suggestedFriend: state.dataReducer.suggestion
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(actions.getUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
