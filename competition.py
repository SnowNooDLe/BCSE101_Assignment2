class Team:
    def __init__(self, newRank, newName, newVenue, newCity):
        self.rank = newRank
        self.name = newName
        self.venue = newVenue
        self.city = newCity

    def __str__(self):
        result  = "testing"
        return result

class Game:
    def __init__(self, newWeek, newHomeTeamRank, newAwayTeamRank, newDateTime):
        self.week = newWeek
        self.homeTeamRank = newHomeTeamRank
        self.awayTeamRank = newAwayTeamRank
        self.dateTime = newDateTime

    def __str__(self):
        result = "testing"
        return result


class Competition:
    def __init__(self, new_title, new_year):
        self.title = new_title
        self.year = new_year
        self.allTeams = []
        self.allGames = []

    def addTeam(self, newRank, newName, newVenue, newCity):
        newTeam = Team(newRank, newName, newVenue, newCity)
        self.allTeams.append(newTeam)

    def addGame(self, newWeek, newHomeTeamRank, newAwayTeamRank, newDateTime):
        newGame = Game(newWeek, newHomeTeamRank, newAwayTeamRank, newDateTime)
        self.allGames.append(newGame)

    def __str__(self):
        result = "testing"
        return result
