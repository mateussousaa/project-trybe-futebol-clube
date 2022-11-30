import ITeamInfoToRank, { ITeam } from '../interfaces/ITeam';
import { IMatch } from '../interfaces/IMatch';

const generatePoints = (teamAGoals: number, teamBGoals: number) => {
  if (teamAGoals > teamBGoals) return 3;
  if (teamAGoals === teamBGoals) return 1;
  return 0;
};

const generateResults = (results: number[], points: number) => {
  const a = results.reduce((acc, cur) => {
    if (cur === points) return acc + 1;
    return acc;
  }, 0);
  return a;
};

const createTeamInfo = (receivedName: string): ITeamInfoToRank => ({
  name: receivedName,
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
});

const calculateEfficiency = (points: number, matches: number) => {
  const efficiency = (points / (matches * 3)) * 100;
  return parseFloat(efficiency.toFixed(2));
};

const fillTeamInfoFromMatches = (matches: IMatch[], team: ITeam) => {
  const teamInfo = createTeamInfo(team.teamName);
  const results: number[] = [];
  matches.forEach((match) => {
    if (match.homeTeam === team.id) {
      const points = generatePoints(match.homeTeamGoals, match.awayTeamGoals);
      results.push(points);
      teamInfo.totalPoints += points;
      teamInfo.totalGames += 1;

      teamInfo.goalsFavor += match.homeTeamGoals;
      teamInfo.goalsOwn += match.awayTeamGoals;
    }
  });
  teamInfo.totalVictories = generateResults(results, 3);
  teamInfo.goalsBalance = teamInfo.goalsFavor - teamInfo.goalsOwn;
  teamInfo.totalDraws = generateResults(results, 1);
  teamInfo.totalLosses = generateResults(results, 0);
  teamInfo.efficiency = calculateEfficiency(teamInfo.totalPoints, results.length);

  return teamInfo;
};

export { generatePoints, fillTeamInfoFromMatches };
