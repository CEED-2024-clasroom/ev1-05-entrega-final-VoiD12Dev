/**
 * Lo declaro fuera del ambito de la funcion para que no se reinicie
 * Y utilizo set en vez de array para que no se repitan las coordenadas
 */
const coordUsadas = new Set();

/**
 * Recorro todas las casillas del grid, si tiene contenido se añade a coordUsadas para que no
 * devuelve letras que ya estan insertadas.
 */
function letrasInsertadas(coordUsadas) {
  const tablero = document.querySelectorAll(".letter");

  tablero.forEach((div) => {
    if (div.textContent !== "") {
      const coord = div.style.gridArea.split("/");
      const coordKey = `${coord[0].trim()},${coord[1].trim()}`;
      coordUsadas.add(coordKey);
    }
  });
}

/**
 * Recorro todas las casillas del grid, si es undefined no se añaden a letrasPosicion
 * Si esta dentro de la lista de coordenadas usadas no se añade
 */
function obtenerLetrasPosicion(juego, xIni, yIni, coordUsadas) {
  const letrasPosicion = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const letraActual = juego.letterAt(j, i);

      if (letraActual !== undefined) {
        const coordX = i + xIni + 1;
        const coordY = j + yIni + 1;
        const coordKey = `${coordX},${coordY}`;

        if (!coordUsadas.has(coordKey)) {
          letrasPosicion.push({
            letra: letraActual,
            coordenadas: [coordX, coordY],
            coordKey: coordKey,
          });
        }
      }
    }
  }

  return letrasPosicion;
}

function hint(juego, coordIniciales) {
  const [xIni, yIni] = coordIniciales;

  letrasInsertadas(coordUsadas);
  const letrasPosicion = obtenerLetrasPosicion(juego, xIni, yIni, coordUsadas);

  const randomIndex = Math.floor(Math.random() * letrasPosicion.length);
  const letraRecogida = letrasPosicion[randomIndex];

  try {
    //prettier-ignore
    const divABorrar = document.querySelector(`div[style="grid-area: ${letraRecogida.coordenadas[0]} / ${letraRecogida.coordenadas[1]};"]`);
    divABorrar.textContent = letraRecogida.letra;
    coordUsadas.add(letraRecogida.coordKey);
  } catch (error) {
    console.error("No quedan letras por revelar", error);
  }
}

export { hint, obtenerLetrasPosicion, letrasInsertadas };
