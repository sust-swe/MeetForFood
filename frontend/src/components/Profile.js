import React from "react";
import { Redirect } from "react-router-dom";
import { Container, Row, Col, Card, Image, Button } from "react-bootstrap";
import {
  FormGroup,
  Input,
  Label,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import NavBar from "./Navbar";
import ProfileCard from "./Profilecard";
import { connect } from "react-redux";
import { Affix } from "antd";
import { Ellipsis } from "react-spinners-css";

import * as filterActions from "../redux_store/actions/filterAction";
import * as requestAction from "../redux_store/actions/friendRequest";
import * as actions from "../redux_store/actions/dataAction";
import "../Styles/header.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropDownOpen: false,
      menuOpen: false,
      timeOpen: false,
      selectedMenu: "Select Item",
      menuList: [],
      settingUpdate: false,
      suggestionUpdate: false,
      foodMenuUpdate: false,
      reload: false,
      suggestionListData: [],
      selectedRestaurant: "Restaurant",
      restaurantList: [],
      foodMenu: [],
      selectedTime: "Select Eating Time"
    };
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
  }

  componentWillMount() {
    this.props.getMyProfile();
    this.props.getProfileImage();
    this.props.getUserSuggestions();
    this.props.getFilterInfo();
    this.props.getRestaurants();
  }

  getGender = gender => {
    if (gender === "M") {
      return "Male";
    } else if (gender === "F") {
      return "Female";
    }
  };

  handleChangeTime = event => {
    this.setState({ time: event.target.value });
  };

  sendRequest = (requestID, index) => {
    this.props.sendFriendRequest(requestID);
    console.log(index);
    const array = this.state.suggestionListData;
    delete array[index];
    console.log(array);
    this.setState({ suggestionListData: array });
  };

  createRestaurantList() {
    this.setState({
      restaurantList: this.props.restaurants.map(data => (
        <DropdownItem
          key={data.id}
          onClick={(event, id) => this.select(event, data.id)}
        >
          {data.name}
        </DropdownItem>
      ))
    });
  }

  createRestaurantMenu = () => {
    this.setState({
      menuList: this.props.foodItemName.map(data => (
        <DropdownItem key={data.id} onClick={event => this.selectMenu(event)}>
          {data.item_name}
        </DropdownItem>
      ))
    });
  };

  toggle = () => {
    this.setState({ dropDownOpen: !this.state.dropDownOpen });
  };

  select = (event, id) => {
    this.setState({
      dropDownOpen: !this.state.dropDownOpen,
      selectedRestaurant: event.target.innerText,
      foodMenuUpdate: true,
      selectedMenu: "Select Item"
    });
    this.props.getMenu(id);
  };

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  selectMenu = event => {
    this.setState({
      menuOpen: !this.state.menuOpen,
      selectedMenu: event.target.innerText
    });
  };

  toggleTime = () => {
    this.setState({ timeOpen: !this.state.timeOpen });
  };

  selectTime = event => {
    this.setState({
      timeOpen: !this.state.timeOpen,
      selectedTime: event.target.innerText
    });
  };

  createSuggestionList() {
    const host = "http://127.0.0.1:8000";

    this.setState({
      suggestionListData: this.props.userSuggestion.map((data, index) => (
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
                    <p style={{ fontStyle: "italic" }}>
                      Want to eat: {data.menu_choice}
                    </p>
                  </div>
                </Card.Title>
              </div>
              <Button
                id="normal_button"
                name="send-button"
                onClick={this.sendRequest.bind(this, data.email, index)}
              >
                Send Request
              </Button>
            </Card.Header>
          </Card>
        </list>
      ))
    });
  }

  componentDidUpdate() {
    if (this.props.filterSettingLoading !== true) {
      if (this.state.settingUpdate !== true) {
        this.createRestaurantList();
        this.setState({
          settingUpdate: true,
          selectedRestaurant: this.props.filterSettings.restaurant_name,
          selectedMenu: this.props.filterSettings.menu_choice,
          selectedTime: this.props.filterSettings.eating_time
        });
      }
    }

    if (this.props.suggestionLoading !== true) {
      if (this.state.suggestionUpdate !== true) {
        this.createSuggestionList();
        this.setState({ suggestionUpdate: true });
      }
    }

    if (this.props.menuLoading !== true) {
      if (this.state.foodMenuUpdate !== false) {
        this.createRestaurantMenu();
        this.setState({ foodMenuUpdate: false });
      }
    }
  }

  handleSettingSubmit = event => {
    event.preventDefault();
    this.props.updateFilterData(
      this.props.myProfile.user_id,
      this.props.myProfile.id,
      this.state.selectedRestaurant,
      this.state.selectedMenu,
      this.state.selectedTime,
      this.props.filterSettings.id
    );
    this.setState({ reload: true });
  };

  handleRedirect() {
    window.location.reload();
  }

  render() {
    return (
      <div>
        <Affix offsetTop={0}>
          <NavBar />
        </Affix>
        <div style={{ margin: "5px" }}>
          <Row>
            <Col xs={3}>
              <Affix offsetTop={90}>
                <ProfileCard />
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
            <Col id="profile-history" xs={3}>
              <div style={{ display: "flex", justifyContent: "center" }}>
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
                    <Card.Body
                      style={{ justifyContent: "center", padding: "0px" }}
                    >
                      <Card.Header as="h4" style={{ margin: "0px" }}>
                        Filter Suggestion
                      </Card.Header>
                      <Container
                        style={{
                          padding: "15px",
                          alignContent: "center",
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                          flexDirection: "column"
                        }}
                      >
                        <Row>
                          <Col
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              margin: "5px"
                            }}
                          >
                            <Dropdown
                              isOpen={this.state.dropDownOpen}
                              toggle={this.toggle}
                            >
                              <DropdownToggle caret>
                                {this.state.selectedRestaurant}
                              </DropdownToggle>
                              <DropdownMenu>
                                {this.state.restaurantList}
                              </DropdownMenu>
                            </Dropdown>
                          </Col>
                        </Row>

                        <Row>
                          <Col
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              margin: "5px"
                            }}
                          >
                            <Dropdown
                              isOpen={this.state.menuOpen}
                              toggle={this.toggleMenu}
                            >
                              <DropdownToggle caret>
                                {this.state.selectedMenu}
                              </DropdownToggle>
                              <DropdownMenu>{this.state.menuList}</DropdownMenu>
                            </Dropdown>
                          </Col>
                        </Row>

                        <Row>
                          <Col
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              margin: "5px"
                            }}
                          >
                            <Dropdown
                              isOpen={this.state.timeOpen}
                              toggle={this.toggleTime}
                            >
                              <DropdownToggle caret>
                                {this.state.selectedTime}
                              </DropdownToggle>
                              <DropdownMenu>
                                <DropdownItem onClick={this.selectTime}>
                                  Breakfast
                                </DropdownItem>
                                <DropdownItem onClick={this.selectTime}>
                                  Lunch
                                </DropdownItem>
                                <DropdownItem onClick={this.selectTime}>
                                  Dinner
                                </DropdownItem>
                                <DropdownItem onClick={this.selectTime}>
                                  Snack
                                </DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                          </Col>
                        </Row>

                        <Button
                          className="btn-lg btn-block"
                          id="button"
                          style={{ margin: "10px" }}
                          onClick={this.handleSettingSubmit}
                        >
                          Filter
                        </Button>
                      </Container>
                    </Card.Body>
                    {this.state.reload ? (
                      this.props.updateFilterLoading ? (
                        <Ellipsis
                          style={{ display: "flex", justifyContent: "center" }}
                          color="#F99116"
                          size={35}
                        />
                      ) : (
                        this.handleRedirect()
                      )
                    ) : null}
                  </Card>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    myProfile: state.dataReducer.data,
    profileLoading: state.dataReducer.profileLoading,
    userSuggestion: state.filterReducer.suggestion,
    suggestionLoading: state.filterReducer.filterLoading,
    filterSettings: state.filterReducer.filterInfo,
    restaurants: state.dataReducer.restaurants,
    filterSettingLoading: state.filterReducer.filterDataLoading,
    foodItemName: state.dataReducer.restMenu,
    menuLoading: state.dataReducer.restaurantMenuLoading,
    updateFilterLoading: state.filterReducer.filterUpdateLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMyProfile: () => {
      dispatch(actions.getUser());
    },
    getProfileImage: () => {
      dispatch(actions.getImage());
    },
    getUserSuggestions: () => {
      dispatch(filterActions.getFriendSuggestion());
    },
    getFilterInfo: () => {
      dispatch(filterActions.getRestaurantsSetting());
    },
    getRestaurants: () => {
      dispatch(actions.getRestaurants());
    },
    sendFriendRequest: Id => {
      dispatch(requestAction.sendRequest(Id));
    },
    getMenu: restaurantId => {
      dispatch(actions.getRestaurantMenu(restaurantId));
    },
    updateFilterData: (
      userId,
      aboutId,
      restaurantName,
      menuChoice,
      eatingTime,
      filterId
    ) => {
      dispatch(
        filterActions.updateRestaurantChoice(
          userId,
          aboutId,
          restaurantName,
          menuChoice,
          eatingTime,
          filterId
        )
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
