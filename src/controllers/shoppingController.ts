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

export async function updateQuanity(
  req: Request,
  res: Response,
): Promise<void> {
  const { shoppingId, newQuantity } = req.body;
  await shoppingService.updateQuantity(shoppingId, newQuantity);
  res.sendStatus(200);
}

export async function deleteById(req: Request, res: Response): Promise<void> {
  const { shoppingId } = req.body;
  await shoppingService.deleteById(shoppingId);
  res.sendStatus(204);
}

export async function finish(req: Request, res: Response): Promise<void> {
  const { shoppingId } = req.body;
  await shoppingService.finish(shoppingId);
  res.sendStatus(204);
}
