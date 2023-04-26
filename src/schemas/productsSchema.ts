import joi from 'joi';

const productsSchema = joi.object({
  name: joi.string().required(),
  price: joi.string().required(),
  category: joi
    .string()
    .valid('pizza', 'sobremesa', 'lanche', 'açaí', 'bebidas')
    .required(),
  description: joi.string().required(),
});

export default productsSchema;
