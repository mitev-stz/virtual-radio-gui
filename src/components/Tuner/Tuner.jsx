import React from 'react';
import "./assets/styles/tuner.css";

class Tuner extends React.Component {
  constructor(props){
    super(props);
    this.onIncrement = this.handleMouseDown.bind(this, true);
    this.onDecrement = this.handleMouseDown.bind(this, false);
    this.onMouseUp = this.onMouseUp.bind(this);
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
            <div className="freqDecrButton" onMouseUp={this.onMouseUp} onMouseDown={this.onDecrement} placeholder="decrement-button"> <span className="arrow-left"></span></div>
            <div className="freqIncrButton" onMouseUp={this.onMouseUp} onMouseDown={this.onIncrement} placeholder="increment-button"> <span className="arrow-right"></span></div>
          </div>
      </div>
    );
  }

  handleMouseDown = (b) =>{
    var tuner = document.getElementById('tuner');
    if(b){
      tuner.classList.add('rotate-normal');
      this.intervalId = window.setInterval(() => {
        this.updateIntervalIncr();
      },100);
    } else {
      tuner.classList.add('rotate-reverse');
      this.intervalId = window.setInterval(() => {
        this.updateIntervalDecr();
      },100);
    }
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

  onMouseUp(){
    var tuner = document.getElementById('tuner');
    tuner.classList.remove('rotate-normal');
    tuner.classList.remove('rotate-reverse');
    clearInterval(this.intervalId);
  }

}

export default Tuner;
