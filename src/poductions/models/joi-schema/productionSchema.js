import Joi from "joi";

const productionSchema = {
  date: Joi.date().greater("now").required(),
  type: Joi.string().required(),
  location: Joi.string(),
  producer: Joi.array().items(Joi.object()),
  technician: Joi.array().items(Joi.object()),
  cameraOperators: Joi.array().items(Joi.object()),
  director: Joi.string(),
  visionMixerOperator: Joi.string(),
  editor: Joi.string(),
  audioEngineer: Joi.string(),
  vtr: Joi.array().items(Joi.object()),
  cg: Joi.string(),

  talents: Joi.array().items(Joi.object()),
};

export default productionSchema;
