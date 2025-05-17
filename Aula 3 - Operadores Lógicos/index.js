"use strict";

let divResposta =  window.document.querySelector("#resposta");
let btnCalcular = window.document.querySelector("#calcular");
let inputCodLivro = window.document.querySelector("#codLivro");
let inputNumLivros = window.document.querySelector("#numLivros");

let pResposta = window.document.createElement("p");
pResposta.id = "paragrafo-resposta";
pResposta.innerText = "Resposta...";

divResposta.appendChild(pResposta);

btnCalcular.addEventListener("click", () => {
    window.alert("Olá, mundo!");

    let codLivro = inputCodLivro.value;
    let numLivros = parseInt(inputNumLivros.value);

    console.log(`Código do livro: ${codLivro}`);
    console.log(`Número de livros: ${numLivros}`);
});
