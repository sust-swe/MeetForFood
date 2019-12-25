import React from "react";
import { Affix, Button } from "antd";
import NavBar from "./Navbar";
import { connect } from "react-redux";
import * as friendAction from "../redux_store/actions/friendRequest";

import { Row, Col, Card, Image } from "react-bootstrap";

class Connections extends React.Component {
  componentWillMount() {
    this.props.getFriendList();
  }

  render() {
    const host = "http://127.0.0.1:8000";
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
              src={host + data.image}
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
          <Col xs={3} style={{ margin: "15px" }} className="inner-scroll">
            {friendList}
          </Col>
          <Col xs={2}>
            <div className="vertical_divider"></div>
            <div>akjsbdcakjsbckj kjhaxkj h</div>
          </Col>
          <Col xs={5}>
            <Button>My Button</Button>
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
