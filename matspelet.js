//matspelet.js
//Av Magnus Andersson 2011

/*
I "Matspelet" får anv�ndaren svara på fem frågor om mat. 
Anv�ndaren får 10 sekunder per fråga att svara.
*/

const svar = document.getElementById ("svar");
let resultatFinns = false;
let spelStartat = false;
const ANTAL_FRAGOR_PER_LEVEL = 5;

let fragorLevel1 = [];
let fragorLevel2 = [];
let fragorLevel3 = [];
let fragorLevel4 = [];
let fragorLevel5 = [];

fragorLevel1[0] = "Fr�n vilket land kommer såsen Béarnaise?";
fragorLevel1[1] = "James Bond dricker ofta en drink gjord på gin och vermouth. Vad heter drinken?";
fragorLevel1[2] = "Vad �r huvudingrediensen i en omelett?";
fragorLevel1[3] = "Vilken �r v�rldens dyraste krydda?";
fragorLevel1[4] = "Vad kallas den tomatbaserade gr�nsakss�sen som ofta äts med tacos och nachos?";

fragorLevel2[0] = "Vad heter en k�nd italiensk sås som innehåller basilika, vitlök, olivolja, parmesan och pinjenétter?";
fragorLevel2[1] = "Vad heter pizzan som bara innehåller tomatsås och ost (och ibland även basilika)?";
fragorLevel2[2] = "Vilken typ av mat är en salsiccia?";
fragorLevel2[3] = "Vad kallas den asiatiska sojabönsmassan som �r proteinrik och nästan smaklös?";
fragorLevel2[4] = "Från vilken del av Sverige h�rstammar saffranspannkaka?";

fragorLevel3[0] = "Vilken grönsak är viktig i en moussaka?";
fragorLevel3[1] = "Vad heter rötten fr�n Skottland som görs med lever, inälvor, lök och havregryn?";
fragorLevel3[2] = "Vilken är huvudingrediensen i kroppkakor?";
fragorLevel3[3] = "Från vilket djurs mjölk gör man chévreost?";
fragorLevel3[4] = "Vilken krydda ger currypulver dess gula färg?";

fragorLevel4[0] = "Matkedjan KFC är specialiserade på snabbmat av en viss typ av djur. Vilket?";
fragorLevel4[1] = "Paul Giamattis karaktär i filmen Sideways är förtjust i en viss typ av vindruva. Vilken?";
fragorLevel4[2] = "Vilken typ av öl görs det mest av i England?";
fragorLevel4[3] = "Vilken ingrediens, förutom skinka, har huvudrollen i en Quiche Lorraine?";
fragorLevel4[4] = "Vad kallas den inlagda ingefäran som brukar ätas i samband med sushi?";

fragorLevel5[0] = "Vad betyder det hindiska ordet masala?";
fragorLevel5[1] = "Vilken typ av dryck är geuze?";
fragorLevel5[2] = "Vad är det riktiga namnet för söt matlagningssake?";
fragorLevel5[3] = "Vilken grön druva ger viner som passar till het mat med asiatiska inslag?";
fragorLevel5[4] = "Vad kallas jalapñeo som har blivit rökt och torkad?";

svarFragorLevel1 = [];
svarFragorLevel2 = [];
svarFragorLevel3 = [];
svarFragorLevel4 = [];
svarFragorLevel5 = [];

svarFragorLevel1[0] = "Frankrike";
svarFragorLevel1[1] = "Dry Martini";
svarFragorLevel1[2] = "Ägg";
svarFragorLevel1[3] = "Saffran";
svarFragorLevel1[4] = "Salsa";

svarFragorLevel2[0] = "Pesto";
svarFragorLevel2[1] = "Margherita";
svarFragorLevel2[2] = "Korv";
svarFragorLevel2[3] = "Tofu";
svarFragorLevel2[4] = "Gotland";

svarFragorLevel3[0] = "Aubergine";
svarFragorLevel3[1] = "Haggis";
svarFragorLevel3[2] = "Potatis";
svarFragorLevel3[3] = "Get";
svarFragorLevel3[4] = "Gurkmeja";

svarFragorLevel4[0] = "Kyckling";
svarFragorLevel4[1] = "Pinot Noir";
svarFragorLevel4[2] = "Ale";
svarFragorLevel4[3] = "Ost";
svarFragorLevel4[4] = "Gari";

svarFragorLevel5[0] = "Kryddblandning";
svarFragorLevel5[1] = "Öl";
svarFragorLevel5[2] = "Mirin";
svarFragorLevel5[3] = "Riesling";
svarFragorLevel5[4] = "Chipotle";

textNodeFraga = document.createTextNode ("Fråga 1: Spel ej startat");
document.getElementById ("fraga").appendChild (textNodeFraga);

textNodeKlocka = document.createTextNode ("Tid kvar: Spel ej startat");
document.getElementById ("klocka").appendChild (textNodeKlocka);


function getQuestion(level) {
	
	const questions = Object.create(null);
	questions[0] = fragorLevel1;
	questions[1] = fragorLevel2;
	questions[2] = fragorLevel3;
	questions[3] = fragorLevel4;
	questions[4] = fragorLevel5;
	
	return questions[level-1];
}

function getAnswer(level) {
	
	const answers = Object.create(null);
	answers[0] = svarFragorLevel1;
	answers[1] = svarFragorLevel2;
	answers[2] = svarFragorLevel3;
	answers[3] = svarFragorLevel4;
	answers[4] = svarFragorLevel5;
	
	return answers[level-1];
}

//Starta "Matspelet". Initerar vissa styrvariabler och anropar visaFraga
function startaSpel()
{
	if (!spelStartat)
	{
		if (resultatFinns)
		{
			resultatFinns = false;
			document.getElementById ("resultat").removeChild (textNodeResultat);		
		}

		level = 0;
		spelStartat = true;
		visaFraga ();
	}
}

//Visa n�sta fr�ga i "Matspelet"
function visaFraga()
{
	fragenummer = Math.floor (Math.random() * ANTAL_FRAGOR_PER_LEVEL);
	
	level++;
	document.getElementById ("fraga").removeChild (textNodeFraga);
	svar.value = "";
	
	const question = getQuestion(level);
	
	textNodeFraga = document.createTextNode ("Fråga " + level + ": " + question[fragenummer]);
	document.getElementById ("fraga").appendChild (textNodeFraga);
	
	tidKvar = 10;
	setIntervalID = setInterval (tid, 1000);
}

//Styr spelets klocka. Visar en nedr�kning p� 10 sekunder per fr�ga 
function tid()
{
	document.getElementById ("klocka").removeChild (textNodeKlocka);
	textNodeKlocka = document.createTextNode ("Tid kvar: " + tidKvar);
	document.getElementById ("klocka").appendChild (textNodeKlocka);
	
	if (tidKvar === 0)
		gameOver ("Tiden tog slut. Försök igen...");
	
	tidKvar--;
}

//�terst�ller spelet och visar meddelande om varf�r man har misslyckats
function gameOver (meddelande)
{
	document.getElementById ("klocka").removeChild (textNodeKlocka);
	textNodeKlocka = document.createTextNode ("Tid kvar: Spel ej startat");
	document.getElementById ("klocka").appendChild (textNodeKlocka);
	
	document.getElementById ("fraga").removeChild (textNodeFraga);
	textNodeFraga = document.createTextNode ("Fråga 1: Spel ej startat");
	document.getElementById ("fraga").appendChild (textNodeFraga);
	
	clearInterval (setIntervalID);
	textNodeResultat = document.createTextNode (meddelande);
	document.getElementById ("resultat").appendChild (textNodeResultat);
	resultatFinns = true;
	spelStartat = false;
}

//Läs in användarens svar och jämför det med svaret till aktuell fråga.
function svara()
{
	if (spelStartat)
	{
		clearInterval(setIntervalID);
		var rattSvar = false;
		
		const answer = getAnswer(level);
		if (svar.value.toLowerCase () === answer[fragenummer].toLowerCase ()) {
			rattSvar = true;
			
			if (level === 5) {
				gameOver ("");
				window.location.assign ("pris.html");
				return;
			}
		}
		
		if (rattSvar)
			visaFraga ();
		else 
			gameOver ("Fel svar! Försök igen...");
	}
}
