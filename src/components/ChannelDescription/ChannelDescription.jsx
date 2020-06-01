import React from 'react'

const ChannelDescription = (props) => {
  return (
    <div className="container channel-info-container">
      <div className="channel-title">
        Title:{props.channel.title}
      </div>
      <div className="channel-description">
        Description:{props.channel.description}
      </div>
    </div>
  )
}

export default ChannelDescription;
