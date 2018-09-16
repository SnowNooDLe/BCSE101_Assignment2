class Competition {
	constructor (newTitle, newYear) {
		this.title = newTitle
		this.year = newYear
		this.allPDTeams = []
		this.allCDTeams = []
		this.allGames = []
	}

	addTeam(newRank, newName, newVenue, newCity){
		let newTeam = new Team(newRank, newName, newVenue, newCity)
		if (newRank <= 7){
			this.allPDTeams.push(newTeam)
		}
		else {
			this.allCDTeams.push(newTeam)
		}

	}

	getTeams() {
		let result = `TEAMS ${View.NEWLINE()}`
		result += `Premiership Division ${View.NEWLINE()}`

		for (let aTeam of this.allPDTeams){
			result += aTeam + `${View.NEWLINE()}`
		}
		result += `Championship Division ${View.NEWLINE()}`
		for (let aTeam of this.allCDTeams){
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
