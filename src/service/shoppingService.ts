import * as shoppingRepository from '../repositories/shoppingRepository.js';

export async function create(userId: number, productId: number) {
  return await shoppingRepository.create(userId, productId);
}

export async function getByUserId(userId: number) {
  return await shoppingRepository.getByUserId(userId);
}
