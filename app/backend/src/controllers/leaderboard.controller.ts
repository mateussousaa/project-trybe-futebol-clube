import { RequestHandler } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  constructor(private _service = new LeaderboardService()) {}

  getHomeTeamsRank: RequestHandler = async (req, res) => {
    const matches = await this._service.getHomeTeamsRank();
    res.status(200).json(matches);
  };
}
