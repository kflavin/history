from gql import gql, Client
from gql.transport.requests import RequestsHTTPTransport

_transport = RequestsHTTPTransport(url='http://localhost:60000/simple/v1/cjgyln01800020146e7hd3es6')

client = Client( transport=_transport)

query = gql('''
query {
	allUsers {
		email
	}
}
''')

response = client.execute(query)
