import { Router } from 'express';
import MatchController from '../controllers/match.controller';

const matchRouter = Router();

const controller = new MatchController();

matchRouter.get('/', controller.getAllMatches);
// matchRouter.post('/', controller.createMatch);

export default matchRouter;
