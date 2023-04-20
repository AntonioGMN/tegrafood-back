import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { unauthorized } from '../utils/errorUtils.js';
import * as sessoesRepository from '../repositories/sessionsRepository.js';

export default async function validateToken(
  req: Request,
  res: Response,
  nest: NextFunction,
) {
  const { authorization } = req.headers;
  if (!authorization) throw unauthorized('Erro com authorization header');

  const token = authorization?.replace('Bearer ', '');
  if (!token) throw unauthorized('Falta o token');

  try {
    const chaveSecreta = process.env.JWT_SECRET;
    const { userId } = jwt.verify(token, chaveSecreta);
    res.locals.userId = userId;
  } catch (error) {
    const { expiredAt } = error;
    if (expiredAt) return res.status(401).send('token expirou');

    return res.status(401).send('token invalido');
  }

  return nest();
}
