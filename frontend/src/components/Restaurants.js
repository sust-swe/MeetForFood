import React from "react";
import "../Styles/header.css";
import NavBar from "./Navbar";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  Button,
  InputGroup,
  FormControl
} from "react-bootstrap";
import * as dataActions from "../redux_store/actions/dataAction";
import { Affix } from "antd";
import { NavLink } from "react-router-dom";

class Restaurants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchItem: ""
    };
  }

  componentWillMount() {
    this.props.getRestaurant();
    console.log("calling restaurants");
  }

  getRestaurantId(id) {
    this.props.getMenu(id);
  }

  handleSearchChange = event => {
    this.setState({ searchItem: event.target.value });
  };

  search = event => {
    event.preventDefault();
    this.props.getSearchResult(this.state.searchItem);
  };

  render() {
    const restaurants = this.props.restaurant.map(data => (
      <Col key={data.id}>
        <Card
          style={{
            alignItems: "left",
            padding: "0px",
            margin: "10px",
            width: "20rem",
            overflow: "hidden",
            alignContent: "bottom",
            borderRadius: "0"
          }}
        >
          <Card.Img
            variant="top"
            src={data.restaurant_image}
            cap
            height="200px"
            width="200px"
            style={{ borderRadius: 0 }}
          />
          <Card.ImgOverlay style={{ padding: "0px" }}>
            <Card.Body style={{ padding: "0px" }}>
              <h2
                style={{
                  color: "#F99116",
                  fontStyle: "bold",
                  padding: "10px"
                }}
              >
                {data.name}
              </h2>

              <div
                className="card_background"
                style={{
                  padding: "15px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative"
                }}
              >
                <div style={{ fontStyle: "bold" }}>
                  Price: {data.price_category}
                </div>
                <div style={{ padding: "2px" }}>Location: {data.address}</div>
                <div style={{ padding: "2px" }}>Phone: {data.phone_no}</div>
                <NavLink
                  to={{
                    pathname: "/restaurants/restaurantmenu",
                    restaurantID: data.id
                  }}
                  style={{
                    display: "block",
                    position: "relative",
                    textDecoration: "none"
                  }}
                >
                  <Button
                    style={{
                      background: "white",
                      color: "#242424",
                      borderRadius: "25px",
                      border: 0,
                      display: "flex"
                    }}
                    onClick={this.getRestaurantId.bind(this, data.id)}
                  >
                    View
                  </Button>
                </NavLink>
              </div>
            </Card.Body>
          </Card.ImgOverlay>
        </Card>
      </Col>
    ));
    console.log("accessing restaurants");
    return (
      <div>
        <Affix offsetTop={0}>
          <NavBar />
        </Affix>

        <div style={{ margin: "0px", padding: "0" }}>
          <Affix offsetTop={60}>
            <div
              style={{
                background: "white",
                boxShadow: "1px 1px 5px #242424",
                margin: "0px",
                padding: "10px",
                display: "flex"
              }}
            >
              <h2 style={{ color: "#F99116" }}>Restaurants</h2>
              <InputGroup
                style={{ marginLeft: "10px", marginRight: "20px" }}
                size="lg"
                className="mb-3"
              >
                <FormControl
                  placeholder="Search Restaurant"
                  aria-label="With textarea"
                  value={this.state.searchItem}
                  onChange={this.handleSearchChange}
                />
                <InputGroup.Append>
                  <Button
                    className="btn-lg btn-block btn-dark"
                    onClick={this.search}
                  >
                    Search
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </div>
          </Affix>
          <div className="restaurnat-scroll">
            <Row noGutters={true}>{restaurants}</Row>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    restaurant: state.dataReducer.restaurants
  };
};

const mapDipatchToProps = dispatch => {
  return {
    getRestaurant: () => {
      dispatch(dataActions.getRestaurants());
    },
    getMenu: id => {
      dispatch(dataActions.getRestaurantMenu(id));
    },
    getSearchResult: item => {
      dispatch(dataActions.getSearchedRestaurants(item));
    }
  };
};

export default connect(mapStateToProps, mapDipatchToProps)(Restaurants);
