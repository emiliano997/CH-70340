import { Router } from "express";

export const wordRouter = Router();

const words = ["hola", "mundo", "desde", "express"];

wordRouter.param("word", (req, res, next, word) => {
  if (!/[a-zA-Z]+/.test(word)) {
    return res.status(400).json({ message: "Word must be a string" });
  }

  const search = words.find((w) => w === word);

  if (!search) {
    return res.status(404).json({ message: "Word not found" });
  }

  req.word = search;
  next();
});

wordRouter.get("/:word", (req, res) => {
  res.json({ word: req.word });
});

wordRouter.get("/first-letter/:word", (req, res) => {
  res.json({ firstLetter: req.word[0] });
});

wordRouter.get("*", (req, res) => {
  res.status(404).json({ message: "Not found word" });
});
