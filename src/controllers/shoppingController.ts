import { Request, Response } from 'express';
import * as shoppingService from '../service/shoppingService.js';

export async function create(req: Request, res: Response) {
  const { userId } = res.locals;
  const { productId } = req.body;

  await shoppingService.create(userId, productId);
  res.sendStatus(201);
}

export async function getByUserId(req: Request, res: Response) {
  const { userId } = res.locals;

  const products = await shoppingService.getByUserId(userId);
  res.status(200).send(products);
}
