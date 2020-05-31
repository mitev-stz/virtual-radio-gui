import React from 'react';
import "./assets/styles/powerSwitch.css"

class PowerSwitch extends React.Component {
  render () {
    const{onPowerOn, onPowerOff} = this.props;
      return (
          <div className="power-switch">
            <button className={this.getBtnOnClasses()} onClick={onPowerOn}>On</button>
            <button className="powerButton-off" onClick={onPowerOff}>Off</button>
          </div>
        );
  }
  getBtnOnClasses(){
    let classes = "powerButton-on ";
    classes+= this.props.isRadioLive? "powerButton-on-active" : "";
    return classes;
  }
}

export default PowerSwitch;
