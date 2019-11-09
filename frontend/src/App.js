import React from "react";
import { BaseRouter, AuthRouter } from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./redux_store/actions/authenticate";
// import ClassicFormPage from "./Containers/Front";

class App extends React.Component {
  componentDidMount() {
    this.props.autoSignUp();
  }

  render() {
    return (
      <div>
        <Router>
          <div />
          {this.props.isAuthenticated ? <BaseRouter /> : <AuthRouter />}
          <div />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    autoSignUp: () => dispatch(actions.authCheckstate())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
