import React from 'react';


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
    return (
      <div className="container">
        <div className="bordered">Frequency Tuner</div>
        <button className="freqIncrButton" onMouseUp={this.onIncUp} onMouseDown={this.onIncrDown}> Up</button>
        <button className="freqDecrButton" onMouseUp={this.onIncUp} onMouseDown={this.onDecrDown}> Down</button>
      </div>
    );
  }
  onDecrDown(){
    this.intervalId = window.setInterval(() => {
      this.updateIntervalDecr();
    },50);
  }
  onIncrDown(){
    this.intervalId = window.setInterval(() => {
      this.updateIntervalIncr();
    },50);
  }

  updateIntervalIncr(){
      if(this.state.targetFreq+0.1<=20) {
        this.setState((state) => {
          return {targetFreq: state.targetFreq+=0.05};
        });
        this.props.parentCallback(this.state.targetFreq);
      }
    }
    updateIntervalDecr(){
      if(this.state.targetFreq-0.1>=0) {
      this.setState((state) =>{
        return {targetFreq: state.targetFreq-=0.05};
      });
      this.props.parentCallback(this.state.targetFreq);
    }
  }
  onIncUp(){
    clearInterval(this.intervalId);
  }
}

export default Tuner;
