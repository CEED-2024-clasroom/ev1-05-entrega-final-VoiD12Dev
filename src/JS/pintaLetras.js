function pintaLetras(orientacion, palabra, posicionInicial) {
  const { origin, direction } = orientacion;
  const [coordPalabraX, coordPalabraY] = origin;
  const [posIniX, posIniY] = posicionInicial;

  let totalInicioX = posIniX + coordPalabraY + 1;
  let totalInicioY = posIniY + coordPalabraX + 1;

  if (direction == "horizontal") {
    //prettier-ignore
    for (let i = 0; i < palabra.length; i++) {
        const divConGridArea = document.querySelector(`div[style="grid-area: ${totalInicioX} / ${totalInicioY + i};"]`);
        divConGridArea.textContent = palabra[i];
    }
  } else {
    //prettier-ignore
    for (let i = 0; i < palabra.length; i++) {
        const divConGridArea = document.querySelector(`div[style="grid-area: ${totalInicioX + i} / ${totalInicioY};"]`);
        divConGridArea.textContent = palabra[i];
    }
  }
}

export { pintaLetras };
