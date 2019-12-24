import React from "react";
import { Ripple } from "react-spinners-css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../redux_store/actions/dataAction";
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
  CardHeader,
  FormFeedback
} from "reactstrap";

class SetRestaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      restaurant: "",
      food: "",
      time: ""
    };
  }

  componentWillMount() {
    this.props.getUserProfile();
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
    this.props.setRestSetting(
      this.props.userId,
      this.props.id,
      this.state.restaurant
    );
    this.setState({ redirect: true });
  };

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
    settingLoading: state.dataReducer.resSettingLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setRestSetting: (userId, Id, name) => {
      dispatch(actions.setRestaurantChoice(userId, Id, name));
    },
    getUserProfile: () => {
      dispatch(actions.getUser());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetRestaurant);
