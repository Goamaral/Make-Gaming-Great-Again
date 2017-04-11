/*jshint esversion: 6 */

"use strict";

window.onload = function() {
    //Get Audio node
    let audio = document.getElementsByTagName('audio')[0];

    let main = document.getElementsByTagName('main')[0];

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

    main.appendChild(iframeMenu);
    iframeMenu.onload = function() {
        menuHandler(nodes);
    };
};

function menuHandler(nodes) {
    //console.log(nodes);
    let {
        iframeMenu,
        iframeStoryGame,
        iframeInfiniteGame,
        iframeHowToPlay,
        iframeHighscores,
        iframeSettings,
        main
    } = nodes;

    console.log(iframeMenu);

    let iframeMenuDocument = getDocument(iframeMenu);
    console.log(iframeMenuDocument);

    // Buttons
    let storyGameButton = iframeMenuDocument.getElementById('storyGameButton');
    storyGameButton.onclick = buttonHandler;

    let infiniteGameButton = iframeMenuDocument.getElementById('infiniteGameButton');
    infiniteGameButton.onclick = buttonHandler;

    let howToPlayButton = iframeMenuDocument.getElementById('howToPlayButton');
    howToPlayButton.onclick = buttonHandler;

    let highscoresButton = iframeMenuDocument.getElementById('highscoresButton');
    highscoresButton.onclick = buttonHandler;

    let settingsButton = iframeMenuDocument.getElementById('settingsButton');
    settingsButton.onclick = buttonHandler;

    function buttonHandler(ev){
        switch (ev.target.id) {
            case 'storyGameButton':
                replaceChildren(main, iframeMenu, iframeStoryGame);
                iframeStoryGame.onload = function() {
                    gameHandler(nodes);
                };
                break;
            case 'infiniteGameButton':
                replaceChildren(main, iframeMenu, iframeInfiniteGame);
                iframeInfiniteGame.onload = function() {
                    gameHandler(nodes);
                };
                break;
            case 'howToPlayButton':
                replaceChildren(main, iframeMenu, iframeHowToPlay);
                iframeHowToPlay.onload = function() {
                    howToPlayHandler(nodes);
                };
                break;
            case 'highscoresButton':
                replaceChildren(main, iframeMenu, iframeHighscores);
                iframeHighscores.onload = function() {
                    highscoresHandler(nodes);
                };
                break;
            case 'settingsButton':
                replaceChildren(main, iframeMenu, iframeSettings);
                iframeSettings.onload = function() {
                    settingsHandler(nodes);
                };
                break;
            default:
                console.log('On click event poorly configured -> buttonHandler');
                return;
        }
    }
}

function gameHandler(nodes) {

}

function howToPlayHandler(nodes) {

}

function highscoresHandler(nodes) {

}

function settingsHandler(nodes) {
    let { iframeSettings, audio, iframeMenu, main } = nodes;
    let iframeSettingsDocument = getDocument(iframeSettings);

    //Buttons
    let toggleAudioButton = iframeSettingsDocument.getElementById('muteButton');
    let toggleAudioButtonOff = iframeSettingsDocument.getElementById('muteButtonReverse');
    toggleAudioButton.onclick = buttonHandler;
    toggleAudioButtonOff.onclick = buttonHandler;

    let backButton = iframeSettingsDocument.getElementById('backButton');
    backButton.onclick = buttonHandler;

    function buttonHandler(ev) {
        switch (ev.target.id) {
            case 'muteButton':
                toggleAudio(audio, toggleAudioButton, toggleAudioButtonOff);
                break;
            case 'muteButtonReverse':
                toggleAudio(audio, toggleAudioButtonOff, toggleAudioButton);
                break;
            case 'backButton':
                replaceChildren(main, iframeSettings, iframeMenu);
                iframeMenu.onload = function() {
                    menuHandler(nodes);
                };
                break;
            default:
                console.log('On click event poorly configured -> buttonHandler');
                return;
        }
    }
}

function replaceChildren(root, from, to) {
    root.removeChild(from);
    root.appendChild(to);
}

function getDocument(iframe) {
    iframe.contentDocument.crossOrigin = "anonymous";
    return iframe.contentDocument || iframe.contentWindow.document;
}

function toggleAudio(audio, buttonToHide, buttonToShow) {
    buttonToHide.style.display = "none";
    buttonToShow.style.display = "";
    audio.muted = !audio.muted;
}
