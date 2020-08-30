import React from 'react'
import QuickChannelButton from "../QuickChannelButton/QuickChannelButton";
import "./assets/styles/quickChannelButtonList.css";

class QuickChannelButtonList extends React.Component {
  constructor(props){
    super(props);
    this.handleQuickChannelButtonClick = this.handleQuickChannelButtonClick.bind(this);
    this.handleBtnMouseDown = this.handleBtnMouseAction.bind(this, true);
    this.handleBtnMouseUp = this.handleBtnMouseAction.bind(this, false);
  }
  render () {
    return(
      <div className="quickChannelButtonList-container">
        <div className="quickChannelButtonList">
          {this.props.data.map(channel => {
            return (
                <QuickChannelButton
                key={channel.id}
                channelID={channel.id}
                parentCallback={this.handleQuickChannelButtonClick}
                btnMouseUp={this.handleBtnMouseUp}
                btnMouseDown={this.handleBtnMouseDown}>
                </QuickChannelButton>
            )
          })}
        </div>
      </div>
    )
  }

  handleQuickChannelButtonClick = (ChannelID) => {
    this.props.parentCallback(ChannelID);
  }

  handleBtnMouseAction = (b, e) =>{
    let btn = e.target;
    if(b) btn.classList.add("channel-btn-clicked");
      else btn.classList.remove("channel-btn-clicked");
  }
}

export default QuickChannelButtonList;
