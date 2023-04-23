import joi from 'joi';

export const createShoppingSchema = joi.object({
  productId: joi.number().required(),
});

export const updateQuantitySchema = joi.object({
  shoppingId: joi.number().required(),
  newQuantity: joi.number().required(),
});

export const onlyShoppingIdSchema = joi.object({
  shoppingId: joi.number().required(),
});
