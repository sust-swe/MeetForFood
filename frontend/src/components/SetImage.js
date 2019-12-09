import React from "react";
import { Redirect } from "react-router-dom";
import { Navbar, NavbarBrand, Image, Container } from "react-bootstrap";
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
      redirect: false
    };
  }

  handleChangeImage = event => {
    this.setState({
      imageData: this.state.imageData.concat(event)
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.setImageData(this.state.imageData[0]);
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
    console.log(this.state.imageData[0]);
    return (
      <div className="wrapper">
        {this.state.redirect ? <Redirect to="/" /> : null}
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
          <Card style={{ padding: "0px" }}>
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
              <Form onSubmit={event => this.handleSubmit(event)}>
                <ImageUploader
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
                  Upload
                </Button>
              </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.dataReducer.dataLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setImageData: imageData => {
      dispatch(actions.setImage(imageData));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetImage);
