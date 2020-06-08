//matspelet.js
//Av Magnus Andersson 2011

/*
I "Matspelet" f�r anv�ndaren svara p� fem fr�gor om mat. 
Anv�ndaren f�r 10 sekunder per fr�ga att svara.
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

fragorLevel1[0] = "Fr�n vilket land kommer s�sen B�arnaise?";
fragorLevel1[1] = "James Bond dricker ofta en drink gjord p� gin och vermouth. Vad heter drinken?";
fragorLevel1[2] = "Vad �r huvudingrediensen i en omelett?";
fragorLevel1[3] = "Vilken �r v�rldens dyraste krydda?";
fragorLevel1[4] = "Vad kallas den tomatbaserade gr�nsakss�sen som ofta �ts med tacos och nachos?";

fragorLevel2[0] = "Vad heter en k�nd italiensk s�s som inneh�ller basilika, vitl�k, olivolja, parmesan och pinjen�tter?";
fragorLevel2[1] = "Vad heter pizzan som bara inneh�ller tomats�s och ost (och ibland �ven basilika)?";
fragorLevel2[2] = "Vilken typ av mat �r en salsiccia?";
fragorLevel2[3] = "Vad kallas den asiatiska sojab�nsmassan som �r proteinrik och n�stan smakl�s?";
fragorLevel2[4] = "Fr�n vilken del av Sverige h�rstammar saffranspannkaka?";

fragorLevel3[0] = "Vilken gr�nsak �r viktig i en moussaka?";
fragorLevel3[1] = "Vad heter r�tten fr�n Skottland som g�rs med lever, in�lvor, l�k och havregryn?";
fragorLevel3[2] = "Vilken �r huvudingrediensen i kroppkakor?";
fragorLevel3[3] = "Fr�n vilket djurs mj�lk g�r man ch�vreost?";
fragorLevel3[4] = "Vilken krydda ger currypulver dess gula f�rg?";

fragorLevel4[0] = "Matkedjan KFC �r specialiserade p� snabbmat av en viss typ av djur. Vilket?";
fragorLevel4[1] = "Paul Giamattis karakt�r i filmen Sideways �r f�rtjust i en viss typ av vindruva. Vilken?";
fragorLevel4[2] = "Vilken typ av �l g�rs det mest av i England?";
fragorLevel4[3] = "Vilken ingrediens, f�rutom skinka, har huvudrollen i en Quiche Lorraine?";
fragorLevel4[4] = "Vad kallas den inlagda ingef�ran som brukar �tas i samband med sushi?";

fragorLevel5[0] = "Vad betyder det hindiska ordet masala?";
fragorLevel5[1] = "Vilken typ av dryck �r geuze?";
fragorLevel5[2] = "Vad �r det riktiga namnet f�r s�t matlagningssake?";
fragorLevel5[3] = "Vilken gr�n druva ger viner som passar till het mat med asiatiska inslag?";
fragorLevel5[4] = "Vad kallas jalape�o som har blivit r�kt och torkad?";

svarFragorLevel1 = [];
svarFragorLevel2 = [];
svarFragorLevel3 = [];
svarFragorLevel4 = [];
svarFragorLevel5 = [];

svarFragorLevel1[0] = "Frankrike";
svarFragorLevel1[1] = "Dry Martini";
svarFragorLevel1[2] = "�gg";
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
svarFragorLevel5[1] = "�l";
svarFragorLevel5[2] = "Mirin";
svarFragorLevel5[3] = "Riesling";
svarFragorLevel5[4] = "Chipotle";

textNodeFraga = document.createTextNode ("Fr�ga 1: Spel ej startat");
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
	
	textNodeFraga = document.createTextNode ("Fr�ga " + level + ": " + question[fragenummer]);
	document.getElementById ("fraga").appendChild (textNodeFraga);
	
	tidKvar = 10;
	setIntervalID = setInterval (tid, 1000);
}

//Styr spelets klocka. Visar en nedr�kning p� 10 sekunder per fr�ga 
function tid ()
{
	document.getElementById ("klocka").removeChild (textNodeKlocka);
	textNodeKlocka = document.createTextNode ("Tid kvar: " + tidKvar);
	document.getElementById ("klocka").appendChild (textNodeKlocka);
	
	if (tidKvar == 0)
		gameOver ("Tiden tog slut. F�rs�k igen...");
	
	tidKvar--;
}

//�terst�ller spelet och visar meddelande om varf�r man har misslyckats
function gameOver (meddelande)
{
	document.getElementById ("klocka").removeChild (textNodeKlocka);
	textNodeKlocka = document.createTextNode ("Tid kvar: Spel ej startat");
	document.getElementById ("klocka").appendChild (textNodeKlocka);
	
	document.getElementById ("fraga").removeChild (textNodeFraga);
	textNodeFraga = document.createTextNode ("Fr�ga 1: Spel ej startat");
	document.getElementById ("fraga").appendChild (textNodeFraga);
	
	clearInterval (setIntervalID);
	textNodeResultat = document.createTextNode (meddelande);
	document.getElementById ("resultat").appendChild (textNodeResultat);
	resultatFinns = true;
	spelStartat = false;
}

//L�s in anv�ndarens svar och j�mf�r det med svaret till aktuell fr�ga.
function svara ()
{
	if (spelStartat)
	{
		clearInterval (setIntervalID);
		var rattSvar = false;
		
		if (level == 1)
		{
			if (svar.value.toLowerCase () == svarFragorLevel1[fragenummer].toLowerCase ())
				rattSvar = true;
		}
		else if (level == 2)
		{
			if (svar.value.toLowerCase () == svarFragorLevel2[fragenummer].toLowerCase ())
				rattSvar = true;	
		}
		else if (level == 3)
		{
			if (svar.value.toLowerCase () == svarFragorLevel3[fragenummer].toLowerCase ())
				rattSvar = true;	
		}
		else if (level == 4)
		{
			if (svar.value.toLowerCase () == svarFragorLevel4[fragenummer].toLowerCase ())
				rattSvar = true;				
		}
		else if (level == 5)
		{
			if (svar.value.toLowerCase () == svarFragorLevel5[fragenummer].toLowerCase ())
			{
				gameOver ("");
				window.location.assign ("pris.html");
				return;
			}				
		}
		
		if (rattSvar)
			visaFraga ();
		else 
			gameOver ("Fel svar! F�rs�k igen...");
	}
}
