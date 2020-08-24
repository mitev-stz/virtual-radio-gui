import React from 'react';
import "./assets/styles/channelDescription.css";


const ChannelDescription = (props) => {
    let title = "No title!";
    let description = "No streaming channel at this frequency!";

    if(props.isRadioLive && props.isChannelStreaming){
      title = props.channel.title;
      description = props.channel.description;
    }
      return (
        <div className="channel-info-container">
          <div className="channel-title">
            {title}
          </div>
          <div className="channel-description">
          {description}
          </div>
        </div>
      );

}

export default ChannelDescription;
