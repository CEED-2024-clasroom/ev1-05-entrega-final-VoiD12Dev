const letrasSeleccionadas = [];

function enterLetra(e) {
  const target = e.target;
  if (!target.classList.contains("selected")) {
    letrasSeleccionadas.push(target.textContent);
  }
}

function devulveLetra() {
  const divLetras = document.querySelectorAll(".wheel-letter");

  divLetras.forEach((div) => {
    div.removeEventListener("mouseenter", enterLetra);
  });
  document.removeEventListener("mouseup", devulveLetra);
}

function presionaLetra(e) {
  letrasSeleccionadas.length = 0;

  const divLetras = document.querySelectorAll(".wheel-letter");

  const target = e.target;

  letrasSeleccionadas.push(target.textContent);

  divLetras.forEach((div) => {
    div.addEventListener("mouseenter", enterLetra);
  });
  document.addEventListener("mouseup", devulveLetra);
}

function getPalabra() {
  return letrasSeleccionadas.join("");
}

export { presionaLetra, getPalabra };
