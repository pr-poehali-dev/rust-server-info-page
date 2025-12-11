import json
import os
import pymysql
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Получает общее количество уникальных игроков за текущий месяц из базы данных статистики
    Args: event - dict с httpMethod
          context - объект с атрибутами функции
    Returns: JSON с количеством игроков за месяц
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
            connection = pymysql.connect(
                host='37.230.228.84',
                port=3306,
                user='u7315_lHfgYPuWwf',
                password='@nwL6S!rxXGn76+.muKR^kg^',
                database='s7315_Stats',
                cursorclass=pymysql.cursors.DictCursor
            )
            
            with connection.cursor() as cursor:
                query = """
                    SELECT COUNT(DISTINCT SteamID) as total_players
                    FROM PlayerStats
                    WHERE MONTH(LastSeen) = MONTH(CURRENT_DATE())
                    AND YEAR(LastSeen) = YEAR(CURRENT_DATE())
                """
                cursor.execute(query)
                result = cursor.fetchone()
                
                total_players = result['total_players'] if result else 0
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'total_players': total_players}),
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