import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import MatchController from '../controllers/match.controller';

const matchRouter = Router();

const controller = new MatchController();

matchRouter.get('/', controller.getAllMatches);
matchRouter.post('/', authMiddleware, controller.createMatch);
matchRouter.patch('/:id/finish', controller.finishMatch);

export default matchRouter;
