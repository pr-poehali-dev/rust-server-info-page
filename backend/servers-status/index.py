import json
from typing import Dict, Any, List
import urllib.request
import urllib.error

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
    
    # IP адреса серверов DevilRust
    servers = [
        {'id': '1', 'ip': '62.122.214.220', 'port': 10000},
        {'id': '2', 'ip': '62.122.214.220', 'port': 1000},
        {'id': '3', 'ip': '62.122.214.220', 'port': 3000},
        {'id': '4', 'ip': '62.122.214.220', 'port': 4000},
        {'id': '5', 'ip': '62.122.214.220', 'port': 5000},
        {'id': '6', 'ip': '62.122.214.220', 'port': 6000},
        {'id': '7', 'ip': '62.122.214.220', 'port': 7000},
        {'id': '8', 'ip': '62.122.214.220', 'port': 8000},
        {'id': '9', 'ip': '62.122.214.220', 'port': 9000},
    ]
    
    # Используем BattleMetrics API для получения статуса
    results: List[Dict[str, Any]] = []
    
    for server in servers:
        server_addr = f"{server['ip']}:{server['port']}"
        
        try:
            # BattleMetrics поиск по IP:port
            search_url = f"https://api.battlemetrics.com/servers?filter[game]=rust&filter[search]={server_addr}"
            
            req = urllib.request.Request(search_url)
            req.add_header('User-Agent', 'DevilRust-Status/1.0')
            
            with urllib.request.urlopen(req, timeout=5) as response:
                data = json.loads(response.read().decode('utf-8'))
                
                if data.get('data') and len(data['data']) > 0:
                    server_info = data['data'][0]['attributes']
                    results.append({
                        'id': server['id'],
                        'ip': server_addr,
                        'players': server_info.get('players', 0),
                        'maxPlayers': server_info.get('maxPlayers', 0),
                        'name': server_info.get('name', ''),
                        'status': 'online'
                    })
                else:
                    # Сервер не найден в BattleMetrics
                    results.append({
                        'id': server['id'],
                        'ip': server_addr,
                        'players': 0,
                        'maxPlayers': 0,
                        'name': '',
                        'status': 'offline'
                    })
        except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError):
            # Ошибка при запросе
            results.append({
                'id': server['id'],
                'ip': server_addr,
                'players': 0,
                'maxPlayers': 0,
                'name': '',
                'status': 'error'
            })
    
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
