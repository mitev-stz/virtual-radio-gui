import React from 'react'

class QuickChannelButton extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick().bind(this);
    this.state = {
      clicked: false
    }
  }
  handleClick(){
    this.setState({
      clicked: true
    })
  }
  render () {
    return(
      <button className="QuickChannelButton" onClick={this.handleClick()}> Jazz </button>
    );
  }
}

export default QuickChannelButton;
