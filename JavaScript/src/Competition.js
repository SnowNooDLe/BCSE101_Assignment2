// create class called Competition
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
		// will be better way, but this will be used in getCrossOverGames.
		this.allPDRanks = []
		this.allCDRanks = []
	}

	// addTeam method, to add teams into each lists.
	addTeam(newRank, newName, newVenue, newCity){
		let newTeam = new Team(newRank, newName, newVenue, newCity)
		// To use for games home rank vs away rank
		this.allTeams.push(newTeam)
		// I know magic number is not a great way to do so, but for this assignment,
		// only have 14 teams, so used magic number
		// rank between 1~7 are in Premiership Division
		if (newRank <= 7){
			this.allPDTeams.push(newTeam)
			this.allPDRanks.push(newTeam.rank)
		}
		// rank between 8~14 are in Championship Division
		else {
			this.allCDTeams.push(newTeam)
			this.allCDRanks.push(newTeam.rank)
		}

	}

	// getTeam method, will print out all teams from each division.
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

	// addGame method, add all games into list.
	addGame(newWeek, newHomeTeamRank, newAwayTeamRank, newDateTime){
		let  newGame = new Game(newWeek,
														newHomeTeamRank,
														newAwayTeamRank,
														newDateTime)
		// as list's index start from 0 but there is no week 0. so minus 1 from week
		this.allGames[newWeek-1].push(newGame)
	}

	// getGames method, from list, printout on html to see the list of games.
	getGames() {
		let schedule = this.year + `${View.SPACE()}` + this.title + ` Draw ${View.NEWLINE()}`
		for (let aWeek of this.allGames){
			schedule += "Week:" + aWeek[0].week + `${View.NEWLINE()}`
			for (let aGame of aWeek){
				// to get the date type, e.g. Mon, Jul 16 2018
				let newDate = new Date(aGame.dateTime).toDateString()
				// adding that date
				schedule += newDate + `${View.SPACE()}`
				// getting time like 7:35PM
				// was gonna use navigator.language instead of en-US but it comes up with korean
				// even thought default language is ENG
				let newTime = new Date(aGame.dateTime).toLocaleTimeString("en-US", {hour: "numeric", minute: "numeric"})
				schedule += newTime + `${View.SPACE()}`

									// getting name for home team from rank
				schedule += "Team: " + this.allTeams[aGame.homeTeamRank - 1].name
									+ `${View.SPACE()}`
									+ "vs"
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

	// getCanterburyGames method, was thinking to call getGames as based on the teamName,
	// my method will print out different result but pdf asks specific name for this method
	// But still for futureproof, this method will receive variable called teamName
	// which is a string, that we want to get result out of.
	getCanterburyGames(teamName) {
		// find the rank of the team we want, as I dont want to use magic number. futureproof
		for (let aTeam of this.allTeams){
			if (aTeam["name"] == teamName){
				var aRank = aTeam["rank"]
			}
		}
		// again, fufure proofing print line, instead of fixed string with Canterbury
		let specificTeam = "Will only display " + teamName + " team games" + `${View.NEWLINE()}`
		// allGames will have multiple lists inside as there are more than one week of games
		for (let eachWeek of this.allGames){
			// and get each games from each week
			for (let specificTeamGame of eachWeek){
				if (specificTeamGame["homeTeamRank"] === aRank
						|| specificTeamGame["awayTeamRank"] === aRank){
					// converting time into string, readable time format
					let newDate = new Date(specificTeamGame.dateTime).toDateString()
					specificTeam += newDate + `${View.SPACE()}`
					// getting time like 7:35PM
					// was gonna use navigator.language instead of en-US but it comes up with korean
					// even thought default language is ENG
					let newTime = new Date(specificTeamGame.dateTime).toLocaleTimeString("en-US", {hour: "numeric", minute: "numeric"})

					specificTeam += newTime + `${View.SPACE()}`

					specificTeam += "Week:" + specificTeamGame.week
													+ `${View.SPACE()}`
													// getting hometeam name by rank
													+ "Team: " + this.allTeams[specificTeamGame.homeTeamRank - 1].name
													+ `${View.SPACE()}`
													+ "v"
													+ `${View.SPACE()}`
													// getting awayteam name by rank
													+ this.allTeams[specificTeamGame.awayTeamRank - 1].name
													+ `${View.SPACE()}`
													// getting hometeam venue by rank
													+ "At: " + this.allTeams[specificTeamGame.homeTeamRank -1].venue
													+ `${View.SPACE()}`
													// getting hometeam city by rank
													+ this.allTeams[specificTeamGame.homeTeamRank -1].city
					 								+ `${View.NEWLINE()}`
				}
			}
		}
		return specificTeam
	}

	// getCrossOverGames method, to print out games thats between Premiership and
	// Championship
	getCrossOverGames() {
		let crossovergames = "Will display crossover games" + `${View.NEWLINE()}`
		// allGames will have multiple lists inside as there are more than one week of games
		for (let eachWeek of this.allGames){
			// and get each games from each week
			for (let teamGame of eachWeek){
				// as crossover is between Championship and Premiership, so we have to check
				// both home and away.
				// I also made a list called allPDRanks, allCDRanks so I can use includes
				// builtin function to find whether this list contains the rank we are
				// looking
				if ((this.allPDRanks.includes(teamGame["homeTeamRank"]) &&
							this.allCDRanks.includes(teamGame["awayTeamRank"]))
						||
						(this.allCDRanks.includes(teamGame["homeTeamRank"]) &&
									this.allPDRanks.includes(teamGame["awayTeamRank"]))){
					// again, change time to readable, understandable time format
					let newDate = new Date(teamGame.dateTime).toDateString()
					crossovergames += newDate + `${View.SPACE()}`
					// getting time like 7:35PM
					// was gonna use navigator.language instead of en-US but it comes up with korean
					// even thought default language is ENG
					let newTime = new Date(teamGame.dateTime).toLocaleTimeString("en-US", {hour: "numeric", minute: "numeric"})

					crossovergames += newTime + `${View.SPACE()}`

					crossovergames += "Week:" + teamGame.week
													+ `${View.SPACE()}`
													// unlike other method, its comparing between Premiership and Championship
													// I decided to print out their rank so you can see clearly that those outputs are crossover games.
													+ "Team: rank:" + teamGame.homeTeamRank + `${View.SPACE()}` + this.allTeams[teamGame.homeTeamRank - 1].name
													+ `${View.SPACE()}`
													+ "vs"
													+ `${View.SPACE()}`
													// again, getting away teams rank and their team name.
													+ "rank:" + teamGame.awayTeamRank + `${View.SPACE()}` + this.allTeams[teamGame.awayTeamRank - 1].name
													+ `${View.SPACE()}`
													// getting hometeam's venue
													+ "At: " + this.allTeams[teamGame.homeTeamRank -1].venue
													+ `${View.SPACE()}`
													// getting hometeams' city
													+ this.allTeams[teamGame.homeTeamRank -1].city
					 								+ `${View.NEWLINE()}`
				}
			}
		}
		return crossovergames
	}

	// getAll method, which will be ran to printout on web to see the result.
	getAll() {
		View.out('----------- Teams -----------' + View.NEWLINE())
		View.out(this.getTeams())
		View.out(View.NEWLINE() + '----------- Games -----------' + View.NEWLINE())
		View.out(this.getGames())
		View.out(View.NEWLINE() + '----------- Canterbury Geams -----------' + View.NEWLINE())
		View.out(this.getCanterburyGames('Canterbury') + View.NEWLINE())
		View.out('----------- Crossover Games -----------' + View.NEWLINE())
		View.out(this.getCrossOverGames())
	}
}
