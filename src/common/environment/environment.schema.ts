import * as Joi from 'joi';

export const EnvironmentSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  APP_NAME: Joi.string().default('WhatsApp Remote'),
  APP_PORT: Joi.number().default(9000),
});
