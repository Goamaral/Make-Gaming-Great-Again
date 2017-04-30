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

    let iframeStoryGame = document.createElement("iframe");
    iframeStoryGame.src = 'storyGame.html';

    let iframeInfiniteGame = document.createElement("iframe");
    iframeInfiniteGame.src = 'infiniteGame.html';

    let iframeHowToPlay = document.createElement("iframe");
    //iframeHowToPlay.src = 'howToPlay.html';

    let iframeHighscores = document.createElement("iframe");
    iframeHighscores.src = 'highscores.html';

    let iframeSettings = document.createElement("iframe");
    iframeSettings.src = 'settings.html';

    let iframeEndOfGame = document.createElement("iframe");
    iframeSettings.src = 'endOfGame.html';

    mountIframe(iframeMenu);

    function messageRecievedHandler(ev) {
        let iframeDoc = null;
        let muteButton = null;
        let unmuteButton = null;
        switch (ev.data) {
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
