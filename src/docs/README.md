The main functionality of this project is in the "VirtualRadio" folder. There you will find the component (VirtualRadio.jsx),
responsible for delivering and playing audio files to the user.

## Main Functionality:
## VirtualRadio component:
##  Altering volume strength:
    Functions responsible for decreasing the volume strength(data manipulation):
    - setVolumeInGainNode, incrementVolumeValueFromInterval, handleMouseDownFromVolume

    Functions responsible for increasing the volume strength(no data manipulation):
    - setVolumeInGainNode, decrementVolumeValueFromInterval, handleMouseDownFromVolume

    Data model:
    - volumeIntervalId- an interval id for captioning mouse down and mouse up events
    - volDeg(int) - for UI rotation in degrees
    - volumeValue(float) - represents current volume value state

    UI:
    - handleMouseUpFromVolume (partly)

##  Turning radio power switch on/off:
  Functions responsible for altering power switch state:
  -  handleSwitchMouseAction

  Functions responsible for starting streaming channel:
  - setSteamingChannelFromPowerSwitch

  Data model:
  - isRadioLive(boolean) - represents the current state of the radio (turned on/off)
  - isChannelStreaming(boolean) - channel is present at current target frequency then true, in case not then false;

  UI:
  - handleSwitchMouseAction (partly)

##  Altering radio target frequency:
  Functions responsible for decreasing the target frequency:
  - handleMouseDownFromTuner(false),handleCallbackFromTuner, setSteamingChannelFromFrequency

  Functions responsible for increasing the target frequency:
  - handleMouseDownFromTuner(true),handleCallbackFromTuner, setSteamingChannelFromFrequency

  Data model:
  - targetFreq(float between 0 and 1) - target frequency which is used to determine the streaming channel in case there is one. Otherwise a noise sound is played.
  - ***Tuner*** component acting as a single source of truth. targetFreq gets updated only from a callback from ***Tuner***.

  UI:
  - handleMouseUpFromTuner (partly)
  - updatePointerPositionUI
  - removeUIRotation
  - addUIRotationReverse
  - addUIRotationNormal
  - transformRotationAnimation
  - calculateNewRotationDegrees(calculations used in the UI for the rotation animations)


## Selecting targeted channel:
  Handler functions:
  - handleQuickChannelButtonClick
  Data model and UI: QuickChannelButtonList and QuickChannelButton components

##  Streaming audio files and noise
   Functions for playing and stoping audio files:
  - playAudio, stopPlayingAudio, deactivateAudioStream
  Functions for playing and stoping noise sound:
  - playNoise, stopNoise
  Noise generation function: generateBrownNoise

##  API fetch calls and data load in component state:
  - retrieveDataAndLoadAudioFiles, loadAudioFiles


## Dependencies:
- Web Audio API

##Furter steps in the future:
- solving the latency problem of the radio,
- improving UI
