import json
import boto3

dynamodb_resource = boto3.resource('dynamodb')
table = dynamodb_resource.Table('lotion-30152524')

response = table.get_item(
    Key={
        'email': 'niggamoney@420.com',
        'id': 'cock_enthusiast'
    }
)

item = response['Item']
print(item)