import { usuariosColecao, tokensRecuperacaoColecao } from "../config/db.js";
import { ObjectId } from "mongodb";

/**
 * Cria um novo usuário na coleção "usuarios".
 * @param {string} login - nome de usuário.
 * @param {string} email - email do usuário.
 * @param {string} senhaCriptografada - senha já com hash bcrypt.
 */
async function criarUsuario(login, email, senhaCriptografada) {
  const resultado = await usuariosColecao.insertOne({
    login,
    email,
    senha: senhaCriptografada
  });
  return resultado;
}

/**
 * Busca um usuário pelo login.
 * @param {string} login - nome de usuário.
 * @returns {object|null} - documento do usuário ou null se não encontrado.
 */
async function buscarUsuarioPorLogin(login) {
  const usuario = await usuariosColecao.findOne({ login });
  return usuario;
}

/**
 * Busca um usuário pelo email.
 * @param {string} email - email do usuário.
 * @returns {object|null}
 */
async function buscarUsuarioPorEmail(email) {
  const usuario = await usuariosColecao.findOne({ email });
  return usuario;
}

/**
 * Atualiza a senha (hash) de um usuário.
 * @param {string|ObjectId} userId - id do usuário no banco.
 * @param {string} novaSenhaHash - nova senha já com hash.
 */
async function atualizarSenhaUsuario(userId, novaSenhaHash) {
  const filtro = { _id: typeof userId === "string" ? new ObjectId(userId) : userId };
  await usuariosColecao.updateOne(filtro, {
    $set: { senha: novaSenhaHash }
  });
}

/**
 * Salva um token de recuperação na coleção "tokensRecuperacao".
 * @param {string|ObjectId} userId
 * @param {string} token
 * @param {number} expiracao - timestamp em milissegundos (Date.now() + 1h, por ex.)
 */
async function salvarTokenRecuperacao(userId, token, expiracao) {
  const filtro = { token };

  // Remove tokens expirados antes de inserir um novo
  await tokensRecuperacaoColecao.deleteMany({ expiracao: { $lt: Date.now() } });

  // Se preferir, pode remover tokens antigos do mesmo user.
  // Aqui, substituímos se já existir esse token (raro).
  await tokensRecuperacaoColecao.updateOne(
    filtro,
    {
      $set: {
        userId: typeof userId === "string" ? new ObjectId(userId) : userId,
        expiracao
      }
    },
    { upsert: true }
  );
}

/**
 * Busca registro de token na coleção de tokensRecuperacao.
 * @param {string} token
 * @returns {object|null} { token, userId, expiracao, ...}
 */
async function buscarPorToken(token) {
  return await tokensRecuperacaoColecao.findOne({ token });
}

/**
 * Remove tokens expirados
 */
async function removerTokensExpirados() {
  await await tokensRecuperacaoColecao.deleteMany({ expiracao: { $lt: Date.now() } });
}

export {
  criarUsuario,
  buscarUsuarioPorLogin,
  buscarUsuarioPorEmail,
  atualizarSenhaUsuario,
  salvarTokenRecuperacao,
  buscarPorToken,
  removerTokensExpirados
};
