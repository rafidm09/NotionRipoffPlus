import json
import boto3

dynamodb_resource = boto3.resource('dynamodb')
table = dynamodb_resource.Table('lotion-30152524')

note = {
        'email': 'niggamoney@420.com',
        'id': 'cock_enthusiast',
        'body': 'Out here with lotion on my dick rn cuh, jerking my dick off cuh',
    }

table.put_item(Item=note)
