import { documentosColecao } from "../config/db.js";
import { ObjectId } from "mongodb";

// Adiciona um documento e retorna o insertedId
export async function adicionarDocumento(nome) {
  const resultado = await documentosColecao.insertOne({
    nome,
    texto: ""
  });
  // resultado.insertedId é o _id gerado
  return resultado; // { acknowledged: true, insertedId: ObjectId("...") }
}

// Retorna todos os documentos
export async function obterDocumentos() {
  return documentosColecao.find().toArray(); 
}

// Busca um documento pelo _id
export async function encontrarDocumentoPorId(docId) {
  // Converte docId (string) para ObjectId
  return documentosColecao.findOne({ _id: new ObjectId(docId) });
}

// Atualiza o campo texto
export async function atualizaDocumento(docId, novoTexto) {
  return documentosColecao.updateOne(
    { _id: new ObjectId(docId) },
    { $set: { texto: novoTexto } }
  );
}

// Exclui o documento
export async function excluirDocumento(docId) {
  return documentosColecao.deleteOne({ _id: new ObjectId(docId) });
}

// Atualiza o nome do documento
export async function atualizaTituloDocumento(docId, novoNome) {
  return documentosColecao.updateOne(
    { _id: new ObjectId(docId) },
    { $set: { nome: novoNome } }
  );
}