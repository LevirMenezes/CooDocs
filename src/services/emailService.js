import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Carregar variáveis de ambiente
dotenv.config();

// Função para enviar o e-mail
export async function enviarEmail(destinatario, assunto, conteudoHtml) {

  var transport = nodemailer.createTransport({
    host: "smtp.gmail.com", // Você pode mudar para outros serviços se necessário
    port: 587,
    segure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Validação simples do e-mail
  if (!/\S+@\S+\.\S+/.test(destinatario)) {
    throw new Error("E-mail inválido");
  }

  try {
    const info = await transport.sendMail({
      from: `"CooDocs" <${process.env.EMAIL_USER}>`,
      to: destinatario,
      subject: assunto,
      html: conteudoHtml
    });

    console.log("Email enviado: ", info.messageId);
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    throw error;
  }
}
