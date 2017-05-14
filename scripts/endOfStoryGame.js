"use strict";

window.onload = function() {
    let buttons = [];
    let audio = {};
    buttons.push(document.getElementById('backButton'));
    buttons[0].onclick = buttonClickHandler;
    buttons[0].onmouseover = playSoundHandler;
    audio[buttons[0].id] = document.createElement('audio');
    audio[buttons[0].id].src = 'resources/sounds/hover-sound.mp3';

    // Play sound on button hover
    function playSoundHandler(ev) {
      playSound(audio[ev.target.id]);
    }

    function buttonClickChildHandler(ev) {
      talkWithParent(ev.target.parentNode.id);
    }

    function buttonClickHandler(ev) {
      talkWithParent(ev.target.id)
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
