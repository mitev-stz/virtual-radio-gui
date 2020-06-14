import React from 'react';
import Retina from "../Retina/Retina";


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
      <div className="container">
        <div className="bordered">Frequency Tuner with targetFreq: {targetFreq}</div>
        <button className="freqIncrButton" onMouseUp={this.onIncUp} onMouseDown={this.onIncrDown}> Up</button>
        <button className="freqDecrButton" onMouseUp={this.onIncUp} onMouseDown={this.onDecrDown}> Down</button>
          <Retina
            targetFreq = {targetFreq}
            isRadioLive = {isRadioLive}
            data={data}
            streamingChannelID = {streamingChannelID}
            isChannelStreaming = {isChannelStreaming}
            ></Retina>
      </div>
    );
  }

  onDecrDown(){
    this.intervalId = window.setInterval(() => {
      this.updateIntervalDecr();
    },100);
  }
  onIncrDown(){
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
    clearInterval(this.intervalId);
  }
}

export default Tuner;
