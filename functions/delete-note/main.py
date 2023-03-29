import json
import boto3

dynamodb_resource = boto3.resource('dynamodb')
table = dynamodb_resource.Table('lotion-30152524')

def lambda_handler(event, context):
    table.delete_item(
        Key={
            'email': event['email'],
            'id': event['id']
        }
    )

    return {
        'statusCode': 202,
        'message': 'note deleted successfully'
    }