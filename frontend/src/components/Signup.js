import React from "react";
import "../Styles/header.css";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../redux_store/actions/authenticate";
import {
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Button,
  Label,
  Row,
  Col
} from "reactstrap";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      redirect: false
    };
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleChangeName = event => {
    this.setState({ name: event.target.value });
  };
  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  };
  handleChangePassword = event => {
    this.setState({ password: event.target.value });
  };
  handleChangeConfirmPassword = event => {
    this.setState({ confirmPassword: event.target.value });
  };

  handleSignUp = event => {
    event.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      this.props.onSignUp(
        this.state.name,
        this.state.email,
        this.state.password
      );
      this.handleRedirect();
    }
  };

  handleRedirect() {
    if (this.props.err === null || this.props.err === undefined) {
      this.setState({ redirect: true });
    }
  }

  render() {
    return (
      <div>
        {this.state.redirect === true ? <Redirect to="/" /> : null}
        <Card>
          <CardBody className="card-color">
            <Form onSubmit={this.handleSignUp}>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label className="font-weight-bold">Name</Label>
                    <Input
                      type="text"
                      placeholder="Full name"
                      name="name"
                      value={this.state.name}
                      onChange={this.handleChangeName}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label className="font-weight-bold">Email</Label>
                    <Input
                      type="email"
                      placeholder="email"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChangeEmail}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row></Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label className="font-weight-bold">Password</Label>
                    <Input
                      type="password"
                      placeholder="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChangePassword}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label className="font-weight-bold">Confirm Password</Label>
                    <Input
                      type="password"
                      placeholder="confirm password"
                      name="confirm password"
                      value={this.state.confirmPassword}
                      onChange={this.handleChangeConfirmPassword}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup></FormGroup>
              <Button className="btn-lg btn-block" id="button" type="submit">
                Signup
              </Button>
              <h6 className="text-center">Already have a account?</h6>
              <NavLink to="/" style={{ textDecoration: "none" }}>
                <Button
                  className="btn-lg btn-block btn-dark"
                  id="inactive-button"
                >
                  Login
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
    err: state.err,
    loading: state.loading,
    token: state.token
  };
};

const mapDipatchToProps = dispatch => {
  return {
    onSignUp: (name, email, password) => {
      dispatch(actions.authSignUp(name, email, password));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDipatchToProps
)(Signup);
