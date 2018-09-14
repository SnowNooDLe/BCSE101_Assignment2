class Competition {
	constructor (newTitle, newYear) {
		this.title = newTitle
		this.year = newYear
		this.allTeams = []
		this.allGames = []
	}

	addTeam(newRank, newName, newVenue, newCity){
		let newTeam = new Team(newRank, newName, newVenue, newCity)
		this.allTeams.push(newTeam)
	}

	getTeams() {
		let result = `TEAMS ${View.NEWLINE()}`
		console.log("testing")
		console.log(this.allTeams[0].rank)
		console.log(this.allTeams.length / 2)
		for (let aTeam of this.allTeams){
			if (aTeam.rank === 1){
				result += `Premiership Division ${View.NEWLINE()}`
			}
			else if (aTeam.rank === 8){
				result += `Championship Division ${View.NEWLINE()}`
			}
			result += aTeam + `${View.NEWLINE()}`

		}
		return result
	}

	getAll() {
		View.out(this.getTeams())
	}

	addGame(newWeek, newHomeTeamRank, newAwayTeamRank, newDateTime){
		let  newGame = new Game(newWeek, newHomeTeamRank, newAwayTeamRank, newDateTime)
		this.allGames.push(newGame)
	}
}
