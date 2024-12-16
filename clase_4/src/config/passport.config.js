import { userModel } from "../models/user.model.js";

import GithubStrategy from "passport-github2";
import passport from "passport";

// --- Esto no se debería subir al repositorio ---
const GITHUB_CLIENT_ID = "Iv23liiRV0YnMS4B8Nfr";
const GITHUB_CLIENT_SECRET = "c9321e32f3ff814465c8c980be46ed1a82c182a4";

export function initializePassport() {
  // --- Github strategy configuration ---
  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/api/sessions/github-callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);

        try {
          // const email = profile.emails[0].value;
          const username = profile.username;

          const user = await userModel.findOne({ username });

          if (user) {
            done(null, user);
            return;
          }

          const newUser = await userModel.create({
            name: profile.displayName,
            username,
            age: profile.age || 18,
            githubId: profile.id,
          });

          done(null, newUser);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  // --- Serialize and deserialize user functions ---
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);

    done(null, user);
  });
}
