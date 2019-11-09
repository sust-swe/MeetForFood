import React from "react";
import { Route } from "react-router-dom";
import Restaurants from "./components/Restaurants";
import LoginForm from "./Containers/LoginForm";
import SignupLayout from "./Containers/SignupLayout";
import Profile from "./components/Profile";

export const BaseRouter = () => (
  <div>
    <Route exact path="/profile" component={Profile} />
    <Route exact path="/" component={Restaurants} />
  </div>
);

export const AuthRouter = () => (
  <div>
    <Route exact path="/" component={LoginForm} />
    <Route exact path="/signup" component={SignupLayout} />
  </div>
);
