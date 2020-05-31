import React from 'react'
import "./assets/styles/retina.css";

const Retina = (props) => {
  const {targetFreq, isRadioLive} = props;
  if(isRadioLive){
    return (
    <div className="retina-container container">
      <div className="retina-live live-active">
        Live
      </div>
      <div className="retina-stereo">
        Stereo
      </div>
      <div className="retina-frequency">
        Retina Frequency: Current frequency is {targetFreq}.
      </div>
    </div>
    )
  } else {
    return (
    <div className="retina-container container">
      <div className="retina-live">
        Live
      </div>
      <div className="retina-stereo">
        Stereo
      </div>
      <div className="retina-frequency">
        Retina Frequency: Current frequency is {targetFreq}.
      </div>
    </div>
    )
  }
}

export default Retina;
