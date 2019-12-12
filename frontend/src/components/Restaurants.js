import React from "react";
import "../Styles/header.css";
import NavBar from "./Navbar";
import { connect } from "react-redux";
import { Container, Row, Col, Card } from "react-bootstrap";
import ProfileCard from "./Profilecard";
import { MdLocationOn } from "react-icons/md";
import * as dataActions from "../redux_store/actions/dataAction";
import { Affix } from "antd";

class Restaurants extends React.Component {
  componentWillMount() {
    this.props.getRestaurant();
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
                style={{ color: "white", fontStyle: "bold", padding: "10px" }}
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
                <div style={{ padding: "2px" }}>E-mail: {data.email}</div>
                <div style={{ padding: "2px" }}>Phone: {data.phone_no}</div>
              </div>
            </Card.Body>
          </Card.ImgOverlay>
        </Card>
      </Col>
    ));
    return (
      <div>
        <Affix offsetTop={0}>
          <NavBar />
        </Affix>
        <Container style={{ margin: "0" }}>
          <Row>
            <Col xs={3}>
              <Affix offsetTop={90}>
                <ProfileCard />
              </Affix>
            </Col>
            <Col>
              <div style={{ paddingTop: "50px" }}>
                <Container className="inner-scroll">{restaurants}</Container>
              </div>
            </Col>
          </Row>
        </Container>
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
    }
  };
};

export default connect(mapStateToProps, mapDipatchToProps)(Restaurants);
