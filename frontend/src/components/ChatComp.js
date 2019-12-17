import React, { Component } from "react";
// import './static/css/App.css';
import InitializeChatComponent from "./InitializeChatComponent";
import ChatComponent from "./ChatComponent";
import WebSocketService from "../config/WebSocket";

class ChatComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      loggedIn: false
    };
  }

  handleLogin = (e, username) => {
    e.preventDefault();
    this.setState({ loggedIn: true, username: username });
    WebSocketService.connect();
    console.log(this.state);
  };

  render() {
    const { username, loggedIn } = this.state;
    return (
      <div style={{textAlign:'center'}}>
        {loggedIn ? (
          <ChatComponent currentUser={username} />
        ) : (
          <InitializeChatComponent handleLogin={this.handleLogin} />
        )}
      </div>
    );
  }
}

export default ChatComp;
