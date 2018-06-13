# An example to get the remaining rate limit using the Github GraphQL API.

import requests

headers = {"Authorization": "Bearer YOUR API KEY"}


def run_query(query, variables=None): # A simple function to use requests.post to make the API call. Note the json= section.
    json = {'query': query}
    if variables != None:
        json['variables'] = variables

    request = requests.post('http://localhost:60000/simple/v1/cjgyln01800020146e7hd3es6', json=json, headers=headers)
    if request.status_code == 200:
        return request.json()
    else:
        raise Exception("Query failed to run by returning code of {}. {}".format(request.status_code, query))


# result = run_query(query, variables) # Execute the query
# print(result)
# remaining_rate_limit = result["data"]["rateLimit"]["remaining"] # Drill down the dictionary
# print("Remaining rate limit - {}".format(remaining_rate_limit))