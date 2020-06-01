import React from 'react';
import axios from 'axios';
import AudioList from "../AudioList/AudioList";
import PowerSwitch from "../PowerSwitch/PowerSwitch";
import Tuner from "../Tuner/Tuner";
import VolumeController from "../VolumeController/VolumeController";
import Retina from "../Retina/Retina";
import QuickChannelButtonList from "../QuickChannelButtonList/QuickChannelButtonList";
import ChannelDescription from "../ChannelDescription/ChannelDescription";

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
        isChannelStreaming: false
    };

    bindHandleMethods(){
      this.handleClickPowerOn = this.handleClickOnPowerBtn.bind(this, true);
      this.handleClickPowerOff = this.handleClickOnPowerBtn.bind(this, false);
      this.handleCallbackFromTuner = this.handleCallbackFromTuner.bind(this);
      this.changeVolumeValue = this.changeVolumeValue.bind(this);
      this.handleQuickChannelButtonClick = this.handleQuickChannelButtonClick.bind(this);
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
            {this.getChannelDescription()}
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
    let newFreq = freqFromTuner.toFixed(2);
    this.setState({
      targetFreq: newFreq
    });
  }
  handleQuickChannelButtonClick = (channelID) => {
    const channelClicked = this.state.data.filter(channel => channel.id === channelID)[0];
    let newFreq = ((channelClicked.to_frequency+channelClicked.from_frequency)/2).toFixed(2);
    this.setState({
      targetFreq: newFreq
    });
  }
  getChannelDescription(){
    let streamingChannel = null;
    if(this.state.isRadioLive){
      let isChannelStreaming = false;
      this.state.data.forEach( channel =>{
          if(this.state.targetFreq >=channel.from_frequency && this.state.targetFreq <=channel.to_frequency)  {
            isChannelStreaming = true;
            streamingChannel=channel;
            console.log("streamingChannel:", channel.id);
          }
        });
      if(isChannelStreaming){
        return(
          <ChannelDescription
            channel={streamingChannel}>
          </ChannelDescription>
        );
      }
    }
    return (
      <ChannelDescription
        channel={{title:"", description:"No channel streaming..."}}>
      </ChannelDescription>
    )
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
