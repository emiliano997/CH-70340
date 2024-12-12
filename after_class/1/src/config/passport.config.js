import passport from "passport";
import local from "passport-local";
import { comparePassword } from "../utils/password.utils.js";
import { userModel } from "../models/user.model.js";

const LocalStrategy = local.Strategy;

export function initializePassport() {
  passport.use(
    "register",
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        const { first_name, last_name } = req.body;

        try {
          const userExists = await userModel.findOne({ email });

          if (userExists)
            return done(null, false, { message: "User already exists" });

          const user = await userModel.create({
            first_name,
            last_name,
            email,
            password,
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

          if (user)
            return done(null, false, { message: "User already exists" });

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

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userModel.findById(id);
      return done(null, user);
    } catch (error) {
      return done(`Hubo un error: ${error}`);
    }
  });
}
