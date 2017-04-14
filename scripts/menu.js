"use strict";

document.addEventListener("DOMContentLoaded", function() {
  window.addEventListener('message', messagesHandler);

  function messagesHandler(ev) {
    console.log(ev.data);
  }
});

window.onload = function() {
  let buttons = document.getElementsByTagName('button');
  let audio = {};
  for ( let i = 0; i < buttons.length; i++ ) {
    buttons[i].onclick = buttonClickHandler;
    for (let j = 0; j < buttons[i].children.length; ++j ) {
      buttons[i].children[j].onclick = buttonClickChildHandler;
    }
    buttons[i].onmouseover = playSoundHandler;
    audio[buttons[i].id] = document.createElement('audio');
    audio[buttons[i].id].src = 'resources/hover-sound.mp3';
  }

  function playSoundHandler(ev) {
    playSound(audio[ev.target.id]);
  }

  function buttonClickChildHandler(ev) {
    console.log('pressed');
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
