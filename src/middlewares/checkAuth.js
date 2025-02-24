// src/middlewares/checkAuth.js
export function checkAuth(req, res, next) {
    if (req.session?.usuarioLogado) {
      // Se logado, prossegue
      return next();
    }
    // Se não estiver logado, redireciona para o login
    res.redirect("/login");
  }