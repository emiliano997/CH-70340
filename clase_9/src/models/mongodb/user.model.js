import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  toys: {
    type: [Schema.Types.ObjectId],
    ref: "toy",
    default: [],
  },
});

export const userModel = model("user", userSchema);
