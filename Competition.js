// making Competition class that have function addTeam, addGame.
class Team {
	constructor (newRank = 0, newName = 'unnamed', newVenue = 'place', newCity = 'city') {
		this.rank = newRank
		this.name = newName
		this.venue = newVenue
		this.city = newCity
	}

	toString () {
    let result = `${this.name} is at rank @ ( ${this.rank} ) with venue $${this.venue.toFixed(2)} from city ${this.city}`
    return result
	}
}

class Game {
	constructor (newWeek = 0, newHomeTeamRank = 0, newAwayTeamRank = 0, newDateTime = 'untimed'){
		this.week = newWeek
		this.homeTeamRank = newHomeTeamRank
		this.awayTeamRank = newAwayTeamRank
		this.dateTime = newDateTime
	}
	toString () {
    let result = `@ ${this.week} there is a game between ( ${this.homeTeamRank} ) versus $${this.awayTeamRank} on ${this.dateTime}`
    return result
	}
}


class Competition {
	constructor () {
		this.allTeams = []
		this.allGames = []
	}

	addTeam(newRank, newName, newVenue, newCity){
		let newTeam = new Team(newRank, newname, newVenue, newCity)
		this.allTeams.push(newTeam)
	}

	addGame(newWeek, newHomeTeamRank, newAwayTeamRank, newDateTime){
		let  newGame = new Game(newWeek, newHomeTeamRank, newAwayTeamRank, newDateTime)
		this.allGames.push(newGame)
	}
}