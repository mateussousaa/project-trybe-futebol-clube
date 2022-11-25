import { RequestHandler } from 'express';

const validateLoginSchema: RequestHandler = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });
  next();
};

export default validateLoginSchema;
