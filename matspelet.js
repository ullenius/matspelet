//matspelet.js
//Av Magnus Andersson 2011

/*
I "Matspelet" får användaren svara på fem frågor om mat. 
Användaren får 10 sekunder per fråga att svara.
*/

let randomQuestions;
window.onload = init();

function init() {
	displayTime("Tid kvar: Spel ej startat");
	displayQuestion("Fråga 1: Spel ej startat");
	enableStartButton();
	randomQuestions = getRandomQuestions();
	
	console.log("random questions = ");
	console.log(randomQuestions);
}

function getRandomQuestions() {
	
	const questions = [
		{
			"level" : 1,
			"question" : "Från vilket land kommer såsen Béarnaise?",
			"answer" : "Frankrike"
		},
		{
			"level" : 1,
			"question" : "James Bond dricker ofta en drink gjord på gin och vermouth. Vad heter drinken?",
			"answer" : "Dry Martini"
		},
		{
			"level" : 1,
			"question" : "Vad är huvudingrediensen i en omelett?",
			"answer" : "Ägg"
		},
		{
			"level" : 1,
			"question" : "Vilken är världens dyraste krydda?",
			"answer" : "Saffran"
		},
		{
			"level" : 1,
			"question" : "Vad kallas den tomatbaserade grönsakssåsen som ofta äts med tacos och nachos?",
			"answer" : "Salsa"
		},
		{
			"level" : 2,
			"question" : "Vad heter en känd italiensk sås som innehåller basilika, vitlök, olivolja, parmesan och pinjenötter?",
			"answer" : "Pesto"
		},
		{
			"level" : 2,
			"question" : "Vad heter pizzan som bara innehåller tomatsås och ost (och ibland även basilika)?",
			"answer" : "Margherita"
		},
		{
			"level" : 2,
			"question" : "Vilken typ av mat är en salsiccia?",
			"answer" : "Korv"
		},
		{
			"level" : 2,
			"question" : "Vad kallas den asiatiska sojabönsmassan som är proteinrik och nästan smaklös?",
			"answer" : "Tofu"
		},
		{
			"level" : 2,
			"question" : "Från vilken del av Sverige härstammar saffranspannkaka?",
			"answer" : "Gotland"
		},
		
		{
			"level" : 3,
			"question" : "Vilken grönsak är viktig i en moussaka?",
			"answer" : "Aubergine"
		},
		{
			"level" : 3,
			"question" : "Vad heter rötten från Skottland som görs med lever, inälvor, lök och havregryn?",
			"answer" : "Haggis"
		},
		{
			"level" : 3,
			"question" : "Vilken är huvudingrediensen i kroppkakor?",
			"answer" : "Potatis"
		},
		{
			"level" : 3,
			"question" : "Från vilket djurs mjölk gör man chévreost?",
			"answer" : "Get"
		},
		{
			"level" : 3,
			"question" : "Vilken krydda ger currypulver dess gula färg?",
			"answer" : "Gurkmeja"
		},
		{
			"level" : 4,
			"question" : "Matkedjan KFC är specialiserade på snabbmat av en viss typ av djur. Vilket?",
			"answer" : "Kyckling"
		},
		{
			"level" : 4,
			"question" : "Paul Giamattis karaktär i filmen Sideways är förtjust i en viss typ av vindruva. Vilken?",
			"answer" : "Pinot Noir"
		},
		{
			"level" : 4,
			"question" : "Vilken typ av öl görs det mest av i England?",
			"answer" : "Ale"
		},
		{
			"level" : 4,
			"question" : "Vilken ingrediens, förutom skinka, har huvudrollen i en Quiche Lorraine?",
			"answer" : "Ost"
		},
		{
			"level" : 4,
			"question" : "Vad kallas den inlagda ingefäran som brukar ätas i samband med sushi?",
			"answer" : "Gari"
		},
		{
			"level" : 5,
			"question" : "Vad betyder det hindiska ordet masala?",
			"answer" : "Kryddblandning"
		},
		{
			"level" : 5,
			"question" : "Vilken typ av dryck är geuze?",
			"answer" : "Öl"
		},
		{
			"level" : 5,
			"question" : "Vad är det riktiga namnet för söt matlagningssake?",
			"answer" : "Mirin"
		},
		{
			"level" : 5,
			"question" : "Vilken grön druva ger viner som passar till het mat med asiatiska inslag?",
			"answer" : "Riesling"
		},
		{
			"level" : 5,
			"question" : "Vad kallas jalapñeo som har blivit rökt och torkad?",
			"answer" : "Chipotle"
		}
	];
	
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
	
	const question = nextQuestion();
	displayQuestion("Fråga " + question.level + ": " + question.question);
	setIntervalID = setInterval(countdown, 1000); // hoisting... again!
	
	function nextQuestion() {
		const nextQuestion = randomQuestions.shift();
		Object.freeze(nextQuestion);
		return nextQuestion;
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
		const svar = document.getElementById("svar");
		const question = getCurrentQuestion();
		const rattSvar = equalsIgnoreCase(svar.value, question.answer);
		
		if (rattSvar === true) {
			svar.value = "";
			clearInterval(setIntervalID);
			visaFraga();
			
			if (lastQuestion() === true) {
				gameOver();
				window.location.assign("pris.html");
			}
		}
		else if (rattSvar === false) {
			gameOver("Fel svar! Försök igen...");
		}
		
	function equalsIgnoreCase(first, second) {
		return (first.toLowerCase() === second.toLowerCase()) ? true : false;
	}
	
	function getCurrentQuestion() {
		return randomQuestions[0];
	}
	
	function lastQuestion() {
		return (randomQuestions.length === 1) ? true : false;
	}
	
}

function gameOver(message) {
	
	message = (message === undefined) ? "" : message;
	init();
	
	clearInterval(setIntervalID);
	const textNodeResultat = document.createTextNode(message);
	document.getElementById("resultat").appendChild(textNodeResultat);
}
