import { Request, Response } from 'express';
import * as shoppingService from '../service/shoppingService.js';

export async function create(req: Request, res: Response) {
  const { userId } = res.locals;
  const { productId } = req.body;

  await shoppingService.create(userId, productId);
  res.sendStatus(200);
}
