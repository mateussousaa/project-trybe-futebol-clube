import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import MatchController from '../controllers/match.controller';
import validateCreateMatches from '../middlewares/validateCreateMatches';

const matchRouter = Router();

const controller = new MatchController();

matchRouter.get('/', controller.getAllMatches);
matchRouter.post('/', authMiddleware, validateCreateMatches, controller.createMatch);
matchRouter.patch('/:id/finish', controller.finishMatch);
matchRouter.patch('/:id', controller.updateMatch);

export default matchRouter;
