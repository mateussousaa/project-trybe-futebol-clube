import Team from '../database/models/Team';
import Match from '../database/models/Match';

export default class MatchService {
  getAllMatches = async () => Match.findAll({
    include: [
      { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
    ],
  });
}
