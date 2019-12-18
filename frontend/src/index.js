import React from "react";
import ReactDOM from "react-dom";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-input-2/lib/style.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "react-input-range/lib/css/index.css";
import "./Styles/header.css";

import reducer from "./redux_store/reducers/authenticate";
import dataReducer from "./redux_store/reducers/dataReducer";
import filterReducer from "./redux_store/reducers/filterReducer";
import friendRequestReducer from "./redux_store/reducers/friendRequestReducer";

const masterReducer = combineReducers({
  authenticate: reducer,
  dataReducer: dataReducer,
  filterReducer: filterReducer,
  friendRequestReducer: friendRequestReducer
});

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  masterReducer,
  composeEnhances(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);
ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
