import React from 'react';


class Tuner extends React.Component {
  constructor(props){
    super(props)
    this.onIncrDown = this.onIncrDown.bind(this, true);
    this.onDecrDown = this.onIncrDown.bind(this, false);
    this.onIncUp = this.onIncUp.bind(this);

  }
  state = {
    intervalId: null,
    targetFreq: this.props.targetFreq
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
  onIncrDown(isIncrease){
    let newFreq = this.state.targetFreq;
    var intervalId2 = window.setInterval(function() {
      if(isIncrease){
        if(newFreq+0.1<=20) newFreq += 0.1;
      } else if(newFreq-0.1>=0) newFreq -= 0.1;
      this.setState({targetFreq:newFreq});
      console.log("newFreq",newFreq);
      this.props.parentCallback(newFreq);
    },1000);
    this.setState({intervalId: intervalId2});
  }

  onIncUp(){
    console.log("intervalid:",this.state.intervalId);
    clearInterval(this.state.intervalId);
  }
}

export default Tuner;
