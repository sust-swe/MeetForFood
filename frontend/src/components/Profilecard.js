import React from "react";
import {} from "react-router-dom";
import ImageLoader from "react-load-image";
import { Container, Image, Card, Badge } from "react-bootstrap";
import { connect } from "react-redux";
import { ClipLoader } from "react-spinners";
import { DualRing } from "react-spinners-css";
import * as actions from "../redux_store/actions/dataAction";
import "../Styles/header.css";

class ProfileCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  componentWillMount() {
    this.props.fetchUsers();
    this.props.getImage();
    this.setState({ loading: this.props.imageLoading });
  }
  componentDidMount() {
    this.setState({ loading: this.props.imageLoading });
  }
  render() {
    const token = localStorage.getItem("token");
    console.log(token);
    return (
      <div>
        <Card
          className="profile-dashboard "
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center"
          }}
        >
          {this.props.imageLoading ? (
            <DualRing color="#F99116" size={120} />
          ) : (
            <Image
              src={this.props.image.image}
              height="150px"
              width="150px"
              roundedCircle
            />
          )}

          <Card.Body style={{ justifyContent: "center" }}>
            <Card.Title>
              <h3 style={{ textAlign: "center" }}>{this.props.users.name}</h3>
              <h5 style={{ textAlign: "center" }}>Love to eat</h5>
            </Card.Title>
            <Card.Text>
              <span>
                <span style={{ fontWeight: "bold" }}>City: </span> Sylhet,
                Bangladesh
              </span>
              <br />
              <br />
              <Container style={{ padding: "0", margin: "0" }}>
                <span style={{ fontWeight: "bold" }}>Favourite Food:</span>
              </Container>
              <Container style={{ padding: "0", margin: "0" }}>
                <Badge pill variant="info">
                  {this.props.users.what_you_crave_for}
                </Badge>
              </Container>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.dataReducer.data,
    image: state.dataReducer.image,
    imageLoading: state.dataReducer.imageLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(actions.getUser()),
    getImage: () => dispatch(actions.getImage())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCard);
