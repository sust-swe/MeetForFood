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
  Label,
  Row,
  Col,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <div>
        <Card>
          <CardBody className="card-color">
            <Form>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label className="font-weight-bold">Name</Label>
                    <Input type="text" placeholder="Full name" id="input" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label className="font-weight-bold">Email</Label>
                    <Input type="password" placeholder="email" id="input" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label className="font-weight-bold">Age</Label>
                    <Input type="password" placeholder="age" id="input" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <ButtonDropdown
                    isOpen={this.state.dropdownOpen}
                    toggle={this.toggle}
                    style={{ alignContent: "bottom" }}
                  >
                    <DropdownToggle
                      caret
                      color="dark"
                      outline
                      id="inactive-button"
                    >
                      Select Gender
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>Male</DropdownItem>
                      <DropdownItem>Female</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label className="font-weight-bold">Password</Label>
                    <Input type="password" placeholder="password" id="input" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label className="font-weight-bold">Confirm Password</Label>
                    <Input
                      type="password"
                      placeholder="confirm password"
                      id="input"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup></FormGroup>
              <Button className="btn-lg btn-block" id="button">
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

export default Signup;
