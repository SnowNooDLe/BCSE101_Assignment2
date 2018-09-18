class Competition {
	constructor (newTitle, newYear) {
		this.title = newTitle
		this.year = newYear
		// futureproof lists for each Premiership and Championship
		// for crossgames.
		this.allPDTeams = []
		this.allCDTeams = []
		// whole lists of team for Premiership and Championship based onrank
		this.allTeams = []
		// there are number of games each week, and number of weeks
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
		let  newGame = new Game(newWeek,
														newHomeTeamRank,
														newAwayTeamRank,
														newDateTime)
		this.allGames[newWeek-1].push(newGame)
	}

	getGames() {
		let schedule = this.year + `${View.SPACE()}` + this.title + ` Draw ${View.NEWLINE()}`
		for (let aWeek of this.allGames){
			schedule += "Week: " +aWeek[0].week + `${View.NEWLINE()}`
			for (let aGame of aWeek){
				// to get the date type, e.g. Mon, Jul 16 2018
				let newDate = new Date(aGame.dateTime).toDateString()
				// adding that date
				schedule += newDate + `${View.SPACE()}`
				// to get time part, couldnt figure out to get just 07:35 part other than this,
				// As Mike said, I found the working way, which is a big picture, and can simplfy later
				// get Hour value
				let newTimeHour = new Date(aGame.dateTime).getHours()
				// get minuts value
				let newTimeMinutes = new Date(aGame.dateTime).getMinutes()

				schedule += newTimeHour +':' + newTimeMinutes + `${View.SPACE()}`

									// getting name for home team from rank
				schedule += "Team: " + this.allTeams[aGame.homeTeamRank - 1].name
									+ `${View.SPACE()}`
									+ "v"
									+ `${View.SPACE()}`
									// getting name for away team from rank
									+ this.allTeams[aGame.awayTeamRank - 1].name
									+ `${View.SPACE()}`
									// getting venue for home team from rank
									+ "At: " + this.allTeams[aGame.homeTeamRank - 1].venue
									// getting city for home team from rank
									+ ", " + this.allTeams[aGame.homeTeamRank - 1].city
									+ `${View.NEWLINE()}`
			}
		}
		return schedule
	}

	getCanterburyGames(teamName) {
		// find the rank of the team we want, as I dont want to use magic number. futureproof
		for (let aTeam of this.allTeams){
			if (aTeam["name"] == teamName){
				var aRank = aTeam["rank"]
			}
		}
		let specificTeam = "Will only display " + teamName + " team games" + `${View.NEWLINE()}`
		for (let eachWeek of this.allGames){
			for (let specificTeamGame of eachWeek){
				if (specificTeamGame["homeTeamRank"] === aRank
						|| specificTeamGame["awayTeamRank"] === aRank){
					specificTeam += "Week: " + specificTeamGame.week
													+ `${View.SPACE()}`
													+ "Team: " + this.allTeams[specificTeamGame.homeTeamRank - 1].name
													+ `${View.SPACE()}`
													+ "v"
													+ `${View.SPACE()}`
													+ this.allTeams[specificTeamGame.awayTeamRank - 1].name
													+ `${View.SPACE()}`
													+ "At: " + this.allTeams[specificTeamGame.homeTeamRank -1].venue
													+ `${View.SPACE()}`
													+ this.allTeams[specificTeamGame.homeTeamRank -1].city
					 								+ `${View.NEWLINE()}`
				}
			}
		}
		return specificTeam
	}
	// Thinking to make a method that will create dictionary.
	// So i can get team name by knowing their rank
	getCrossOvergames() {

	}

	getAll() {
		View.out(this.getTeams())
		View.out(this.getGames())
		View.out(this.getCanterburyGames('Canterbury'))
	}


}
