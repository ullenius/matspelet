import {questions} from "./questions.js";
"use strict";
// Av Magnus Andersson 2011

const matspelet = Object.create(null);
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
    start.addEventListener("click", startGame);

    var answerGameButton = document.getElementById("answer");
    answer.addEventListener("click", submitAnswer);

    startButton( { enabled: true } );
    displayTime("Tid kvar: Spel ej startat");

    /*
    matspelet.randomQuestions = undefined;
    matspelet.currentQuestion = undefined;
    matspelet.intervalId = undefined;
    */
}

function displayTime(time) {
    var timer = document.getElementById("klocka");
    timer.textContent = time;
}

function displayMessage(message) {
    var question = document.getElementById("fraga");
    question.textContent = message;
};

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

    function getRandomQuestions() {
        const mySet = getLevels(questions);
        const sortedLevels = sortLevels(mySet);
        let randomQuestions = [];

        sortedLevels.forEach(function pickOneRandomQuestionPerLevel(levelNo) {

                const level = questions.filter(function equals(question) {
                        return question.level === Number(levelNo);
                        });
                const rng = Math.floor (Math.random() * level.length);
                randomQuestions.push(level[rng]);
                });
        return randomQuestions;

        function getLevels(questions) {
            const mySet = Object.create(null);
            questions.forEach(function parseLevels(question) {
                    mySet[question.level] = true;
                    });
            Object.freeze(mySet);
            return mySet;
        }

        function sortLevels(unsortedSet) {
            var sortedLevels = Object.keys(unsortedSet);
            sortedLevels.sort(function compareTo(a, b) {
                    return a - b;
                    });
            return sortedLevels;
        }
    }

    function clearResult() {
        var result = document.getElementById("resultat");
        result.textContent = undefined;
    }
}

function startButton( { enabled } ) {
    var startButton = document.getElementById("start");
    startButton.disabled = !enabled;
}

function visaFraga() {
    var counter = 10;
    nextQuestion();
    displayQuestion();
    matspelet.intervalId = setInterval(countdown, 1000);
    console.log(matspelet.currentQuestion);
    console.log("setIntervalId = " + matspelet.intervalId); //DEBUG

    function nextQuestion() {
        matspelet.currentQuestion = matspelet.randomQuestions.shift();
    }
    function displayQuestion() {
        var question = matspelet.currentQuestion.level.toString();
        question = question.concat(": ");
        question = question.concat(matspelet.currentQuestion.question);
        displayMessage("Fråga " + question);
    }
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
