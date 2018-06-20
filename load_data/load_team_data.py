import xml.etree.ElementTree as ET
from query import run_query
import os, sys
from datetime import date
import json

# The GraphQL query (with a few aditional bits included) itself defined as a multi-line string.       
mutation = """

mutation createTeam (
    $name: String
) {
    createTeam(
        name: $name
    ) {
        id
        name
    }
}
"""

def addTeam(filename):
    print("Opening file " + filename)
    tree = ET.parse('data/' + filename)
    root = tree.getroot()
    season = filename.split(".")[0]

    teams = set()

    for child in root:
        if child.tag != "event_date":
            continue

        event_date = child.attrib['date']
        event_date = "{}-{}-{}".format(int(event_date[:4]), int(event_date[4:6]), int(event_date[6:8]))

        for grandchild in child:
            gc = grandchild.attrib
            if gc['vc'] == "nd":
                opponent = gc['hn']
            else:
                opponent = gc['vn']

            if opponent:
                teams.add(opponent)

    return teams


if __name__ == '__main__':
    teams = set()

    if len(sys.argv) > 1:
        y = sys.argv[1]
        s = y.split(",")
        for i in s:
            teams.update(addTeam(i.strip()+".xml"))
    else:
        for filename in sorted(os.listdir("data/")):
            teams.update(addTeam(filename))

    for team in sorted(teams):
        variables = {
            "name": team
        }
        print(run_query(mutation, json.dumps(variables)))
