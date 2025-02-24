import io from "../server.js";
import {
  adicionarDocumento,
  obterDocumentos,
  encontrarDocumentoPorId,
  atualizaDocumento,
  excluirDocumento,
  atualizaTituloDocumento
} from "../models/documento.js";

let usuariosConectados = {};

io.on("connection", (socket) => {
  const sessao = socket.handshake.session;
  if (!sessao?.usuarioLogado) {
    return socket.disconnect(true); 
  }
  
  const loginUsuario = sessao.usuarioLogado.login;
  usuariosConectados[socket.id] = loginUsuario;

  // Emite a lista de usuários conectados (exemplo)
  socket.emit("usuarios_conectados", Object.values(usuariosConectados));

  // Ao desconectar
  socket.on("disconnect", () => {
    delete usuariosConectados[socket.id];
    socket.emit("usuarios_conectados", Object.values(usuariosConectados));
  });

  // Obter documentos
  socket.on("obter_documentos", async (callback) => {
    const docs = await obterDocumentos(); 
    callback(docs); 
  });

  // Adicionar documento
  socket.on("adicionar_documento", async (nome) => {
    const resultado = await adicionarDocumento(nome);
    if (resultado.acknowledged) {
      // Emite para o front-end: docId e nome
      socket.emit("adicionar_documento_interface", {
        _id: resultado.insertedId.toString(),
        nome
      });
    }
  });

  socket.on("selecionar_documento", async (docId, callback) => {
    socket.join(docId);
  
    const doc = await encontrarDocumentoPorId(docId);
    if (doc) {
      socket.emit("usuarios_conectados", Object.values(usuariosConectados));
      callback(doc.texto, doc.nome);
    } else {
      callback("", "");
    }
  });

  // Atualizar texto
  socket.on("texto_editor", async ({ docId, texto }) => {
    const atualizacao = await atualizaDocumento(docId, texto);
    if (atualizacao.modifiedCount) {
      // Envia p/ todos na sala, exceto quem enviou
      socket.to(docId).emit("texto_editor_clientes", texto);
    }
  });

  // Excluir documento
  socket.on("excluir_documento", async (docId) => {
    const resultado = await excluirDocumento(docId);
    if (resultado.deletedCount) {
      // Emite globalmente
      io.emit("excluir_documento_sucesso", docId);
    }
  });

  socket.on("titulo_editor", async ({ docId, nomeDocumentoNovo }) => {
    if (!nomeDocumentoNovo?.trim()) return;

    const atualizacao = await atualizaTituloDocumento(docId, nomeDocumentoNovo.trim());
    if (atualizacao.modifiedCount) {
      io.emit("titulo_documento_atualizado", {
        docId,
        docNovo: nomeDocumentoNovo.trim()
      });
    }
  });
});
