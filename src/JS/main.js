import "../styles/styles.css";
import "../lib/fontawesome";
import { Game } from "../lib/Game";
import { ponerCasillas, posicionInicial } from "./crearCasilla";
import { colocarLetras } from "./letrasWheel";
import { letraSeleccion } from "./pintaLineas";
import { presionaLetra, getPalabra } from "./recogeLetras";
import { pintaLetras } from "./pintaLetras";
import { shuffle } from "./funcionShuffle";
import { hint } from "./funcionRevela";
import { hammer } from "./funcionHammer";

const botonShuffle = document.querySelector(".tool .fa-shuffle").parentElement;
const botonHint = document.querySelector(".tool .fa-lightbulb").parentElement;
const botonHint5 = document.querySelector(".tool .fa-expand").parentElement;
const botonHammer = document.querySelector(".tool .fa-hammer").parentElement;

function seleccionAleatorio(min, max) {
  return Math.random() * (max - min) + min;
}

const juegoAleatorio = Math.floor(seleccionAleatorio(0, 6));
const game = new Game(juegoAleatorio); //Obtenemos las palabras del juego
const wordPositions = game.wordPositions; //Array de objetos de las palabras
const gameLetters = game.letters; //Letras del crucigrama
const coordIniciales = posicionInicial(wordPositions); // coordenadas iniciales

ponerCasillas(wordPositions);
colocarLetras(gameLetters);

/**
 * Ayudas
 */
botonShuffle.addEventListener("click", shuffle);

botonHint.addEventListener("click", () => {
  hint(game, coordIniciales);
});

botonHint5.addEventListener("click", () => {
  for (let i = 0; i < 5; i++) {
    hint(game, coordIniciales);
  }
});

botonHammer.addEventListener("click", () => {
  hammer(game, coordIniciales);
});

/**
 * Se comprueba si la palabra existe y la pinta
 */
const divRueda = document.querySelector("#wheel-container");
divRueda.addEventListener("mouseup", () => {
  const palabra = getPalabra();
  const posicion = game.findWord(palabra);
  pintaLetras(posicion, palabra, coordIniciales);
});

/**
 * Aqui se crea la linea y se añade 'selected' al div de las letras
 * Tambien recoge las letras en un array que devuleve en la funcion get
 */

const divLetras = document.querySelectorAll(".wheel-letter");
divLetras.forEach((div) => {
  div.addEventListener("mousedown", presionaLetra);
  div.addEventListener("mousedown", letraSeleccion);
});
