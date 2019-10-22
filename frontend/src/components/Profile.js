import React from "react";
import {} from "react-router-dom";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import NavBar from "./Navbar";
import "../Styles/header.css";

class Profile extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Container fluid>
          <Row>
            <Col sm={3}>
              <Card
                className="profile-dashboard "
                style={{ alignItems: "center" }}
              >
                <Image
                  src={require("../Images/photo.jpg")}
                  height="150px"
                  width="150px"
                  roundedCircle
                />
                <Card.Body style={{ justifyContent: "center" }}>
                  <Card.Title>
                    <h3 style={{ textAlign: "center" }}>Rakib Hasan</h3>
                    <h5 style={{ textAlign: "center" }}>Love to eat</h5>
                  </Card.Title>
                </Card.Body>
              </Card>
              {/* <div class="profile-sidebar">
				<!-- SIDEBAR USERPIC -->
				<div class="profile-userpic">
					<img src="http://keenthemes.com/preview/metronic/theme/assets/admin/pages/media/profile/profile_user.jpg" class="img-responsive" alt="">
				</div>
				<!-- END SIDEBAR USERPIC -->
				<!-- SIDEBAR USER TITLE -->
				<div class="profile-usertitle">
					<div class="profile-usertitle-name">
						Marcus Doe
					</div>
					<div class="profile-usertitle-job">
						Developer
					</div>
				</div>
				<!-- END SIDEBAR USER TITLE -->
				<!-- SIDEBAR BUTTONS -->
				<div class="profile-userbuttons">
					<button type="button" class="btn btn-success btn-sm">Follow</button>
					<button type="button" class="btn btn-danger btn-sm">Message</button>
				</div>
				<!-- END SIDEBAR BUTTONS -->
				<!-- SIDEBAR MENU -->
				<div class="profile-usermenu">
					<ul class="nav">
						<li class="active">
							<a href="#">
							<i class="glyphicon glyphicon-home"></i>
							Overview </a>
						</li>
						<li>
							<a href="#">
							<i class="glyphicon glyphicon-user"></i>
							Account Settings </a>
						</li>
						<li>
							<a href="#" target="_blank">
							<i class="glyphicon glyphicon-ok"></i>
							Tasks </a>
						</li>
						<li>
							<a href="#">
							<i class="glyphicon glyphicon-flag"></i>
							Help </a>
						</li>
					</ul>
				</div> */}
            </Col>
            <Col sm={8} id="profile-history"></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Profile;
