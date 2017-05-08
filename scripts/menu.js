"use strict";

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
    audio[buttons[i].id].src = 'resources/sounds/hover-sound.mp3';
  }

  // Play sound on button hover
  function playSoundHandler(ev) {
    playSound(audio[ev.target.id]);
  }

  // Handle click inside paragraph of button
  function buttonClickChildHandler(ev) {
    talkWithParent(ev.target.parentNode.id);
  }

  // Handle click in button
  function buttonClickHandler(ev) {
    talkWithParent(ev.target.id)
  }
};

// Send message to parent index,js.
// Index.js is the parent because menu.html is being loaded inside of index.html
function talkWithParent(msg) {
  parent.postMessage(msg, '*');
}

function playSound(audio) {
  if (audio !== undefined) {
    audio.play();
  }
}
