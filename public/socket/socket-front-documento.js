// socket-front-documento.js

const socket = io();

// Seleciona o documento (entra na sala docId) e obtém (texto, nome)
function selecionarDocumento(docId, callback) {
  socket.emit("selecionar_documento", docId, (texto, nome) => {
    if (callback) {
      callback(texto, nome);
    }
  });
}

// Emite alterações de texto
function emitirTextoEditor({ docId, texto }) {
  socket.emit("texto_editor", { docId, texto });
}

// Emite exclusão
function emitirExcluirDocumento(docId) {
  socket.emit("excluir_documento", docId);
}

export {
  socket,
  selecionarDocumento,
  emitirTextoEditor,
  emitirExcluirDocumento
};
