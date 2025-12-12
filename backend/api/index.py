import json
import pymysql
import urllib.request
import urllib.error
from typing import Dict, Any, List


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Единая API функция для всех эндпоинтов DevilRust проекта.
    Маршрутизация по query параметру 'endpoint':
    - endpoint=banlist - получает список банов из MySQL базы
    - endpoint=monitoring - получает данные мониторинга серверов
    
    Args:
        event - dict с httpMethod, queryStringParameters
        context - объект с request_id, function_name
    
    Returns:
        HTTP response dict с данными в формате JSON
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
    
    # Получаем endpoint из query параметров
    query_params = event.get('queryStringParameters') or {}
    endpoint = query_params.get('endpoint', '')
    
    if endpoint == 'banlist':
        return handle_banlist()
    elif endpoint == 'monitoring':
        return handle_monitoring()
    else:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': 'Invalid endpoint',
                'message': 'Use ?endpoint=banlist or ?endpoint=monitoring'
            }),
            'isBase64Encoded': False
        }


def handle_banlist() -> Dict[str, Any]:
    """Получает список банов из MySQL базы данных"""
    connection = None
    try:
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


def handle_monitoring() -> Dict[str, Any]:
    """Получает данные мониторинга серверов из API devilrust.ru"""
    try:
        req = urllib.request.Request(
            'https://devilrust.ru/api/v1/widgets.monitoring',
            headers={
                'User-Agent': 'Mozilla/5.0',
                'Accept': 'application/json'
            }
        )
        with urllib.request.urlopen(req, timeout=25) as response:
            data = response.read().decode('utf-8')
            
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=60'
            },
            'isBase64Encoded': False,
            'body': data
        }
    except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError) as e:
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'result': 'error',
                'data': {'total': {'players': 0}, 'servers': []},
                'error': str(e)
            })
        }
    except Exception as e:
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'result': 'error',
                'data': {'total': {'players': 0}, 'servers': []},
                'error': str(e)
            })
        }
