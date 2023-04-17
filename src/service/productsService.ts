import * as productsRepository from '../repositories/productsRepository.js';
import { bad_request } from '../utils/errorUtils.js';

export async function getAll() {
  return await productsRepository.getAll();
}

export async function getWithFilters(filter: string, query) {
  if (filter === 'onAlphabeticalOrde')
    return await productsRepository.getWithAlphabeticalOrde();
  if (filter === 'byPrice') {
    let alphabeticalOrder = false;
    if ('alphabeticalOrder' in query) alphabeticalOrder = true;

    if ('biggerThen' in query) {
      return await productsRepository.getByPriceBiggerThen(
        query.biggerThen,
        alphabeticalOrder,
      );
    }

    if (!('start' in query) || !('end' in query))
      bad_request('Erro ao passar valores para buscar por preços');
    const { start, end } = query;

    return await productsRepository.getByPriceBetween(
      start,
      end,
      alphabeticalOrder,
    );
  }
}
