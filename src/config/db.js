import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

// Exemplo de conexão "hard-coded". Em produção, use process.env.DB_URI, etc.
const cliente = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;
let documentosColecao;
let usuariosColecao;
let tokensRecuperacaoColecao;

async function conectarDB() {
  try {
    // A partir da versão 4.x, não é necessário verificar isConnected
    await cliente.connect();
    console.log("Conectado ao banco de dados");

    // Acessa o banco de dados
    db = await cliente.db(process.env.DB_NAME);

    // Inicializa as coleções
    documentosColecao        = db.collection("documentos");
    usuariosColecao          = db.collection("usuarios");
    tokensRecuperacaoColecao = db.collection("tokensRecuperacao");

    console.log("Coleções carregadas com sucesso");
  } catch (erro) {
    console.log("Erro ao conectar no MongoDB:", erro);
  }
}

// Chama a função de conexão ao iniciar o servidor
conectarDB();

export {
  db,
  documentosColecao,
  usuariosColecao,
  tokensRecuperacaoColecao,
};
