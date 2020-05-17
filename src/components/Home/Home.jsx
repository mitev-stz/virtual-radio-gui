import React from 'react';
import './assets/styles/home.css';

class Home extends React.Component {
  componentDidMount(){
    const resp = fetch("https://radio.ethylomat.de/api/v1/channels");
    console.log(resp);
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
