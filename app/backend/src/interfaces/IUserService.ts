import { JwtPayload } from 'jsonwebtoken';
import ILogin from './ILogin';

export interface userDataFromToken {
  id: number,
  username: string,
  role: string,
  email: string,
  iat: number,
  exp: number
}

export default interface IUserService {
  login(user: ILogin): Promise<string>,
  validateLogin(token: string): Promise<JwtPayload | string>
}
