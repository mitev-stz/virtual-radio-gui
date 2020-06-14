import React from 'react';
import axios from 'axios';
import AudioList from "../AudioList/AudioList";
import PowerSwitch from "../PowerSwitch/PowerSwitch";
import Tuner from "../Tuner/Tuner";
import VolumeController from "../VolumeController/VolumeController";
import QuickChannelButtonList from "../QuickChannelButtonList/QuickChannelButtonList";


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
        volumeValue: 0.4,
        isChannelStreaming: false,
        streamingChannelID: -1
    };

    bindHandleMethods(){
      this.handleClickPowerOn = this.handleClickOnPowerBtn.bind(this, true);
      this.handleClickPowerOff = this.handleClickOnPowerBtn.bind(this, false);
      this.handleCallbackFromTuner = this.handleCallbackFromTuner.bind(this);
      this.changeVolumeValue = this.changeVolumeValue.bind(this);
      this.handleQuickChannelButtonClick = this.handleQuickChannelButtonClick.bind(this);
      this.setSteamingChannelIfLive = this.setSteamingChannelIfLive.bind(this);
    }

    componentDidMount(){
      this.retrieveData()
    }

  render() {
    const { isRadioLive, data, isDataLoaded, errorOnLoad, targetFreq, volumeValue, streamingChannelID, isChannelStreaming} = this.state;
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
              isRadioLive={isRadioLive}
              data={data}
              isChannelStreaming={isChannelStreaming}
              streamingChannelID={streamingChannelID}
              parentCallback = {this.handleCallbackFromTuner}
              ></Tuner>
            <div>targetFrequency: {targetFreq} </div>
            <PowerSwitch
              onPowerOn={this.handleClickPowerOn}
              onPowerOff={this.handleClickPowerOff}
              isRadioLive={isRadioLive}
              ></PowerSwitch>
            <VolumeController
              parentCallback={this.changeVolumeValue}
              volumeValue={this.state.volumeValue}>
            </VolumeController>
            <QuickChannelButtonList
              data={data}
              parentCallback={this.handleQuickChannelButtonClick}>
            </QuickChannelButtonList>
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
    });
  }

  handleClickOnPowerBtn(state){
    this.setState({
      isRadioLive:state
    });
  }

  handleCallbackFromTuner = (freqFromTuner) => {
    let newFreq = freqFromTuner.toFixed(3);
    this.setState({
      targetFreq: newFreq
    });
    this.setSteamingChannelIfLive(freqFromTuner);
  }

  handleQuickChannelButtonClick = (channelID) => {
    const channelClicked = this.state.data.filter(channel => channel.id === channelID)[0];
    let newFreq = ((channelClicked.to_frequency+channelClicked.from_frequency)/2).toFixed(3);
    this.setState({
      targetFreq: newFreq
    });
  }

  setSteamingChannelIfLive(newFrequency){
    let onChannelLeave = true;
    if(this.state.isRadioLive){
      this.state.data.forEach( channel => {
        if(parseFloat(newFrequency,10) >= channel.from_frequency && parseFloat(newFrequency,10) <= channel.to_frequency)  {
          onChannelLeave = false;
          this.setState({
            isChannelStreaming : true,
            streamingChannelID : channel.id
          });
          console.log("streamingChannel:", channel.id);
        }
      });
      if(onChannelLeave) {
        this.setState({
          isChannelStreaming : false,
          streamingChannelID : -1
        });
      }
    }
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
      });
    });
  }
}

export default VirtualRadio;
