"use strict";

document.addEventListener("DOMContentLoaded", function() {
  window.addEventListener('message', messagesHandler);

  function messagesHandler(ev) {
    console.log(ev.data);
    let newEvent = new Event('messageRecieved');
    newEvent.data = ev.data;
    window.dispatchEvent(newEvent);
  }
});

window.onload = function() {
  window.addEventListener('messageRecieved', messageRecievedHandler);
  //Get Audio node
  let audio = document.getElementsByTagName('audio')[0];

  let main = document.getElementsByTagName('main')[0];

  let currentIframe = null;

  // Create all screens
  let iframeMenu = document.createElement("iframe");
  iframeMenu.src = 'menu.html';

  let iframeStoryGame = document.createElement("iframe");
  iframeStoryGame.src = 'storyGame.html';

  let iframeInfiniteGame = document.createElement("iframe");
  //iframeInfiniteGame.src = 'infiniteGame.html';

  let iframeHowToPlay = document.createElement("iframe");
  //iframeHowToPlay.src = 'howToPlay.html';

  let iframeHighscores = document.createElement("iframe");
  //iframeHighscores.src = 'highscores.html';

  let iframeSettings = document.createElement("iframe");
  iframeSettings.src = 'settings.html';

  let nodes = {
    iframeMenu: iframeMenu,
    iframeStoryGame: iframeStoryGame,
    iframeInfiniteGame: iframeInfiniteGame,
    iframeHowToPlay: iframeHowToPlay,
    iframeHighscores: iframeHighscores,
    iframeSettings: iframeSettings,
    audio: audio,
    main: main
  };

  mountIframe(iframeMenu);

  function messageRecievedHandler(ev) {
    switch(ev.data) {
      case 'storyGameButton':
        mountIframe(iframeStoryGame);
        break;
      case 'infiniteGameButton':
        mountIframe(iframeInfiniteGame);
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
        toggleAudio(audio);
        break;
      case 'backButton':
        mountIframe(iframeMenu);
        break;
    }
  }

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

function toggleAudio(audio) {
  audio.muted = !audio.muted;
}
