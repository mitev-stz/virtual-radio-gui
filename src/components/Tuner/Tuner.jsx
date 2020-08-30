import React from 'react';
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
            <div className="freqDecrButton" onMouseUp={this.onIncUp} onMouseDown={this.onDecrDown} placeholder="decrement-button"> <span className="arrow-left"></span></div>
            <div className="freqIncrButton" onMouseUp={this.onIncUp} onMouseDown={this.onIncrDown} placeholder="increment-button"> <span className="arrow-right"></span></div>
          </div>
      </div>
    );
  }

  onDecrDown(){
    var tuner = document.getElementById('tuner');
    tuner.classList.add('rotate-reverse');
    this.intervalId = window.setInterval(() => {
      this.updateIntervalDecr();
    },100);

  }
  onIncrDown(){
    var tuner = document.getElementById('tuner');
    tuner.classList.add('rotate-normal');
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
    var tuner = document.getElementById('tuner');
    tuner.classList.remove('rotate-normal');
    tuner.classList.remove('rotate-reverse');
    clearInterval(this.intervalId);
  }

}

export default Tuner;
