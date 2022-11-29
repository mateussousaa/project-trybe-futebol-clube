import { RequestHandler } from 'express';
import { validateToken } from '../utils/jwt';

const authMiddleware: RequestHandler = (req, res, next) => {
  const { authorization } = req.headers;
  validateToken(authorization as string);
  next();
};

export default authMiddleware;
