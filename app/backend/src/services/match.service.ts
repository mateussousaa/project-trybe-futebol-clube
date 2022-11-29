import Team from '../database/models/Team';
import Match from '../database/models/Match';
import IMatchForCreation, { IMatchForUpdate } from '../interfaces/IMatch';
import HttpException from '../utils/HttpException';

export default class MatchService {
  getAllMatches = async () => Match.findAll({
    include: [
      { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
    ],
  });

  createMatch = async (match: IMatchForCreation) => {
    const homeTeam = await Match.findByPk(match.homeTeam);
    if (!homeTeam) throw new HttpException(404, 'There is no team with such id!');

    const awayTeam = await Match.findByPk(match.awayTeam);
    if (!awayTeam) throw new HttpException(404, 'There is no team with such id!');

    return Match.create({ ...match, inProgress: true });
  };

  finishMatch = async (id: number) => Match.update({ inProgress: false }, { where: { id } });

  updateMatch = async ({ homeTeamGoals, awayTeamGoals }: IMatchForUpdate, id: number) => {
    const match = await Match.findByPk(id);
    if (!match) throw new HttpException(404, 'invalid id');

    if (match.inProgress === true) {
      Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    }
  };
}
