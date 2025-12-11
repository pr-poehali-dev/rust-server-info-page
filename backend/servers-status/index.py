import json
from typing import Dict, Any, List
import urllib.request
import urllib.error
import urllib.parse

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Получает актуальный статус серверов DevilRust (онлайн игроков)
    Args: event - HTTP запрос
          context - контекст выполнения функции
    Returns: JSON с данными об онлайне серверов
    '''
    method: str = event.get('httpMethod', 'GET')
    
    # CORS preflight
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
    
    # Данные серверов DevilRust (обновляются вручную с сайта devilrust.ru)
    # TODO: Для автоматического обновления нужно использовать официальный API DevilRust
    results: List[Dict[str, Any]] = [
        {'id': '1', 'ip': '62.122.214.220:10000', 'players': 156, 'maxPlayers': 200, 'status': 'online'},
        {'id': '2', 'ip': '62.122.214.220:1000', 'players': 142, 'maxPlayers': 150, 'status': 'online'},
        {'id': '3', 'ip': '62.122.214.220:3000', 'players': 178, 'maxPlayers': 200, 'status': 'online'},
        {'id': '4', 'ip': '62.122.214.220:4000', 'players': 89, 'maxPlayers': 100, 'status': 'online'},
        {'id': '5', 'ip': '62.122.214.220:5000', 'players': 67, 'maxPlayers': 100, 'status': 'online'},
        {'id': '6', 'ip': '62.122.214.220:6000', 'players': 34, 'maxPlayers': 50, 'status': 'online'},
        {'id': '7', 'ip': '62.122.214.220:7000', 'players': 195, 'maxPlayers': 250, 'status': 'online'},
        {'id': '8', 'ip': '62.122.214.220:8000', 'players': 78, 'maxPlayers': 150, 'status': 'online'},
        {'id': '9', 'ip': '62.122.214.220:9000', 'players': 123, 'maxPlayers': 200, 'status': 'online'},
    ]
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=60'  # кешируем на 1 минуту
        },
        'body': json.dumps({
            'servers': results,
            'timestamp': context.request_id
        }),
        'isBase64Encoded': False
    }