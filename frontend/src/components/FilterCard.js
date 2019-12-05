import React from "react";
import {} from "react-router-dom";
import { Container, Card, Dropdown, Button } from "react-bootstrap";
import InputRange from "react-input-range";
import { connect } from "react-redux";
import * as actions from "../redux_store/actions/filterAction";
import "../Styles/header.css";
import "react-input-range/lib/css/index.css";

class FilterCard extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.state = {
      dropDownOpen: false,
      gender: "Select Gender",
      ageRange: { min: 25, max: 30 }
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
    this.props.setFilter(
      userGender,
      this.state.ageRange.min,
      this.state.ageRange.max
    );
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
  render() {
    return (
      <Card className="profile-dashboard " style={{ alignItems: "center" }}>
        <Card.Body style={{ justifyContent: "center" }}>
          <Card.Header as="h4">Filter Suggestion</Card.Header>
          <Container
            style={{
              padding: "15px",
              alignContent: "center",
              justifyContent: "center"
            }}
          >
            <Container style={{ padding: "15px" }}>
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
            <Container style={{ padding: "15px" }}>
              <InputRange
                minValue={15}
                maxValue={50}
                name="Set Age range"
                value={this.state.ageRange}
                style={{ padding: "20px" }}
                onChange={event => this.handleAgeRange(event)}
              />
            </Container>
            <Container style={{ padding: "10px" }}>
              <Dropdown isOpen={this.state.dropDownOpen} toggle={this.toggle}>
                <Dropdown.Toggle caret>{this.state.gender}</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={this.select}>Male</Dropdown.Item>
                  <Dropdown.Item onClick={this.select}>Female</Dropdown.Item>
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
      </Card>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setFilter: (gender, min_age, max_age) => {
      dispatch(actions.initFilter(gender, min_age, max_age));
    }
  };
};

export default connect(null, mapDispatchToProps)(FilterCard);
