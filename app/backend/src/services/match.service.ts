import Team from '../database/models/Team';
import Match from '../database/models/Match';
// import IMatchForCreation from '../interfaces/IMatch';

export default class MatchService {
  getAllMatches = async () => Match.findAll({
    include: [
      { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
    ],
  });

  // createMatch = async (match: IMatchForCreation) => Match.create({ ...match, inProgress: true });
}
