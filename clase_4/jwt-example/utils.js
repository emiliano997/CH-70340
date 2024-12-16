import jwt from "jsonwebtoken";

const SECRET = "coders3cr3t";

// --- JWT Functions ---
// payload -> Es el objeto que se va a encriptar

/**
 *
 * @param { payload } payload - Información que se va a encriptar
 * @returns { string } token - Token generado
 */
export function generateToken(payload) {
  const token = jwt.sign(payload, SECRET, {
    expiresIn: "30m",
  });
  return token;
}

export function verifyToken(token) {
  return jwt.verify(token, SECRET);
}

// --- Auth Middleware ---
export function authentication(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: "Unauthorized" });

  // "Authorization": "Bearer <token>"
  // Bearer -> Portador
  const token = authorization.split(" ")[1];

  try {
    const payload = verifyToken(token);
    req.user = payload;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({ message: "Unauthorized" });
  }
}
