import { Router } from 'express';
import loginRoute from './login.route';
import teamsRouter from './team.route';
import matchRouter from './match.route';
import leaderboardRouter from './leaderboard.route';

const router = Router();
router.use('/login', loginRoute);
router.use('/teams', teamsRouter);
router.use('/matches', matchRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
