//
// # FASE 1: PREPARAZIONE DEGLI ELEMENTI BASE DELLA GRIGLIA DI GIOCO
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

  renderingFunction();
  