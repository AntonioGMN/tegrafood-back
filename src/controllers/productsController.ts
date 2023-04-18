import { Request, Response } from 'express';
import * as productsService from '../service/productsService.js';

export async function getAll(req: Request, res: Response) {
  const products = await productsService.getAll();
  res.send(products);
}

export async function getWithFilters(req: Request, res: Response) {
  const query = req.query;
  const products = await productsService.getWithFilters(query);

  res.send(products);
}
