import React from "react";
import { BaseRouter } from "./routes";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
// import ClassicFormPage from "./Containers/Front";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <BaseRouter />
        </Router>
      </div>
    );
  }
}
export default App;
