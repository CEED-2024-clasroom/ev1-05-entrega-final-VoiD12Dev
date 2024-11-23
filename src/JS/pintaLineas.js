import { getElementCenter, lengthAndAngle } from "../lib/line_position.js";

let coordenadaXInicio;
let coordenadaYInicio;
let coordenadaXActual;
let coordenadaYActual;
let divCreado;

function creaDiv(x, y) {
  divCreado = document.createElement("div");
  divCreado.classList.add("line");
  document.body.appendChild(divCreado);
  divCreado.style.left = `${x}px`;
  divCreado.style.top = `${y}px`;
}

function capturaLetra(e) {
  ({ clientX: coordenadaXActual, clientY: coordenadaYActual } = e);

  let { length, angle } = lengthAndAngle(
    [coordenadaXInicio, coordenadaYInicio],
    [coordenadaXActual, coordenadaYActual]
  );

  divCreado.style.width = `${length}px`;
  divCreado.style.transform = `rotate(${angle}deg)`;

  const target = document.elementFromPoint(e.clientX, e.clientY);

  if (
    e.target.classList.contains("wheel-letter") &&
    !e.target.classList.contains("selected")
  ) {
    e.target.classList.add("selected");

    let { x: newX, y: newY } = getElementCenter(target);
    let { length, angle } = lengthAndAngle(
      [coordenadaXInicio, coordenadaYInicio],
      [newX, newY]
    );
    divCreado.style.width = `${length}px`;
    divCreado.style.transform = `rotate(${angle}deg)`;

    coordenadaXInicio = newX;
    coordenadaYInicio = newY;

    creaDiv(newX, newY);
  }
}

function dejaDeCapturar() {
  document.removeEventListener("mousemove", capturaLetra);
  document.removeEventListener("mouseup", dejaDeCapturar);

  let seleccionados = document.querySelectorAll(".selected");
  seleccionados.forEach((seleccionado) => {
    seleccionado.classList.remove("selected");
  });

  let lineas = document.querySelectorAll(".line");
  lineas.forEach((linea) => {
    linea.remove();
  });
}

function letraSeleccion(e) {
  let focus = e.target;
  if (focus.classList.contains("wheel-letter")) {
    focus.classList.add("selected");

    ({ x: coordenadaXInicio, y: coordenadaYInicio } = getElementCenter(focus));

    creaDiv(coordenadaXInicio, coordenadaYInicio);

    document.addEventListener("mousemove", capturaLetra);
    document.addEventListener("mouseup", dejaDeCapturar);
  }
}

export { letraSeleccion };
