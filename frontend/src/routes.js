import React from "react";
import { Route, Switch } from "react-router-dom";
import Restaurants from "./components/Restaurants";
import LoginForm from "./Containers/LoginForm";
import SignupLayout from "./Containers/SignupLayout";
import Profile from "./components/Profile";
import Info from "./components/profileInfo";
import SetImage from "./components/SetImage";
import Connections from "./components/Connections";
import ChatComp from "./components/ChatComp";
import FriendRequests from "./components/FriendRequest";

export const BaseRouter = () => (
  <Switch>
    <Route exact path="/" component={Profile} />
    <Route exact path="/restaurants" component={Restaurants} />
    <Route exact path="/profileinfo" component={Info} />
    <Route exact path="/setimage" component={SetImage} />
    <Route exact path="/connections" component={ChatComp} />
    <Route exact path="/friendrequest" component={FriendRequests} />
  </Switch>
);

export const AuthRouter = () => (
  <Switch>
    <Route exact path="/" component={LoginForm} />
    <Route exact path="/signup" component={SignupLayout} />
  </Switch>
);
