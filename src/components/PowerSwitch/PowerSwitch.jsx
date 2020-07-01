import React from 'react';
import "./assets/styles/powerSwitch.css";

class PowerSwitch extends React.Component {
  render () {
    const{handleToggleSwitchAction} = this.props;
      return (
          <span className="power-switch">
              <label className="switch">
                <input type="checkbox" onClick = {handleToggleSwitchAction}></input>
                <span className="slider round"></span>
              </label>
          </span>
        );
  }
  getBtnOnClasses(){
    let classes = "btn powerButton-on ";
    classes+= this.props.isRadioLive? " btn powerButton-on-active" : "";
    return classes;
  }
}

export default PowerSwitch;
