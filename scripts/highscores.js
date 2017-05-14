"use strict";

window.onload = function() {
  // HTTP GET Request
  let xmlhttp = new XMLHttpRequest();
  const url = "https://make-gaming-great-again-api.herokuapp.com/scores/";
  // Specifies a function to be executed every time the status of the XMLHttpRequest object changes
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let scores = JSON.parse(this.responseText);
      // a and b are object elements of your array
      function mycomparator(a,b) {
        return parseInt(b.score, 10) - parseInt(a.score, 10);
      }
      scores.sort(mycomparator);
      scores = scores.slice(0, 3);
      let top3 = [];
      Object.keys(scores).forEach(function(key) {
        let val = [scores[key]["name"], scores[key]["score"]]
        top3.push(val);
      });
      document.getElementById("winner-1").innerHTML = top3[0][0];
      document.getElementById("winner-2").innerHTML = top3[1][0];
      document.getElementById("winner-3").innerHTML = top3[2][0];
      document.getElementById("score-1").innerHTML = top3[0][1];
      document.getElementById("score-2").innerHTML = top3[1][1];
      document.getElementById("score-3").innerHTML = top3[2][1];
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();

  let buttons = [];
  let audio = {};
  buttons.push(document.getElementById('backButton'));
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = buttonClickHandler;
    for (let j = 0; j < buttons[i].children.length; ++j ) {
      buttons[i].children[j].onclick = buttonClickChildHandler;
    }
    buttons[i].onmouseover = playSoundHandler;
    audio[buttons[i].id] = document.createElement('audio');
    audio[buttons[i].id].src = 'resources/sounds/hover-sound.mp3';
  }

  // Play sound on button hover
  function playSoundHandler(ev) {
    playSound(audio[ev.target.id]);
  }

  function buttonClickChildHandler(ev) {
    talkWithParent(ev.target.parentNode.id);
  }

  function buttonClickHandler(ev) {
    talkWithParent(ev.target.id);
  }
};

function talkWithParent(msg) {
  parent.postMessage(msg, '*');
}

function playSound(audio) {
  if (audio !== undefined) {
    audio.play();
  }
}
