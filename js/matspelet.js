import { matspelet } from "./game.js";
"use strict";
// Av Magnus Andersson 2011

const START = "start";
const ANSWER = "answer";

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

    toggleButton( { name: START, enabled: true } );
    toggleButton( { name: ANSWER, enabled: false } );

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
    init();
}

function startGame() {

    matspelet.init();
    toggleButton( { name: START, enabled: false } );
    toggleButton( { name: ANSWER, enabled: true } );
    clearResult();
    showQuestion();
}

function clearResult() {
    var result = document.getElementById("resultat");
    result.textContent = undefined;
}

function toggleButton( { name, enabled } ) {
    var button = document.getElementById(name);
    button.disabled = !enabled;
}

function showQuestion() {
    var counter = 10;

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

    if (done) {
        gameOver("Du vann!");
        return;
    }

    var questionText = `Fråga ${level}: ${question}`;
    displayMessage(questionText, done);

    matspelet.intervalId = setInterval(countdown, 1000);
    console.log("setIntervalId = ", matspelet.intervalId); //DEBUG

    function countdown() {
        displayTime(`Tid kvar: ${counter--}`);
        if (counter === 0) {
            gameOver("Tiden tog slut. Försök igen...");
        }
    }
}

function submitAnswer() {
    var answer = getInput();
    var correctAnswer = checkAnswer(answer, matspelet.current);

    if (correctAnswer === true) {
        clearInputBox();
        clearInterval(matspelet.intervalId);
        showQuestion();
    } else {
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
