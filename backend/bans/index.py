import json
import pymysql
from typing import Dict, Any, List

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Получает список банов игроков из базы данных MySQL
    Args: event - dict с httpMethod, queryStringParameters
          context - объект с атрибутами функции
    Returns: JSON со списком банов
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'GET':
        connection = None
        try:
            query_params = event.get('queryStringParameters') or {}
            search = query_params.get('search', '').strip()
            
            connection = pymysql.connect(
                host='37.230.228.84',
                port=3306,
                user='u7314_B695R2b5bC',
                password='YTB5fwwZTG6v0mgYM@1w!PU=',
                database='s7314_Bans_table',
                cursorclass=pymysql.cursors.DictCursor
            )
            
            with connection.cursor() as cursor:
                cursor.execute("SHOW COLUMNS FROM IQBanSystem_Db")
                columns_info = cursor.fetchall()
                columns = [col['Field'] for col in columns_info]
                
                if search:
                    search_conditions = []
                    for col in columns:
                        search_conditions.append(f"`{col}` LIKE %s")
                    query = f"SELECT * FROM IQBanSystem_Db WHERE {' OR '.join(search_conditions)} LIMIT 100"
                    search_pattern = f'%{search}%'
                    cursor.execute(query, tuple([search_pattern] * len(columns)))
                else:
                    query = "SELECT * FROM IQBanSystem_Db LIMIT 100"
                    cursor.execute(query)
                
                results = cursor.fetchall()
                
                bans: List[Dict] = []
                for row in results:
                    ban_data = {}
                    for key, value in row.items():
                        ban_data[key] = value
                    bans.append(ban_data)
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'bans': bans}),
                    'isBase64Encoded': False
                }
                
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': str(e)}),
                'isBase64Encoded': False
            }
        finally:
            if connection:
                connection.close()
    
    return {
        'statusCode': 405,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }