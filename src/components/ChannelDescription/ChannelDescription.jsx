import React from 'react'

const ChannelDescription = (props) => {
    let title = "No Title";
    let description = "Description: No streaming Channel at this frequency!";

    if(props.isRadioLive && props.isChannelStreaming){
      title = "Title: " + props.channel.title;
      description = "Description: " + props.channel.description;
    }
      return (
        <div className="container channel-info-container">
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
