import {questions} from "./questions.js";
"use strict";
// Av Magnus Andersson 2011

var matspelet = {

    randomQuestions: [],
    *[Symbol.iterator]() {
        var question = this.randomQuestions.shift();
        yield question;
    }
};

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

    matspelet.randomQuestions = getRandomQuestions();
    console.log(matspelet.randomQuestions); //DEBUG
    startButton( { enabled: false } );
    clearResult();
    visaFraga();

}
function getRandomQuestions() {
    {
       let arr = questions.map(function pullLevels(element) {
            return element.level;
        });
       let mySet = new Set(arr);
       var levels = [...mySet].sort();
    }
    var randomQuestions = [];

    levels.forEach(function pickOneRandomQuestionPerLevel(level) {

        let questionArr = questions.filter(function equals(question) {
            return (question.level === level);
        });
        const rng = Math.floor (Math.random() * questionArr.length);
        randomQuestions.push(questionArr[rng]);
      });
      return randomQuestions;
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
    var counter = 10;

    var iterator = matspelet[Symbol.iterator]();
    var next = iterator.next();
    var {
        value : {
                level,
                question
                }
    } = next;

    console.log("level", level);
    console.log(question);

    var questionText = `Fråga ${level}: ${question}`;

    displayMessage(questionText);

    matspelet.intervalId = setInterval(countdown, 1000); // TODO move this
    console.log("setIntervalId = " + matspelet.intervalId); //DEBUG

    function countdown() {
        displayTime("Tid kvar: " + counter--);
        if (counter === 0) {
            gameOver("Tiden tog slut. Försök igen...");
        }
    }
}

function submitAnswer() {
    var answer = getInput();
    var correctAnswer = checkAnswer(answer, matspelet.currentQuestion);

    if (correctAnswer === true) {
        clearInputBox();
        clearInterval(matspelet.intervalId);

        if (lastQuestion() === true) {
            gameOver("Du vann!");
            //window.location.assign("pris.html");
        } else {
            visaFraga();
        }
    }
    else if (correctAnswer === false) {
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
    function lastQuestion() {
        return (matspelet.randomQuestions.length === 0) ? true : false;
    }
}
