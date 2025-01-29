import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  number: { type: Number, required: true },
  bussiness: {
    type: Schema.Types.ObjectId,
    ref: "bussinesses",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  products: {
    type: Array,
    default: [],
  },
  status: {
    type: String,
    required: true,
    default: "pending",
    enum: ["pending", "completed", "cancelled"],
  },
  total: { type: Number, required: true },
});

orderSchema.pre("find", function () {
  this.populate("bussiness");
  this.populate("user");
});

orderSchema.pre("findOne", function () {
  this.populate("bussiness");
  this.populate("user");
});

export const orderModel = model("orders", orderSchema);
