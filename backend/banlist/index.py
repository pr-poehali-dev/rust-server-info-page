import json
import pymysql
from typing import Dict, Any, List


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Получает список банов из внешней MySQL базы данных DevilRust.
    Подключается к базе IQBanSystem_Db и возвращает все активные баны.
    
    Args:
        event - dict с httpMethod, headers, queryStringParameters
        context - объект с request_id, function_name и другими атрибутами
    
    Returns:
        HTTP response dict с списком банов в формате JSON
    """
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
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
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    connection = None
    try:
        # Подключение к внешней MySQL базе
        connection = pymysql.connect(
            host='37.230.228.84',
            port=3306,
            user='u7314_B695R2b5bC',
            password='YTB5fwwZTG6v0mgYM@1w!PU=',
            database='s7314_Bans_table',
            charset='utf8mb4',
            cursorclass=pymysql.cursors.DictCursor,
            connect_timeout=5
        )
        
        with connection.cursor() as cursor:
            # Получаем все баны из таблицы
            sql = """
                SELECT 
                    id,
                    steamid,
                    ipAdress,
                    permanent,
                    timeUnbanned,
                    reason,
                    serverName,
                    serverAdress,
                    owner,
                    nameHistory,
                    ipHistory,
                    steamIdHistory
                FROM IQBanSystem_Db
                ORDER BY id DESC
            """
            cursor.execute(sql)
            bans: List[Dict[str, Any]] = cursor.fetchall()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'bans': bans,
                'total': len(bans)
            }, ensure_ascii=False),
            'isBase64Encoded': False
        }
    
    except pymysql.MySQLError as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': 'Database error',
                'message': str(e)
            }),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': 'Internal server error',
                'message': str(e)
            }),
            'isBase64Encoded': False
        }
    
    finally:
        if connection:
            connection.close()
