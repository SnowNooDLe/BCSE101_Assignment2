class Competition {
	constructor (newTitle, newYear) {
		this.title = newTitle
		this.year = newYear
		this.allPDTeams = []
		this.allCDTeams = []
		this.allTeams = []
		this.allGames = [[],[],[],[],[],[],[],[],[]]
	}

	addTeam(newRank, newName, newVenue, newCity){
		let newTeam = new Team(newRank, newName, newVenue, newCity)
		// To use for games home rank vs away rank
		this.allTeams.push(newTeam)
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

	addGame(newWeek, newHomeTeamRank, newAwayTeamRank, newDateTime){
		let  newGame = new Game(newWeek, this.allTeams[newHomeTeamRank-1].name, this.allTeams[newAwayTeamRank-1].name, newDateTime)
		this.allGames[newWeek-1].push(newGame)
	}

	getGames() {
		let schedule = this.year + `${View.SPACE()}` + this.title + ` Draw ${View.NEWLINE()}`
		for (let aWeek of this.allGames){
			schedule += 'Week: ' +aWeek[0].week + `${View.NEWLINE()}`
			for (let aGame of aWeek){
				let date = aGame.dateTime.split("T")
				schedule += date[0] + `${View.SPACE()}`
				+ date[1].slice(0, 5) + `${View.SPACE()}`
				+ aGame.homeTeamRank + `${View.SPACE()}` + "v" + `${View.SPACE()}`
				+ aGame.awayTeamRank + `${View.SPACE()}`
				// + `${View.NEWLINE()}`
				+ this.allTeams[].venue + `${View.SPACE()}`
				+ this.allTeams[].city + `${View.NEWLINE()}`
			}
		}
		return schedule

	}

	getAll() {
		View.out(this.getTeams())
		View.out(this.getGames())
	}


}
