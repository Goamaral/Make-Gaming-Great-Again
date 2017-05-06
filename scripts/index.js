/*jshint esversion: 6 */

"use strict";

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

    let main = document.getElementsByTagName('main')[0];

    let currentIframe = null;

    // Create all screens
    let iframeMenu = document.createElement("iframe");
    iframeMenu.src = 'menu.html';

    let iframeGame = document.createElement("iframe");
    iframeGame.src = 'game.html';

    let iframeHowToPlay = document.createElement("iframe");
    //iframeHowToPlay.src = 'howToPlay.html';

    let iframeHighscores = document.createElement("iframe");
    iframeHighscores.src = 'highscores.html';

    let iframeSettings = document.createElement("iframe");
    iframeSettings.src = 'settings.html';

    let iframeEndOfGame = document.createElement("iframe");
    iframeEndOfGame.src = 'endOfGame.html';

    let iframeEndOfInfiniteGame = document.createElement("iframe");
    iframeEndOfInfiniteGame.src = 'endOfInfiniteGame.html';

    mountIframe(iframeMenu);

    function messageRecievedHandler(ev) {
        let iframeDoc = null;
        let muteButton = null;
        let unmuteButton = null;
        switch (ev.data) {
            case 'storyGameButton':
                mountIframe(iframeGame);
                break;
            case 'infiniteGameButton':
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
            case 'gameEnd':
                mountIframe(iframeEndOfGame);
                break;
            case 'gameEndInfinite':
                mountIframe(iframeEndOfInfiniteGame);
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

function toggleAudio(audio, buttonToHide, buttonToShow) {
  buttonToHide.style.display = "none";
  buttonToShow.style.display = "";
  audio.muted = !audio.muted;
}
