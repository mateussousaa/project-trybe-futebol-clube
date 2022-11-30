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

export interface IMatchFromGetAll {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
  teamHome: {
    teamName: string
  },
  teamAway: {
    teamName: string
  }
}
