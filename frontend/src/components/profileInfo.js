import React from "react";
import moment from "moment";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Ripple } from "react-spinners-css";
import PhoneInput from "react-phone-input-2";
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
  DropdownItem,
  CardHeader,
  FormFeedback
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
      gender: "Male",
      phoneNumber: "",
      phoneNumberValid: false,
      foodChoice: "",
      foodChoiceError: false,
      redirect: false,
      loading: false,
      birthDate: "",
      birthDateError: false,
      buttonDisabled: true
    };
  }

  formValidation(phone, birthDate, foodChoice) {
    if (phone || birthDate || foodChoice) {
      console.log("phone " + phone);
      console.log("birthDate " + birthDate);
      console.log("foodChoice " + foodChoice);
      return true;
    } else if (
      this.state.phoneNumber === "" ||
      this.state.foodChoice === "" ||
      this.state.birthDate === ""
    ) {
      return true;
    } else {
      return false;
    }
  }

  birthDateValidation(selectedDate) {
    let date = new Date();
    date = this.formatDate(date);
    const currentYear = moment(date).format("YYYY");
    const year = moment(selectedDate).format("YYYY");
    console.log(year);
    if (currentYear - year <= 17) {
      return true;
    } else {
      return false;
    }
  }

  phoneNumberValidity(phoneNum) {
    console.log(phoneNum.length);
    if (phoneNum.length > 14 || phoneNum.length < 14) {
      return true;
    } else {
      return false;
    }
  }

  handleChangePhoneNumber = event => {
    console.log(event);
    console.log(this.phoneNumberValidity(event));
    this.setState({
      phoneNumber: event,
      phoneNumberValid: this.phoneNumberValidity(event),
      buttonDisabled: this.formValidation(
        this.phoneNumberValidity(event),
        this.state.birthDateError,
        this.state.foodChoiceError
      )
    });
  };

  handleChangeBirthDate = event => {
    const formdate = event.target.value;
    this.setState({
      birthDate: formdate,
      birthDateError: this.birthDateValidation(formdate),
      buttonDisabled: this.formValidation(
        this.state.phoneNumberValid,
        this.birthDateValidation(formdate),
        this.state.foodChoiceError
      )
    });
  };

  foodChoiceValidity(data) {
    if (data.length <= 2) {
      return true;
    } else {
      return false;
    }
  }

  handleChangeFoodChoice = event => {
    this.setState({
      foodChoice: event.target.value,
      foodChoiceError: this.foodChoiceValidity(event.target.value),
      buttonDisabled: this.formValidation(
        this.state.phoneNumberValid,
        this.state.birthDateError,
        this.foodChoiceValidity(event.target.value)
      )
    });

    const td = this.formValidation(
      this.state.phoneNumberValid,
      this.state.birthDateError,
      this.foodChoiceValidity(event.target.value)
    );

    console.log(td);
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
    console.log(this.state.birthDate);
    this.props.onComplete(
      this.state.phoneNumber,
      this.state.birthDate,
      userGender,
      this.state.foodChoice
    );
    this.setState({ loading: this.props.completionLoading });
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
          {this.props.completionLoading ? (
            <Ripple color="#FFFFFF" size={200} />
          ) : this.state.redirect ? (
            <Redirect to="setrestaurant" />
          ) : (
            <Card>
              <CardHeader
                className="font-weight-bold"
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  padding: "10px",
                  fontSize: "18pt"
                }}
              >
                Complete Your Profile
              </CardHeader>
              <CardBody className="card-color">
                <Form onSubmit={this.handleSubmit}>
                  <Row form>
                    <Col md={4}>
                      <FormGroup style={{ paddingRight: "10px" }}>
                        <Label>Phone number</Label>
                        <PhoneInput
                          country={"bd"}
                          placeholder="Enter phone number"
                          onChange={this.handleChangePhoneNumber}
                          value={this.state.phoneNumber}
                          autoFormat={false}
                          enableLongNumbers={false}
                          isValid={() => {
                            return !this.state.phoneNumberValid;
                          }}
                        />
                        <FormFeedback>Erroe</FormFeedback>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="exampleDate">Birth Date</Label>
                        <Input
                          type="date"
                          name="date"
                          id="exampleDatetime"
                          placeholder="datetime placeholder"
                          value={this.state.birthDate}
                          onChange={this.handleChangeBirthDate}
                          invalid={this.state.birthDateError}
                        />
                        <FormFeedback>
                          You must be 18 years old to register
                        </FormFeedback>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={5}>
                      <Label>Gender</Label>
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
                    <Col md={7}>
                      <FormGroup>
                        <Label>What you crave for</Label>
                        <Input
                          type="text"
                          placeholder="Enter favourite food"
                          name="foodChoice"
                          value={this.state.foodChoice}
                          onChange={this.handleChangeFoodChoice}
                          invalid={this.state.foodChoiceError}
                        />
                        <FormFeedback>Enter valid food name</FormFeedback>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Button
                    className="btn-lg btn-block"
                    id="button"
                    type="submit"
                    disabled={this.state.buttonDisabled}
                  >
                    Next
                  </Button>
                </Form>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    err: state.authenticate.err,
    loading: state.authenticate.loading,
    token: state.authenticate.token,
    completionLoading: state.dataReducer.profileLoading
  };
};

const mapDipatchToProps = dispatch => {
  return {
    onComplete: (phoneNumber, birthDate, gender, foodChoice, userImage) => {
      dispatch(
        actions.completeProfile(
          phoneNumber,
          birthDate,
          gender,
          foodChoice,
          userImage
        )
      );
    }
  };
};

export default connect(mapStateToProps, mapDipatchToProps)(Info);
