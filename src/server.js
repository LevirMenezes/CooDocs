import { createRequire } from "module";
const require = createRequire(import.meta.url);
require("module-alias/register");
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import session from "express-session";
import iosession from "express-socket.io-session"; // Integração com o socket.io
import bodyParser from "body-parser";
import MongoStore from "connect-mongo";
import rateLimit from "express-rate-limit";
import "./config/db.js"; // Mantém a conexão com o banco
import authRoutes from "./routers/authRoutes.js"
import documentoRoutes from "./routers/documentoRoutes.js"
import dotenv from "dotenv";


dotenv.config(); 
const app               = express();
const porta             = process.env.PORT || 3000;
const __filename        = fileURLToPath(import.meta.url);
const __dirname         = path.dirname(__filename);
const limiter           = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
});
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.DB_URI,
    dbName: process.env.DB_NAME,
  })
});


app.use(limiter);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessionMiddleware);
const diretorioPublico = path.join(__dirname, "../public");
app.use(express.static(diretorioPublico));
app.use("/", authRoutes);
app.use("/", documentoRoutes);

// Configuração do servidor HTTP e Socket.io
const servidorHttp = http.createServer(app);
const io = new Server(servidorHttp);

// Integração da sessão com o Socket.io
io.use(iosession(sessionMiddleware, { autoSave: true }));

servidorHttp.listen(porta, () => {
  console.log(`Servidor escutando na porta ${porta}`);
});

export default io;
