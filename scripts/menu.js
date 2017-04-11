"use strict";

document.addEventListener("DOMContentLoaded", function() {
  window.addEventListener('message', messagesHandler);

  function messagesHandler(ev) {
    console.log(ev.data);
  }
});

window.onload = function() {
  let buttons = document.getElementsByTagName('button');

  for( let button of buttons ) {
    button.onclick = buttonClickHandler;
  }

  function buttonClickHandler(ev) {
    talkWithParent(ev.target.id)
  }
};

function talkWithParent(msg) {
  parent.postMessage(msg, '*');
}
