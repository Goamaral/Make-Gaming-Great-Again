"use strict";

window.onload = function() {
    let buttons = [];
    buttons.push(document.getElementById('backButton'));
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = buttonClickHandler;
        for (let j = 0; j < buttons[i].children.length; ++j ) {
          buttons[i].children[j].onclick = buttonClickChildHandler;
        }
    }

    function buttonClickChildHandler(ev) {
      console.log(ev.target.parentNode.id);
      talkWithParent(ev.target.parentNode.id);
    }

    function buttonClickHandler(ev) {
      console.log(ev.target.id);
      talkWithParent(ev.target.id);
    }
};

function talkWithParent(msg) {
    parent.postMessage(msg, '*');
}
