import React from 'react';
import './assets/styles/home.css';
import axios from 'axios';

class Home extends React.Component {
  componentDidMount(){
    axios.get("https://cors-anywhere.herokuapp.com/")
    .then( res =>{
      console.log(res.data);
    });
    // axios.get("https://radio.ethylomat.de/api/v1/channels").then( response =>{
    //
    //   console.log(response);
    // });
  }
  render() {
    return (
      <div className="Home">
        <div className="test">
          Hello World! Entry!
        </div>
      </div>
    );
  }
}

export default Home;
