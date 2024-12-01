function shuffle() {
  const recogeLetras = document.querySelectorAll(".wheel-letter");
  const numeroOp = Math.floor(Math.random() * (recogeLetras.length - 2)) + 2;

  for (let i = 0; i < numeroOp; i++) {
    let random1;
    let random2;
    const arrayStyle1 = [];
    const arrayStyle2 = [];

    do {
      random1 = Math.floor(Math.random() * recogeLetras.length);
      random2 = Math.floor(Math.random() * recogeLetras.length);
    } while (random1 === random2);

    arrayStyle1.push(recogeLetras[random1].style.left);
    arrayStyle1.push(recogeLetras[random1].style.top);

    arrayStyle2.push(recogeLetras[random2].style.left);
    arrayStyle2.push(recogeLetras[random2].style.top);

    recogeLetras[random1].style.left = arrayStyle2[0];
    recogeLetras[random1].style.top = arrayStyle2[1];

    recogeLetras[random2].style.left = arrayStyle1[0];
    recogeLetras[random2].style.top = arrayStyle1[1];
  }
}

export { shuffle };
