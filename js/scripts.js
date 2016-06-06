//config
var min = 0;
var max = 10;

//execute
var progressClass = document.getElementsByClassName("progress")[0];
var commentsClass = document.getElementsByClassName("comments")[0];
var currentViewers;
var currentEnergy;

//excute every 30 seconds
setInterval(function() {
  // Get JSON
  $.getJSON("https://api.twitch.tv/kraken/streams/donthedeveloper", function(data) {
    // grab current viewer count
    currentViewers = data.stream.viewers;
    console.log("Viewers: " + currentViewers);
    // calculate % for width
    currentEnergy = (currentViewers / max)*100;
    
    // if viewer goal is over 100%, equalize it to 100%
    if (currentEnergy >= 100) {
      currentEnergy = 100;
    }
    
    //Styling
    if (currentEnergy >= 97) {
      progressClass.style.borderTopRightRadius = "20px";
      progressClass.style.borderBottomRightRadius = "20px";
    }
//     progressClass.style.animationDuration = "3s";
    progressClass.style.width = currentEnergy + "%";
    
    //comments
    if (currentEnergy < 33) {
      commentsClass.getElementsByTagName("h2")[0].innerHTML = "This channel needs some love.";
    } else if (currentEnergy >= 33 && currentEnergy < 66) {
      commentsClass.getElementsByTagName("h2")[0].innerHTML = "Nice, keep going.";
    } else if (currentEnergy >= 66) {
      commentsClass.getElementsByTagName("h2")[0].innerHTML = "Wow, you're on fire!";
    }
    commentsClass.style.opacity = "1";
  });
}, 30000);

setInterval(function() {
  commentsClass.style.opacity = "0";
}, 5000);