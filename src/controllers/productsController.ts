import { Request, Response } from 'express';
import * as productsService from '../service/productsService.js';
import { bad_request } from '../utils/errorUtils.js';

export async function getAll(req: Request, res: Response) {
  const { userId } = res.locals;
  const products = await productsService.getAll(userId);
  res.send(products);
}

export async function getWithFilters(req: Request, res: Response) {
  const { userId } = res.locals;
  let category: boolean | string = false;
  let alphabeticalOrder: boolean | string = false;
  let start: boolean | string = false;
  let end: boolean | string = false;

  if ('category' in req.query) {
    category = req.query.category.toString();
    const valideCategories = [
      'pizza',
      'sobremesa',
      'lanche',
      'açaí',
      'bebidas',
    ];
    if (!valideCategories.includes(category))
      bad_request('Categoria não aceita');
  }

  if ('alphabeticalOrder' in req.query) alphabeticalOrder = true;
  if ('start' in req.query) start = req.query.start.toString();
  if ('end' in req.query) end = req.query.end.toString();

  const products = await productsService.getWithFilters(
    category,
    alphabeticalOrder,
    start,
    end,
    userId,
  );

  res.send(products);
}

export async function create(req: Request, res: Response) {
  const product = req.body;
  product.image = req.file.filename;

  await productsService.create(product);

  res.sendStatus(201);
}

export async function updateAll(req: Request, res: Response) {
  const product = req.body;
  product.image = req.file.filename;
  await productsService.updateAll(product);

  res.sendStatus(200);
}

export async function update(req: Request, res: Response) {
  const product = req.body;
  await productsService.update(product);

  res.sendStatus(200);
}
