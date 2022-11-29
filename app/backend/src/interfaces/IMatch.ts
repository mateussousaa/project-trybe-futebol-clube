export default interface IMatchForCreation {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IMatchForUpdate {
  homeTeamGoals: number,
  awayTeamGoals: number,
}
