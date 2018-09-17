from competition import Competition
import json


def setup():
    the_2018_competition = Competition('Mitre 10 Cup', 2018)
    competition_data = json.loads(open('json.txt').read())
    # print (competition_data)
    all_teams = competition_data['teams']
    # print (all_teams)
    for team in all_teams:
        the_2018_competition.addTeam(team['rank'], team['name'], team['venue'], team['city'])
    all_games = competition_data['games']
    for game in all_games:
        the_2018_competition.addGame(game['week'], game['homeTeamRank'], game['awayTeamRank'], game['dateTime'])
    return the_2018_competition


if __name__ == '__main__':
   the_2018_competition = setup()
   print(the_2018_competition)
