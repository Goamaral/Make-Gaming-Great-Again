/*jshint esversion: 6 */

"use strict";

// Before windown loading receives child id and send the work to the handle below
document.addEventListener("DOMContentLoaded", function() {
  window.addEventListener('message', messagesHandler);

  function messagesHandler(ev) {
    let newEvent = new Event('messageRecieved');
    newEvent.data = ev.data;
    window.dispatchEvent(newEvent);
  }
});

window.onload = function() {
  window.addEventListener('messageRecieved', messageRecievedHandler);
  //Get Audio node
  let audio = document.getElementsByTagName('audio')[0];

  // The place we load the iframes onto
  let main = document.getElementsByTagName('main')[0];
  let currentIframe = null;

  // Create all screens
  let iframeMenu = document.createElement("iframe");
  let iframeGame = document.createElement("iframe");
  let iframeHowToPlay = document.createElement("iframe");
  let iframeHighscores = document.createElement("iframe");
  let iframeSettings = document.createElement("iframe");
  let iframeEndOfStoryGame = document.createElement("iframe");
  let iframeEndOfInfiniteGame = document.createElement("iframe");

  iframeMenu.src = 'menu.html';
  iframeGame.src = 'game.html';
  //iframeHowToPlay.src = 'howToPlay.html';
  iframeHighscores.src = 'highscores.html';
  iframeSettings.src = 'settings.html';
  iframeEndOfStoryGame.src = 'endOfStoryGame.html';
  iframeEndOfInfiniteGame.src = 'endOfInfiniteGame.html';

  mountIframe(iframeMenu);

  function messageRecievedHandler(ev) {
    let iframeDoc = null;
    let muteButton = null;
    let unmuteButton = null;

    if(ev.data.msg == 'endOfStoryGame') {
      audio.currentTime = 0;
      audio.muted = false;
      mountIframe(iframeEndOfStoryGame);
    }
    if(ev.data.msg =='endOfInfiniteGame') {
      audio.currentTime = 0;
      audio.muted = false;
      mountIframe(iframeEndOfInfiniteGame);
      iframeEndOfInfiniteGame.onload = function () {
        iframeEndOfInfiniteGame.contentWindow.document.getElementById('score').innerHTML = ev.data.score;
      };
    }

    switch (ev.data) {
      case 'storyGameButton':
        audio.muted = true;
        iframeGame.name = 'storyGame';
        mountIframe(iframeGame);
        break;
      case 'infiniteGameButton':
        audio.muted = true;
        iframeGame.name = 'infiniteGame';
        mountIframe(iframeGame);
        break;
      case 'howToPlayButton':
        mountIframe(iframeHowToPlay);
        break;
      case 'highscoresButton':
        mountIframe(iframeHighscores);
        break;
      case 'settingsButton':
        mountIframe(iframeSettings);
        break;
      case 'muteButton':
        iframeDoc = currentIframe.contentDocument;
        muteButton = iframeDoc.getElementById('muteButton');
        unmuteButton = iframeDoc.getElementById('unmuteButton');
        toggleAudio(audio, muteButton, unmuteButton);
        break;
      case 'unmuteButton':
        iframeDoc = currentIframe.contentDocument;
        muteButton = iframeDoc.getElementById('muteButton');
        unmuteButton = iframeDoc.getElementById('unmuteButton');
        toggleAudio(audio, unmuteButton, muteButton);
        break;
      case 'backButton':
        mountIframe(iframeMenu);
        break;
    }
  }

  // Appends the iframe onto main view
  function mountIframe(iframe) {
    if (currentIframe !== iframe) {
      if (currentIframe === null) {
        mount(main, iframe);
      } else {
        unmount(main, currentIframe);
        mount(main, iframe);
      }
      currentIframe = iframe;
    }
  }
}

function mount(root, element) {
  root.appendChild(element);
}

function unmount(root, element) {
  root.removeChild(element);
}

function toggleAudio(audio, buttonToHide, buttonToShow) {
  buttonToHide.style.display = "none";
  buttonToShow.style.display = "";
  audio.muted = !audio.muted;
}
