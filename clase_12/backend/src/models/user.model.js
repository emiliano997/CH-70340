import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["user", "admin"],
  },
  orders: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "orders",
      },
    ],
    default: [],
  },
});

export const userModel = model("users", userSchema);
