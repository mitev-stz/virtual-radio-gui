import React from 'react';
import "./assets/styles/tuner.css";

class Tuner extends React.Component {
  constructor(props){
    super(props);
    this.handleMouseDownOnDecrement = this.setIntervalDecrement.bind(this);
    this.handleMouseDownOnIncrement = this.setIntervalIncrement.bind(this);
    this.setTargetFreqAndCallback = this.setTargetFreqAndCallback.bind(this);
    this.mouseUpClearInterval = this.mouseUpClearInterval.bind(this);
    this.intervalId = null;
  }

  state = {
    targetFreq:this.props.targetFreq
  }

  componentDidMount(){
    this.props.onRef(this);
  }

  componentWillUnmount(){
    this.props.onRef(undefined);
  }

  render () {
    return (
      <div className="tuner-container">
            <div className="tunerButtons-container">
            <div className="freqDecrButton" onMouseUp={this.mouseUpClearInterval} onMouseDown={this.handleMouseDownOnDecrement} placeholder="decrement-button"> <span className="arrow-left"></span></div>
            <div className="freqIncrButton" onMouseUp={this.mouseUpClearInterval} onMouseDown={this.handleMouseDownOnIncrement} placeholder="increment-button"> <span className="arrow-right"></span></div>
          </div>
      </div>
    );
  }

  setIntervalDecrement(){
    var tuner = document.getElementById('tuner');
    tuner.classList.add('rotate-reverse');
    this.intervalId = window.setInterval(() => {
      this.decrementFrequency();
    },100);

  }
  setIntervalIncrement(){
    var tuner = document.getElementById('tuner');
    tuner.classList.add('rotate-normal');
    this.intervalId = window.setInterval(() => {
      this.incrementFrequency();
    },100);
  }

  incrementFrequency(){
      let newFrequency = parseFloat(this.props.targetFreq);
      if( newFrequency + 0.003 <= 1) {
        newFrequency = parseFloat((newFrequency+ 0.003).toFixed(3));
        this.setTargetFreqAndCallback(newFrequency);
      }
  }

  setTargetFreqAndCallback = (newFreq) =>{
    this.setState({
      targetFreq: newFreq
    });
    this.props.parentCallback(newFreq);
  }

  decrementFrequency(){
    let newFrequency = parseFloat(this.state.targetFreq);
      if(newFrequency - 0.003 >= 0) {
        newFrequency = parseFloat((newFrequency - 0.003).toFixed(3));
        this.setTargetFreqAndCallback(newFrequency);
    }
  }

  mouseUpClearInterval(){
    var tuner = document.getElementById('tuner');
    tuner.classList.remove('rotate-normal');
    tuner.classList.remove('rotate-reverse');
    clearInterval(this.intervalId);
  }

}

export default Tuner;
