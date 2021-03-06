//Hier maak ik een let aan. Die is 0, omdat de statements (de verklaringen) vanaf de eerste vraag moeten beginnen.
let statementOrder = 0;
//hier maak ik voor elke document element een const aan zodat ik die niet telkens hoef op te vragen bij elke methode
const startButton = document.getElementById('startButton');
const title = document.getElementById("opinionsTitle");
const description = document.getElementById("statementDescription");
const answerSection = document.getElementsByClassName('answerSection');
const checkbox = document.getElementById('importantCheckbox');
const home = document.getElementById("home");
const statements = document.getElementById("statements");
const partyPage = document.getElementById('partyPage');
const partyOrder = document.getElementById('partyOrder');
const resultSection = document.getElementById('resultSection');
const firstPlace = document.getElementById('1st');
const secondPlace = document.getElementById('2nd');
const thirdPlace = document.getElementById('3rd');
const seatedParties = document.getElementById('seated');
const allParties = document.getElementById('all');
const biggerParties = document.getElementById('bigger');
const resultButton = document.getElementById('resultPage');


//Hier maak ik een const aan voor de subject en maak ik een functie en geef ik subject erin mee
const subjectInit = function (subject) {
    subject.myAnswer = '';
    subject.importantCheckbox = false;
};

//Hier loop ik de subjects door de subjectInit heen
subjects.forEach(subjectInit);

//Hier maak ik een const aan en maak ik een functie en geef ik oneParty eraan mee. De punten beginnen bij 0, omdat anders heeft die er 1 teveel
const partiesInit = function (oneParty) {
    oneParty.points = 0;
};

//Hier loop ik de parties door de partiesInit heen
parties.forEach(partiesInit);

//Hier maak ik een let aan met een lege arry, aangezien dit ingevuld moet worden doormiddel van welke partij de hoogste punten heeft
let topParties = [];
const bigParty = 10;

// Als je op de knop (start) klikt, dan word de pagina met vragen geladen en word de home pagina verbergt
function startFunction() {
    home.style.display = "none";
    statements.style.display = "block";
    //Zet de eerste vraag klaar en begint bij 0 zodat hij de aller eerste vraag pakt.
    // Hier pak ik de titel en de beschrijving
    title.innerHTML = subjects[0].title;
    description.innerHTML = subjects[0].statement;
}

//Hier geef aan dat de startbutton een onclick moet toevoegen aan de startfunctie
startButton.addEventListener("click", startFunction)

//Hier loop ik door de answersection heen en geef ik elke button een onclick mee, zodat als je erop klikt je naar de volgende vraag gaat
for (const answerButton of answerSection) {
    answerButton.onclick = nextQuestion;
}

/**
 * @param mouseEvent is het event wat je krijgt als je clicked op je keuze button, het id hiervan is pas pro, none of contra
 */
function nextQuestion(mouseEvent) {
    //Als eerst roep ik hier de functie removeBorder op en geef ik de subjects mee en daaruit neem ik de statementOrder mee en pak ik
    removeBorder(subjects[statementOrder].myAnswer);
    subjects[statementOrder].myAnswer = mouseEvent.target.id;
    subjects[statementOrder].importantCheckbox = checkbox.checked;
    //Volgende vraag functie word uitgevoerd en word mousevent meegegeven
    nextStatement();
}

/**
 * De volgende stelling word geladen.
 */
function nextStatement() {
    //Als statedmentorder kleiner is dan de lengte van subjects doet die -1 en telt die vanaf dan weer verder.
    // Zonder -1 kom je op 1 getal te hoog uit en heb je dus uiteindelijk een lege vraag.
    if (statementOrder < subjects.length - 1) {
        checkbox.checked = false;
        statementOrder++;
        //Nieuwe stelling word geladen
        title.innerHTML = subjects[statementOrder].title;
        description.innerHTML = subjects[statementOrder].statement;
        //Hier zorgt die ervoor dat hij niet verder mag dan 0, zodat het niet -1 word. Want anders krijg je een error
        Math.max(0, statementOrder - 1);
        showAnswer(subjects[statementOrder].myAnswer);
        //Bij de laatste vraag telt die alles bij mekaar op
    } else (calculatePoints());
}

/**
 * Als de gebruiker op de pijl klikt dan word de vorige vraag geladen. Als die bij de laatste vraag is word de homepage geladen
 */
function previousQuestion() {
    //Hij gaat door tot de laatste (eerste) vraag en als die bij 0 is gaat die terug naar de homepagina
    if (statementOrder !== 0) {
        //Hier roep ik de functie removeColor op en hierdoor word de kleur van het antwoord verwijderd
        removeBorder(subjects[statementOrder].myAnswer);
        statementOrder--;
        //Nieuwe stelling word geladen
        title.innerHTML = subjects[statementOrder].title;
        description.innerHTML = subjects[statementOrder].statement;
        //Hier roep ik showAnswer op en hierdoor laat die zien welk antwoord je hebt gegeven bij de vorige vraag
        showAnswer(subjects[statementOrder].myAnswer);
        //Als je weer terug bent bij de eerste vraag (0) dan gaat die weer terug naar de home pagina
    } else {
        statements.style.display = "none";
        home.style.display = "block";
    }
}

//Hier maak ik een functie aan die dient voor het verwijderen van de kleur van de vorige vraag
function removeBorder(previousAnswer) {
    if (previousAnswer) {
        document.getElementById(previousAnswer).classList.remove('selectedButton');
    }
}

/**
 * Als de gebruiker terug gaat naar de vorige vraag, word het antwoord wat je daar in hebt gevuld getoond
 * @param answer De keuze die je hebt gemaakt (pro(Eens), none(Geen van beide), contra(Oneens))
 */
function showAnswer(answer) {
    checkbox.checked = subjects[statementOrder].importantCheckbox;
    if (answer) {
        document.getElementById(answer).classList.add('selectedButton');
    }
}

/**
 * Deze functie zorgt er voor dat alle punten bij elkaar worden opgeteld. En dat de partijen die het beste bij jou passen worden uitgerekend
 */
function calculatePoints() {
    //Hier loopt de code door de subjects array
    for (let i = 0; i < subjects.length; i++) {

        //Hier loopt die door alle partijen van de subject heen tot die het einde heeft bereikt
        for (let b = 0; b < subjects[i].parties.length; b++) {

            // Als het antwoord van subjects gelijk is aan de positie van alle partijen, dan zoekt die naar de naam van de partij
            if (subjects[i].myAnswer === subjects[i].parties[b].position) {
                //Hij zoekt hier naar de partij die overeenkomt met de partij naam, door te zoeken naar alle partijen in de subjects
                let findParty = parties.find(oneParty => oneParty.name === subjects[i].parties[b].name);

                //Als important wordt aangeklikt hij 2 punten moet geven en als dat niet gebeurd dan is het maar 1 punt
                if (subjects[i].importantCheckbox === true) {
                    findParty.points += 2;
                } else {
                    findParty.points += 1;
                }
                console.log(findParty);
            }
        }
    }
    displayPartyPage()
}

function displayPartyPage() {
    //Nieuwe pagina word geladen
    home.style.display = "none";
    statements.style.display = "none";
    partyPage.style.display = "block";

    //De partijen worden op volgorde gezet met de meeste punten
    parties.sort((partyA, partyB) => partyB.points - partyA.points);
    console.log(parties);

    //Hier loopt die door de partijen heen en maakt die een element c aan
    for (let c = 0; c < parties.length; c++) {
        let c = document.createElement("c");

        partyOrder.appendChild(c);
    }
}

//Hier geef aan dat de startbutton een onclick moet toevoegen aan de startfunctie
resultButton.addEventListener("click", showResultPage)

/**
 * Filtert alle zittende partijen, waardoor alleen die getoond worden
 */
function getSeatedParties() {
    checkSelectParty('seated')
    topParties = [];
    topParties = function () {
    };

    topParties = parties.filter(function (party) {
        return party.secular === true;
    });
}

//Hier geef aan dat de startbutton een onclick moet toevoegen aan de startfunctie
seatedParties.addEventListener("click", getSeatedParties)

/**
 * Door deze functie worden alle partijen getoond
 */
function getAllParties() {
    checkSelectParty('all')
    topParties = [];
    topParties = parties;
}

//Hier geef aan dat de allParties een onclick moet toevoegen aan de getAllParties functie
allParties.addEventListener("click", getAllParties)

/**
 * De kleur van de knop word veranderd al klik je op een van de knoppen
 * @param partyID is de value van de knop
 */
function checkSelectParty(partyID) {
    for (let f = 0; f < document.getElementsByClassName('filterParty').length; f++) {
        document.getElementsByClassName('filterParty')[f].style.background = 'white';
    }
}

/**
 * Filtert alle grote partijen, waardoor alleen die getoond worden
 */
function getBiggerParties() {
    checkSelectParty('bigsger')
    topParties = [];
    subjects.forEach(subjectInit);
    //Hij filter hier de grote partijen
    topParties = parties.filter(function (party) {
        return party.size >= bigParty;
    })

    console.log(topParties)
}

//Hier geef aan dat de startbutton een onclick moet toevoegen aan de startfunctie
biggerParties.addEventListener("click", getBiggerParties)

/**
 * De Resultaat pagina word geladen
 */
function showResultPage() {
    //Hier word een alert gegeven als geen van de knoppen is ingedrukt
    if (topParties.length === 0) {
        return alert("Klik op een van de onderstaande knoppen s.v.p.");
    }
    partyPage.style.display = "none";
    resultSection.style.display = "block";

    //De top 3 partijen worden laten zien en voegt de waarde toe aan de array
    firstPlace.innerHTML += topParties[0].name;
    secondPlace.innerHTML += topParties[1].name;
    thirdPlace.innerHTML += topParties[2].name;
}
