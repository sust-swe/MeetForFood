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

class SetRestaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      restaurant: "",
      food: "",
      time: "",
      dropDownOpen: false,
      selectedRestaurant: "Select Restaurant",
      availRestaurant: [],
      updateRestaurant: false
    };
  }

  componentWillMount() {
    this.props.getUserProfile();
    this.props.getExistedRestaurants();
  }

  createRestaurantList() {
    this.setState({
      availRestaurant: this.props.restaurants.map(data => (
        <DropdownItem key={data.id} onClick={this.select}>
          {data.name}
        </DropdownItem>
      ))
    });
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
    if (this.state.selectedRestaurant !== "Select Restaurant") {
      this.props.setRestSetting(
        this.props.userId,
        this.props.id,
        this.state.selectedRestaurant
      );
      this.setState({ redirect: true });
    }
  };

  toggle = () => {
    this.setState({ dropDownOpen: !this.state.dropDownOpen });
  };

  select = event => {
    this.setState({
      dropDownOpen: !this.state.dropDownOpen,
      selectedRestaurant: event.target.innerText
    });
  };

  componentDidUpdate() {
    if (this.props.loading !== true) {
      if (this.state.updateRestaurant !== true) {
        this.createRestaurantList();
        this.setState({ updateRestaurant: true });
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
                Complete Your Profile
              </CardHeader>
              <CardBody className="card-color">
                <Form onSubmit={this.handleSubmit}>
                  <Row style={{ margin: "15px" }}>
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
    loading: state.dataReducer.dataLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setRestSetting: (userId, Id, name) => {
      dispatch(actions.setRestaurantChoice(userId, Id, name));
    },
    getUserProfile: () => {
      dispatch(actions.getUser());
    },
    getExistedRestaurants: () => {
      dispatch(actions.getRestaurants());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetRestaurant);
