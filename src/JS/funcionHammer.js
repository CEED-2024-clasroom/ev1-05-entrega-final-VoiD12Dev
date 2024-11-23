import { obtenerLetrasPosicion, letrasInsertadas } from "./funcionRevela";

const letrasUsadas = new Set();
let letrasPosicion = [];

function hiddenToggler() {
  const divBlack = document.querySelector("#black");
  divBlack.classList.toggle("hidden");
}

function devuelveEstado(e) {
  const focus = e.target;
  if (focus.classList.contains("letter")) {
    const divLetras = document.querySelectorAll(".letter");
    let coordsElegidas = focus.style.gridArea.split("/");
    const coordX = coordsElegidas[0].trim();
    const coordY = coordsElegidas[1].trim();
    const coordKey = `${coordX},${coordY}`;

    if (letrasUsadas.has(coordKey)) return;

    letrasPosicion.forEach((divLetra) => {
      if (divLetra.coordKey === coordKey) {
        focus.textContent = divLetra.letra;
        letrasUsadas.add(divLetra.coordKey);
      }
    });

    divLetras.forEach((letra) => {
      letra.classList.remove("on-top");
      //   letra.removeEventListener("click", devuelveEstado);
    });
    hiddenToggler();
    document.removeEventListener("mousedown", devuelveEstado);
  } else {
    const divLetras = document.querySelectorAll(".letter"); //ESTO SE REPITE, GLOBALES?¿
    divLetras.forEach((letra) => {
      letra.classList.remove("on-top");
      //   letra.removeEventListener("click", devuelveEstado);
    });
    hiddenToggler();
    document.removeEventListener("mousedown", devuelveEstado);
  }
}

function letrasOnTop() {
  const divLetras = document.querySelectorAll(".letter");
  divLetras.forEach((letra) => {
    letra.classList.add("on-top");
    // letra.addEventListener("click", devuelveEstado);
  });
  document.addEventListener("mousedown", devuelveEstado);
}

function hammer(game, coordIniciales) {
  letrasInsertadas(letrasUsadas);
  const [xIni, yIni] = coordIniciales;
  hiddenToggler();
  letrasOnTop();
  letrasPosicion = obtenerLetrasPosicion(game, xIni, yIni, letrasUsadas);
}

export { hammer };
