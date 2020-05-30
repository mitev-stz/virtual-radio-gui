import React from 'react';

class AudioElement extends React.Component{
  render() {
    const { id, source} = this.props;
    return (
      <audio id={id}>
        <source scr={source} type="mpeg"></source>
      </audio>
    );
  }
}

export default AudioElement;
