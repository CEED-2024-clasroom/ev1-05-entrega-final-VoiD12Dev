import center from "../lib/center";

//Para futuros recocojo las letras a pintar en la rueda
// const letras = game.letters.split("");
let grid = document.querySelector("#grid");

function posicionInicial(casillas) {
  let maxX = 0;
  let maxY = 0;

  casillas.forEach((_, key) => {
    let { origin, direction, length } = casillas[key];
    let [coordX, coordY] = origin;

    for (let i = 0; i < length; i++) {
      if (maxY < coordY + 1) maxY = coordY + 1;
      if (maxX < coordX + 1) maxX = coordX + 1;

      direction == "horizontal" ? coordX++ : coordY++;
    }
  });

  maxX -= 1;
  maxY -= 1;
  return center(maxY, maxX, 10, 10);
}

function ponerCasillas(arrayCasillas) {
  let [posInicialX, posInicialY] = posicionInicial(arrayCasillas);

  if (posInicialX < 0 || posInicialY < 0) {
    posInicialX = 0;
    posInicialY = 0;
  }

  const posicionesUsadas = new Set();

  arrayCasillas.forEach((_, key) => {
    let { origin, direction, length } = arrayCasillas[key];
    //He clonado el array por que me modificaba el original
    let origen = [...origin];

    for (let i = 0; i < length; i++) {
      //prettier-ignore
      const posicionGrid = `${origen[1] + 1 + posInicialX} / ${origen[0] + 1 + posInicialY}`;

      if (!posicionesUsadas.has(posicionGrid)) {
        let creaDiv = document.createElement("div");
        creaDiv.className = "letter";
        creaDiv.style.gridArea = posicionGrid;
        grid.appendChild(creaDiv);
        posicionesUsadas.add(posicionGrid);
      }

      direction == "horizontal" ? origen[0]++ : origen[1]++;
    }
  });
}

export { ponerCasillas, posicionInicial };
