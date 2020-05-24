import React from 'react';

class PowerSwitch extends React.Component {
  state = {
    powerOn: false
  }
  render () {
    return (
        <div className="power-switch">
          PowerSwitch 
        </div>
      );
  }
}

export default PowerSwitch;
