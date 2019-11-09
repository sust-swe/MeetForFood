import React from "react";
import { Route, Redirect } from "react-router-dom";
import Restaurants from "./components/Restaurants";
import LoginForm from "./Containers/LoginForm";
import SignupLayout from "./Containers/SignupLayout";
import Profile from "./components/Profile";

let isloggedin = false;

export const BaseRouter = () => (
  <div>
    {isloggedin ? <Redirect to="/" /> : <Redirect to="/restaurants" />}
    <Route exact path="/login" component={LoginForm} />
    <Route exact path="/signup" component={SignupLayout} />
    <Route exact path="/profile" component={Profile} />
    <Route exact path="/restaurants" component={Restaurants} />
  </div>
);
