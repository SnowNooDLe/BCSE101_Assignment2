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

				schedule += newTimeHour +':'
						 + newTimeMinutes + `${View.SPACE()}`
				// Home team name by their rank
				for (let aRank of this.allTeams){
						if (aRank["rank"] === aGame.homeTeamRank){
							// console.log(aRank.name)
							var homeVenue = aRank.venue
							var homeCity = aRank.city
							// console.log(homeVenue)
							schedule += aRank.name + `${View.SPACE()}`
						}
				}
				schedule += "v" + `${View.SPACE()}`
				// Away team name by their rank
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

	getCanterburyGames(teamName) {
		// find the rank of the team we want, as I dont want to use magic number. futureproof
		for (let aTeam of this.allTeams){
			if (aTeam["name"] == teamName){
				var aRank = aTeam["rank"]
				console.log("im here to find a rank")
				console.log(aRank)
			}
		}
		let canterburyGame = 'Will only display Canterbury team games' + `${View.NEWLINE()}`
		console.log("Where am i?")
		for (let eachWeek of this.allGames){
			for (let aCanterburyGame of eachWeek){
				if (aCanterburyGame["homeTeamRank"] === aRank
					|| aCanterburyGame["awayTeamRank"] === aRank){
				console.log("am i here ?")
				canterburyGame += aCanterburyGame + `${View.NEWLINE()}`
				}
			}
		}
		console.log("Am i here ? Then why ?")
		return canterburyGame
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
