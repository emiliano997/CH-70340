import Joi from "joi";

const productSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  price: Joi.number().required(),
});

export const bussinessDto = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  description: Joi.string().required(),
  products: Joi.array().items(productSchema).required(),
});
