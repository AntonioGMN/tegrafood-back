import { string } from 'joi';
import Produc, * as productsRepository from '../repositories/productsRepository.js';
import { bad_request, forbidden } from '../utils/errorUtils.js';

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

export async function create(product: Produc) {
  return await productsRepository.create(product);
}
