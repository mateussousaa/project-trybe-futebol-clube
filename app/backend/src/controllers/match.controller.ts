import { RequestHandler } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  constructor(private _service = new MatchService()) {}
  getAllMatches: RequestHandler = async (req, res) => {
    const matches = await this._service.getAllMatches();
    res.status(200).json(matches);
  };
}
