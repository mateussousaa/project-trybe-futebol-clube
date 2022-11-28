import * as bcrypt from 'bcryptjs';
import IUserModel from '../interfaces/IUserModel';
import ILogin from '../interfaces/ILogin';
import { createToken, validateToken } from '../utils/jwt';
import HttpException from '../utils/HttpException';

export default class LoginService {
  constructor(private _model: IUserModel) {}
  login = async ({ email, password }: ILogin): Promise<string> => {
    const data = await this._model.findOne({ where: { email } });

    if (!data) throw new HttpException(401, 'Incorrect email or password');

    const { dataValues: userFinded } = data;

    const validPassword = await bcrypt.compare(password, userFinded.password);
    if (!validPassword) throw new HttpException(401, 'Incorrect email or password');

    const { password: _, ...userWithoutPassword } = userFinded;
    const token = createToken(userWithoutPassword);

    return token;
  };

  validateLogin = async (token: string) => validateToken(token);
}
