import React from 'react';
import axios from 'axios';
import AudioList from "../AudioList/AudioList";
import PowerSwitch from "../PowerSwitch/PowerSwitch";
import Tuner from "../Tuner/Tuner";
import VolumeController from "../VolumeController/VolumeController";

class VirtualRadio extends React.Component{
  constructor(props){
    super(props)
    this.bindHandleMethods();
  }
    state = {
        data:[],
        targetFreq: 0.1,
        isDataLoaded: false,
        errorOnLoad: null,
        isRadioLive: false,
        pressTunerTimer: null,
        volumeValue: 0.4
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
            <Tuner
              onIncrBtnUp={this.handleFreqIncrUp}
              onIncrBtnDown={this.handleFreqIncrDown}
              onDecrBtnUp={this.handleFreqDecrUp}
              onDecrBtnDown={this.handleFreqDecrDown}
              ></Tuner>
            <PowerSwitch
              onPowerOn={this.handleClickPowerOn}
              onPowerOff={this.handleClickPowerOff}
              isRadioLive={isRadioLive}
              ></PowerSwitch>
            <VolumeController
              parentCallback={this.changeVolumeValue}
              volumeValue={this.state.volumeValue}>
            </VolumeController>
          </div>
          <AudioList audios={data}> </AudioList>
        </div>
      );

    }
  }
  bindHandleMethods(){
    this.handleClickPowerOn = this.handleClickPower.bind(this, true);
    this.handleClickPowerOff = this.handleClickPower.bind(this, false);
    this.handleFreqIncrUp = this.handleFreqUp.bind(this, true);
    this.handleFreqDecrUp = this.handleFreqUp.bind(this, false);
    this.handleFreqIncrDown = this.handleFreqDown.bind(this, true);
    this.handleFreqDecrDown = this.handleFreqDown.bind(this, false);
  }

  changeVolumeValue = (volumeControllerData) => {
    this.setState({
      volumeValue: volumeControllerData
    })
  }

  handleClickPower(state){
    this.setState({
      isRadioLive:state
    });
  }
  handleFreqUp(isIncrease){
    clearTimeout(this.pressTunerTimer);
  }
  handleFreqDown(isIncrease){
    console.log("alt:", this.state.targetFreq);
    let newFreq = this.state.targetFreq;
    this.setState({
        pressTunerTimer: window.setTimeout(function() {
          if(isIncrease){
            if(newFreq+0.1<=20) newFreq += 0.1;
          } else if(newFreq-0.1>=0) newFreq -= 0.1;
          this.setState({
            targetFreq: newFreq
          });
        },20)
      })
      console.log("new:", this.state.targetFreq);
      return false;
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
