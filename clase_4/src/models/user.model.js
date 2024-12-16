import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  password: { type: String },
  githubId: { type: String },
});

export const userModel = model("user", userSchema);
