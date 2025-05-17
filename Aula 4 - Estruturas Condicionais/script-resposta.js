"use strict";

const cards = window.document.querySelectorAll(".card");
const topDisplay = window.document.querySelector("#topDisplay");
const highlightedCard = window.document.querySelector("#highlightedCard");
const tableBody = window.document.querySelector("#tableBody");
const playAgainBtn = window.document.querySelector("#playAgainBtn");
const resultText = window.document.querySelector("#resultText");

//  Possíveis valores de "jogada":
//      - 🪨
//      - 📄
//      - ✂️
//
function logica(jogada) {
    let jogadorVenceu;
    let empate = false;
    let jogadaPC;
    let numeroAleatorio = Math.random() * Number.MAX_VALUE % 3;

    console.log(numeroAleatorio);

    switch (numeroAleatorio) {
        case 0:
            jogadaPC = "🪨";
            break;
        case 1:
            jogadaPC = "📄";
            break;
        case 2:
            jogadaPC = "✂️";
            break;
    }

    if (jogada === "🪨") {
        if (jogadaPC === "📄") {
            jogadorVenceu = false;
        } else {
            jogadorVenceu = true;
        }
    } else if (jogada === "📄") {
        if (jogadaPC === "✂️") {
            jogadorVenceu = false;
        } else {
            jogadorVenceu = true;
        }
    } else {
        if (jogadaPC === "🪨") {
            jogadorVenceu = false;
        } else {
            jogadorVenceu = true;
        }
    }

    if (jogadaPC === jogada) {
        empate = true;
        jogadorVenceu = false;
    }

    // Adiciona nova linha na tabela
    const newRow = window.document.createElement('tr');
    newRow.innerHTML = `<td>${jogada}</td><td>${jogadaPC}</td><td>${jogadorVenceu ? "Jogador" :
        (empate ? "Empate" : "Computador")}</td>`;
    tableBody.appendChild(newRow);

    let mensagemFinal = `Sua jogada: ${jogada}<br/>Jogada do computador: ${jogadaPC}<br/>`;

    if (empate) {
        mensagemFinal += `Empate!`;
    } else {
        mensagemFinal += jogadorVenceu ? "Parabéns! Você venceu!" : "Que pena! Você perdeu!";
    }

    resultText.innerHTML = mensagemFinal;
}

cards.forEach(card => {
    card.addEventListener('click', () => {
        const char = card.dataset.char;

        highlightedCard.textContent = char;
        topDisplay.classList.remove('hidden');
        playAgainBtn.style.display = 'inline-block';

        // Remove a linha de "Sem dados no momento" se ela existir
        if (tableBody.children.length === 1 && tableBody.children[0].textContent.includes("Sem dados")) {
            tableBody.innerHTML = '';
        }

        logica(card.innerHTML);
    });
});

playAgainBtn.addEventListener('click', () => {
    topDisplay.classList.add('hidden');
    playAgainBtn.style.display = 'none';
    tableBody.innerHTML = `<tr><td colspan="3">Sem dados no momento</td></tr>`;
});
