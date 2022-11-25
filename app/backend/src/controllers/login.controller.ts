import { RequestHandler } from 'express';
import IUserService, { userDataFromToken } from '../interfaces/IUserService';

export default class LoginController {
  constructor(private _service: IUserService) {}

  login: RequestHandler = async (req, res) => {
    const { email, password } = req.body;
    const token = await this._service.login({ email, password });
    return res.status(200).json({ token });
  };

  validateLogin: RequestHandler = async (req, res) => {
    const { authorization } = req.headers;
    const data = await this._service.validateLogin(authorization as string) as userDataFromToken;
    return res.status(200).json({ role: data.role });
  };
}
