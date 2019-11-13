import React from "react";
import { Route } from "react-router-dom";
import Restaurants from "./components/Restaurants";
import LoginForm from "./Containers/LoginForm";
import SignupLayout from "./Containers/SignupLayout";
import Profile from "./components/Profile";
import Info from "./components/profileInfo";

export const BaseRouter = () => (
  <div>
    <Route exact path="/" component={Profile} />
    <Route exact path="/restaurants" component={Restaurants} />
    <Route exact path="/profileinfo" component={Info} />
  </div>
);

export const AuthRouter = () => (
  <div>
    <Route exact path="/" component={LoginForm} />
    <Route exact path="/signup" component={SignupLayout} />
  </div>
);
