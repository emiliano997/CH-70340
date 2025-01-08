import { Router } from "express";

export const petRouter = Router();

const pets = [
  { name: "Firulais", breed: "Dog" },
  { name: "Mishi", breed: "Cat" },
  { name: "Pepito", breed: "Parrot" },
];

petRouter.param("pet", (req, res, next, pet) => {
  if (!/[a-zA-Z20%]+/.test(pet)) {
    return res.status(400).json({ message: "Pet must be a string" });
  }

  const search = pets.find((p) => p.name === pet);

  if (!search) {
    return res.status(404).json({ message: "Pet not found" });
  }

  req.pet = search;
  next();
});

petRouter.get("/:pet", (req, res) => {
  res.json({ pet: req.pet });
});

petRouter.post("/", (req, res) => {
  const { name, breed } = req.body;

  if (!name || !breed) {
    return res.status(400).json({ message: "Name and breed are required" });
  }

  pets.push({ name, breed });

  res.status(201).json({ message: "Pet added" });
});

petRouter.put("/:pet", (req, res) => {
  const index = pets.findIndex((p) => p.name === req.pet.name);

  pets[index] = {
    ...req.pet,
    adopted: true,
  };

  res.json({ message: "Pet adopted" });
});
