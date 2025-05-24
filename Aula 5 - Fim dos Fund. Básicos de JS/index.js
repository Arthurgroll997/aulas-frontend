// Tema de casa:
// 1) Fazer o jogo "resetar" (poder jogar novamente sem precisar atualizar a página)
// 2) Guardar histórico das partidas, assim como fizemos no exercício da aula passada em que guardávamos o
//          resultado do pedra-papel-tesoura (dessa vez incluir a "palavra" final que o jogador atingiu e se ganhou ou não)
// 3) Adicionar opção para o jogador tentar chutar a palavra inteira

const getElem = (id) => window.document.querySelector(`#${id}`);

const inputPalavra = getElem("palavra");
const btnIniciar = getElem("iniciar");
const imgJogo = getElem("img-jogo");
const containerJogo = getElem("container-jogo");
const containerResposta = getElem("container-resposta");
const respostaAtual = getElem("resposta-atual");
const letrasErradas = getElem("erradas");
const chances = getElem("chances");
const inputLetra = getElem("letra");
const btnChutar = getElem("chutar");

let tentativasRestantes = 5;
let palavra = "";
let letrasParaMostrar = [];
let muralLetrasErradas = "";
let letrasAcertadas = 0;

function alterarImagem(tentativas) {
    // TODO
}

function atualizarTentativas(tentativas) {
    // TODO
}

function mostrarPalavra(palavra) {
    // TODO
}

function atualizarMuralLetrasErradas(letra) {
    // TODO
}

function logicaPrincipal(letra) {
   // TODO
}

btnIniciar.addEventListener("click", () => {
    if (inputPalavra.value.length == 0) {
        window.alert("Digite uma palavra válida!");
        return;
    }

    palavra = inputPalavra.value.toUpperCase();

    mostrarPalavra(palavra);

    window.document.querySelectorAll(".configuracoes").forEach(el => el.style.display = 'none');
    window.document.querySelectorAll(".jogo").forEach(el => el.style.display = 'block');
});

btnChutar.addEventListener("click", () => {
    if (inputLetra.value.length == 0)
        return

    let letra = inputLetra.value.toUpperCase();
    inputLetra.value = "";

    logicaPrincipal(letra);
});
