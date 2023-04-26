import * as shoppingRepository from '../repositories/shoppingRepository.js';
import { notFound } from '../utils/errorUtils.js';

export async function create(userId: number, productId: number) {
  return await shoppingRepository.create(userId, productId);
}

export async function getByUserId(userId: number) {
  return await shoppingRepository.getIncompleteByUserId(userId);
}

export async function updateQuantity(
  shoppingId: number,
  newQuantity: number,
): Promise<void> {
  return await shoppingRepository.updateQuantity(shoppingId, newQuantity);
}

export async function deleteById(shoppingId: number): Promise<void> {
  const findedShopping = await shoppingRepository.findbyId(shoppingId);
  if (!findedShopping) notFound('Não foi encontrada compra com esse id');

  return await shoppingRepository.deleteById(shoppingId);
}

export async function finish(shoppingId: number): Promise<void> {
  const findedShopping = await shoppingRepository.findbyId(shoppingId);
  if (!findedShopping) notFound('Não foi encontrada compra com esse id');

  return await shoppingRepository.finish(shoppingId);
}
