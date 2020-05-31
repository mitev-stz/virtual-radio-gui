import React from 'react'
import QuickChannelButton from "../QuickChannelButton/QuickChannelButton";
class QuickChannelButtonList extends React.Component {
  constructor(props){
    super(props);
    this.handleQuickChannelButtonClick = this.handleQuickChannelButtonClick.bind(this);
  }
  render () {
    return(
      <div className="quickChannelButtonList">
        {this.props.data.map(channel => {
          return (
              <QuickChannelButton
              key={channel.id}
              channelID={channel.id}
              parentCallback={this.handleQuickChannelButtonClick}>
              </QuickChannelButton>
          )
        })}
      </div>
    )
  }
  handleQuickChannelButtonClick = (ChannelID) => {
    this.props.parentCallback(ChannelID);
  }
}

export default QuickChannelButtonList;
