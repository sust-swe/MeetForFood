import React from "react";
import { Affix } from "antd";
import NavBar from "./Navbar";
import { connect } from "react-redux";

class Connections extends React.Component {
  render() {
    return (
      <div>
        <Affix>
          <NavBar />
        </Affix>
      </div>
    );
  }
}

export default Connections;
