"use strict";

document.addEventListener("DOMContentLoaded", function() {
  window.addEventListener('message', messagesHandler);

  function messagesHandler(ev) {
    console.log(ev.data);
  }
});

window.onload = function() {
  let buttons = document.getElementsByTagName('button');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = buttonClickHandler;
  }
  function buttonClickHandler(ev) {
    talkWithParent(ev.target.id)
  }
};

function talkWithParent(msg) {
  parent.postMessage(msg, '*');
}

function PlaySound(obj) {
  var sound = document.getElementById(obj).play();
}

function StopSound(obj) {
  var sound = document.getElementById(obj).pause();
}
