import { socket, emitirAdicionarDocumento } from "../socket/socket-front-index.js";

const listaDocumentos = document.getElementById("lista-documentos");
const form = document.getElementById("form-adiciona-documento");
const inputDocumento = document.getElementById("input-documento");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  emitirAdicionarDocumento(inputDocumento.value);
  inputDocumento.value = "";
});

function inserirLinkDocumento(_id, nome) {
  listaDocumentos.innerHTML += `
    <a
      href="/documento?docId=${_id}"
      class="list-group-item list-group-item-action"
      id="documento-${_id}" 
    >
      ${nome}
    </a>
  `;
}

function removerLinkDocumento(docId) {
  const documento = document.getElementById(`documento-${docId}`);
  if (documento) {
    listaDocumentos.removeChild(documento);
  }
}

// Ao iniciar, pede lista de docs
socket.emit("obter_documentos", (docs) => {
  docs.forEach((doc) => {
    inserirLinkDocumento(doc._id, doc.nome);
  });
});

// Escuta evento de adicionar documento interface
socket.on("adicionar_documento_interface", ({ _id, nome }) => {
  inserirLinkDocumento(_id.toString(), nome);
});

// Escuta evento de excluir documento com sucesso
socket.on("excluir_documento_sucesso", (docId) => {
  removerLinkDocumento(docId);
});

// NOVO: Escuta o evento de renomear documento
socket.on("titulo_documento_atualizado", ({ docId, docNovo }) => {
  const link = document.getElementById(`documento-${docId}`);
  if (link) {
    link.textContent = docNovo;
  }
});

