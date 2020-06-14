import React from 'react';
import ChannelDescription from "../ChannelDescription/ChannelDescription";
import "./assets/styles/retina.css";

class Retina extends React.Component {

  render() {
    const {targetFreq, data, isChannelStreaming, isRadioLive, streamingChannelID} = this.props;
    return (
    <div className="retina-container container">
      <div className={this.getRetinaLiveClasses()}>
        Live
      </div>
      <div className="retina-stereo">
        Stereo
      </div>
      <div className="retina-frequency">
        Retina Frequency: Current frequency is {targetFreq}.
        <div className="Channel Description">
          hello
          <ChannelDescription
            channel={data.filter(channel => channel.id === streamingChannelID)[0]}
            isRadioLive={isRadioLive}
            isChannelStreaming={isChannelStreaming}>
          </ChannelDescription>
        </div>
      </div>
    </div>
    );
  }

  getRetinaLiveClasses(){
    let classes = "retina-live ";
    if(this.props.isRadioLive){
      classes += " live-active"
    }
    return classes;
  }
}

export default Retina;
