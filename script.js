//
// FASE 1: PREPARAZIONE DEGLI ELEMENTI BASE DELLA GRIGLIA DI GIOCO
//

//
//preparo la griglia iniziale
//un array contenente altri array (=rows) che conterranno ciascuno degli elementi(=cells)
//che popoleranno la griglia ['' = caselle vuote]
const gridMatrix = [
    ['', '', '', '', '', 'grass', ''],
    ['', '', 'cones', '', '', '', 'water'],
    ['', '', '', '', 'rock', '', ''],
    ['', 'fence', '', '', '', '', ''],
    ['', '', '', '', '', 'water', ''],
    ['', '', 'cones', '', '', '', ''],
    ['', '', '', '', '', '', 'grass'],
    ['fence', '', '', '', '', '', ''],
    ['', '', '', '', '', 'rock', ''],
];
  
//console.table(gridMatrix) <-Consente di vedere in console come è strutturata la griglia

//
//recupero l'elemento con classe .grid dal DOM
//perchè successivamente devo costruire la griglia al suo interno
//e riempirla usando l'array gridMatrix
const grid = document.querySelector('.grid');


//
//La posizione del Kart deve essere dinamica,
//quindi dichiaro una variabile a cui assegno un oggetto con coordinate x e y per la posizione del Kart nella griglia
const kartPosition = {
    y: 7,
    x: 3,
};
  
//
//funzione per mostrare la griglia con al suo interno tutti gli elementi dell'array gridMatrix
function renderGrid() {

    //prima di riempirire la griglia, svuotala (così ad ogni evento di movimento non viene duplicata)
    grid.innerHTML = '';
    
    
    //recupero ogni singola riga dell'array tramite un ciclo forEach
    //in cui dichiaro come parametro della funzione la singola riga (singleRow)
    gridMatrix.forEach(function (singleRow) {
      //console.log(singleRow)
  
      //per ogni singola riga recupero il contenuto (cellContent) del singolo elemento (sigleCell)
      singleRow.forEach(function (cellContent) {
        //per il singolo elemento creo un contenitore 'div' da inserire nella griglia [document.createElement()]
        const singleCell = document.createElement('div');
  
        //assegno all'elemento appena creato la classe '.cell' (className)
        //classe precedentemente stilizzata e assegnata nel file #style.css
        singleCell.className = 'cell';
  
        //siccome le righe di gridMatrix non contengono solo elementi vuoti,
        //allora eseguo un controllo:
        //SE il singolo elemento dell'array NON E' VUOTO,
        //ALLORA aggiungi quella classe alla cella
        //(classList -> restituisce i nomi delle classi dal file style.css di un elemento)
        if (cellContent !== '') {
          singleCell.classList.add(cellContent);
        }
  
        //inserisco il singolo elemento nella griglia 'grid' (appendChild)
        grid.appendChild(singleCell);
      });
    });
}
  
//
//dichiaro una funzione per posizionare il kart
function placeKart() {

    //[FASE 5]: creo una variabile a cui assegno le coordinate x e y
    const contentRow = gridMatrix[kartPosition.y][kartPosition.x];

    //[FASE 5]: controllo il contenuto della cella
    //SE il contenuto della cella è vuoto
        //ALLORA interrompi il flusso di gioco
    // if(contentRow !== ''){
        // alert ('GAME OVER')
        //invoco la funzione di gameOver()
        // gameOver();
    // }

    //[FASE 6]: controllo il contenuto della cella
    //SE nella cella è presente 'coins'
        //ALLORA assegna i punti bonus
    //ALTRIMENTI SE il contenuto della cella è vuoto
        //interrompi il flusso di gioco
    if(contentRow === 'coin'){
        getBonus();

    }else if(contentRow !== ''){
        gameOver();
    }

    //prendo i valori delle coordinate x e y dell'oggetto kartPosition e li assegno all'array (gridMatrix),
    //assegnando la classe '.kart' per visualizzarlo
    gridMatrix[kartPosition.y][kartPosition.x] = 'kart';
}
  
//
//Raggruppo le funzioni di preparazione
function renderingFunctions() {
    //invoco la funzione placeKart()
    placeKart();

    //invoco la funzione renderGrid()
    renderGrid();
}


//
// FASE 2: MOVIMENTO DEL KART
//

//
//recupero i singoli bottoni dal DOM (document.querySelector)
const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button');

//
//aggiungo ai bottoni un evento di ascolto al 'click'
//(addEventListner -> metodo che accetta due parametri: il tipo di evento; una funzione con le operazioni da eseguire per quell'evento)
leftButton.addEventListener('click', function () {
    // console.log('left');

    //invoco la funzione moveKart() e gli assegno il parametro 'left'
    moveKart('left');
});

rightButton.addEventListener('click', function () {
    // console.log('right');

    //invoco la funzione moveKart() e gli assegno il parametro 'right'
    moveKart('right');
});

//
//aggiungo un evento alla pressione di un tasto 'keyup',
//assegnando alla funzione un parametro per quell'evento (event)
document.addEventListener('keyup', function(event) {
    // console.log(event.key); <- 'evento.key' consente di leggere in console il tasto premuto: FRECCIA DESTRA = ArrowRight; FRECCIA SINISTRA = ArrowLeft

    //dichiaro il metodo switch()
    //che permette di analizzare il valore di un evento e reagire in base alle direttive imposte
    switch (event.key) {
        //nel caso in cui venga premuta la freccia sinistra:
        //spostati a sinitra;
        //e interrompi il ciclo di ricerca (break);
        case 'ArrowLeft':
        //richiamo la funzione movekart() per indicare in quale posizione deve spostarsi il kart
        moveKart('left');
        // console.log('sn')
        break;

        //nel caso in cui venga premuta la freccia destra:
        //spostati a destra;
        //e interrompi il ciclo di ricerca;
        case 'ArrowRight':
        //richiamo la funzione movekart() per indicare in quale posizione deve spostarsi il kart
        moveKart('right');
        // console.log('dx')
        break;

        //per tutti gli altri casi, ritorna al tuo stato iniziale e non eseguire nulla (default: return)
        default: return;
    }
});


//
//dichiaro una funzione che mi permette di indicare la direzione di movimento del kart
function moveKart(directionKart) {

    //prima di posizionare il kart, rimuovilo dalla cella precedente
    //assegnando alle coordinate x e y stringa vuota
    gridMatrix[kartPosition.y][kartPosition.x] = '';


    //dichiaro il metodo switch() a cui assegno il parametro di riferimento
    //aggiornando le coordinate del kart in base all'evento (click o keyup)
    switch (directionKart) {
        //nel caso in cui si muova a sinistra:
        //per evitare che il kart esca dalla griglia, eseguo un controllo:
            //SE la coordinata x è MAGGIORE di 0
                //decrementa la coordinata x
        //e interrompi il ciclo di ricerca (break);
        case 'left':
        if(kartPosition.x > 0){
            kartPosition.x--;
        }
        break;

        //nel caso in cui si muova a destra:
        //per evitare che il kart esca dalla griglia, eseguo un controllo:
            //SE la coordinata x è MINORE di 6 (numero massimo di celle lungo l'asse x)
                //incrementa la coordinata x
        //e interrompi il ciclo di ricerca (break);
        case 'right':
        if(kartPosition.x < 6){
            kartPosition.x++;
        }
        break;
    }

    //invoco la funzione di preparazione della griglia,
    //in questo modo verrà aggiornata alla nuova posizione del Kart
    renderingFunctions();
}


//
// FASE 3: MOVIMENTO DEGLI OSTACOLI
//

//
//dichiaro una funzione che mi permetta di scorrere gli ostacoli
function scrollObstacles(){

    //rimuovo temporaneamente il kart dalla griglia
    gridMatrix[kartPosition.y][kartPosition.x] = '';

    //
    //[FASE 6]: creo una nuova variabile a cui associo la funzione di controllo
    const coinInGame = searchCoin();

    //creo una variabile per rimuovere l'ultima riga dell'array grazie al metodo pop()
    let lastRow = gridMatrix.pop();

    //
    //[FASE 6]: inserisco la moneta nella prima riga della schermata
    // lastRow = placeCoin(lastRow);
    //
    //[FASE 6]: controllo la presenza di monete
    //SE non ci sono monete
        //ALLORA inserisci la moneta
    if(!coinInGame){
        lastRow = placeCoin(lastRow);
    }

    //mescolo gli elementi delle righe degli array richiamando la funzione randomizeElements()
    //assegnandola alla variabile lastRow
    lastRow = randomizeElements(lastRow); //lastRow deve modificarsi in base all'algoritmo in randomizeElements()

    //riporto la riga modificata in cima all'array, con il metodo unshift()
    gridMatrix.unshift(lastRow)

    renderingFunctions();
}

//
//dichiaro una funzione che mescoli gli ostacoli, sfruttando l'Algoritmo di Fisher-Yates
function randomizeElements(row){
    for (let i = row.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [row[i], row[j]] = [row[j], row[i]];
    }

    return row;
}


//
// FASE 4: INCREMENTO PUNTEGGIO E VELOCITA'
//

//
//creo due variabili, una per il punteggio (score) ed una per la velocità (speed), che dovranno cambiare in base al tempo
let score = 0;

let speed = 500;

//
//recupero l'elemento per il punteggio dal DOM
const scoreCounter = document.querySelector('.score-counter');

//
//dichiaro una funzione che incrementi il punteggio stampato in pagina
function scoreIncrement(){

    //aumento il punteggio di 1, prendendo il testo inserito nel tag HTML, così da modificarsi al cambiare del tempo
    scoreCounter.innerText = ++score;

}

//
//dichiaro una funzione che aumenti la velocità in base al tempo (inversamente proporzionali, al diminuire del tempo aumenta la velocità di scorrimento degli ostacoli)
function incrementSpeed(){

    //controllo l'incremento della velocità:
    //SE la velocità è > 150
        //ALLORA interrompi il flusso di gioco, aumenta la velocità & crea un nuovo flusso di gioco
    if(speed > 150){

        //interrompo il flusso di gioco iniziale, grazie a clearInterval(), richiamando la variabile che racchiude setInterval()
        clearInterval(gameLoop);
    
        //aumento la velocità, dimuendo il tempo
        speed -= 100;
    
        //creo un nuovo flusso di gioco, precedentemente interrotto, con la nuova velocità
        gameLoop = setInterval(gameFlow, speed);
    }
}

//
//dichiaro una funzione che raggruppi le operazioni cicliche
function gameFlow(){

    //importo l'incremento del punteggio
    scoreIncrement();

    //controllo che la velocità aumenti anche in base al punteggio
    //SE il punteggio dà resto 15 (operatore MODULO %)
        //ALLORA incrementa la velocità
    if(score % 15 === 0){

        //importo l'incremento della velocità
        incrementSpeed();
    }

    //importo il movimento degli ostacoli
    scrollObstacles();
}


//
// FASE 5: IMPATTO CON GLI OSTACOLI E GAME OVER
//

//1. IN placeKart() recupero il contenuto della cella e lo controllo

//
//recupero l'elemento end-game-screen dal DOM per fare in modo che compaia quando vengono impattati gli ostacoli
const endGame = document.querySelector('.end-game-screen');

//
//recupero l'elemento final-score dal DOM per mostrare nella pagina di Game Over il punteggio finale
const finalScore = document.querySelector('.final-score');

//
//dichiaro una funzione che interrompa il flusso di gioco e mostri la schermata Game Over
function gameOver(){

    //interrompo il flusso di gioco
    clearInterval(gameLoop);

    //stampo in pagina il punteggio finale richiamando la variabile dinamica score
    finalScore.innerText = score;

    //mostro la schermata di Game over, rimuovendo la classe hidden
    endGame.classList.remove('hidden')

    //imposto il bottone playAgain come preselezionato, così da reagire a qualsiasi evento da tastiera
    playAgain.focus();
}

//
//recupero il bottone "gioca ancora" per ricaricare la pagina al click e riavviare il gioco
const playAgain = document.querySelector('.play-again');

//
//associo un evento di ascolto al click al bottone, così da far ripartire il gioco
playAgain.addEventListener( 'click', function(){

    location.reload() //<- ricarica la pagina e fa ripartire il gioco
})


//
// FASE 6: INSERIMENTO MONETE E ASSEGNAZIONE BONUS
//

//
//dichiaro una funzione per inserire dinamicamente la monetina nella riga
function placeCoin(row){

    //individuo l'indice vuoto della prima riga, mediante indexOf()
    const emptyIndex = row.indexOf('');

    //assegno all'indice vuoto la moneta
    row[emptyIndex] = 'coin';

    //restituisco la riga aggiornata con la moneta
    return row
}

//
//2. INSERISCO LA MONETA NELLA RIGA IN scollObstacles()

//
//dichiaro una funzione che controlli la presenza di un'eventuale moneta nella grigla di gioco
function searchCoin(){

    //creo un flag di partenza (booleano: true o false), assumendo che non ci sia dall'inzio
    let coinFound = false;

    //recupero le righe della griglia di gioco e, per ognuna di essa, controllo se c'è una moneta
    gridMatrix.forEach(function(row){

        //controllo la presenza di una moneta
        //SE la riga include la moneta
            //ALLORA il flag deve diventare TRUE
        if(row.includes('coin')){
            coinFound = true;
        }
    })
    
    //restituisco il valore di coinFound (true || false) -> FUORI DAL forEach per evitare che ne metta continuamente
    return coinFound;
}

//
//3. CONTROLLO LA PRESENZA DELLA MONETA IN scrollObstacles()

//
//dichiaro una funzione per aumentare il punteggio quando il kart impatta la moneta (coin)
function getBonus(){

    //incremento il punteggio di 30 pt
    score += 30;

    //inserisco il punteggio aggiornato in pagina, attraverso il contatore scoreCounter
    scoreCounter.innerText = score;

    //aggiungo la classe "bonus" al contatore
    scoreCounter.classList.add('bonus');

    //rimuovo la classe "bonus" al contatore, grazie a setTimeout(), così da potersi mostrare ogni volta che la monetina viene colpita
    //setTimeout() accetta due parametri: il primo è una funzione, il secondo è il tempo entro cui deve svolgerla
    setTimeout(function(){  
        scoreCounter.classList.remove('bonus');
    }, 300);
}

//
//4. IN placeKart() cambio il controllo precedentemente impostato, per fare in modo che all'impatto con la moneta il gioco non termini

//
//invoco la funzione renderingFunction()
// renderingFunctions();
//
//dichiaro la funzione setInterval() in cui dichiaro la funzione che deve eseguire e l'intervallo di tempo con cui eseguirla
// setInterval(scrollObstacles, 500);
//
//associo la funzione setInterval() ad una variabile, così da poter essere richiamata in incrementSpeed().
//sostituisco scrollObstacoles come primo parametro con gameFlow, perchè racchiude il flusso del gioco, 
//e ho associato il valore del tempo alla variabile speed, così da diventare dinamica al cambiare del valore
let gameLoop = setInterval(gameFlow, speed); 


