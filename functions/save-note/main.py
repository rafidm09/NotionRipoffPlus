import json
import boto3

dynamodb_resource = boto3.resource('dynamodb')
table = dynamodb_resource.Table('lotion-30152524')

def lambda_handler(event, context):
    note = {
        'email': event['email'],
        'id': event['id'],
        'body': event['body']
    }

    table.put_item(Item=note)

    return {
        'statusCode': 200,
        'message': 'note added successfully'
    }