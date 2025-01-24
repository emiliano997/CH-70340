import passport from "passport";
import local from "passport-local";
import { userModel } from "../models/user.model.js";
import { comparePassword, hashPassword } from "../utils/hash.js";

const LocalStrategy = local.Strategy;

export function initializePassport() {
  // ------------------------------
  // Strategies Local
  // ------------------------------
  passport.use(
    "register",
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        const { first_name, last_name, age } = req.body;

        try {
          const userExists = await userModel.findOne({ email });

          if (userExists)
            return done(null, false, { message: "User already exists" });

          const hashedPassword = await hashPassword(password);

          const user = await userModel.create({
            first_name,
            last_name,
            age,
            email,
            password: hashedPassword,
          });

          return done(null, user);
        } catch (error) {
          return done(`Hubo un error: ${error}`);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        try {
          const user = await userModel.findOne({ email });

          if (!user)
            return done(null, false, { message: "User does not exist" });

          const isPasswordValid = await comparePassword(
            password,
            user.password
          );

          if (!isPasswordValid)
            return done(null, false, { message: "Invalid password" });

          return done(null, user);
        } catch (error) {
          return done(`Hubo un error: ${error}`);
        }
      }
    )
  );

  // ------------------------------
  // Serialización y deserialización
  // ------------------------------
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);

    done(null, user);
  });
}
