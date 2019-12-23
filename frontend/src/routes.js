import React from "react";
import { Route, Switch } from "react-router-dom";
import Restaurants from "./components/Restaurants";
import LoginForm from "./Containers/LoginForm";
import SignupLayout from "./Containers/SignupLayout";
import Profile from "./components/Profile";
import Info from "./components/profileInfo";
import SetImage from "./components/SetImage";
import Connections from "./components/Connections";
import FriendRequests from "./components/FriendRequest";
import EditProfile from "./Containers/EditProfile";
import UpdateProfilePhoto from "./Containers/UpdateProfilePhoto";
import RestaurantMenu from "./components/RestaurantMenu";
import SetRestaurant from "./components/SetRestaurant";

export const BaseRouter = () => (
  <Switch>
    <Route exact path="/" component={Profile} />
    <Route exact path="/editprofile" component={EditProfile} />
    <Route exact path="/restaurants" component={Restaurants} />
    <Route exact path="/setrestaurant" component={SetRestaurant} />
    <Route
      exact
      path="/restaurants/restaurantmenu"
      component={RestaurantMenu}
    />
    <Route exact path="/connections" component={Connections} />
    <Route exact path="/friendrequest" component={FriendRequests} />
    <Route exact path="/updateimage" component={UpdateProfilePhoto} />
    <Route exact path="/profileinfo" component={Info} />
    <Route exact path="/setimage" component={SetImage} />
  </Switch>
);

export const AuthRouter = () => (
  <Switch>
    <Route exact path="/" component={LoginForm} />
    <Route exact path="/signup" component={SignupLayout} />
  </Switch>
);
