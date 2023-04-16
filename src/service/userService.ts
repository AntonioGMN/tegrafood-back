import user, * as userRepository from '../repositories/userRepository.js';
import * as sessoesRepository from '../repositories/sessionsRepository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { forbidden, notFound, unauthorized } from '../utils/errorUtils.js';

interface loginDate {
  email: string;
  password: string;
}

export async function signUp(userDate: user) {
  const findedUser = await userRepository.findByEmail(userDate.email);

  if (findedUser) {
    forbidden('esse email já está cadastrado');
  }

  const passwordHash = bcrypt.hashSync(userDate.password, 10);

  const hashUser = { ...userDate, password: passwordHash };
  return await userRepository.create(hashUser);
}

export async function login(loginDate: loginDate) {
  const findedUser = await userRepository.findByEmail(loginDate.email);
  if (findedUser === undefined) {
    notFound('Não foi encontrado um usuário com esse email');
  }

  const hashPassword = findedUser.password;
  const validatePassword = bcrypt.compareSync(loginDate.password, hashPassword);
  if (!validatePassword) unauthorized('Senha não incorreta');

  const sessao = await sessoesRepository.findByUserId(findedUser.id);
  if (sessao) unauthorized('Esse usuario já está logado');

  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign({ userId: findedUser.id }, secretKey, {
    expiresIn: 3600,
  });
  await sessoesRepository.create(findedUser.id, token);

  delete findedUser.password;
  return { token, user: findedUser };
}

export async function logout(userId: number) {
  return await sessoesRepository.logout(userId);
}

export async function find(userId: number) {
  const users = await userRepository.findById(userId);
  return users;
}
