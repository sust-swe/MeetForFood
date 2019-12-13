import React from "react";
import {
  Chat,
  Channel,
  ChannelHeader,
  Thread,
  Window
} from "stream-chat-react";
import { MessageList, MessageInput } from "stream-chat-react";
import { StreamChat } from "stream-chat";
import { connect } from "react-redux";

import NavBar from "./Navbar";

class ChatComp extends React.Component {
  constructor(props) {
    super(props);

    const chatClient = new StreamChat("vzr8e3ge8km4");
    let userid = this.props.userid;
    let myId = userid + "";
    console.log(userid);

    let userToken = localStorage.getItem("stream");
    if (userToken === null) {
      userToken =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoic2h5LXdpbmQtNSJ9.K4h-UfyUY7gk7fGrGy3iF0HwCJdF3oynZJx9hzSoTZI";
    }

    chatClient.setUser(
      {
        id: myId,
        name: "initGroup",
        image: "https://getstream.io/random_svg/?id=shy-wind-5&name=Shy+wind"
      },
      userToken
    );

    chatClient.get(
      {
        id: myId,
        name: "my name",
        image: "https://getstream.io/random_svg/?id=shy-wind-5&name=Shy+wind"
      },
      userToken
    );

    this.channel = chatClient.channel("messaging", "marakha", {
      // add as many custom fields as you'd like

      image:
        "https://cdn.chrisshort.net/testing-certificate-chains-in-go/GOPHER_MIC_DROP.png",
      name: "Talk about Go"
    });
  }
  render() {
    return (
      <div>
        <NavBar />
        <Chat client={this.chatClient} theme={"messaging light"}>
          <Channel channel={this.channel}>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </Channel>
        </Chat>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userid: state.dataReducer.image.user_profile
  };
};

export default connect(mapStateToProps, null)(ChatComp);
