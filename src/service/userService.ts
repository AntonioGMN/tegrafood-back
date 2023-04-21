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

  const session = await sessoesRepository.findByUserId(findedUser.id);
  if (session) await sessoesRepository.logout(session.user_id);

  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign({ userId: findedUser.id }, secretKey, {
    expiresIn: 60,
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

export async function refleshToken(oldToken: string) {
  const response = await sessoesRepository.findByToken(oldToken);
  console.log('response ', response);
  if (!response) unauthorized('Token invalido para refresh');

  const { user_id } = response;
  const secretKey = process.env.JWT_SECRET;
  const newToken = jwt.sign({ userId: user_id }, secretKey, {
    expiresIn: 60,
  });

  await sessoesRepository.updateToken(newToken, user_id);
  return newToken;
}
