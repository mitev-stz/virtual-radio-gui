import React from 'react';
// import AudioElement from "../AudioElement/AudioElement";

class AudioList extends React.Component {


  render() {
    return (
      <div className="container audio-list-container">
        {this.props.audios.map(audio =>(
            <audio key={audio.id} id={audio.id} preload="auto" ref={ref => this.audioPlayer = ref}>
              <source scr={audio.files[0].media_file} type="mpeg"></source>
            </audio>
        ))
        }
      </div>
    );
  }

}

export default AudioList;
