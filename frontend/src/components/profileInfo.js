import React from "react";
import moment from "moment";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import PhoneInput from "react-phone-number-input";
import * as actions from "../redux_store/actions/dataAction";
import "../Styles/header.css";
import { Navbar, NavbarBrand, Image, Container } from "react-bootstrap";
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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class Info extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      dropDownOpen: false,
      gender: "Select Gender",
      phoneNumber: "",
      foodChoice: "",
      redirect: false,
      birthDate: new Date()
    };
  }

  handleChangePhoneNumber = event => {
    this.setState({ phoneNumber: event });
  };
  handleChangeBirthDate = date => {
    this.setState({ birthDate: date });
  };
  handleChangeFoodChoice = event => {
    this.setState({ foodChoice: event.target.value });
  };

  toggle = () => {
    this.setState({ dropDownOpen: !this.state.dropDownOpen });
  };

  select = event => {
    this.setState({
      dropDownOpen: !this.state.dropDownOpen,
      gender: event.target.innerText
    });
  };

  formatDate = date => {
    return moment(date).format("YYYY-MM-DD");
  };

  handleSubmit = event => {
    event.preventDefault();
    let userGender = "";
    if (this.state.gender === "Male") {
      userGender = "M";
    } else if (this.state.gender === "Female") {
      userGender = "F";
    }
    const customDate = this.formatDate(this.state.birthDate);
    this.props.onComplete(
      this.state.phoneNumber,
      customDate,
      userGender,
      this.state.foodChoice
    );
    this.handleRedirect();
  };

  handleRedirect() {
    if (this.props.err === null || this.props.err === undefined) {
      this.setState({ redirect: true });
    }
  }

  render() {
    return (
      <div className="wrapper">
        {this.state.redirect ? <Redirect to="/" /> : null}
        <Navbar id="navtheme" fixed="top">
          <NavbarBrand>
            <Image
              src={require("../Images/logo.png")}
              height="39px"
              width="150px"
              style={{ paddingLeft: "15px" }}
            />
          </NavbarBrand>
        </Navbar>
        <div className="overlay"></div>
        <div id="form-container">
          <Card>
            <CardBody className="card-color">
              <Form onSubmit={this.handleSubmit}>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label className="font-weight-bold">Phone number</Label>
                      <PhoneInput
                        country="BD"
                        placeholder="Enter phone number"
                        onChange={this.handleChangePhoneNumber}
                        value={this.state.phoneNumber}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label className="font-weight-bold">Birth date</Label>
                      <DatePicker
                        customInput={<Input />}
                        dateFormat="yyyy-MM-dd"
                        selected={this.state.birthDate}
                        onChange={this.handleChangeBirthDate}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <Label className="font-weight-bold">Gender</Label>
                    <Container>
                      <Dropdown
                        isOpen={this.state.dropDownOpen}
                        toggle={this.toggle}
                      >
                        <DropdownToggle caret>
                          {this.state.gender}
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem onClick={this.select}>
                            Male
                          </DropdownItem>
                          <DropdownItem onClick={this.select}>
                            Female
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </Container>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label className="font-weight-bold">
                        What you crave for
                      </Label>
                      <Input
                        type="text"
                        placeholder="Enter favourite food"
                        name="foodChoice"
                        value={this.state.foodChoice}
                        onChange={this.handleChangeFoodChoice}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup></FormGroup>
                <Button className="btn-lg btn-block" id="button" type="submit">
                  Create
                </Button>
              </Form>
            </CardBody>
          </Card>
        </div>
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
    onComplete: (phoneNumber, birthDate, gender, foodChoice) => {
      dispatch(
        actions.completeProfile(phoneNumber, birthDate, gender, foodChoice)
      );
    }
  };
};

export default connect(mapStateToProps, mapDipatchToProps)(Info);
