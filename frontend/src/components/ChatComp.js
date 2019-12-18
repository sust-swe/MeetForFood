import React from "react";
import { Affix, Button, Input } from "antd";
import NavBar from "./Navbar";
import { connect } from "react-redux";
import * as friendAction from "../redux_store/actions/friendRequest";
import { Row, Col, Card, Image, Form, Container } from "react-bootstrap";
import WebSocketInstance from "../config2/WebSocket";

class ChatComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      friendList: [],
      sendMessage: "",
      myMessages: [],
      receivedMessages: ""
    };
    WebSocketInstance.connect();
  }

  componentWillMount() {
    this.props.getFriendList();
  }

  handlechange = event => {
    this.setState({ sendMessage: event.target.value });
  };

  // connect() {
  //   this.socketInit = new WebSocket(`ws://127.0.0.1:8000/ws/chat/`);
  //   this.socketInit.onopen = () => {
  //     this.socketInit.send("create_room");
  //   };

  //   this.socketInit.onmessage = e => {
  //     console.log("client" + e.data);
  //   };

  //   // this.socketInit.onerror = e => {
  //   //   console.log(e.message);
  //   // };
  // }

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

  sendMessagetoFriend(name) {
    WebSocketInstance.initChatUser(name);
  }

  getFriendList() {
    const host = "http://127.0.0.1:8000";
    this.state.friendList = this.props.friendList.map(data => (
      <list key={data.id}>
        <Button
          style={{
            margin: "5px",
            paddingLeft: "10px",
            paddingRight: "10px",
            paddingTop: "10px",
            width: "300px",
            border: "0",
            background: "#242424",
            color: "FFFFFF",
            borderRadius: "5px"
          }}
          onClick={this.sendMessagetoFriend.bind(this, data.name)}
        >
          <Container style={{ display: "flex" }}>
            <Image
              src={host + data.image}
              height="60px"
              width="60px"
              roundedCircle
            />
            <h3 style={{ paddingLeft: "10px", color: "#FFFFFF" }}>
              {data.name}
            </h3>
          </Container>
        </Button>
      </list>
    ));
  }

  sendMessageNow(event) {
    event.preventDefault();
    WebSocketInstance.sendMessage(this.state.sendMessage);
    this.setState({ myMessages: this.state.myMessages });
  }

  render() {
    this.getFriendList();
    return (
      <div>
        <Affix offsetTop={0}>
          <NavBar />
        </Affix>
        <Row>
          <Col xs={3} style={{ margin: "15px" }} className="inner-scroll">
            {this.state.friendList}
          </Col>
          <Col xs={1}>
            <div className="vertical_divider"></div>
          </Col>
          <Col md={{ span: 8, offset: 4 }}>
            <Row>
              <Card>{this.state.myMessages}</Card>
            </Row>
            <Row style={{ display: "flex" }}>
              <Form style={{ display: "flex" }} onSubmit={this.sendMessageNow}>
                <Input
                  type="text"
                  placeholder="Enter message"
                  value={this.state.sendMessage}
                  onChange={this.handlechange}
                  style={{
                    display: "block",
                    width: "780px",
                    borderRadius: "25px",
                    padding: "5px",
                    margin: "5px"
                  }}
                />
                <Button
                  className="btn-lg btn-dark"
                  type="submit"
                  style={{
                    padding: "10px",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    borderRadius: "25px",
                    border: "0px"
                  }}
                >
                  Send
                </Button>
              </Form>
            </Row>
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
