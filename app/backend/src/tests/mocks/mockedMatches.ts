const mockedMatches = [
	{
		id: 1,
		homeTeam: 16,
		homeTeamGoals: 1,
		awayTeam: 8,
		awayTeamGoals: 1,
		inProgress: false,
		teamHome: {
			teamName: "São Paulo"
		},
		teamAway: {
			teamName: ""
		}
	},
	{
		id: 2,
		homeTeam: 9,
		homeTeamGoals: 1,
		awayTeam: 14,
		awayTeamGoals: 1,
		inProgress: false,
		teamHome: {
			teamName: "Internacional"
		},
		teamAway: {
			teamName: "Santos"
		}
	},
	{
		id: 3,
		homeTeam: 4,
		homeTeamGoals: 3,
		awayTeam: 11,
		awayTeamGoals: 0,
		inProgress: false,
		teamHome: {
			teamName: "Corinthians"
		},
		teamAway: {
			teamName: "Napoli-SC"
		}
	},
	{
		id: 4,
		homeTeam: 3,
		homeTeamGoals: 0,
		awayTeam: 2,
		awayTeamGoals: 0,
		inProgress: false,
		teamHome: {
			teamName: "Botafogo"
		},
		teamAway: {
			teamName: "Bahia"
		}
  }
]

const mockedMatchesInProgress = [
  {
		id: 43,
		homeTeam: 11,
		homeTeamGoals: 0,
		awayTeam: 10,
		awayTeamGoals: 0,
		inProgress: true,
		teamHome: {
			teamName: "Napoli-SC"
		},
		teamAway: {
			teamName: "Minas Brasília"
		}
	},
	{
		id: 44,
		homeTeam: 7,
		homeTeamGoals: 2,
		awayTeam: 15,
		awayTeamGoals: 2,
		inProgress: true,
		teamHome: {
			teamName: "Flamengo"
		},
		teamAway: {
			teamName: "São José-SP"
		}
	},
]

const matchForCreation = {
  homeTeam: 16,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
}

const createdMatch = {
	id: 49,
	homeTeam: 16,
	awayTeam: 1,
	homeTeamGoals: 2,
	awayTeamGoals: 2,
	inProgress: true
}

export default mockedMatches

export { mockedMatchesInProgress, matchForCreation, createdMatch }