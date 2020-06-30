import React from 'react'
import "./assets/styles/quickChannelButton.css";

const QuickChannelButton = (props) => {
  const {channelID, parentCallback} = props;
  return(
    <div className="btn-block quickChannelBtn" onClick={() => {
      parentCallback(channelID);
      }}>
      channelID:{channelID}
    </div>
  );
}

export default QuickChannelButton;
