import { Router as ExpressRouter } from "express";
import { POLICIES } from "../constants/policies.js";
import jwt from "jsonwebtoken";
import { JWT } from "../constants/jwt.js";

export class Router {
  constructor() {
    this.router = ExpressRouter();
    this.init();
  }

  getRouter() {
    return this.router;
  }

  init() {}

  /**
   *
   * @param {string} path
   * @param  {...function} callbacks
   */
  get(path, policies, ...callbacks) {
    this.router.get(
      path,
      this.generateCustomResponses,
      this.handlePolicies(policies),
      this.applyCallbacks(callbacks)
    );
  }

  post(path, policies, ...callbacks) {
    this.router.post(
      path,
      this.generateCustomResponses,
      this.handlePolicies(policies),
      this.applyCallbacks(callbacks)
    );
  }

  put(path, policies, ...callbacks) {
    this.router.put(
      path,
      this.generateCustomResponses,
      this.handlePolicies(policies),
      this.applyCallbacks(callbacks)
    );
  }

  delete(path, policies, ...callbacks) {
    this.router.delete(
      path,
      this.generateCustomResponses,
      this.handlePolicies(policies),
      this.applyCallbacks(callbacks)
    );
  }

  applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        console.log(error);

        const [req, res, next] = params;

        res
          .status(500)
          .json({ message: "Internal server error", details: error });
      }
    });
  }

  generateCustomResponses(req, res, next) {
    res.sendSuccess = (payload) =>
      res.status(200).json({ message: "Success", payload });

    res.sendServerError = (error) =>
      res
        .status(500)
        .json({ message: "Internal Server Error", details: error });

    res.sendUserError = (error) =>
      res.status(400).json({ message: "Bad Request", details: error });

    res.sendNotFound = (error) =>
      res.status(404).json({ message: "Not Found", details: error });

    res.sendUnauthorized = (error) =>
      res.status(401).json({ message: "Unauthorized", details: error });

    res.sendForbidden = (error) =>
      res.status(403).json({ message: "Forbidden", details: error });

    next();
  }

  handlePolicies(policies) {
    return (req, res, next) => {
      if (policies.includes(POLICIES.public)) return next();

      const authHeader = req.headers.authorization;

      if (!authHeader) {
        console.log(res.sendUnauthorized);

        return res.sendUnauthorized("No token provided");
      }

      const [, token] = authHeader.split(" ");

      try {
        const decoded = jwt.verify(token, JWT.SECRET);

        console.log(policies);

        if (!policies.includes(decoded.role)) {
          return res.sendForbidden("You don't have permission to access");
        }

        req.user = decoded;

        next();
      } catch (error) {
        return res.sendUnauthorized("Invalid token provided");
      }
    };
  }
}
