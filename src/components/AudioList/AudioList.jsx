import React from 'react';
import AudioElement from "../AudioElement/AudioElement";

class AudioList extends React.Component {
  render() {
    return (
      <div className="container audio-list-container">
        {this.props.audios.map(audio =>(
          <AudioElement key={audio.id} id={audio.id} source={audio.media_url}></AudioElement>))
        }
      </div>
    );
  }
}

export default AudioList;
