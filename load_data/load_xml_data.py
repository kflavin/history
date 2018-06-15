import xml.etree.ElementTree as ET
from query import run_query
import os, sys
from datetime import date

query = """
  query {
      allSeasons {
          year
          id
      }
  }
"""
seasons = run_query(query)['data']['allSeasons']
season_map = {}
for season in seasons:
    season_map[str(season['year'])] = season['id']


# The GraphQL query (with a few aditional bits included) itself defined as a multi-line string.       
mutation = """
mutation createGames (
	$home: Boolean
	$opponent: String
	$score1: Int
	$score2: Int
	$result: RESULT
	$date: DateTime
	$seasonId: ID
) {
	createGame (
		home: $home
		opponent: $opponent
		score1: $score1
		score2: $score2
		result: $result
		date: $date
		seasonId: $seasonId
		
	) {
		id
	}
}

"""

def addSeason(filename):
    print("Opening file " + filename)
    tree = ET.parse('data/' + filename)
    root = tree.getroot()
    season = filename.split(".")[0]

    for child in root:
        if child.tag != "event_date":
            continue

        event_date = child.attrib['date']
        event_date = "{}-{}-{}".format(int(event_date[:4]), int(event_date[4:6]), int(event_date[6:8]))

        for grandchild in child:
            gc = grandchild.attrib
            # print(gc['vn'] + " vs " + gc['hn'])
            if gc['vc'] == "nd":
                # print("ND is the visitor for " + gc['event_name'])
                score1 = int(gc['vs']) if gc['vs'] else None
                score2 = int(gc['hs']) if gc['hs'] else None
                home = False
                opponent = gc['hn']
                # print("Opponent is " + opponent)

            else:
                # print("ND is at home for " + gc['event_name'])
                score1 = int(gc['hs']) if gc['hs'] else None
                score2 = int(gc['vs']) if gc['vs'] else None
                home = True
                opponent = gc['vn']
                # print("Opponent is " + opponent)

            if score1 and score2:
                if score1 > score2:
                    result = "WIN"
                elif score1 == score2:
                    result = "TIE"
                elif score1 < score2:
                    result = "LOSS"
                else:
                    result = None
            else:
                result = None


            print("home={} opponent={} score1={} score2={} result={} date={} seasonId={}".format(home, opponent, score1, score2, result, date, season_map[season]))
            variables = {
                "home": home,
                "opponent": opponent,
                "score1": score1,
                "score2": score2,
                "result": result,
                "date": event_date,
                "seasonId": season_map[season]
            }
            import json
            print(run_query(mutation, json.dumps(variables)))

if __name__ == '__main__':
    if len(sys.argv) > 1:
        y = sys.argv[1]
        s = y.split(",")
        for i in s:
            addSeason(i.strip()+".xml")
    else:
        for filename in sorted(os.listdir("data/")):
            addSeason(filename)
