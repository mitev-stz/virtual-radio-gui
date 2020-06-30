import React from 'react';
import ChannelDescription from "../ChannelDescription/ChannelDescription";
import "./assets/styles/retina.css";

class Retina extends React.Component {

  render() {
    const {data, isChannelStreaming, isRadioLive, streamingChannelID} = this.props;
    return (
    <div className="retina-container">
      <span className={this.getRetinaLiveClasses()}>
        Live
      </span>
      <span className="retina-stereo">
        Stereo
      </span>
      <div className="retina-frequency">
        <div className="progress">
          <div className="frequency-pointer"></div>
        </div>
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
