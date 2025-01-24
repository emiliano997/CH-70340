export function auth(req, res, next) {
  if (!req.session.user && !req.session.admin) {
    return res.status(401).json({ message: "No has iniciado sesión" });
  }

  next();
}
