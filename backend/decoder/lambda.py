import json
import decoder

def lambda_handler(event, context):
    message = decoder.unpack_to_json(event['payload'])
    return {
        'statusCode': 200,
        'body': json.dumps(message)
    }