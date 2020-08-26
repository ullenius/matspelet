import { matspelet } from "./game.js";
"use strict";
// Av Magnus Andersson 2011

window.onload = init;

function init() {
    displayMessage("Spel ej startat");

    var inputBox = document.getElementById("svar");
    inputBox.addEventListener("keydown", function typing(e) {
        if (e.key === "Enter") {
            submitAnswer();
        }
    });

    var startGameButton = document.getElementById("start");
    startGameButton.addEventListener("click", startGame);

    var answerButton = document.getElementById("answer");
    answerButton.addEventListener("click", submitAnswer);

    startButton( { enabled: true } );
    displayTime("Tid kvar: Spel ej startat");
}

function displayTime(time) {
    var timer = document.getElementById("klocka");
    timer.textContent = time;
}

function displayMessage(message) {
    var question = document.getElementById("fraga");
    question.textContent = message;
}

function gameOver(message = "") {
    clearInterval(matspelet.intervalId);
    var textNodeResultat = document.createTextNode(message);
    document.getElementById("resultat").appendChild(textNodeResultat);
    init(); // remove?
}

function startGame() {

    matspelet.init();
    startButton( { enabled: false } );
    clearResult();
    visaFraga();
}

function clearResult() {
    var result = document.getElementById("resultat");
    result.textContent = undefined;
}

function startButton( { enabled } ) {
    var startButton = document.getElementById("start");
    startButton.disabled = !enabled;
}

function visaFraga() {
    var counter = 100;

    var iterator = matspelet[Symbol.iterator]();
    var next = iterator.next();
    console.log(next); // DEBUG
    var {
        done,
        value : {
                level,
                question
                } = {}
    } = next;
    var questionText = `Fråga ${level}: ${question}`;
    displayMessage(questionText, done);

    matspelet.intervalId = setInterval(countdown, 1000); // TODO move this
    console.log("setIntervalId = ", matspelet.intervalId); //DEBUG

    function countdown() {
        displayTime(`Tid kvar: ${counter--}`);
        if (counter === 0) {
            gameOver("Tiden tog slut. Försök igen...");
        }
    }
}

function submitAnswer(lastQuestion = false) {
    var answer = getInput();
    var correctAnswer = checkAnswer(answer, matspelet.current);

    if (correctAnswer === true) {
        clearInputBox();
        clearInterval(matspelet.intervalId);

        if (lastQuestion === true) {
            gameOver("Du vann!");
            //window.location.assign("pris.html");
        } 
        else {
            visaFraga();
        }
    } else if (correctAnswer === false) {
        gameOver("Fel svar! Försök igen...");
    }

    function getInput() {
        return document.getElementById("svar").value;
    }
    function clearInputBox() {
        document.getElementById("svar").value = "";
    }
    function checkAnswer(answer, current) {
        return equalsIgnoreCase(answer, current.answer);

        function equalsIgnoreCase(first, second) {
            return first.toLowerCase() === second.toLowerCase();
        }
    }
}
