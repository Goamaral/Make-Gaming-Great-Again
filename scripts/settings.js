"use strict";

window.onload = function() {
  let audio = {};
  let buttons = [];
  buttons.push(document.getElementById('muteButton'));
  buttons.push(document.getElementById('unmuteButton'));
  buttons.push(document.getElementById('backButton'));
  audio[buttons[2].id] = document.createElement('audio');
  audio[buttons[2].id].src = 'resources/sounds/hover-sound.mp3';

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = buttonClickHandler;
    for (let j = 0; j < buttons[i].children.length; ++j ) {
      buttons[i].children[j].onclick = buttonClickChildHandler;
    }
  }

  buttons[2].onmouseover = playSoundHandler;

  function buttonClickChildHandler(ev) {
    talkWithParent(ev.target.parentNode.id);
  }

  function playSoundHandler(ev) {
    playSound(audio[ev.target.id]);
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
