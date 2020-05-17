import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import Home from '../Home/Home';
import About from '../About/About';
import VirtualRadio from '../VirtualRadio/VirtualRadio';

import './assets/styles/index.css';

const Root = () =>(
  <Router>
    <div className="header header-background">
      <nav className="navbar navbar-expand-lg navbar-light">
          <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/virtual-radio-gui">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/virtual-radio-gui/virtualRadio">Virtual Radio Project</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/virtual-radio-gui/about">About</Link>
              </li>
          </ul>
      </nav>
    </div>
    <Switch>
      <Route exact path="/virtual-radio-gui/" component={Home}/>
      <Route exact path="/virtual-radio-gui/about" component={About}/>
      <Route exact path="/virtual-radio-gui/virtualRadio" component={VirtualRadio}/>
    </Switch>
    <div className="footer container">
      contact me here!
    </div>
  </Router>
);
export default Root;

//TODO nav-item active
