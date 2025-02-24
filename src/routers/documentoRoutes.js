import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { checkAuth } from "../middlewares/checkAuth.js"

const router = Router();
const __filename        = fileURLToPath(import.meta.url);
const __dirname         = path.dirname(__filename);  
  
router.get("/index", checkAuth, (_req, res) => {
  res.sendFile(path.join(__dirname, "../../public/pages/index.html"));
});

router.get("/index.html", checkAuth, (_req, res) => {
  res.sendFile(path.join(__dirname, "../../public/pages/index.html"));
});

router.get("/documento", checkAuth, (req, res) => {
  if (!req.query.docId){
    res.redirect("/login");
  }
  else {
    res.sendFile(path.join(__dirname, "../../public/pages/documento.html"));
  }
});

router.get("/documento.html", checkAuth, (_req, res) => {
  res.sendFile(path.join(__dirname, "../../public/pages/documento.html"));
});


export default router;