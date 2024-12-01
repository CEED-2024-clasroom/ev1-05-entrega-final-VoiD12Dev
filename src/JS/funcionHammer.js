import { obtenerLetrasPosicion, letrasInsertadas } from "./funcionRevela";

const letrasUsadas = new Set();
let letrasPosicion = [];

function hiddenToggler() {
  const divBlack = document.querySelector("#black");
  divBlack.classList.toggle("hidden");
}

function devuelveEstado(e) {
  const focus = e.target;
  const divLetras = document.querySelectorAll(".letter");
  if (focus.classList.contains("letter")) {
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
    });
    hiddenToggler();
    document.removeEventListener("mousedown", devuelveEstado);
  } else {
    divLetras.forEach((letra) => {
      letra.classList.remove("on-top");
    });
    hiddenToggler();
    document.removeEventListener("mousedown", devuelveEstado);
  }
}

function letrasOnTop() {
  const divLetras = document.querySelectorAll(".letter");
  divLetras.forEach((letra) => {
    letra.classList.add("on-top");
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
