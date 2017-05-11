"use strict";

window.onload = function() {
    /*
    // POST
    var http = new XMLHttpRequest();
    const url = "https://make-gaming-great-again-api.herokuapp.com/scores/";
    var params = "name=Goa&score=40";
    http.open("POST", url, true);

    // Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // Call a function when the state changes
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
    }
    http.send(params);*/

    // HTTP GET Request
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.withCredentials = true;
    const url = "https://pure-ridge-22716.herokuapp.com/scores";
    // Specifies a function to be executed every time the status of the XMLHttpRequest object changes
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let scores = JSON.parse(this.responseText);
            document.getElementById("winner-1").innerHTML = scores[0].name;
            document.getElementById("winner-2").innerHTML = scores[1].name;
            document.getElementById("winner-3").innerHTML = scores[2].name;
            document.getElementById("score-1").innerHTML = scores[0].score;
            document.getElementById("score-2").innerHTML = scores[1].score;
            document.getElementById("score-3").innerHTML = scores[2].score;
        }
    };
    
    xmlhttp.onerror = function () {
      console.log('request failed');
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    let buttons = [];
    buttons.push(document.getElementById('backButton'));
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = buttonClickHandler;
        for (let j = 0; j < buttons[i].children.length; ++j ) {
          buttons[i].children[j].onclick = buttonClickChildHandler;
        }
    }

    function buttonClickChildHandler(ev) {
      talkWithParent(ev.target.parentNode.id);
    }

    function buttonClickHandler(ev) {
      talkWithParent(ev.target.id);
    }
};

function talkWithParent(msg) {
    parent.postMessage(msg, '*');
}
