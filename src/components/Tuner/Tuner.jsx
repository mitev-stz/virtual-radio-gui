import React from 'react';


class Tuner extends React.Component {
  render () {
    const {onIncrBtnUp, onIncrBtnDown, onDecrBtnUp, onDecrBtnDown} = this.props;
    return (
      <div className="container">
        <div className="bordered">Frequency Tuner</div>
        <button className="freqIncrButton" onMouseUp={onIncrBtnUp} onMouseDown={onIncrBtnDown}> Up</button>
        <button className="freqDecrButton" onMouseUp={onDecrBtnUp} onMouseDown={onDecrBtnDown}> Down</button>
      </div>
    );
  }
}

export default Tuner;
