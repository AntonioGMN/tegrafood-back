import Produc, * as productsRepository from '../repositories/productsRepository.js';
import fs from 'fs';
import { notFound } from '../utils/errorUtils.js';

export async function getAll(userId: number) {
  return await productsRepository.getAll(userId);
}

export async function getWithFilters(
  category: boolean | string,
  alphabeticalOrder: boolean,
  start,
  end,
  userId: number,
) {
  if (start && end) {
    return await productsRepository.getByPriceBetween(
      start,
      end,
      alphabeticalOrder,
      category,
      userId,
    );
  }

  if (start) {
    return await productsRepository.getByPriceBiggerThen(
      start,
      alphabeticalOrder,
      category,
      userId,
    );
  }

  return await productsRepository.getWithAlphabeticalOrde(
    category,
    alphabeticalOrder,
    userId,
  );
}

export async function create(product: Produc): Promise<void> {
  return await productsRepository.create(product);
}

export async function updateAll(product: Produc): Promise<void> {
  const { image } = await productsRepository.find(product.id);
  fs.unlink('uploads/' + image, (err) => {
    if (err)
      notFound(
        'Erro ao bucar imagem antiga para exclusão antes da edição do produto',
      );
  });

  return await productsRepository.updateAll(product);
}

export async function update(product: Produc): Promise<void> {
  return await productsRepository.update(product);
}
