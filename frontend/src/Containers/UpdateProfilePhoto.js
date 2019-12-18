import React from "react";
import { Redirect, NavLink } from "react-router-dom";
import { Ripple } from "react-spinners-css";
import { Affix } from "antd";
import ImageUploader from "react-images-upload";
import * as actions from "../redux_store/actions/dataAction";
import { connect } from "react-redux";
import { Card, CardBody, Form, Button, CardHeader } from "reactstrap";
import EmptyNav from "../components/EmptyNav";

class UpdateProfilePhoto extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      imageData: [],
      redirect: false
    };
  }

  componentDidMount() {
    this.props.getUserAbout();
  }

  handleChangeImage = event => {
    this.setState({
      imageData: this.state.imageData.concat(event)
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.imageData.length !== 0) {
      this.props.updatePhoto(
        this.props.userData.user_id,
        this.props.userData.id,
        this.state.imageData[0]
      );
      this.handleRedirect();
    } else {
      alert("set image first");
    }
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
          <EmptyNav />
        </Affix>
        <div className="overlay"></div>
        <div id="form-container">
          {this.props.dataLoading ? (
            <Ripple color="FFFFFF" size={200} />
          ) : this.props.uploadLoading ? (
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
                      maxFileSize={819200}
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
                      Update
                    </Button>
                    <NavLink to="/" style={{ textDecoration: "none" }}>
                      <Button
                        className="btn-lg btn-block btn-dark"
                        style={{ marginTop: "10px" }}
                      >
                        Cancel
                      </Button>
                    </NavLink>
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
    userData: state.dataReducer.data,
    uploadLoading: state.dataReducer.submitImageLoading,
    dataLoading: state.dataReducer.profileLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserAbout: () => {
      dispatch(actions.getUser());
    },
    updatePhoto: (id, user_id, userImage) => {
      dispatch(actions.updateImage(id, user_id, userImage));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfilePhoto);
