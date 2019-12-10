import React from "react";
import { Affix } from "antd";
import NavBar from "./Navbar";
import { connect } from "react-redux";
import * as friendAction from "../redux_store/actions/friendRequest";

import { Row, Col, Card, Image, ListGroup } from "react-bootstrap";

class Connections extends React.Component {
  componentWillMount() {
    this.props.getFriendList();
  }
  render() {
    const friendList = this.props.friendList.map(data => (
      <list key={data.id}>
        <Card
          style={{
            margin: "5px",
            paddingLeft: "10px",
            paddingRight: "10px",
            paddingTop: "10px"
          }}
        >
          <Card.Title
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Image
              src={require("../Images/photo.jpg")}
              height="60px"
              width="60px"
              roundedCircle
            />
            <h3 style={{ paddingLeft: "10px" }}>{data.name}</h3>
          </Card.Title>
        </Card>
      </list>
    ));

    return (
      <div>
        <Affix offsetTop={0}>
          <NavBar />
        </Affix>
        <Row>
          <Col xs={3} style={{ margin: "15px" }}>
            {friendList}
          </Col>
          <Col>
            <div className="vertical_divider"></div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    friendList: state.friendRequestReducer.friendList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFriendList: () => {
      dispatch(friendAction.getFriendList());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Connections);
