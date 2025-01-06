export function authorization(...roles) {
  return async (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    // if (req.user.role !== role)
    //   return res.status(403).json({ error: "Forbidden" });

    if (roles.length && !roles.includes(req.user.role))
      return res.status(403).json({ error: "Forbidden" });

    next();
  };
}
