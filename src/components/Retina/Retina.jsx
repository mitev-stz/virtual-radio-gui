import React from 'react';
import ChannelDescription from "../ChannelDescription/ChannelDescription";
import "./assets/styles/retina.css";

class Retina extends React.Component {

  render() {
    const {data, isChannelStreaming, isRadioLive, streamingChannelID} = this.props;
    console.log("retina data:", data);
    return (
    <div className="retina-container">
      <span className={this.getRetinaLiveClasses()}>
        Live
      </span>
      <span className={this.getRetinaStereoClasses()}>
        Stereo
      </span>
      <div className="retina-frequency">
        <div className="retina-progress">
          <div className="frequency-pointer"></div>
        </div>
      </div>
      <div className="retina-channel-description">
        <ChannelDescription
          channel={data.filter(channel => channel.id === streamingChannelID)[0]}
          isRadioLive={isRadioLive}
          isChannelStreaming={isChannelStreaming}>
        </ChannelDescription>
      </div>
    </div>
    );
  }
  getRetinaStereoClasses(){
    let classes = "retina-stereo ";
    if(this.props.isRadioLive){
      return classes += " retina-stereo-live";
    } return classes;
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
