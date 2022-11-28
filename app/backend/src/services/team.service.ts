import Team from '../database/models/Team';

export default class TeamService {
  constructor(private _service = Team) {}
  findAllTeams = async () => this._service.findAll();

  findTeam = async (id: number) => this._service.findByPk(id);
}
