import React from "react";
import {} from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Button,
  Dropdown
} from "react-bootstrap";
import NavBar from "./Navbar";
import ProfileCard from "./Profilecard";
import InputRange from "react-input-range";
import { connect } from "react-redux";
import { Affix } from "antd";
import { DualRing } from "react-spinners-css";

import * as filterActions from "../redux_store/actions/filterAction";
import * as requestAction from "../redux_store/actions/friendRequest";
import * as actions from "../redux_store/actions/dataAction";
import "../Styles/header.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.state = {
      dropDownOpen: false,
      gender: "Select Gender",
      ageRange: { min: 20, max: 45 },
      redirect: false,
      requestButton: "Send Request",
      loading: true,
      suggestionLoading: true
    };
  }

  handleFilter = event => {
    event.preventDefault();
    let userGender = "";
    if (this.state.gender === "Male") {
      userGender = "M";
    } else if (this.state.gender === "Female") {
      userGender = "F";
    }
    this.props.setFilter(
      userGender,
      this.state.ageRange.min,
      this.state.ageRange.max
    );
    console.log(this.props);
    this.handleRedirect();
  };

  handleAgeRange = event => {
    this.setState({ ageRange: event });
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
  handleRedirect() {
    window.location.reload();
  }

  componentWillMount() {
    this.props.getSuggestion();
    this.setState({ loading: this.props.profileLoading });
    this.setState({ loading: this.props.suggestionLoading });
  }

  getGender = gender => {
    if (gender === "M") {
      return "Male";
    } else if (gender === "F") {
      return "Female";
    }
  };

  sendRequest = requestID => {
    console.log(requestID);
    this.props.sendRequest(requestID);
  };

  componentDidMount() {
    this.setState({ loading: this.props.profileLoading });
    this.setState({ loading: this.props.suggestionLoading });
  }


  render() {
    const token = localStorage.getItem("stream");
    console.log("stream:  " + token);
    const suggestionList = this.props.userSuggestion.map(data => (
      <list key={data.id}>
        <Card style={{ margin: "15px" }}>
          <Card.Header
            id="suggested-profile-header"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div style={{ display: "flex" }}>
              <Image
                src={require("../Images/photo.jpg")}
                height="60px"
                width="60px"
                roundedCircle
              />
              <Card.Title style={{ color: "#FFFFFF", paddingLeft: "10px" }}>
                <div>
                  <h4>{data.name}</h4>
                  <h6>Age: {data.user_age}</h6>
                  <h6>Gender: {this.getGender(data.gender)}</h6>
                </div>
              </Card.Title>
            </div>
            <Button
              id="normal_button"
              onClick={() => this.sendRequest(data.email)}
            >
              {this.state.requestButton}
            </Button>
          </Card.Header>
        </Card>
      </list>
    ));
    console.log(this.props.userSuggestion);
    console.log(this.props.profileLoading);
    return (
      <div>
        <Affix offsetTop={0}>
          <NavBar />
        </Affix>
        <div style={{ margin: "5px" }}>
          <Row>
            <Col xs={3}>
              <Affix offsetTop={90}>
                {this.loading ? (
                  <DualRing
                    style={{ display: "flex", justifyContent: "center" }}
                  />
                ) : (
                  <ProfileCard />
                )}
              </Affix>
            </Col>
            <Col xs={6} id="profile-history">
              <h2 style={{ textAlign: "left", marginTop: "15px" }}>
                Suggested friends
              </h2>
              <div className="divider"></div>
              <Container className="inner-scroll">
                {this.suggestionLoading ? <DualRing /> : suggestionList}
              </Container>
            </Col>
            <Col id="profile-history">
              <Card
                className="profile-dashboard "
                style={{ alignItems: "center" }}
              >
                <Card.Body style={{ justifyContent: "center" }}>
                  <Card.Header as="h4">Filter Suggestion</Card.Header>
                  <Container
                    style={{
                      padding: "15px",
                      alignContent: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Container style={{ padding: "15px" }}>
                      <Button
                        pill
                        style={{
                          borderRadius: "25px",
                          backgroundColor: "#242424",
                          border: 0
                        }}
                        disabled
                      >
                        Set Age Range
                      </Button>
                    </Container>
                    <Container style={{ padding: "15px" }}>
                      <InputRange
                        minValue={15}
                        maxValue={50}
                        name="Set Age range"
                        value={this.state.ageRange}
                        style={{ padding: "20px" }}
                        onChange={event => this.handleAgeRange(event)}
                      />
                    </Container>
                    <Container style={{ padding: "10px" }}>
                      <Dropdown
                        isOpen={this.state.dropDownOpen}
                        toggle={this.toggle}
                      >
                        <Dropdown.Toggle caret>
                          {this.state.gender}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={this.select}>
                            Male
                          </Dropdown.Item>
                          <Dropdown.Item onClick={this.select}>
                            Female
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Container>
                    <Button
                      className="btn-lg btn-block"
                      id="button"
                      onClick={this.handleFilter}
                    >
                      Filter
                    </Button>
                  </Container>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userSuggestion: state.filterReducer.suggestion,
    profileLoading: state.dataReducer.profileLoading,
    suggestionLoading: state.filterReducer.filterLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSuggestion: () => dispatch(filterActions.getFriendSuggestion()),
    setFilter: (gender, min_age, max_age) => {
      dispatch(filterActions.initFilter(gender, min_age, max_age));
    },
    sendRequest: requestID => {
      dispatch(requestAction.sendRequest(requestID));
    },
    getImage: () => dispatch(actions.getImage())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
