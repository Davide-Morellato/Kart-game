// Prepariamo la griglia iniziale
const gridMatrix = [
  ['', '', '', '', '', 'grass', ''],
  ['', '', 'cones', '', '', '', 'water'],
  ['', '', '', '', 'rock', '', ''],
  ['', 'fence', '', '', '', '', ''],
  ['', '', '', '', '', 'water', ''],
  ['', '', '', 'cones', '', '', ''],
  ['', '', '', '', '', '', 'grass'],
  ['fence', '', '', '', '', '', ''],
  ['', '', '', '', '', 'rock', ''],
];



// Algoritmo di Fisher-Yates(*) 
for (let i = row.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [row[i], row[j]] = [row[j], row[i]];
}

// (*)
// L'Algoritmo di Fisher-Yates è un algoritmo per mescolare una sequenza finita da un elenco di elementi della sequenza,
// determinando continuamente l'elemento successivo nella sequenza mescolata, ed estraendo casualmente un elemento dall'elenco
// finché non ne rimane più alcuno.
//
// Creo un ciclo for che permetterà di fare un ciclo su ogni elemento nell'array, scambiando la sua posizione con un altro elemento nell'array stesso.
// Dichiaro la variabile 'i': let i = row.lenght - 1, questo perché parto dall'ultimo elemento dell'array
// Partendo dall'ultimo elemento, e procedendo a ritroso, si garantisce che gli elementi verso la fine dell'array abbiano
// le stesse probabilità di essere scambiati con qualsiasi altro elemento.
// Se si mescolasse l'array dall'inizio alla fine, gli elementi verso l'inizio dell'array avrebbero maggiori probabilità di essere scambiati più volte,
// dando luogo a una mescolanza distorta o irregolare.‌‌‌‌
// Dichiaro una nuova variabile 'j' come indice di riferimento per lo scambio, in modo randomico [const j = Math.floor(Math.random() * (i + 1))].
// Quindi assegno l'array row con indice i (row[i]) all'array row all'indice j (row[j]), e viceversa ([row[i], row[j]] = [row[j], row[i]]).
// Questo scambia i valori e li mescola per ogni elemento nell'array.
//
// N.B.
// La sintassi [row[i], row[j]] = [row[j], row[i]] è definita "assegnazione di destrutturazione dell'array" (array destructuring assignment).
// Consente lo scambio di valori tra due elementi dell'array senza la necessità di una variabile temporanea:
// row[i] e row[j] rappresentano due elementi nell'array che devono essere scambiati.
// [row[j], row[i]] crea un array temporaneo contenente i valori di row[j] e row[i], ma in ordine inverso.
// Assegnando [row[j], row[i]] a [row[i], row[j]], i valori di row[j] e row[i] vengono scambiati sul posto.