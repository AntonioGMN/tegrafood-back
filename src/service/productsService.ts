import Produc, * as productsRepository from '../repositories/productsRepository.js';
import { bad_request, forbidden } from '../utils/errorUtils.js';

export async function getAll() {
  return await productsRepository.getAll();
}

export async function getWithFilters(query) {
  if (query === null) bad_request('Não foi passado parametros para busca');

  let category;
  if ('category' in query) {
    category = query.category;
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

  let alphabeticalOrder = false;
  category = false;
  if ('alphabeticalOrder' in query) alphabeticalOrder = true;
  if ('category' in query) category = query.category;

  if ('biggerThen' in query) {
    return await productsRepository.getByPriceBiggerThen(
      query.biggerThen,
      alphabeticalOrder,
      category,
    );
  }

  if ('start' in query || 'end' in query) {
    if (!('start' in query) || !('end' in query))
      bad_request('Erro ao passar valores para buscar por preços');
    const { start, end } = query;

    return await productsRepository.getByPriceBetween(
      start,
      end,
      alphabeticalOrder,
      category,
    );
  }

  if ('category' in query) category = query.category;

  return await productsRepository.getWithAlphabeticalOrde(
    category,
    alphabeticalOrder,
  );
}

export async function create(product: Produc) {
  return await productsRepository.create(product);
}
