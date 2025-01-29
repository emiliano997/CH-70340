import { Schema, model } from "mongoose";

const bussinessSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  products: {
    type: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    default: [],
  },
});

export const bussinessModel = model("bussinesses", bussinessSchema);
