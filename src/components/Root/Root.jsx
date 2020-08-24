import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import Home from '../Home/Home';
import About from '../About/About';
import VirtualRadio from '../VirtualRadio/VirtualRadio';
import './assets/styles/index.css';

class Root extends React.Component{

  constructor(props){
    super(props);
    this.openCloseSocialContacts = this.openCloseSocialContacts.bind(this);
    this.closeSocialContacts = this.openCloseSocialContacts.bind(this);
  }
  render(){
    return (
      <Router>
        <div className="main">
        <div className="header header-background">
          <nav className="navbar navbar-expand-lg navbar-light">
              <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/virtualRadio">Virtual Radio Project</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/about">About</Link>
                  </li>
              </ul>
          </nav>
        </div>
        <div className="main-content">
          <div className="route-switch">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/about" component={About}/>
              <Route exact path="/virtualRadio" component={VirtualRadio}/>
            </Switch>
          </div>
        <div className="footer" onClick={this.openCloseSocialContacts}>
          Contact us!
        </div>
          <div className="contact-info display-none">
            {/*eslint-disable-next-line*/}
            <a href="https://facebook.com" className="fa fa-facebook" onClick={this.closeSocialContacts}></a>
            {/*eslint-disable-next-line*/}
            <a href="https://facebook.com" className="fa fa-twitter" onClick={this.closeSocialContacts}></a>
            {/*eslint-disable-next-line*/}
            <a href="https://facebook.com" className="fa fa-google" onClick={this.closeSocialContacts}></a>
          </div>
      </div>
    </div>
      </Router>
    );
  }

  openCloseSocialContacts = () => {
    var contacts = document.getElementsByClassName("contact-info")[0];
    if(contacts.classList.value.includes("display-none")){
      contacts.classList.remove("display-none");
      contacts.classList.add("display-flex");
    } else {
      contacts.classList.add("display-none");
      contacts.classList.remove("display-flex");
    }
  }
}



export default Root;
