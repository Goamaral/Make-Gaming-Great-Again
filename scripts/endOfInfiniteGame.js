"use strict";

window.onload = function() {
    let buttons = [];
    buttons.push(document.getElementById('skip'));
    buttons.push(document.getElementById('submit'));
    buttons[0].onclick = buttonClickHandler;
    buttons[1].onclick = submitScoreHandler;

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
