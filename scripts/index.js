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
    let iframeEndOfGame = document.createElement("iframe");
    
    iframeMenu.src = 'menu.html';
    iframeGame.src = 'game.html';
    //iframeHowToPlay.src = 'howToPlay.html';
    iframeHighscores.src = 'highscores.html';
    iframeSettings.src = 'settings.html';
    iframeEndOfGame.src = 'endOfGame.html';

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
            case 'endGameButton':
                mountIframe(iframeEndOfGame);
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
