import React from "react";
import { Redirect } from "react-router-dom";
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
import { DualRing, Ellipsis } from "react-spinners-css";
import jwt_decode from "jwt-decode";

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
      gender: "Male",
      ageRange: { min: 20, max: 45 },
      redirect: false,
      requestButton: "Send Request",
      loading: true,
      editColor: "#9E008B",
      suggestionLoading: true,
      filteringLoading: false,
      reload: false,
      update: false,
      suggestionListData: [],
      suggestionUpdate: false
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
    console.log("gender " + userGender);
    this.props.setFilter(
      userGender,
      this.state.ageRange.min,
      this.state.ageRange.max
    );
    this.setState({ filteringLoading: this.props.suggestionLoading });
    this.setState({ reload: true });
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
    this.props.getFilter();
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

  sendRequest = (requestID, index) => {
    this.props.sendRequest(requestID);
    console.log(index);
    const array = this.state.suggestionListData;
    delete array[index];
    console.log(array);
    this.setState({ suggestionListData: array });
  };

  componentDidMount() {
    this.setState({ loading: this.props.profileLoading });
    this.setState({ loading: this.props.suggestionLoading });
  }

  createSuggestionList() {
    const host = "http://127.0.0.1:8000";
    this.state.suggestionListData = this.props.userSuggestion.map(
      (data, index) => (
        <list key={data.id}>
          <Card style={{ margin: "15px" }}>
            <Card.Header
              id="suggested-profile-header"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div style={{ display: "flex" }}>
                <Image
                  src={host + data.image}
                  height="60px"
                  width="60px"
                  roundedCircle
                />
                <Card.Title style={{ color: "#FFFFFF", paddingLeft: "10px" }}>
                  <div>
                    <h3 style={{ color: "#F99116" }}>{data.name}</h3>
                    <p style={{ fontStyle: "italic" }}>Age: {data.user_age}</p>
                    <p style={{ fontStyle: "italic" }}>
                      Gender: {this.getGender(data.gender)}
                    </p>
                  </div>
                </Card.Title>
              </div>
              <Button
                id="normal_button"
                name="send-button"
                style={{ background: this.state.editColor }}
                onClick={this.sendRequest.bind(this, data.email, index)}
              >
                {this.state.requestButton}
              </Button>
            </Card.Header>
          </Card>
        </list>
      )
    );
  }

  componentDidUpdate() {
    if (this.props.filterLoading !== true) {
      if (this.state.update !== true) {
        this.setState({
          gender: this.getGender(this.props.suggestionSetting.foodie_partner),
          ageRange: {
            min: this.props.suggestionSetting.min_age,
            max: this.props.suggestionSetting.max_age
          },
          update: true
        });
        this.createSuggestionList();
      }
    }

    if (this.props.suggestionLoading !== true) {
      if (this.state.suggestionUpdate !== true) {
        this.createSuggestionList();
        this.setState({ suggestionUpdate: true });
      }
    }
  }

  redirect() {
    return <Redirect to="/profileinfo" />;
  }

  render() {
    console.log(this.props.userSuggestion);
    console.log(this.props.profileLoading);
    return (
      <div>
        <Affix offsetTop={0}>
          <NavBar {...this.props.propsData} />
        </Affix>
        <div style={{ margin: "5px" }}>
          <Row>
            <Col xs={3}>
              <Affix offsetTop={90}>
                {this.loading ? (
                  <DualRing
                    style={{ display: "flex", justifyContent: "center" }}
                    color="#F99116"
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
                {this.state.suggestionListData}
              </Container>
            </Col>
            <Col id="profile-history">
              <Card
                className="profile-dashboard "
                style={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  boxShadow: "1px 1px 5px #242424"
                }}
              >
                <Card.Body style={{ justifyContent: "center" }}>
                  <Card.Header as="h4">Filter Suggestion</Card.Header>
                  <Container
                    style={{
                      padding: "15px",
                      alignContent: "center",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Container
                      style={{
                        padding: "15px",
                        display: "flex",
                        justifyContent: "center"
                      }}
                    >
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
                    <Container
                      style={{
                        padding: "15px",
                        display: "flex",
                        justifyContent: "center"
                      }}
                    >
                      <InputRange
                        minValue={18}
                        maxValue={50}
                        name="Set Age range"
                        value={this.state.ageRange}
                        style={{ padding: "20px" }}
                        onChange={event => this.handleAgeRange(event)}
                      />
                    </Container>
                    <Container
                      style={{
                        padding: "10px",
                        display: "flex",
                        justifyContent: "center"
                      }}
                    >
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
                {this.state.reload ? (
                  this.props.suggestionLoading ? (
                    <Ellipsis
                      style={{ display: "flex", justifyContent: "center" }}
                      color="#F99116"
                    />
                  ) : (
                    this.handleRedirect()
                  )
                ) : null}
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
    suggestionLoading: state.filterReducer.filterLoading,
    profileData: state.dataReducer.data,
    suggestionSetting: state.filterReducer.filterInfo,
    filterLoading: state.filterReducer.filterDataLoading,
    propsData: state.dataReducer
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
    getImage: () => dispatch(actions.getImage()),
    getFilter: () => dispatch(filterActions.getFilter())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
