import React from 'react';
import axios from 'axios';
import AudioElement from "../AudioElement/AudioElement";

class VirtualRadio extends React.Component{
  state = {
    data:[]
  };
  componentDidMount(){
    axios.get("https://radio.ethylomat.de/api/v1/channels/")
    .then( response =>{
      const json = response.data;
      this.setState({
        data: json
      });
    })
    .catch(err =>{
      console.error(err);
    });
  }

  render() {
    return (
      <div className="centered-container virtRadio">
        <div className="centered-context">
          Virtual Radio is here.
          <div className="container audio-list-container">
            {this.state.data.map(json =>(
              <AudioElement key={json.id} data={json}></AudioElement>
            )
            )}
          </div>
        </div>
      </div>
    );
  }
}



export default VirtualRadio;
