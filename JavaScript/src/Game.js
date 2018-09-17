class Game {
	constructor (newWeek = 0,
								newHomeTeamRank = 0,
								newAwayTeamRank = 0,
								newDateTime = 'untimed'){
		this.week = newWeek
		this.homeTeamRank = newHomeTeamRank
		this.awayTeamRank = newAwayTeamRank
		this.dateTime = newDateTime
	}

	toString () {
    let result = `${this.week} ${this.homeTeamRank} ${this.awayTeamRank}  ${this.dateTime}`
    return result
	}
}
