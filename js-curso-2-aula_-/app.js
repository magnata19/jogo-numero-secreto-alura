let listaDeNumerosSorteados = [];
let numeroLimite = 10;

const exibirTextoNaTela = (tag, texto) => {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female',{rate: 1.2})
};

let tentativas = 1;

const exibirMensagemInicial = () => {
  exibirTextoNaTela("h1", "Jogo do número secreto.");
  exibirTextoNaTela("p", "Escolha um número entre 1 e 10");

};

exibirMensagemInicial();

function verificarChute() {
  let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
  let mensagemTentativa = `Parabéns, você acertou o número secreto com ${tentativas} ${palavraTentativa}`;
  let chute = document.querySelector("input").value;
  if (chute == numeroAleatorio) {
    exibirTextoNaTela("h1", "Acertou!");
    exibirTextoNaTela("p", mensagemTentativa);
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (chute > numeroAleatorio) {
      exibirTextoNaTela("p", `O número secreto é menor que ${chute}`);
    } else {
      exibirTextoNaTela("p", `O número secreto é maior que ${chute}`);
    }
    tentativas++;
    limparCampo();
  }
}

const gerarNumeroAleatorio = () => {
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); //gera um numero inteiro entre 1 e 10
  let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

  if (quantidadeDeElementosNaLista == numeroLimite) {
    listaDeNumerosSorteados = [];
  }

  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log(listaDeNumerosSorteados);
    return numeroEscolhido;
  }
};

let numeroAleatorio = gerarNumeroAleatorio();

const limparCampo = () => {
  let chute = document.querySelector("input");
  chute.value = "";
};

const reiniciarJogo = () => {
  numeroAleatorio = gerarNumeroAleatorio();
  exibirMensagemInicial();
  limparCampo();
  tentativas = 1;
  document.getElementById("reiniciar").setAttribute("disabled", true);
};
