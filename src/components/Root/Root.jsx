import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import Home from '../Home/Home';
import About from '../About/About';
import VirtualRadio from '../VirtualRadio/VirtualRadio';

import './assets/styles/index.css';

const Root = () =>(
  <Router>
    <div className="header">
      <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/virtualRadio">VirtualRadio</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>

          </ul>
      </nav>
    </div>
    <Switch>
      <Route exact path="/virtual-radio-gui/" component={Home}/>
      <Route exact path="/virtual-radio-gui/about" component={About}/>
      <Route exact path="/virtual-radio-gui/virtualRadio" component={VirtualRadio}/>
    </Switch>
  </Router>
);
export default Root;
