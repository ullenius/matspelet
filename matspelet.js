import {questions} from "./questions.js";
/*
I "Matspelet" får användaren svara på frågor om mat. 
Användaren får 10 sekunder per fråga att svara.

Av Magnus Andersson 2011
*/
"use strict";

const matspelet = Object.create(null);
window.onload = init();

function init() {
	displayTime("Tid kvar: Spel ej startat");
	displayQuestion("Spel ej startat");
	enableStartButton();

	matspelet.randomQuestions = undefined;
	matspelet.currentQuestion = undefined;
	matspelet.intervalId = undefined;
	window.startGame = startGame;
	window.submitAnswer = submitAnswer;
}

function sortLevels(unsortedSet) {
	const sortedLevels = Object.keys(unsortedSet);
	sortedLevels.sort(function compareTo(a, b) {
		return a - b;
	});
	return sortedLevels;
}

function startGame()
{
	matspelet.randomQuestions = getRandomQuestions();
	console.log(matspelet.randomQuestions); //DEBUG
	disableStartButton();
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
    }
	
	function clearResult() {
		const result = document.getElementById("resultat");
		result.textContent = undefined;
	}
}

function enableStartButton() {
	startButtonEnabled(true);
}

function disableStartButton() {
	startButtonEnabled(false);
}

function startButtonEnabled(state) {
	const startButton = document.getElementById("start");
	startButton.disabled = !state;
}

function visaFraga()
{
	let counter = 10;
	
	nextQuestion();
	console.log(matspelet.currentQuestion);
	displayQuestion("Fråga " + matspelet.currentQuestion.level + ": " + matspelet.currentQuestion.question);
	matspelet.intervalId = setInterval(countdown, 1000);
	console.log("setIntervalId = " + matspelet.intervalId);
	
	function nextQuestion() {
		matspelet.currentQuestion = matspelet.randomQuestions.shift();
	}
	function countdown()
	{
		displayTime("Tid kvar: " + counter--);
		if (counter === 0) {
			gameOver("Tiden tog slut. Försök igen...");
		}
	}
}

function displayQuestion(message) {
	const question = document.getElementById("fraga");
	question.textContent = message;
}

function displayTime(time) 
{
	const timer = document.getElementById("klocka");
	timer.textContent = time;
}

function submitAnswer()
{
		let answer = getInput();
		const correctAnswer = checkAnswer(answer, matspelet.currentQuestion);
		
		if (correctAnswer === true) {
			answer = "";
			clearInterval(matspelet.intervalId);

			if (lastQuestion() === true) {
				gameOver("du vann!");
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

function gameOver(message = "") {
	clearInterval(matspelet.intervalId);
	const textNodeResultat = document.createTextNode(message);
	document.getElementById("resultat").appendChild(textNodeResultat);
	init();
}
