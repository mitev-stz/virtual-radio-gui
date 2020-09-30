import React from 'react';
import axios from 'axios';
import PowerSwitch from "../PowerSwitch/PowerSwitch";
import Tuner from "../Tuner/Tuner";
import VolumeController from "../VolumeController/VolumeController";
import QuickChannelButtonList from "../QuickChannelButtonList/QuickChannelButtonList";
import ChannelDescription from "../ChannelDescription/ChannelDescription";
import "./assets/styles/virtualRadio.css";
import {changeAnimationRotation} from "./scripts/rotationChange.js";
import {startTimer, stopTimerGetTime} from "./scripts/stopwatch.js"
import design from './assets/img/old_radio.jpeg';
import tuner from './assets/img/controller_right.png';
import volume from './assets/img/controller_left.png';
import InfoBox from './util/components/InfoBox.jsx';

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
    this.volDeg = 0;
    this.tunerDeg = 0;
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
      this.handleIncrDownFromVolume = this.handleMouseDownFromVolume.bind(this, true);
      this.handleDecrDownFromVolume = this.handleMouseDownFromVolume.bind(this, false);
      this.handleSwitchMouseUp = this.handleSwitchMouseAction.bind(this, false);
      this.handleSwitchMouseDown = this.handleSwitchMouseAction.bind(this, true);
    }

    async componentDidMount(){
      this.retrieveDataAndLoadAudioFiles();
    }
    componentWillUnmount(){
      this.stopNoise();
      this.deactivateAudioStream();
    }

  render() {
    const { isRadioLive, data, isDataLoaded, errorOnLoad, targetFreq, streamingChannelID, isChannelStreaming} = this.state;
    if(errorOnLoad){
      return <div> Error: {errorOnLoad.message}</div>
    } else if (!isDataLoaded) {
      return <div>Loading Data... </div>
    } else {
      return (
        <div className="main-virtualradio background-white">
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
        <div className="channel-description-for-image-container centered-container">
          <ChannelDescription
            channel={data.filter(channel => channel.id === streamingChannelID)[0]}
            isRadioLive={isRadioLive}
            isChannelStreaming={isChannelStreaming}>
          </ChannelDescription>
        </div>
          <div className="awesomeradioimage-container">
          <div className="awesomeradio-title"> The Awesome Radio</div>
          <div className="centered-container radio-image-container ">
            <div style={{width:"430px", position:"absolute", left: "360px", top: "375px"}}>
              <div className="frequency-pointer"></div>
            </div>
            <img className="oldRadioImg" src={design} alt="old radio"></img>
            <span className="tuner-span">
            <img id="tuner" className="tunerImg" src={tuner} alt="comp1"></img>
            <span className="tunerLeftBtn" onMouseDown={this.handleDecrDownFromTuner} onMouseUp={this.handleMouseUpFromTunerOnDecr}></span>
            <span className="tunerRightBtn" onMouseDown={this.handleIncrDownFromTuner} onMouseUp={this.handleMouseUpFromTunerOnInc}></span>
            </span>
            <span className="vol-span">
              <img id="vol" className="volImg" src={volume} alt="comp2"></img>
              <span className="volLeftBtn" onMouseDown={this.handleDecrDownFromVolume} onMouseUp={this.handleMouseUpFromVolumeOnDecr} ></span>
              <span className="volRightBtn" onMouseDown={this.handleIncrDownFromVolume} onMouseUp={this.handleMouseUpFromVolumeOnInc}></span>
            </span>
            <span id="powerSwitch" className="powSwitch" onMouseDown={this.handleSwitchMouseDown} onMouseUp={this.handleSwitchMouseUp}></span>
            <InfoBox
              top={-465}
              left={100}
              content={"Click and hold on left/right side of the controller below to decrease/increase the volume."}
              closeBtn={true}
              onClose={this.closeInfoBox}
              ></InfoBox>
              <InfoBox
                top={-550}
                left={420}
                content={"Press the first button below to turn the radio on/off and use the others to switch between channels."}
                closeBtn={false}
                onClose={this.closeInfoBox}
                ></InfoBox>
                <InfoBox
                  top={-850}
                  left={760}
                  content={"Click and hold on left/right side of the controller below to decrease/increase the frequency."}
                  closeBtn={false}
                  onClose={this.closeInfoBox}
                  ></InfoBox>
          </div>

          </div>
        </div>
      );

    }
  }

  handleSwitchMouseAction = (b) => {
    let pow = document.getElementById("powerSwitch");
    if(b){
      pow.classList.add("powSwitch-clicked");
    } else{
      pow.classList.remove("powSwitch-clicked");
      this.handleToggleSwitchAction();
    }
  }

  handleMouseDownFromVolume = (b) => {
    var vol = document.getElementById("vol");
    startTimer();
    if(b){
      vol.classList.add("rotate-normal");
      this.volumeIntervalId = window.setInterval(() => {
        this.incrementVolumeValueFromInterval();
      },100);
    } else {
      vol.classList.add("rotate-reverse");
      this.volumeIntervalId = window.setInterval(() => {
        this.decrementVolumeValueFromInterval();
      },100);
    }
  }

  handleMouseUpFromVolumeOnDecr = () => {
    var vol = document.getElementById("vol");
    vol.classList.remove("rotate-reverse");
    vol.classList.remove("rotate-normal");
    var milis = stopTimerGetTime();
    milis = milis/1000;
    this.volDeg = (this.volDeg - ((milis*36)%360))%360;
    changeAnimationRotation('rotate', this.volDeg);
    vol.style.transform = "rotate("+ this.volDeg +"deg)";
    clearInterval(this.volumeIntervalId);
  }

  handleMouseUpFromVolumeOnInc = () =>{
    var vol = document.getElementById("vol");
    vol.classList.remove("rotate-reverse");
    vol.classList.remove("rotate-normal");
    var milis = stopTimerGetTime();
    milis = milis/1000;
    this.volDeg = (this.volDeg + ((milis*36)%360))%360;
    changeAnimationRotation('rotate', this.volDeg);
    vol.style.transform = "rotate("+ this.volDeg +"deg)";
    clearInterval(this.volumeIntervalId);
  }


  incrementVolumeValueFromInterval(){
    let vol = parseFloat(this.state.volumeValue);
      if(vol+0.02<=1){
        vol +=0.02;
        this.setState({
          volumeValue: vol
        });
        this.applyVolumeChangeOnAudio(vol);
      }
  }

  decrementVolumeValueFromInterval(){
    let vol = parseFloat(this.state.volumeValue);
      if(vol-0.02>=0){
        vol -=0.02;
        this.setState({
          volumeValue: vol
        });
        this.applyVolumeChangeOnAudio(vol);
      }
  }

  handleDecrDownFromTuner = () => {
    this.tuner.onDecrDown();
    var pointer = document.getElementsByClassName('frequency-pointer')[0];
    pointer.style.marginLeft = this.state.targetFreq+"%";
    startTimer();
  }

  handleIncrDownFromTuner = () =>{
    this.tuner.onIncrDown();
    var pointer = document.getElementsByClassName('frequency-pointer')[0];
    pointer.style.marginLeft = this.state.targetFreq+"%";
    startTimer();
  }

  handleMouseUpFromTunerOnDecr = () =>{
    this.tuner.onIncUp();
    var tunerImg = document.getElementsByClassName('tunerImg')[0];
    tunerImg.classList.remove('rotate-reverse');
    var milis = stopTimerGetTime();
    milis = milis/1000;
    this.tunerDeg = (this.tunerDeg - ((milis*36)%360))%360;
    changeAnimationRotation('rotate', this.tunerDeg);
    tunerImg.style.transform = "rotate("+ this.tunerDeg +"deg)";
  }

  handleMouseUpFromTunerOnInc = () =>{
    this.tuner.onIncUp();
    var tunerImg = document.getElementsByClassName('tunerImg')[0];
    tunerImg.classList.remove('rotate-reverse');
    var milis = stopTimerGetTime();
    milis = milis/1000;
    this.tunerDeg = (this.tunerDeg + ((milis*36)%360))%360;
    changeAnimationRotation('rotate', this.tunerDeg);
    tunerImg.style.transform = "rotate("+ this.tunerDeg +"deg)";
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
    return -1;
  }

  retrieveDataAndLoadAudioFiles(){
    const username = 'admin';
    const password = 'test123';
    const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');

    axios.get("https://radio.ethylomat.de/api/v1/channels/"
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
            var url = data[i].files[1].media_file;
            let response = await axios.get("https://cors-anywhere.herokuapp.com/" + url,{
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

  closeInfoBox(){
    let elements = document.getElementsByClassName("info-box");
    for(let i = 0; i < elements.length; i++){
      let el = elements[i];
      el.style.animation = "fade-out 2s normal";
      el.style.animationFillMode = "forwards";
    }
    setTimeout(function(){
      let elements = document.getElementsByClassName("info-box");
      for(let j=0; j< elements.length; j++){
        elements[j].remove();
      }
    },3000);
  }
}

export default VirtualRadio;
