var startTime = 0;
var difference;
var tInterval;
var savedTime = 0;
var running = 0;
function startTimer(){
  if(!running){
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 500);
    running = 1;
  }
}

function stopTimerGetTime(){
  if(running){
    clearInterval(tInterval);
    savedTime = difference;
    difference = 0;
    running = 0;
    return savedTime;
  }
  return 0;
}
function getShowTime(){
  var  updatedTime = new Date().getTime();
    difference =  updatedTime - startTime;
}

export {startTimer, stopTimerGetTime};
