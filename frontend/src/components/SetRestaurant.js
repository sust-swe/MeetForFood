import React from "react";
import { Ripple, Ellipsis } from "react-spinners-css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../redux_store/actions/dataAction";
import { Navbar, NavbarBrand, Image } from "react-bootstrap";
import {
  Card,
  CardBody,
  Form,
  Button,
  Row,
  Col,
  CardHeader,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { message } from "antd";

class SetRestaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      restaurant: "",
      food: "",
      time: "",
      dropDownOpen: false,
      menuOpen: false,
      timeOpen: false,
      selectedRestaurant: "Select Restaurant",
      selectedMenu: "Select Item",
      selectedTime: "Select Eating Time",
      availRestaurant: [],
      updateRestaurant: false,
      menuUpdate: false,
      menuList: []
    };
  }

  componentWillMount() {
    this.props.getUserProfile();
    this.props.getExistedRestaurants();
  }

  createRestaurantList() {
    this.setState({
      availRestaurant: this.props.restaurants.map(data => (
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
    if (
      this.state.selectedRestaurant !== "Select Restaurant" &&
      this.state.selectedMenu !== "Select Item" &&
      this.state.selectedTime !== "Select Eating Time"
    ) {
      this.props.setRestSetting(
        this.props.userId,
        this.props.id,
        this.state.selectedRestaurant,
        this.state.selectedMenu,
        this.state.selectedTime
      );
      this.setState({ redirect: true });
    } else {
      alert("Please set all the field");
    }
  };

  toggle = () => {
    this.setState({ dropDownOpen: !this.state.dropDownOpen });
  };

  select = (event, id) => {
    this.setState({
      dropDownOpen: !this.state.dropDownOpen,
      selectedRestaurant: event.target.innerText,
      menuUpdate: true,
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

  componentDidUpdate() {
    if (this.props.loading !== true) {
      if (this.state.updateRestaurant !== true) {
        this.createRestaurantList();
        this.setState({ updateRestaurant: true });
      }
    }

    if (this.props.menuLoading !== true) {
      if (this.state.menuUpdate !== false) {
        this.createRestaurantMenu();
        this.setState({ menuUpdate: false });
      }
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
          {this.props.settingLoading ? (
            <Ripple color="#FFFFFF" size={200} />
          ) : this.state.redirect ? (
            <Redirect to="/setimage" />
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
                Set Where,When and What to Eat
              </CardHeader>
              <CardBody className="card-color">
                <Form
                  onSubmit={this.handleSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                  }}
                >
                  <Row style={{ margin: "10px" }}>
                    <Col md={12}>
                      {this.props.loading ? (
                        <Ellipsis color="#F99116" size={25} />
                      ) : (
                        <Dropdown
                          isOpen={this.state.dropDownOpen}
                          toggle={this.toggle}
                        >
                          <DropdownToggle caret>
                            {this.state.selectedRestaurant}
                          </DropdownToggle>
                          <DropdownMenu>
                            {this.state.availRestaurant}
                          </DropdownMenu>
                        </Dropdown>
                      )}
                    </Col>
                  </Row>

                  <Row
                    style={{
                      margin: "10px"
                    }}
                  >
                    <Col md={12}>
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

                  <Row
                    style={{
                      margin: "10px"
                    }}
                  >
                    <Col md={12}>
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
                    type="submit"
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
    userId: state.dataReducer.data.user_id,
    id: state.dataReducer.data.id,
    settingLoading: state.dataReducer.resSettingLoading,
    restaurants: state.dataReducer.restaurants,
    loading: state.dataReducer.dataLoading,
    foodItemName: state.dataReducer.restMenu,
    menuLoading: state.dataReducer.restaurantMenuLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setRestSetting: (userId, Id, name, item, time) => {
      dispatch(actions.setRestaurantChoice(userId, Id, name, item, time));
    },
    getUserProfile: () => {
      dispatch(actions.getUser());
    },
    getExistedRestaurants: () => {
      dispatch(actions.getRestaurants());
    },
    getMenu: restaurantId => {
      dispatch(actions.getRestaurantMenu(restaurantId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetRestaurant);
