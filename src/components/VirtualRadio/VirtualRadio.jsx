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
    this.applyVolumeChangeOnAudio(volumeControllerData);
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
    if(isPowerOn){
      let frequency = parseFloat(this.state.targetFreq);
      this.state.data.forEach( channel => {
        if(frequency >= channel.from_frequency &&  frequency <= channel.to_frequency){
            this.playAudio(channel.id);
            this.setState({
              isChannelStreaming : true,
              streamingChannelID : channel.id
            });
        }
      });
    } else {
      this.deactivateAudioStream();
    }
  }

  setSteamingChannelFromFrequency(newFrequency){
    let isStreamingNotActive = true;
    if(this.state.isRadioLive){
      this.state.data.forEach( channel => {
        if(parseFloat(newFrequency,10) >= channel.from_frequency && parseFloat(newFrequency,10) <= channel.to_frequency){
          if(!this.state.isChannelStreaming){
            this.playAudio(channel.id);
            this.setState({
              isChannelStreaming : true,
              streamingChannelID : channel.id
            });
          }
          isStreamingNotActive = false;
        }
      });
      if(isStreamingNotActive) {
        this.deactivateAudioStream();
      }
    }
  }

  deactivateAudioStream = () => {
    if(this.state.streamingChannelID!==-1){
    this.stopPlayingAudio(this.state.streamingChannelID);
    }
    this.setState({
      isChannelStreaming : false,
      streamingChannelID : -1
    });
  }

  applyVolumeChangeOnAudio = (level) => {
    this.audioFiles[0].gainNode.gain.value = level;
    console.log("value", this.audioFiles[0].gainNode.gain.value);
    console.log(this.audioFiles[0].audioContext);
    // this.audioFiles[0].gainNode.gain.setValueAtTime(level, this.audioFiles[0].audioContext.currentTime);
  };


  playAudio(channelID){
    const { source, audioBuffer, audioContext, pausedAt, hasBeenPaused } = this.audioFiles[0];
    if(hasBeenPaused){
      var source2 = audioContext.createBufferSource();
      source2.connect(audioContext.destination);
      source2.buffer = audioBuffer;
      this.audioFiles[0].source = source2;
      this.audioFiles[0].startedAt = Date.now() - pausedAt;
      source2.start(0, pausedAt/1000);
    } else {
      this.audioFiles[0].startedAt = Date.now();
      source.start(0);
    }
  }

  stopPlayingAudio(channelID){
    this.audioFiles[0].source.stop();
    this.audioFiles[0].pausedAt = Date.now() - this.audioFiles[0].startedAt;
    this.audioFiles[0].hasBeenPaused = true;
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
      });
    })
    .catch(err =>{
      this.setState({
        errorOnLoad: err
      });
    });
  }

  async loadAudioFiles(data, token){
          const response = await axios.get("https://radio.ethylomat.de/media/Zuse.mp3",{
              responseType: 'arraybuffer'
          });
          const audioContext = this.getAudioContext();
          const audioBuffer = await audioContext.decodeAudioData(response.data);
          const source = audioContext.createBufferSource();
          const gainNode = audioContext.createGain();
          source.buffer = audioBuffer;

          this.audioFiles[0] = {
            audioId: 0,
            audioContext: audioContext,
            audioBuffer:audioBuffer,
            source:source,
            gainNode: gainNode,
            startedAt: null,
            pausedAt: null,
            hasBeenPaused: false
          };

          this.audioFiles[0].source.connect(this.audioFiles[0].audioContext.destination);
          this.audioFiles[0].source.connect(this.audioFiles[0].gainNode);
          this.audioFiles[0].gainNode.connect(this.audioFiles[0].audioContext.destination);

          this.setState({
            isDataLoaded: true
          });
  }

  getAudioContext(){
    const audioContext = new AudioContext();
    return audioContext;
  };

}

export default VirtualRadio;
