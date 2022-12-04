import Team from '../database/models/Team';
import Match from '../database/models/Match';
import ITeamInfoToRank, { ITeam } from '../interfaces/ITeam';
import { IMatch } from '../interfaces/IMatch';
import {
  homeTeamInfoFromMatches,
  awayTeamInfoFromMatches,
  createTeamInfo,
} from '../utils/leaderboardUtils';
import ILeaderboardType from '../interfaces/ILeaderboardType';

export default class LeaderboardService {
  private _rank: ITeamInfoToRank[] = [];

  constructor(private _model = new Match()) {}

  getTeamsRank = async ({ type }: ILeaderboardType) => {
    const matches = await Match.findAll({ where: { inProgress: false } }) as IMatch[];
    const teams = await LeaderboardService.getAllTeams() as ITeam[];

    const teamsInfo = teams.map((team) => LeaderboardService.fillRankByTeam(matches, team, type));
    this._rank = LeaderboardService.sortRankByPoints(teamsInfo);
    return this._rank;
  };

  getAllTeamsRank = async () => {
    const matches = await Match.findAll({ where: { inProgress: false } }) as IMatch[];
    const teams = await LeaderboardService.getAllTeams() as ITeam[];

    const homeTeams = teams.map((team) => LeaderboardService.fillRankByTeam(matches, team, 'home'));
    const awayTeams = teams.map((team) => LeaderboardService.fillRankByTeam(matches, team, 'away'));

    const teamsInfo = homeTeams.map((ht) => {
      const index = awayTeams.findIndex((at) => ht.name === at.name);
      const info = LeaderboardService.sumStats(ht, awayTeams[index]);
      return info;
    });
    this._rank = LeaderboardService.sortRankByPoints(teamsInfo);
    return this._rank;
  };

  private static sumStats(home: ITeamInfoToRank, away: ITeamInfoToRank) {
    const teamInfo = createTeamInfo(home.name);
    teamInfo.totalPoints = home.totalPoints + away.totalPoints;
    teamInfo.totalGames = home.totalGames + away.totalGames;
    teamInfo.totalVictories = home.totalVictories + away.totalVictories;
    teamInfo.totalDraws = home.totalDraws + away.totalDraws;
    teamInfo.totalLosses = home.totalLosses + away.totalLosses;
    teamInfo.goalsFavor = home.goalsFavor + away.goalsFavor;
    teamInfo.goalsOwn = home.goalsOwn + away.goalsOwn;
    teamInfo.goalsBalance = home.goalsBalance + away.goalsBalance;
    teamInfo.efficiency = (teamInfo.totalPoints / (teamInfo.totalGames * 3)) * 100;
    teamInfo.efficiency = parseFloat(teamInfo.efficiency.toFixed(2));
    return teamInfo;
  }

  private static async getAllTeams() {
    const teams = await Team.findAll();
    return teams;
  }

  private static fillRankByTeam(matches: IMatch[], team: ITeam, type: string): ITeamInfoToRank {
    if (type === 'home') {
      return homeTeamInfoFromMatches(matches, team);
    } if (type === 'away') {
      return awayTeamInfoFromMatches(matches, team);
    }
    throw new Error('error');
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
