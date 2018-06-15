import xml.etree.ElementTree as ET
from query import run_query
import os, sys
from datetime import date

# The GraphQL query (with a few aditional bits included) itself defined as a multi-line string.       
query = """
mutation createSeason($year: Int!, $games: [SeasongamesGame!]!) {
  createSeason(
    year: $year
    games: $games
  ) {
    id
  }
}
"""

for year in range(1887,2018):
    variables = {
                "year": year,
                "games": []
            }
    import json
    print(run_query(query, json.dumps(variables)))
