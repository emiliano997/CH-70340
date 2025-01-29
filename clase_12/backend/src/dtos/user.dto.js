import Joi from "joi";

export const userDto = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid("admin", "user").required(),
});
