"use strict";

window.onload = function() {
    let buttons = [];
    let audio = {};
    buttons.push(document.getElementById('skip'));
    buttons.push(document.getElementById('submit'));
    buttons[0].onclick = buttonClickHandler;
    buttons[1].onclick = submitScoreHandler;
    for (let i = 0; i < 2; i++) {
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
      talkWithParent('highscoresButton');
    }

    function submitScoreHandler(ev) {
      ev.preventDefault();
      var http = new XMLHttpRequest();
      const url = "https://make-gaming-great-again-api.herokuapp.com/scores/";
      const player = document.getElementById('fname').value;
      const score = document.getElementById('score').innerHTML;
      var params = "name=" + player + "&score=" + score;
      http.open("POST", url, true);
      // Send the proper header information along with the request
      http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      // Call a function when the state changes
      http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
          talkWithParent('highscoresButton');
        }
      }
      http.send(params);
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
