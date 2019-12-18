import React from "react";
import "../Styles/header.css";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../redux_store/actions/authenticate";
import * as EmailValidator from "email-validator";
import PasswordValidator from "password-validator";
import {
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Button,
  Label,
  Row,
  Col,
  FormFeedback
} from "reactstrap";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      redirect: false,
      nameError: false,
      mailError: false,
      passwordError: false,
      confirmPasswordError: false,
      consirmDisabled: true,
      buttonDisable: true,
      passwordOk: false
    };
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.schema = new PasswordValidator();
    this.schema
      .is()
      .min(6)
      .is()
      .max(32)
      .has()
      .digits()
      .has()
      .not()
      .spaces()
      .is()
      .not()
      .oneOf(["password", "Password"]);
  }

  submitButtonDisable(
    nameError,
    mailError,
    passwordError,
    confirmPasswordError
  ) {
    if (nameError || mailError || passwordError || confirmPasswordError) {
      this.setState({ buttonDisable: true });
    } else if (
      this.state.name === "" ||
      this.state.email === "" ||
      this.state.password === "" ||
      this.state.confirmPassword === ""
    ) {
      this.setState({ buttonDisable: true });
    } else {
      this.setState({ buttonDisable: false });
    }
  }

  handleChangeName = event => {
    event.preventDefault();
    this.setState({ name: event.target.value });
    if (
      !isNaN(event.target.value) ||
      !isNaN(event.target.value.charAt(0)) ||
      event.target.value.length < 3
    ) {
      this.setState({ nameError: true, buttonDisable: true });
    } else if (!event.target.value) {
      this.setState({ nameError: true, buttonDisable: true });
    } else {
      this.setState({ nameError: false });
    }
    console.log("naerr " + this.state.nameError);
    this.submitButtonDisable(
      this.state.nameError,
      this.state.mailError,
      this.state.passwordError,
      this.state.confirmPasswordError
    );
  };

  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
    const isValidMail = EmailValidator.validate(event.target.value);
    if (!isValidMail) {
      this.setState({ mailError: true, buttonDisable: true });
    } else {
      this.setState({ mailError: false });
    }
    this.submitButtonDisable();
  };
  handleChangePassword = event => {
    this.setState({ password: event.target.value });
    const isValidPassword = this.schema.validate(event.target.value);
    if (!isValidPassword) {
      this.setState({
        passwordError: true,
        consirmDisabled: true,
        confirmPassword: "",
        buttonDisable: true
      });
    } else {
      this.setState({ passwordError: false, consirmDisabled: false });
    }
    this.submitButtonDisable();
  };
  handleChangeConfirmPassword = event => {
    this.setState({ confirmPassword: event.target.value });
    if (this.state.password !== event.target.value) {
      this.setState({
        confirmPasswordError: true,
        passwordOk: false,
        buttonDisable: true
      });
    } else {
      this.setState({ confirmPasswordError: false, passwordOk: true });
    }
    this.submitButtonDisable();
    console.log(this.state.buttonDisable);
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
    } else {
      this.setState({ confirmPasswordError: true });
    }
  };

  handleRedirect() {
    if (
      this.props.err === null ||
      this.props.err === undefined ||
      this.props.loading === false
    ) {
      this.setState({ redirect: true });
    }
  }

  redirectTo() {
    return <Redirect to="/profileinfo" />;
  }

  render() {
    console.log("erros " + this.state.redirect);
    return (
      <div>
        {this.state.redirect ? this.redirectTo() : null}
        <Card>
          <CardBody className="card-color">
            <Form onSubmit={this.handleSignUp}>
              <Row form>
                <Col md={6}>
                  <FormGroup required>
                    <Label className="font-weight-bold">Name</Label>
                    <Input
                      type="text"
                      placeholder="Full name"
                      name="name"
                      value={this.state.name}
                      onChange={this.handleChangeName}
                      invalid={this.state.nameError}
                    />
                    <FormFeedback>Invalid Name</FormFeedback>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup required>
                    <Label className="font-weight-bold">Email</Label>
                    <Input
                      type="email"
                      placeholder="email"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChangeEmail}
                      invalid={this.state.mailError}
                    />
                    <FormFeedback>Invalid Email</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row></Row>
              <Row form>
                <Col md={6}>
                  <FormGroup required>
                    <Label className="font-weight-bold">Password</Label>
                    <Input
                      type="password"
                      placeholder="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChangePassword}
                      invalid={this.state.passwordError}
                      valid={this.state.passwordOk}
                    />
                    <FormFeedback>
                      Minimum password length is 6, Password must contains both
                      number and digits
                    </FormFeedback>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup required>
                    <Label className="font-weight-bold">Confirm Password</Label>
                    <Input
                      type="password"
                      placeholder="confirm password"
                      name="confirm password"
                      value={this.state.confirmPassword}
                      onChange={this.handleChangeConfirmPassword}
                      disabled={this.state.consirmDisabled}
                      invalid={this.state.confirmPasswordError}
                      valid={this.state.passwordOk}
                    />
                    <FormFeedback>Type similar password as before</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Button
                className="btn-lg btn-block"
                id="button"
                type="submit"
                disabled={this.state.buttonDisable}
              >
                Next
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
    err: state.authenticate.error,
    loading: state.authenticate.loading,
    token: state.authenticate.token
  };
};

const mapDipatchToProps = dispatch => {
  return {
    onSignUp: (name, email, password) => {
      dispatch(actions.authSignUp(name, email, password));
    }
  };
};

export default connect(mapStateToProps, mapDipatchToProps)(Signup);
