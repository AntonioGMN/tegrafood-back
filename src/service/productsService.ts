import * as productsRepository from '../repositories/productsRepository.js';

export async function getAll() {
  const users = await productsRepository.getAll();
  console.log(users);
  return users;
}
