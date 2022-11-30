import Team from '../database/models/Team';
import Match from '../database/models/Match';
import ITeamInfoToRank, { ITeam } from '../interfaces/ITeam';
import { IMatch } from '../interfaces/IMatch';
import { fillTeamInfoFromMatches } from '../utils/leaderboardUtils';

export default class LeaderboardService {
  private _rank: ITeamInfoToRank[] = [];

  constructor(private _model = new Match()) {}

  getHomeTeamsRank = async () => {
    const matches = await Match.findAll({ where: { inProgress: false } }) as IMatch[];
    const teams = await LeaderboardService.getAllTeams() as ITeam[];

    const teamsInfo = teams.map((team) => LeaderboardService.fillRankByTeam(matches, team));
    this._rank = LeaderboardService.sortRankByPoints(teamsInfo);
    return this._rank;
  };

  private static async getAllTeams() {
    const teams = await Team.findAll();
    return teams;
  }

  private static fillRankByTeam(matches: IMatch[], team: ITeam): ITeamInfoToRank {
    const teamInfo = fillTeamInfoFromMatches(matches, team);
    return teamInfo;
  }

  private static sortRankByPoints(teamsInfo: ITeamInfoToRank[]) {
    const sortedInfo = teamsInfo.sort((a, b) =>
      b.totalPoints - a.totalPoints
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || a.goalsOwn - b.goalsOwn);
    return sortedInfo;
  }
}
