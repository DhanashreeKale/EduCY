import React, { useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login.component";
import AddStudent from "./components/addstudent.component";
import AddTeacher from "./components/addteacher.component";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <img src="educy.png" width="50" height="50" alt=""></img>
                <li className="nav-item">
                  <Link className="nav-link" to={"/login"}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/addstudent"}>
                    Add Student
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/addteacher"}>
                    Add Teacher
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/*<div className="outer">
          <div className="inner">*/}
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/addstudent" component={AddStudent} />
          <Route path="/addteacher" component={AddTeacher} />
        </Switch>
        {/* </div>
        {/*</div> */}
      </div>
    </Router>
  );
}

export default App;
