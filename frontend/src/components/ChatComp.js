import React from "react";
import { Affix } from "antd";
import NavBar from "./Navbar";
import { connect } from "react-redux";
import * as friendAction from "../redux_store/actions/friendRequest";
import { Row, Col, Card, Image } from "react-bootstrap";

class ChatComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      friendList: []
    };
    this.socketInit = null;
  }

  componentWillMount() {
    this.props.getFriendList();
  }

  connect() {
    this.socketInit = new WebSocket(`ws://127.0.0.1:8000/ws/chat/`);
    this.socketInit.onopen = () => {
      console.log("server started");
      this.socketInit.send("hello");
    };

    this.socketInit.onmessage = e => {
      console.log("client" + e.data);
    };

    // this.socketInit.onerror = e => {
    //   console.log(e.message);
    // };
  }

  socketNewMessage(data) {
    const parsedData = JSON.parse(data);
    const command = parsedData.command;
    if (Object.keys(this.callbacks).length === 0) {
      return;
    }
    if (command === "messages") {
      this.callbacks[command](parsedData.messages);
      console.log(data);
    }
    if (command === "new_message") {
      this.callbacks[command](parsedData.message);
    }
  }

  getFriendList() {
    const host = "http://127.0.0.1:8000";
    this.state.friendList = this.props.friendList.map(data => (
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
  }

  render() {
    this.getFriendList();
    this.connect();
    return (
      <div>
        <Affix offsetTop={0}>
          <NavBar />
        </Affix>
        <Row>
          <Col xs={3} style={{ margin: "15px" }} className="inner-scroll">
            {this.state.friendList}
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatComp);
