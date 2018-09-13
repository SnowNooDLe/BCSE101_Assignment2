class View {
  static BLANK () {
    return ''
  }
  static SPACE () {
    return '&nbsp;'
  }
  static TAB () {
    return '&nbsp;&nbsp;&nbsp;&nbsp;'
  }
  static NEWLINE () {
    return '<br>'
  }
  static clr () {
    document.body.style.fontFamily = 'Courier New'
    document.body.innerHTML = ''
  }
  static out (newText) {
    document.body.innerHTML += newText
  }
  static add (newText) {
    document.body.innerHTML += '<br>' + newText
  }
}

class Team {
	constructor (newRank = 0, newName = 'unnamed', newVenue = 'place', newCity = 'city') {
		this.rank = newRank
		this.name = newName
		this.venue = newVenue
		this.city = newCity
	}

	toString () {
    let result = `${this.name} is at rank @ ( ${this.rank} ) with venue ${this.venue} from city ${this.city}`
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
		let result2 = `Premiership Division ${View.NEWLINE()}`
		console.log("testing")
		console.log(this.allTeams[0].rank)
		for (let aTeam of this.allTeams){
			console.log(aTeam[0])
			if (aTeam.rank % 2 === 0){
					result += View.TAB() + aTeam + View.NEWLINE()
			}

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
