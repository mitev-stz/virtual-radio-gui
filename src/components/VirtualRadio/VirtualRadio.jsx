import React from 'react';
import axios from 'axios';
import AudioList from "../AudioList/AudioList";
import PowerSwitch from "../PowerSwitch/PowerSwitch";
import Tuner from "../Tuner/Tuner";
import VolumeController from "../VolumeController/VolumeController";
import QuickChannelButtonList from "../QuickChannelButtonList/QuickChannelButtonList";
import "./assets/styles/virtualRadio.css";

class VirtualRadio extends React.Component{
  constructor(props){
    super(props);
    this.bindHandleMethods();
    this.audioFiles = [];
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
      this.handleToggleSwitchAction = this.handleToggleSwitchAction.bind(this);
      this.handleCallbackFromTuner = this.handleCallbackFromTuner.bind(this);
      this.changeVolumeValue = this.changeVolumeValue.bind(this);
      this.handleQuickChannelButtonClick = this.handleQuickChannelButtonClick.bind(this);
    }

    async componentDidMount(){
      this.retrieveDataAndLoadAudioFiles();
    }

  render() {
    const { isRadioLive, data, isDataLoaded, errorOnLoad, targetFreq, streamingChannelID, isChannelStreaming} = this.state;
    if(errorOnLoad){
      return <div> Error: {errorOnLoad.message}</div>
    } else if (!isDataLoaded) {
      return <div>Loading Data... </div>
    } else {
      return (
        <div className="centered-container virtRadio">
          <div className="radio-inner-case">
            <div className="radio-front-case">
              <div className="radio-panel">
                  <PowerSwitch
                    handleToggleSwitchAction={this.handleToggleSwitchAction}
                    isRadioLive={isRadioLive}
                  ></PowerSwitch>
                  <Tuner
                    targetFreq={targetFreq}
                    isRadioLive={isRadioLive}
                    data={data}
                    isChannelStreaming={isChannelStreaming}
                    streamingChannelID={streamingChannelID}
                    parentCallback = {this.handleCallbackFromTuner}
                    ></Tuner>
                  <VolumeController
                    parentCallback={this.changeVolumeValue}
                    volumeValue={this.state.volumeValue}>
                  </VolumeController>
          </div>
        </div>
          <QuickChannelButtonList
            data={data}
              parentCallback={this.handleQuickChannelButtonClick}>
          </QuickChannelButtonList>
        </div>
          <AudioList ref={this.audioList} audios={data}> </AudioList>
        </div>
      );

    }
  }

  changeVolumeValue = (volumeControllerData) => {
    this.setState({
      volumeValue: volumeControllerData
    });
  }

  handleToggleSwitchAction(){
    this.setState((prevstate) =>(
      {
        isRadioLive: !prevstate.isRadioLive
      }
    ));
    this.setSteamingChannelFromPowerSwitch(!this.state.isRadioLive);
  }

  handleCallbackFromTuner = (freqFromTuner) => {
    let newFreq = freqFromTuner.toFixed(3);
    this.setState({
      targetFreq: newFreq
    });

    var pointer = document.getElementsByClassName('frequency-pointer')[0];
    pointer.style.left =  this.state.targetFreq*100+"%";

    this.setSteamingChannelFromFrequency(freqFromTuner);
  }

  handleQuickChannelButtonClick = (channelID) => {
    const channelClicked = this.state.data.filter(channel => channel.id === channelID)[0];
    let newFreq = ((channelClicked.to_frequency + channelClicked.from_frequency) / 2).toFixed(3);

    var pointer = document.getElementsByClassName('frequency-pointer')[0];
    pointer.style.left =  newFreq*100+"%";

    this.setState({
      targetFreq: newFreq
    });
    this.setSteamingChannelFromFrequency(newFreq);
  }

  setSteamingChannelFromPowerSwitch(isPowerOn){
    let onChannelLeave = true;
    if(isPowerOn){
      let frequency = parseFloat(this.state.targetFreq);
      this.state.data.forEach( channel => {
        if(frequency >= channel.from_frequency &&  frequency <= channel.to_frequency)  {
          onChannelLeave = false;
          if(!this.state.isChannelStreaming){
            this.startPlayingAudio(channel.id);
          }
          this.setState({
            isChannelStreaming : true,
            streamingChannelID : channel.id
          });
        }
      });
      if(onChannelLeave) {
        if(this.state.streamingChannelID !==-1){
          this.stopPlayingAudio(this.state.streamingChannelID);
        }
        this.setState({
          isChannelStreaming : false,
          streamingChannelID : -1
        });
      }
    } else {
      if(this.state.streamingChannelID !==-1){
        this.stopPlayingAudio(this.state.streamingChannelID);
      }
    }
  }

  setSteamingChannelFromFrequency(newFrequency){
    let onChannelLeave = true;
    if(this.state.isRadioLive){
      this.state.data.forEach( channel => {
        if(parseFloat(newFrequency,10) >= channel.from_frequency && parseFloat(newFrequency,10) <= channel.to_frequency)  {
          onChannelLeave = false;
          if(!this.state.isChannelStreaming){
            this.startPlayingAudio(channel.id);
          }
          this.setState({
            isChannelStreaming : true,
            streamingChannelID : channel.id
          });
        }
      });
      if(onChannelLeave) {
        if(this.state.streamingChannelID!==-1){
        this.stopPlayingAudio(this.state.streamingChannelID);
        }
        this.setState({
          isChannelStreaming : false,
          streamingChannelID : -1
        });
      }
    }
  }

  startPlayingAudio(channelID){
    this.audioFiles[0].source.start();
    // for (var i = 0; i < this.audioFiles.length; i++) {
    //     var audio = this.audioFiles[i];
    //     if(audio.audioId===channelID){
    //       audio.source.start();
    //     }
    // }
  }

  stopPlayingAudio(channelID){
    this.audioFiles[0].source.stop();

    // for (var i = 0; i < this.audioFiles.length; i++) {
    //     var audio = this.audioFiles[i];
    //     if(audio.audioId===channelID){
    //       audio.source.stop();
    //     }
    // }
  }

  retrieveDataAndLoadAudioFiles(){
    const username = 'admin';
    const password = 'test123';
    const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');

    axios.get("https://radio.ethylomat.de/api/v1/channels/"
      // ,{headers: {
      //   'Authorization' : `Basic ${token}`,
      //   "Content-Type": "application/json"
      //   }
      // }
    )
    .then( response =>{
      const json = response.data;
      this.loadAudioFiles(json, token);
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
  async loadAudioFiles(data, token){
    // for (var i = 0; i < data.length; i++) {
    //     var audio = data[i];
    //     const url = audio.files[0].media_file;
          const response = await axios.get("https://radio.ethylomat.de/media/Zuse.mp3",{
              responseType: 'arraybuffer'
          });
        // const response = await axios.get(url,{
        //   responseType: 'arraybuffer'
        //   // ,headers: {
        //   //   'Authorization' : `Basic ${token}`,
        //   //   }
        //   });
          const audioContext = this.getAudioContext();
          const audioBuffer = await audioContext.decodeAudioData(response.data);
          const source = audioContext.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(audioContext.destination);
          // source.start();
          console.log(source);
          this.audioFiles[0] = {
            audioId: 0,
            audioContext: audioContext,
            audioBuffer:audioBuffer,
            source:source,
          };
    // }
  }

  getAudioContext(){
    AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContent = new AudioContext();
    return audioContent;
  };

}

export default VirtualRadio;
