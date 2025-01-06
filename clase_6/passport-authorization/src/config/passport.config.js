import passport from "passport";
import jwt from "passport-jwt";

const JWT_SECRET = "s3cr3t";
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

export function intializePassport() {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        secretOrKey: JWT_SECRET,
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
      },
      async (payload, done) => {
        try {
          console.log("payload", payload);

          if (payload.email !== "admin@gmail.com") {
            return done(null, false);
          }

          return done(null, payload); // req.user
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
}

function cookieExtractor(req) {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies.token;
  }

  return token;
}
