import React from "react";
import { Redirect } from "react-router-dom";
import { Ripple } from "react-spinners-css";
import { Affix } from "antd";
import { Navbar, NavbarBrand, Image } from "react-bootstrap";
import ImageUploader from "react-images-upload";
import * as actions from "../redux_store/actions/dataAction";
import { connect } from "react-redux";
import { Card, CardBody, Form, Button, CardHeader } from "reactstrap";

class SetImage extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      imageData: [],
      redirect: false,
      buttonName: "Skip"
    };
  }

  componentWillMount() {
    this.props.getResSetting();
  }

  setButtonName(data) {
    if (data[0] == null || data[0] === "" || data[0] === undefined) {
      return "Skip";
    } else {
      return "Upload";
    }
  }

  handleChangeImage = event => {
    this.setState({
      imageData: this.state.imageData.concat(event),
      buttonName: this.setButtonName(event)
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.props.profileData);
    this.props.setImageData(this.state.imageData[0], this.props.restID.id);
    this.props.getProfile();
    this.handleRedirect();
  };

  handleRedirect() {
    if (
      this.props.err === null ||
      this.props.err === undefined ||
      this.props.loading === false
    ) {
      this.setState({ redirect: true });
    }
  }

  render() {
    return (
      <div className="wrapper">
        <Affix offsetTop={0}>
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
        </Affix>

        <div className="overlay"></div>

        <div id="form-container">
          {this.props.submitImageLoading ? (
            <Ripple color="FFFFFF" size={200} />
          ) : this.props.profileLoading ? (
            <Ripple color="FFFFFF" size={200} />
          ) : this.state.redirect ? (
            <Redirect to="/" />
          ) : (
            <Card style={{ padding: "0px" }}>
              <div>
                <CardHeader
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    background: "#FFFFFF",
                    color: "black",
                    alignContent: "center",
                    alignItems: "center"
                  }}
                >
                  <h4>Select Profile Picture</h4>
                </CardHeader>
                <CardBody style={{ alignContent: "center" }}>
                  <Form onSubmit={event => this.handleSubmit(event)} noValidate>
                    <ImageUploader
                      name="image"
                      withIcon={true}
                      buttonText="Choose Image"
                      onChange={this.handleChangeImage}
                      imgExtension={[".jpg", ".png"]}
                      maxFileSize={5242880}
                      singleImage={true}
                      withLabel={false}
                      withPreview={true}
                      buttonStyles={{ background: "#242424" }}
                      fileContainerStyle={{
                        padding: "0px"
                      }}
                    />
                    <Button
                      type="submit"
                      id="normal_button"
                      className="btn-lg btn-block btn-dark"
                    >
                      {this.state.buttonName}
                    </Button>
                  </Form>
                </CardBody>
              </div>
            </Card>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.dataReducer.dataLoading,
    profileLoading: state.dataReducer.profileLoading,
    setImageLoading: state.dataReducer.submitImageLoading,
    profileData: state.dataReducer.data,
    restID: state.dataReducer.resSetting
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setImageData: (imageData, restaurantID) => {
      dispatch(actions.setImage(imageData, restaurantID));
    },
    getProfile: () => {
      dispatch(actions.getUser());
    },
    getResSetting: () => {
      dispatch(actions.getRestaurantChoice());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetImage);
