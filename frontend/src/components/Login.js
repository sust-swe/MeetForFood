import React from "react";
import "../Styles/header.css";
import { NavLink } from "react-router-dom";
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
  render() {
    return (
      <div>
        <Card>
          <CardBody className="card-color">
            <Form>
              <FormGroup>
                <Label className="font-weight-bold">Username</Label>
                <Input type="text" placeholder="username" id="input" />
              </FormGroup>
              <FormGroup>
                <Label className="font-weight-bold">Password</Label>
                <Input type="password" placeholder="password" id="input" />
              </FormGroup>
              <Button className="btn-lg btn-block" id="button">
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

export default Login;
