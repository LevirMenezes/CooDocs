// documento.js
import {
  socket,
  selecionarDocumento,
  emitirTextoEditor,
  emitirExcluirDocumento
} from "../socket/socket-front-documento.js";

// Pegamos "docId" da URL, não mais "nomeDocumento"
const params            = new URLSearchParams(window.location.search);
const docId             = params.get("docId"); // string do _id gerado pelo Mongo

// Elementos da página
const textoEditor       = document.getElementById("editor-texto");
const tituloDocumento   = document.getElementById("titulo-documento");
const iconeEditarTitulo = document.getElementById("icone-editar-titulo");
const inputEditarTitulo = document.getElementById("input-editar-titulo");
const botaoExcluir      = document.getElementById("excluir-documento");

// Seleciona o documento no servidor e obtém texto e nome
selecionarDocumento(docId, (texto, nome) => {
  console.log("Seleção do doc:", docId, "Retornou:", texto, nome);
  textoEditor.value = texto;
  tituloDocumento.textContent = nome || "Documento sem título";
});

// Ao digitar, emite texto_editor para o servidor
textoEditor.addEventListener("keyup", () => {
  emitirTextoEditor({
    docId,
    texto: textoEditor.value
  });
});

// Edição de título
iconeEditarTitulo.addEventListener("click", () => {
  inputEditarTitulo.style.display = "inline-block";
  inputEditarTitulo.value = tituloDocumento.textContent;
  tituloDocumento.style.display = "none";
  inputEditarTitulo.focus();
}); 

inputEditarTitulo.addEventListener("blur", salvarTitulo);
inputEditarTitulo.addEventListener("keyup", (e) => {
  if (e.key === "Enter") salvarTitulo();
});

function salvarTitulo() {
  const novoTitulo = inputEditarTitulo.value.trim();
  if (novoTitulo) {
    // Emite evento de renomear
    socket.emit("titulo_editor", {
      docId,
      nomeDocumentoNovo: novoTitulo
    });
  }
  // Restaura
  inputEditarTitulo.style.display = "none";
  tituloDocumento.style.display = "inline-block";
}

// Excluir documento
botaoExcluir.addEventListener("click", () => {
  emitirExcluirDocumento(docId);
});

// ========== Eventos de socket ==========

// Recebe confirmação de exclusão
socket.on("excluir_documento_sucesso", (excluidoId) => {
  if (excluidoId === docId) {
    alert(`Documento ${excluidoId} excluído com sucesso!`);
    window.location.href = "/index";
  }
});

// Recebe renomeação
socket.on("titulo_documento_atualizado", ({ docId: id, docNovo }) => {
  if (id === docId) {
    tituloDocumento.textContent = docNovo;
  }
});

// Recebe alterações de texto de outros usuários
socket.on("texto_editor_clientes", (texto) => {
  textoEditor.value = texto;
});

// Recebe número de usuários conectados globalmente (opcional)
socket.on("usuarios_conectados", (listaUsuarios) => {
  const total = listaUsuarios.length;
  const spanUsuarios = document.getElementById("usuarios-conectados");
  if (spanUsuarios) {
    spanUsuarios.textContent = `Usuários online: ${total}`;
  }
});

// Se quiser lista de usuários neste documento, faça socket.on("usuarios_no_documento", ...)

