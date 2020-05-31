import React from 'react'

const QuickChannelButton = (props) => {
  const {channelID, parentCallback} = props;
  return(
    <button className="QuickChannelButton" onClick={() => {
      parentCallback(channelID);
      }}>
      channelID:{channelID}
    </button>
  );
}

export default QuickChannelButton;
