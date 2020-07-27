import React from 'react';
import axios from 'axios';
import PowerSwitch from "../PowerSwitch/PowerSwitch";
import Tuner from "../Tuner/Tuner";
import VolumeController from "../VolumeController/VolumeController";
import QuickChannelButtonList from "../QuickChannelButtonList/QuickChannelButtonList";
import "./assets/styles/virtualRadio.css";
import design from './assets/img/old_radio.jpeg';

class VirtualRadio extends React.Component{
  constructor(props){
    super(props);
    this.bindHandleMethods();
    this.audioFiles = [];
    this.audioContext = this.getAudioContext();
    this.gainNode = this.audioContext.createGain();
    this.noiseBuffer = this.generateBrownNoise(this.audioContext);
    this.isNoiseRunning = false;
    this.tuner = null;
    this.volumeIntervalId = null;
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
        <div className="centered-container">
          <div className="radio-container">
          <div className="centered-container virtRadio">
            <div className="radio-inner-case">
              <div className="radio-front-case">
                <div className="radio-panel">
                    <PowerSwitch
                      handleToggleSwitchAction={this.handleToggleSwitchAction}
                      isRadioLive={isRadioLive}
                    ></PowerSwitch>
                    <Tuner
                      onRef={ref => (this.tuner = ref)}
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
          </div>
        </div>
          <div className="centered-container image-container">
            <img src={design} alt="old radio" useMap="#oldRadioMap"></img>
            <map name="oldRadioMap">
              <area className="area2" shape="rect" coords="450,617,480, 652" onClick={this.handleToggleSwitchAction} alt="power-switch-btn" ></area>
              <area shape="poly" coords="229,492, 199,530, 232,570" onMouseDown={this.handleDecrDownFromVolume} onMouseUp={this.handleMouseUpFromVolume} alt="volume-controller-decr-btn" ></area>
              <area shape="poly" coords="232,492, 288,573, 233,571" onMouseDown={this.handleIncrDownFromVolume} onMouseUp={this.handleMouseUpFromVolume} alt="volume-controller-incr-btn" ></area>
              <area shape="poly" coords="970,503, 940,540, 980,580" onMouseDown={this.handleDecrDownFromTuner} onMouseUp={this.handleMouseUpFromTuner} alt="tuner-decr-btn" ></area>
              <area shape="poly" coords="971,503, 1015,550, 981,581" onMouseDown={this.handleIncrDownFromTuner} onMouseUp={this.handleMouseUpFromTuner} alt="tuner-decr-btn" ></area>
            </map>
          </div>
        </div>
      );

    }
  }

  handleDecrDownFromVolume = () => {
    this.volumeIntervalId = window.setInterval(() => {
      this.decrementVolumeValueFromInterval();
    },100);
  }

  handleIncrDownFromVolume = () => {
    this.volumeIntervalId = window.setInterval(() => {
      this.incrementVolumeValueFromInterval();
    },100);
  }

  handleMouseUpFromVolume = () =>{
    clearInterval(this.volumeIntervalId);
  }

  incrementVolumeValueFromInterval(){
    let vol = parseFloat(this.state.volumeValue);
      if(vol+0.05<=1){
        vol +=0.05;
        this.setState({
          volumeValue: vol
        });
        this.applyVolumeChangeOnAudio(vol);
      }
  }

  decrementVolumeValueFromInterval(){
    let vol = parseFloat(this.state.volumeValue);
      if(vol-0.05>=0){
        vol -=0.05;
        this.setState({
          volumeValue: vol
        });
        this.applyVolumeChangeOnAudio(vol);
      }
  }

  handleDecrDownFromTuner = () => {
    this.tuner.onDecrDown();
  }

  handleIncrDownFromTuner = () =>{
    this.tuner.onIncrDown();
  }

  handleMouseUpFromTuner = () =>{
    this.tuner.onIncUp();
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
      let isChannelTargeted = false;
      this.state.data.forEach( channel => {
        if(frequency >= channel.from_frequency &&  frequency <= channel.to_frequency){
          isChannelTargeted = true;
            this.playAudio(channel.id);
            this.setState({
              isChannelStreaming : true,
              streamingChannelID : channel.id
            });
        }
      });
      if(!isChannelTargeted){
        this.playNoise();
      }
    } else {
      this.stopNoise();
      this.deactivateAudioStream();
    }
  }

  setSteamingChannelFromFrequency(newFrequency){
    let isStreamingActive = false;
    if(this.state.isRadioLive){
      this.state.data.forEach( channel => {
        if(parseFloat(newFrequency,10) >= channel.from_frequency && parseFloat(newFrequency,10) <= channel.to_frequency){
          if(!this.state.isChannelStreaming){
            this.stopNoise();
            this.playAudio(channel.id);
            this.setState({
              isChannelStreaming : true,
              streamingChannelID : channel.id
            });
          }
          isStreamingActive = true;
        }
      });
      if(!isStreamingActive) {
        this.deactivateAudioStream();
        this.playNoise();
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
    this.gainNode.gain.value = level * level;

  };


  playAudio(channelID){
    let i = this.getAudioFilesID(channelID);
    const { source, audioBuffer, pausedAt, pausedRecently} = this.audioFiles[i];
    if(pausedRecently){
      var source2 = this.audioContext.createBufferSource();
      source2.connect(this.gainNode);
      source2.buffer = audioBuffer;
      this.audioFiles[i].source = source2;
      this.audioFiles[i].startedAt = Date.now() - pausedAt;
      source2.start(0, pausedAt/1000);
    } else {
      this.audioFiles[i].startedAt = Date.now();
      source.start(0);
    }
  }

  stopPlayingAudio(channelID){
    let i = this.getAudioFilesID(channelID);
    this.audioFiles[i].source.stop();
    this.audioFiles[i].pausedAt = Date.now() - this.audioFiles[0].startedAt;
    this.audioFiles[i].pausedRecently = true;
  }

  getAudioFilesID(channelID){
    for(let i = 0;i < this.audioFiles.length;i++){
      if(this.audioFiles[i].audioId===channelID){
        return i;
      }
    }
    //TODO error handling
    return -1;
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
          this.gainNode.gain.value = this.state.volumeValue;

          for(let i = 0; i < data.length; i++){
            const source = this.audioContext.createBufferSource();
            var url = data[i].files[0].media_file;
            let response = await axios.get(url,{
                responseType: 'arraybuffer'
            });
            let audioBuffer = await this.audioContext.decodeAudioData(response.data);
            source.buffer = audioBuffer;
            this.audioFiles[i] = {
              audioId:data[i].id,
              audioBuffer:audioBuffer,
              source:source,
              startedAt: null,
              pausedAt: null,
              pausedRecently: false,
            };
            this.audioFiles[i].source.connect(this.gainNode);
            this.gainNode.connect(this.audioContext.destination);
        }

          this.setState({
            isDataLoaded: true
          });
  }

  playNoise(){
    if(!this.isNoiseRunning){
      const noise = this.audioContext.createBufferSource();
      noise.buffer = this.noiseBuffer;
      noise.loop = true;
      noise.connect(this.gainNode);
      noise.start(this.audioContext.currentTime);
      this.noise = noise;
      this.isNoiseRunning = true;
    }

  }

  stopNoise(){
    if(this.isNoiseRunning){
      this.isNoiseRunning = false;
      this.noise.stop(this.audioContext.currentTime);
    }
  }

  generateBrownNoise(context){
    var bufferSize = 2 * context.sampleRate;
    var brownBuffer = context.createBuffer(
      1,
      bufferSize,
      context.sampleRate
    );
    var noiseData = brownBuffer.getChannelData(0);
    var lastOut = 0.0;
    for (var i = 0; i < bufferSize; i++) {
      var white = Math.random() * 2 - 1;
      noiseData[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = noiseData[i];
      noiseData[i] *= 3.5;
    }
    return brownBuffer;
  }

  getAudioContext(){
      const audioContext = new AudioContext();
      return audioContext;
    };

  }

export default VirtualRadio;
