import { RequestHandler } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  constructor(private _service = new MatchService()) {}

  getAllMatches: RequestHandler = async (req, res) => {
    const { inProgress } = req.query;
    let matches = await this._service.getAllMatches();

    if (inProgress === 'true' || inProgress === 'false') {
      const boolean = inProgress === 'true';
      matches = matches.filter((match) => match.inProgress === boolean);
    }
    return res.status(200).json(matches);
  };

  createMatch: RequestHandler = async (req, res) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    const match = await this._service.createMatch({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
    });
    return res.status(201).json(match);
  };

  finishMatch: RequestHandler = async (req, res) => {
    const { id } = req.params;
    await this._service.finishMatch(Number(id));
    res.status(200).json({ message: 'Finished' });
  };

  updateMatch: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this._service.updateMatch({ homeTeamGoals, awayTeamGoals }, Number(id));
    res.status(200).json({ homeTeamGoals, awayTeamGoals });
  };
}
