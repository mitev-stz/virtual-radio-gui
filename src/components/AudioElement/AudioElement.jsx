import React from 'react';

class AudioElement extends React.Component{
  render() {
    return (
      <audio id={this.props.data.id}>
        <source scr={this.props.data.media_file} type="mpeg"></source>
      </audio>
    );
  }
}

export default AudioElement;
