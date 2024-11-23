import calculateLetterPositions from "../lib/letter_positions";
const circulo = document.querySelector("#wheel");

function colocarLetras(letras) {
  let arrayLetras = letras.split("");
  const divsCreados = [];

  for (let i = 0; i < arrayLetras.length; i++) {
    let crearDiv = document.createElement("div");
    let { left, top } = calculateLetterPositions(letras.length)[i];

    crearDiv.classList.add("wheel-letter");
    crearDiv.innerHTML = arrayLetras[i];
    crearDiv.style = `left: ${left}; top: ${top};`;

    circulo.appendChild(crearDiv);
    divsCreados.push(crearDiv);
  }

  return divsCreados;
}

export { colocarLetras };
