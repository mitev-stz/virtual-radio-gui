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

    bindHandleMethods(){
      this.handleClickPowerOn = this.handleClickOnPowerBtn.bind(this, true);
      this.handleClickPowerOff = this.handleClickOnPowerBtn.bind(this, false);
      this.handleCallbackFromTuner = this.handleCallbackFromTuner.bind(this);
    }

    componentDidMount(){
      this.retrieveData()
    }

  render() {
    const { isRadioLive, data, isDataLoaded, errorOnLoad, targetFreq} = this.state;
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
              targetFreq = {targetFreq}
              parentCallback = {this.handleCallbackFromTuner}
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

  changeVolumeValue = (volumeControllerData) => {
    this.setState({
      volumeValue: volumeControllerData
    })
  }

  handleClickOnPowerBtn(state){
    this.setState({
      isRadioLive:state
    });
  }
  handleCallbackFromTuner = (freqFromTuner) => {
    this.setState({
      targetFreq: freqFromTuner
    })
    console.log("targetFreq",this.state.targetFreq,"freqFromTuner", freqFromTuner);
  }

  // onFreqDownDone(isIncrease){
  //
  //   // console.log("alt:", this.state.targetFreq);
  //   // let newFreq = this.state.targetFreq;
  //   // this.setState({
  //   //     pressTunerTimer: window.setInterval(function() {
  //   //       if(isIncrease){
  //   //         if(newFreq+0.1<=20) newFreq += 0.1;
  //   //       } else if(newFreq-0.1>=0) newFreq -= 0.1;
  //   //
  //   //     },100)
  //   //   })
  //   //   console.log("new:", this.state.targetFreq);
  //   //   return false;
  // }

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
