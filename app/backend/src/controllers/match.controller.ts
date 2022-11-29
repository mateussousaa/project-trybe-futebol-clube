import { RequestHandler } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  constructor(private _service = new MatchService()) {}
  getAllMatches: RequestHandler = async (req, res) => {
    const { inProgress } = req.query;
    let matches = await this._service.getAllMatches();
    if (inProgress === 'true') {
      matches = matches.filter((match) => match.inProgress);
    }
    res.status(200).json(matches);
  };
}
