import React from 'react';
import Retina from "../Retina/Retina";
import "./assets/styles/tuner.css";


class Tuner extends React.Component {
  constructor(props){
    super(props);
    this.onIncrDown = this.onIncrDown.bind(this);
    this.onDecrDown = this.onDecrDown.bind(this);
    this.onIncUp = this.onIncUp.bind(this);
    this.intervalId = null;
  }

  state = {
    targetFreq:this.props.targetFreq
  }

  render () {
    const{targetFreq, isRadioLive, data, streamingChannelID, isChannelStreaming} = this.props;
    return (
      <div className="tuner-container">
            <Retina
              data-testid = "retina"
              targetFreq = {targetFreq}
              isRadioLive = {isRadioLive}
              data={data}
              streamingChannelID = {streamingChannelID}
              isChannelStreaming = {isChannelStreaming}
              ></Retina>
            <div className="tunerButtons-container">
            <div className="freqDecrButton" onMouseUp={this.onIncUp} onMouseDown={this.onDecrDown} placeholder="decrement-button"> <span className="arrow-left"></span></div>
            <div className="freqIncrButton" onMouseUp={this.onIncUp} onMouseDown={this.onIncrDown} placeholder="increment-button"> <span className="arrow-right"></span></div>
          </div>
      </div>
    );
  }

  onDecrDown(){
    var decrBtn = document.getElementsByClassName('freqDecrButton')[0];
    decrBtn.classList.add('btnClicked');
    this.intervalId = window.setInterval(() => {
      this.updateIntervalDecr();
    },100);
  }
  onIncrDown(){
    var incrBtn = document.getElementsByClassName('freqIncrButton')[0];
    incrBtn.classList.add('btnClicked');
    this.intervalId = window.setInterval(() => {
      this.updateIntervalIncr();
    },100);
  }

  updateIntervalIncr(){
      let newFrequency = parseFloat(this.props.targetFreq);
      if( newFrequency + 0.003 <= 1) {
        newFrequency = parseFloat((newFrequency+ 0.003).toFixed(3));

        this.setState({
          targetFreq : newFrequency
        });
        this.props.parentCallback(newFrequency);
      }
  }

  updateIntervalDecr(){
    let newFrequency = parseFloat(this.state.targetFreq);
      if(newFrequency - 0.003 >= 0) {
        newFrequency = parseFloat((newFrequency - 0.003).toFixed(3));
        this.setState({
          targetFreq : newFrequency
        });
        this.props.parentCallback(newFrequency);
    }
  }

  onIncUp(){
    document.getElementsByClassName('freqDecrButton')[0].classList.remove('btnClicked');
    document.getElementsByClassName('freqIncrButton')[0].classList.remove('btnClicked');
    clearInterval(this.intervalId);
  }
}

export default Tuner;
