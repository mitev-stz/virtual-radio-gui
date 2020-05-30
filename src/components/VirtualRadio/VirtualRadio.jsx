import React from 'react';
import axios from 'axios';
import AudioList from "../AudioList/AudioList";
import PowerSwitch from "../PowerSwitch/PowerSwitch";

class VirtualRadio extends React.Component{
  constructor(props){
    super(props)
    this.bindHandleMethods();
  }
    state = {
        data:[],
        isDataLoaded: false,
        errorOnLoad: null,
        isRadioLive: false
    };
    componentDidMount(){
      this.retrieveData()
    }

  render() {
    const { isRadioLive, data, isDataLoaded, errorOnLoad} = this.state;
    if(errorOnLoad){
      return <div> Error: {errorOnLoad}</div>
    } else if (!isDataLoaded) {
      return <div>Loading Data... </div>
    } else {
      return (
        <div className="centered-container virtRadio">
          <div className="centered-context">
            Virtual Radio is here.
            <PowerSwitch
              onPowerOn={this.handleClickPowerOn}
              onPowerOff={this.handleClickPowerOff}
              isRadioLive={isRadioLive}
              ></PowerSwitch>

          </div>
          <AudioList audios={data}> </AudioList>
        </div>
      );
    }
  }
  bindHandleMethods(){
    this.handleClickPowerOn = this.handleClickPower.bind(this, true);
    this.handleClickPowerOff = this.handleClickPower.bind(this, false);
  }

  handleClickPower(state){
    this.setState({
      isRadioLive:state
    });
  }

  retrieveData(){
    axios.get("https://radio.ethylomat.de/api/v1/channels/")
    .then( response =>{
      const json = response.data;
      this.setState({
        data: json,
        isDataLoaded: true
      });
    })
    .catch(err =>{
      this.setState({
        isDataLoaded: true,
        errorOnLoad: err
      })
    });
  }
}



export default VirtualRadio;
