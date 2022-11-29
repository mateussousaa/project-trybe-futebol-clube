import { Router } from 'express';
import loginRoute from './login.route';
import teamsRouter from './team.route';
import matchRouter from './match.route';

const router = Router();
router.use('/login', loginRoute);
router.use('/teams', teamsRouter);
router.use('/matches', matchRouter);

export default router;
