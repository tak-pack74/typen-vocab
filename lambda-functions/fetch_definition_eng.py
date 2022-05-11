import json
import os
import requests

def lambda_handler(event, context):
    
    url = "https://wordsapiv1.p.rapidapi.com/words/{word}/definitions".format(**{
        'word' : event['pathParameters']['word'],
    })

    headers = {
        'x-rapidapi-host': "wordsapiv1.p.rapidapi.com",
        'x-rapidapi-key': os.environ.get('RAPID_API_KEY')
    }

    response = requests.request("GET", url, headers=headers)
    
    return {
        'statusCode' : 200,
        'headers' : {
            'content-type' : 'json',
        },
        'body' : json.dumps({
            'api_response' : response.json(),
        })
    }