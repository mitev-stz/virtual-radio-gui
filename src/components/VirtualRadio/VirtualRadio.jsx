import React from 'react';
import axios from 'axios';
import AudioList from "../AudioList/AudioList";
import PowerSwitch from "../PowerSwitch/PowerSwitch";
import Tuner from "../Tuner/Tuner";
import VolumeController from "../VolumeController/VolumeController";
import Retina from "../Retina/Retina";

class VirtualRadio extends React.Component{
  constructor(props){
    super(props);
    this.bindHandleMethods();
  }
    state = {
        data:[],
        targetFreq: 0.1,
        isDataLoaded: false,
        errorOnLoad: null,
        isRadioLive: false,
        volumeValue: 0.4
    };

    bindHandleMethods(){
      this.handleClickPowerOn = this.handleClickOnPowerBtn.bind(this, true);
      this.handleClickPowerOff = this.handleClickOnPowerBtn.bind(this, false);
      this.handleCallbackFromTuner = this.handleCallbackFromTuner.bind(this);
      this.changeVolumeValue = this.changeVolumeValue.bind(this);
    }

    componentDidMount(){
      this.retrieveData()
    }

  render() {
    const { isRadioLive, data, isDataLoaded, errorOnLoad, targetFreq, volumeValue} = this.state;
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
              targetFreq={targetFreq}
              parentCallback = {this.handleCallbackFromTuner}
              ></Tuner>
            <div>targetFreq: {targetFreq} </div>
            <PowerSwitch
              onPowerOn={this.handleClickPowerOn}
              onPowerOff={this.handleClickPowerOff}
              isRadioLive={isRadioLive}
              ></PowerSwitch>
            <VolumeController
              parentCallback={this.changeVolumeValue}
              volumeValue={this.state.volumeValue}>
            </VolumeController>
            <Retina
              targetFreq={targetFreq}
              isRadioLive={isRadioLive}>
            </Retina>
            <div className="container"> Volume In Radio Component: {volumeValue}</div>
          </div>
          <AudioList audios={data}> </AudioList>
        </div>
      );

    }
  }

  changeVolumeValue = (volumeControllerData) => {
    this.setState({
      volumeValue: volumeControllerData
    })
  }

  handleClickOnPowerBtn(state){
    this.setState({
      isRadioLive:state
    });
    console.log("isRadioLive", this.state.isRadioLive);
  }

  handleCallbackFromTuner = (freqFromTuner) => {
    let newFreq = freqFromTuner.toFixed(2);
    this.setState({
      targetFreq: newFreq
    })
    console.log("targetFreq:",this.state.targetFreq,"freqFromTuner:", freqFromTuner.toFixed(2));
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
