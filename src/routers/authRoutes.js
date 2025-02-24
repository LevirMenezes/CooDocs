import { Router } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";
import {
  criarUsuario,
  buscarUsuarioPorLogin,
  buscarUsuarioPorEmail,
  atualizarSenhaUsuario,
  salvarTokenRecuperacao,
  buscarPorToken
} from "../models/usuario.js";
import { enviarEmail } from "../services/emailService.js";

const router = Router();
const __filename        = fileURLToPath(import.meta.url);
const __dirname         = path.dirname(__filename);
const diretorioPublico = path.join(__dirname, "../../public");

router.get("/", (_req, res) => {
    res.sendFile(path.join(diretorioPublico, "/pages/login.html"));
});

router.get("/login", (_req, res) => {
    res.sendFile(path.join(diretorioPublico, "/pages/login.html"));
});

router.get("/register", (_req, res) => {
  res.sendFile(path.join(diretorioPublico, "/pages/register.html"));
});

router.get("/forgot", (_req, res) => {
  res.sendFile(path.join(diretorioPublico, "/pages/forgot.html"));
});

router.get("/reset", (_req, res) => {
  res.sendFile(path.join(diretorioPublico, "/pages/reset.html"));
});
 
router.post("/login", async (req, res) => {
  const { login, senha } = req.body;
  const usuario = await buscarUsuarioPorLogin(login);

  if (!usuario) {
    return res.redirect("/login?erro=usuario_nao_encontrado");
  }

  const senhasConferem = await bcrypt.compare(senha, usuario.senha);
  if (!senhasConferem) {
    return res.redirect("/login?erro=senha_incorreta");
  }

  req.session.usuarioLogado = {
    login: usuario.login,
    _id: usuario._id
  };

  res.redirect("/index");
});

router.post("/register", async (req, res) => {
  const { login, email, senha } = req.body;

  // Verifica se usuário existe
  const usuarioExistente = await buscarUsuarioPorLogin(login);
  if (usuarioExistente) {
    return res.send(`<script>alert('Usuário já existe!'); window.location.href='/register';</script>`);
  }

  // Verifica se e-mail já está em uso
  const emailExistente = await buscarUsuarioPorEmail(email);
  if (emailExistente) {
    return res.send(`<script>alert('E-mail já cadastrado!'); window.location.href='/register';</script>`);
  }

  // Criptografa a senha
  const senhaCriptografada = await bcrypt.hash(senha, 10);
  await criarUsuario(login, email, senhaCriptografada);

  res.redirect("/login");
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

router.post("/forgot", async (req, res) => {
  const { email } = req.body;
  const usuario = await buscarUsuarioPorEmail(email);

  if (!usuario) {
    return res.send(`<script>alert('E-mail não encontrado!'); window.location.href='/forgot';</script>`);
  }

  const token = crypto.randomBytes(20).toString("hex");
  const expiracao = Date.now() + 3600000; // 1 hora
  await salvarTokenRecuperacao(usuario._id, token, expiracao);

  const linkReset = `http://localhost:${process.env.PORT}/reset?token=${token}`;
  const conteudoHtml = `
    <p>Você solicitou recuperação de senha no CooDocs.</p>
    <p>Para redefinir, clique no link abaixo ou cole no navegador:</p>
    <a href="${linkReset}">${linkReset}</a>
    <p>Este link expira em 1 hora.</p>
  `;
  await enviarEmail(usuario.email, "Recuperar Senha - CooDocs", conteudoHtml);
  // await sendEmail(usuario.email, "Recuperar Senha - CooDocs", conteudoHtml);

  res.send(`<script>alert('Verifique seu e-mail para redefinir a senha.'); window.location.href='/login';</script>`);
});

router.post("/reset", async (req, res) => {
  const { token, senha } = req.body;
  const registro = await buscarPorToken(token);

  if (!registro) {
    return res.send(`<script>alert('Token inválido!'); window.location.href='/login';</script>`);
  }

  if (Date.now() > registro.expiracao) {
    return res.send(`<script>alert('Token expirado!'); window.location.href='/forgot';</script>`);
  }

  const senhaCriptografada = await bcrypt.hash(senha, 10);
  await atualizarSenhaUsuario(registro.userId, senhaCriptografada);
  res.send(`<script>alert('Senha redefinida com sucesso!'); window.location.href='/login';</script>`);
});

export default router;