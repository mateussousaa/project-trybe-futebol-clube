import { ErrorRequestHandler } from 'express';
import HttpException from '../utils/HttpException';

const errorHandling: ErrorRequestHandler = (err, req, res, _next) => {
  const { statusCode, message } = err as HttpException;
  res.status(statusCode || 500).json({ message });
};

export default errorHandling;
