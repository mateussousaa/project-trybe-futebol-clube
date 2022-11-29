import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import IUserWithoutPassword from '../interfaces/IUserWithoutPassword';
import HttpException from './HttpException';

dotenv.config();

const createToken = (data: IUserWithoutPassword): string => {
  const token = jwt.sign(
    data,
    process.env.JWT_SECRET as string,
    {
      expiresIn: '3d',
      algorithm: 'HS256',
    },
  );
  return token;
};

const validateToken = (token: string) => {
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET as string);
    return data;
  } catch (e) {
    throw new HttpException(401, 'Token must be a valid token');
  }
};

export { createToken, validateToken };
