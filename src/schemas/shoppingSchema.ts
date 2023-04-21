import joi from 'joi';

const shoppingSchema = joi.object({
  productId: joi.number().required(),
});

export default shoppingSchema;
