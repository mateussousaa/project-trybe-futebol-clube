import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardRouter = Router();

const controller = new LeaderboardController();

leaderboardRouter.get('/home', controller.getHomeTeamsRank);
leaderboardRouter.get('/away', controller.getAwayTeamsRank);
leaderboardRouter.get('/', controller.getTeamsRank);

export default leaderboardRouter;
