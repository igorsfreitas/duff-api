import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  /* service */
  HOST: Joi.string().hostname(),
  PORT: Joi.number().port(),

  /* database */
  TYPEORM_CONNECTION: Joi.string().default('sqlite'),
  TYPEORM_DATABASE: Joi.string().required(),
});
