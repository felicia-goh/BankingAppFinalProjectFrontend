import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { Switch, Route, Link } from "react-router-dom";
import SingleService from './components/single-service';
import AccountList from './components/account-list.component';


function App() {
  return (
    <div className="App">
      <div className="App">
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/users" className="navbar-brand">
            Online Banking System 
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/getservicestatus"} className="nav-link">
                Get Service Status
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <AccountList />
          <Switch>
            <Route exact path="/getservicestatus" component={SingleService}></Route>
          </Switch>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
