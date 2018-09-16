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
		// let  newGame = new Game(newWeek,
		// 										this.allTeams[newHomeTeamRank-1].name, this.allTeams[newAwayTeamRank-1].name, newDateTime)
		// test
		let  newGame = new Game(newWeek,
														newHomeTeamRank,
														newAwayTeamRank,
														newDateTime)
		this.allGames[newWeek-1].push(newGame)
	}

	getGames() {
		let schedule = this.year + `${View.SPACE()}` + this.title + ` Draw ${View.NEWLINE()}`
		for (let aWeek of this.allGames){
			schedule += 'Week: ' +aWeek[0].week + `${View.NEWLINE()}`
			for (let aGame of aWeek){
				// splitting date and time by T
				// e.g. "2018-07-16T07:35:00.000Z" =>
				// 2018-07-16 and 07:35:00.00Z
				let date = aGame.dateTime.split("T")
				// add date part first, 2018-07-16 eg.
				schedule += date[0] + `${View.SPACE()}`
				// and add time part, but cut just for first 5 parts, 07:35
				+ date[1].slice(0, 5) + `${View.SPACE()}`
				for (let aRank of this.allTeams){
						if (aRank["rank"] === aGame.homeTeamRank){
							console.log(aRank.name)
							var homeVenue = aRank.venue
							var homeCity = aRank.city
							console.log(homeVenue)
							schedule += aRank.name + `${View.SPACE()}`

						}
				}
				schedule += "v" + `${View.SPACE()}`
				for (let aRank of this.allTeams){
						if (aRank["rank"] === aGame.awayTeamRank){
							schedule += aRank.name + `${View.SPACE()}`
						}
				}
				schedule += homeVenue + `${View.SPACE()}`
									+ homeCity + `${View.NEWLINE()}`
			}
		}
		return schedule

	}

	getAll() {
		View.out(this.getTeams())
		View.out(this.getGames())
	}


}
