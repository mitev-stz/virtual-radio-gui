import React from 'react';
import "./assets/styles/quickChannelButton.css";

const QuickChannelButton = (props) => {
  const {channelID, parentCallback, btnMouseUp, btnMouseDown} = props;
  return(
    <div className="channel-btn" onClick={() => {
      parentCallback(channelID);
    }} onMouseDown={btnMouseDown}
      onMouseUp={btnMouseUp}>
    </div>
  );
}

export default QuickChannelButton;
