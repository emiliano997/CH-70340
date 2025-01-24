import passport from "passport";

export function passportCall(strategy) {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (error, user, info) {
      console.log(info);

      if (error) return next(error);

      if (!user)
        return res.status(401).send({
          error: "Unauthorized",
          details: info.messages ? info.messages : info.toString(),
        });

      req.user = user;
      next();
    })(req, res, next);
  };
}
