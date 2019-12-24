import React from "react";
import { Redirect } from "react-router-dom";
import { Container, Row, Col, Card, Image, Button } from "react-bootstrap";
import { FormGroup, Input, Label } from "reactstrap";
import NavBar from "./Navbar";
import ProfileCard from "./Profilecard";
import { connect } from "react-redux";
import { Affix } from "antd";
import { DualRing, Ellipsis } from "react-spinners-css";

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
      suggestionUpdate: false,
      filterSettingUpdate: true,
      restaurant: "",
      food: "",
      time: ""
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
    this.props.getRestaurantSetting();
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
                      Restaurant: {data.restaurant_name}
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

      if (this.props.restaurSettingLoading !== true) {
        if (this.state.filterSettingUpdate !== false) {
          console.log("access " + this.props.suggestionSetting.restaurant_name);
          this.setState({
            restaurant: this.props.suggestionSetting.restaurant_name,
            food: this.props.suggestionSetting.menu_choice,
            time: this.props.suggestionSetting.eating_time,
            filterSettingUpdate: false
          });
          this.createSuggestionList();
        }
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

  handleChangeRestaurantName = event => {
    this.setState({ restaurant: event.target.value });
  };

  handleChangeFood = event => {
    this.setState({ food: event.target.value });
  };

  handleChangeTime = event => {
    this.setState({ time: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.updateFilterSetting(
      this.props.profileData.user_id,
      this.props.profileData.id,
      this.state.restaurant,
      this.state.food,
      this.state.time,
      this.props.suggestionSetting.id
    );

    this.setState({ reload: true });
  };

  render() {
    console.log(this.props.suggestionSetting.id);

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
              {this.props.filterLoading ? (
                <Ellipsis color="#F99116" size={25} />
              ) : (
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
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label>Which restaurant you want to go?</Label>
                            <Input
                              type="text"
                              placeholder="enter restaurant name"
                              name="restaurant_name"
                              value={this.state.restaurant}
                              onChange={this.handleChangeRestaurantName}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label>What do you want to eat?</Label>
                            <Input
                              type="text"
                              placeholder="enter restaurant name"
                              name="restaurant_name"
                              value={this.state.food}
                              onChange={this.handleChangeRestaurantName}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label>When do you want to go?</Label>
                            <Input
                              type="text"
                              placeholder="enter restaurant name"
                              name="restaurant_name"
                              value={this.state.time}
                              onChange={this.handleChangeRestaurantName}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Button
                        className="btn-lg btn-block"
                        id="button"
                        onClick={this.handleSubmit}
                      >
                        Filter
                      </Button>
                    </Container>
                  </Card.Body>
                  {this.state.reload ? (
                    this.props.restaurSettingLoading ? (
                      <Ellipsis
                        style={{ display: "flex", justifyContent: "center" }}
                        color="#F99116"
                      />
                    ) : (
                      this.handleRedirect()
                    )
                  ) : null}
                </Card>
              )}
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
    restaurSettingLoading: state.dataReducer.resSettingLoading,
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
    getFilter: () => dispatch(filterActions.getFilter()),
    getRestaurantSetting: () => {
      dispatch(filterActions.getFilter());
    },
    updateFilterSetting: (userID, Id, resName, food, time, resSettingId) => {
      dispatch(
        actions.updateRestaurantChoice(
          userID,
          Id,
          resName,
          food,
          time,
          resSettingId
        )
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
