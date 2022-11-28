import { RequestHandler } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  constructor(private _service = new TeamService()) {}

  getAllTeams: RequestHandler = async (req, res) => {
    const teams = await this._service.findAllTeams();
    res.status(200).json(teams);
  };

  getTeam: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const team = await this._service.findTeam(Number(id));
    res.status(200).json(team);
  };
}
