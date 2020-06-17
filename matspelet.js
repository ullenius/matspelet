import {questions} from "./questions.js";
/*
I "Matspelet" får användaren svara på frågor om mat. 
Användaren får 10 sekunder per fråga att svara.

Av Magnus Andersson 2011
*/
"use strict";
let randomQuestions;
let currentQuestion;
let setIntervalID;
window.onload = init();

function init() {
	displayTime("Tid kvar: Spel ej startat");
	displayQuestion("Spel ej startat");
	enableStartButton();
	currentQuestion = undefined;
	setIntervalID = undefined;
	
	window.startaSpel = startaSpel;
	window.svara = svara;
}

function getRandomQuestions() {
	
	const mySet = getLevels(questions);
	const sortedLevels = sortLevels(mySet);
	let randomQuestions = [];
	
	sortedLevels.forEach(function(element) {
		
		let level = [];
		
		questions.forEach(function(question) {
			if (question.level === Number(element)) {
				level.push(question);
			}
		});
		const rng = Math.floor (Math.random() * level.length);
		randomQuestions.push(level[rng]);
	});
	return randomQuestions;
}

function getLevels(questions) {
	
	const mySet = {};
	questions.forEach(function(element) {
		mySet[element.level] = true;
	});
	Object.freeze(mySet);
	return mySet;
}

function sortLevels(unsortedSet) {
	const sortedLevels = Object.keys(unsortedSet);
	sortedLevels.sort(function(a, b) {
		return a - b;
	});
	return sortedLevels;
}

function startaSpel()
{
	randomQuestions = getRandomQuestions();
	console.log(randomQuestions); //DEBUG
	disableStartButton();
	clearResult();
	visaFraga();
	
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
	console.log(currentQuestion);
	displayQuestion("Fråga " + currentQuestion.level + ": " + currentQuestion.question);
	setIntervalID = setInterval(countdown, 1000); //global variable
	
	function nextQuestion() {
		currentQuestion = randomQuestions.shift();
		return currentQuestion;
	}
	function countdown()
	{
		displayTime("Tid kvar: " + counter--);
		if (counter === 0) {
			clearInterval(setIntervalID);
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

function svara()
{
		let answer = getInput();
		const correctAnswer = checkAnswer(answer, currentQuestion);
		
		if (correctAnswer === true) {
			answer = "";
			clearInterval(setIntervalID);

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
			return (first.toLowerCase() === second.toLowerCase()) ? true : false;
		}
	}
	function lastQuestion() {
		return (randomQuestions.length === 0) ? true : false;
	}
}

function gameOver(message = "") {
	init();
	clearInterval(setIntervalID);
	const textNodeResultat = document.createTextNode(message);
	document.getElementById("resultat").appendChild(textNodeResultat);
}