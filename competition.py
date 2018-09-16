class Team:
    def __init__(self, newRank, newName, newVenue, newCity):
        self.rank = newRank
        self.name = newName
        self.venue = newVenue
        self.city = newCity

    def __str__(self):
        result = f"{self.rank} {self.name}"
        return result

class Game:
    def __init__(self, newWeek, newHomeTeamRank, newAwayTeamRank, newDateTime):
        self.week = newWeek
        self.homeTeamRank = newHomeTeamRank
        self.awayTeamRank = newAwayTeamRank
        self.dateTime = newDateTime

    def __str__(self):
        result = f"@ {self.week}, {self.homeTeamRank} vs {self.newAwayTeamRank} @ {self.dateTime}"
        return result


class Competition:
    def __init__(self, new_title, new_year):
        self.title = new_title
        self.year = new_year
        self.allPDTeams = []
        self.allCDTeams = []
        self.allGames = []

    def addTeam(self, newRank, newName, newVenue, newCity):
        newTeam = Team(newRank, newName, newVenue, newCity)
        if (newRank <= 7):
            self.allPDTeams.append(newTeam)
        else:
            self.allCDTeams.append(newTeam)

    def addGame(self, newWeek, newHomeTeamRank, newAwayTeamRank, newDateTime):
        newGame = Game(newWeek, newHomeTeamRank, newAwayTeamRank, newDateTime)
        self.allGames.append(newGame)

    def __str__(self):
        result = f"TEAMS\n"
        result += f"Premiership Division\n"
        for team in self.allPDTeams:
            result += str(team) + "\n"
        result += f"Championship Division\n"
        for team in self.allCDTeams:
            result += str(team) + "\n"
        return result
