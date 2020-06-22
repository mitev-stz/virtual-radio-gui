import React from 'react'

class VolumeController extends React.Component {
  constructor(props){
    super(props);
    this.sendChangedVolume = this.sendChangedVolume.bind(this);
  }
  render () {
    let val = this.props.volumeValue*100;
    const volumeValue = val.toFixed(0);
   return (
     <div className="volume-controller-container container">
        <div>Volume Controller</div>
        <input data-testid="volumeInput" type="range" min="0" max="100" step="1" onInput={this.sendChangedVolume} onChange={this.sendChangedVolume} value={volumeValue}></input>
        {volumeValue}%
     </div>
   );
  }
  sendChangedVolume(event){
    event.preventDefault();
    let value = event.target.value/100;
    value = value.toFixed(2);
    this.props.parentCallback(value);
  }
}

export default VolumeController;
