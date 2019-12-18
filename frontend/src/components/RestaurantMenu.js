import React from "react";
import { Affix } from "antd";
import NavBar from "./Navbar";
import { connect } from "react-redux";
import * as dataActions from "../redux_store/actions/dataAction";
import {
  Row,
  Col,
  Card,
  FormControl,
  InputGroup,
  Button
} from "react-bootstrap";

class RestaurantMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searcheItem: "",
      menu: [],
      menuAvail: false
    };
  }

  handleChange = event => {
    this.setState({ searcheItem: event.target.value });
  };

  componentDidUpdate() {
    if (this.state.menuAvail !== true) {
      this.getRestMenu();
      this.setState({ menuAvail: true });
    }
  }

  getRestMenu() {
    this.state.menu = this.props.restaurantMenu.map(data => (
      <Col key={data.id}>
        <Card
          style={{
            alignItems: "left",
            padding: "0px",
            margin: "10px",
            width: "20rem",
            overflow: "hidden",
            alignContent: "bottom",
            borderRadius: "0",
            background: "#242424",
            border: "0px"
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
                For {data.category_name}
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
                <div style={{ padding: "2px" }}>
                  Item name: {data.item_name}
                </div>
                <div style={{ padding: "2px" }}>Price: {data.price}</div>
              </div>
            </Card.Body>
          </Card.ImgOverlay>
        </Card>
      </Col>
    ));
  }

  render() {
    return (
      <div>
        <Affix offsetTop={0}>
          <NavBar />
        </Affix>
        <div style={{ margin: "0px", padding: "0" }}>
          <Affix offsetTop={60}>
            <Row
              style={{
                background: "white",
                boxShadow: "1px 1px 5px #242424",
                margin: "0px",
                padding: "10px",
                display: "flex"
              }}
            >
              <Col md={4}>
                <h2 style={{ color: "#F99116" }}>Restaurant Menu</h2>
              </Col>
              {/* <Col>
                <InputGroup
                  style={{ marginLeft: "10px", marginRight: "20px" }}
                  size="lg"
                  className="mb-3"
                >
                  <FormControl
                    placeholder="Search item with category, price or name"
                    aria-label="With textarea"
                    value={this.state.searcheItem}
                    onChange={this.handleChange}
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
              </Col> */}
            </Row>
          </Affix>
          <div className="restaurnat-scroll">
            <Row noGutters={true}>{this.state.menu}</Row>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    restaurantMenu: state.dataReducer.restMenu
  };
};

const mapDipatchToProps = dispatch => {
  return {
    getMenu: id => {
      dispatch(dataActions.getRestaurantMenu(id));
    }
  };
};

export default connect(mapStateToProps, null)(RestaurantMenu);
