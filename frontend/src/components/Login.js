import React from "react";
import "../Styles/header.css";
import * as actions from "../redux_store/actions/authenticate";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Button,
  Label
} from "reactstrap";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onAuth(this.state.email, this.state.password);
  };

  render() {
    return (
      <div>
        <Card>
          <CardBody className="card-color">
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label className="font-weight-bold">Username</Label>
                <Input
                  type="email"
                  placeholder="email"
                  id="input1"
                  value={this.state.email}
                  name="email"
                  onChange={this.handleEmailChange}
                />
              </FormGroup>
              <FormGroup>
                <Label className="font-weight-bold">Password</Label>
                <Input
                  type="password"
                  placeholder="password"
                  id="input2"
                  value={this.state.password}
                  name="password"
                  onChange={this.handlePasswordChange}
                />
              </FormGroup>
              <Button className="btn-lg btn-block" id="button" type="submit">
                LogIn
              </Button>
              <h6 className="text-center">Not a member?</h6>
              <NavLink to="/signup" style={{ textDecoration: "none" }}>
                <Button
                  className="btn-lg btn-block btn-dark"
                  id="inactive-button"
                >
                  Signup
                </Button>
              </NavLink>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authenticate.token !== null,
    error: state.authenticate.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => {
      dispatch(actions.authLogin(email, password));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
