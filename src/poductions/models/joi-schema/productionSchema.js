import Joi from "joi";

const productionSchema = {
  date: Joi.date().greater("now").required(),
  type: Joi.object().required(),
  location: Joi.string().min(2).max(256).required(),

  producer: Joi.array().items(Joi.object().required()),

  technician: Joi.array()
    .items(Joi.string().min(2).max(256))
    .unique()
    .required(),

  cameraOperators: Joi.array()
    .items(Joi.string().min(2).max(256))
    .unique()
    .required(),

  director: Joi.string().min(2).max(256).allow(""),
  visionMixerOperator: Joi.string().min(2).max(256).allow(""),
  editor: Joi.string().min(2).max(256).allow(""),
  audioEngineer: Joi.string().min(2).max(256).required(),
  vtr: Joi.array().items(Joi.string().min(2).max(256)).unique().allow(""),
  cg: Joi.string().min(2).max(256).allow(""),

  talents: Joi.array().items(Joi.string().min(2).max(256)).unique(),
};

export default productionSchema;
