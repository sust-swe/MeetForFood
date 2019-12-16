import React from "react";
import "../Styles/header.css";
import NavBar from "./Navbar";
import { connect } from "react-redux";
import { Row, Col, Card, Button } from "react-bootstrap";
import ProfileCard from "./Profilecard";
import { MdLocationOn } from "react-icons/md";
import * as dataActions from "../redux_store/actions/dataAction";
import { Affix } from "antd";
import { NavLink } from "react-router-dom";

class Restaurants extends React.Component {
  componentWillMount() {
    this.props.getRestaurant();
    console.log("calling restaurants");
  }

  getRestaurantId(id) {
    this.props.getMenu(id);
  }

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
            alignItems: "bottom",
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
                  to="/restaurants/restaurantmenu"
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
                padding: "10px"
              }}
            >
              <h2 style={{ color: "#F99116" }}>Restaurants</h2>
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
    }
  };
};

export default connect(mapStateToProps, mapDipatchToProps)(Restaurants);
