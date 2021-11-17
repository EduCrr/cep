const mensagemErro = document.querySelector("#mensagemErro");
const cepbusca = document.querySelector("#cep");
const logradouro = document.querySelector("#logradouro");
const bairro = document.querySelector("#bairro");
const localidade = document.querySelector("#localidade");
const uf = document.querySelector("#uf");
const btnBuscar = document.querySelector("#botao_buscar");
const btnLimpar = document.querySelector("#botao_limpar");
const btnSalvar = document.querySelector("#botao_salvar");

btnBuscar.addEventListener("click", (e) => {
  e.preventDefault();
  try {
    validaCEP();
    buscaEndereco();
  } catch (erro) {
    mensagemErro.innerHTML = erro.message;
  }
});

function validaCEP() {
  const regex = /^[0-9]{8}$/;
  if (regex.test(cepbusca.value)) {
    console.log(cepbusca.value);
  } else {
    throw new Error("Cep inválido");
  }
}

function defineCampo(endereco) {
  for (let obj in endereco) {
    if (document.querySelector("#" + obj)) {
      document.querySelector("#" + obj).value = endereco[obj];
    }
  }
}

async function buscaEndereco() {
  try {
    const response = await fetch(
      `http://viacep.com.br/ws/${cepbusca.value}/json`
    );
    const json = await response.json();
    defineCampo(json);
  } catch (error) {
    console.log(error);
  }
}

btnLimpar.addEventListener("click", () => {
  limparCampos();
});

btnSalvar.addEventListener("click", () => {
  alert("Dados salvos com sucesso!!!");
  limparCampos();
});

function limpaCampos() {
  cepbusca.value = "";
  logradouro.value = "";
  bairro.value = "";
  localidade.value = "";
  uf.value = "";
  mensagemErro.innerHTML = "";
}
