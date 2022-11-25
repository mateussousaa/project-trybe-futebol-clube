import { Router } from 'express';
import validateLoginSchema from '../middlewares/validateLoginSchema';
import User from '../database/models/User';
import LoginService from '../services/login.service';
import LoginController from '../controllers/login.controller';

const loginRoute = Router();

const service = new LoginService(User);
const controller = new LoginController(service);

loginRoute.post('/', validateLoginSchema, controller.login);
loginRoute.get('/validate', controller.validateLogin);

export default loginRoute;
