//
// FASE 1: PREPARAZIONE DEGLI ELEMENTI BASE DELLA GRIGLIA DI GIOCO
//

//
//preparo la griglia iniziale
//un array contenente altri array (=rows) che conterranno ciascuno degli elementi(=cells)
//che popoleranno la griglia ['' = caselle vuote]
const gridMatrix = [
    ['rock', '', '', '', '', 'grass', ''],
    ['', '', 'cones', '', '', '', 'water'],
    ['', '', '', '', 'rock', '', ''],
    ['', 'fence', '', '', '', '', ''],
    ['', '', 'grass', '', '', 'water', ''],
    ['', '', '', 'cones', '', '', ''],
    ['', 'water', '', '', '', '', 'grass'],
    ['fence', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
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
    y: 8,
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
    //prendo i valori delle coordinate x e y dell'oggetto kartPosition e li assegno all'array (gridMatrix),
    //assegnando la classe '.kart' per visualizzarlo
    gridMatrix[kartPosition.y][kartPosition.x] = 'kart';
}
  
//
//Raggruppo le funzioni di preparazione
function renderingFunction() {
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
document.addEventListener('keyup', function (event) {
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
    renderingFunction();
}

//
//invoco la funzione renderingFunction()
renderingFunction();

