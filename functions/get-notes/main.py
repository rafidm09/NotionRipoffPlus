import json
import boto3

dynamodb_resource = boto3.resource('dynamodb')
table = dynamodb_resource.Table('lotion-30152524')

def lambda_handler(event, context):
    response = table.get_item(
        Key={
            'email': event['email'],
            'id': event['id']
        }
    )

    return {
        'statusCode': 200,
        'message': response
    }