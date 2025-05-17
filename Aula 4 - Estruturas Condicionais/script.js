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
    // TODO: Mão na massa!!
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
