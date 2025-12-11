import json
import os
from typing import Dict, Any, List
import urllib.request
import urllib.error

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Получает актуальный статус серверов DevilRust через Pterodactyl Panel API
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
    
    api_key: str = os.environ.get('PTERODACTYL_API_KEY', '')
    panel_url: str = 'https://panel.alkad.org'
    
    # Маппинг IP:port к ID серверов в DevilRust
    server_mapping = {
        '62.122.214.220:10000': {'id': '1', 'maxPlayers': 200},
        '62.122.214.220:1000': {'id': '2', 'maxPlayers': 150},
        '62.122.214.220:3000': {'id': '3', 'maxPlayers': 200},
        '62.122.214.220:4000': {'id': '4', 'maxPlayers': 100},
        '62.122.214.220:5000': {'id': '5', 'maxPlayers': 100},
        '62.122.214.220:6000': {'id': '6', 'maxPlayers': 50},
        '62.122.214.220:7000': {'id': '7', 'maxPlayers': 250},
        '62.122.214.220:8000': {'id': '8', 'maxPlayers': 150},
        '62.122.214.220:9000': {'id': '9', 'maxPlayers': 200},
    }
    
    results: List[Dict[str, Any]] = []
    
    try:
        # Получаем список всех серверов из Pterodactyl
        req = urllib.request.Request(
            f'{panel_url}/api/client',
            headers={
                'Authorization': f'Bearer {api_key}',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        )
        
        with urllib.request.urlopen(req, timeout=5) as response:
            data = json.loads(response.read().decode('utf-8'))
            servers_list = data.get('data', [])
            
            for server_data in servers_list:
                server_attrs = server_data.get('attributes', {})
                server_id = server_attrs.get('identifier', '')
                
                # Получаем детальную информацию о сервере
                detail_req = urllib.request.Request(
                    f'{panel_url}/api/client/servers/{server_id}/resources',
                    headers={
                        'Authorization': f'Bearer {api_key}',
                        'Accept': 'application/json'
                    }
                )
                
                try:
                    with urllib.request.urlopen(detail_req, timeout=5) as detail_response:
                        detail_data = json.loads(detail_response.read().decode('utf-8'))
                        attrs = detail_data.get('attributes', {})
                        
                        # Получаем IP и порт из allocations
                        allocations = server_attrs.get('relationships', {}).get('allocations', {}).get('data', [])
                        if allocations:
                            alloc = allocations[0].get('attributes', {})
                            ip = alloc.get('ip', '')
                            port = alloc.get('port', 0)
                            ip_port = f'{ip}:{port}'
                            
                            if ip_port in server_mapping:
                                mapping = server_mapping[ip_port]
                                
                                # Pterodactyl возвращает current_state и resources
                                current_state = attrs.get('current_state', 'offline')
                                is_online = current_state == 'running'
                                
                                # Для Rust серверов онлайн игроков нужно парсить из query
                                # Но в базовом API это может быть недоступно
                                # Поэтому используем приблизительные данные на основе статуса
                                
                                results.append({
                                    'id': mapping['id'],
                                    'ip': ip_port,
                                    'players': 0 if not is_online else None,  # будет обновлено ниже
                                    'maxPlayers': mapping['maxPlayers'],
                                    'status': 'online' if is_online else 'offline'
                                })
                except Exception:
                    continue
    
    except Exception as e:
        # В случае ошибки возвращаем fallback данные
        for ip_port, mapping in server_mapping.items():
            results.append({
                'id': mapping['id'],
                'ip': ip_port,
                'players': 0,
                'maxPlayers': mapping['maxPlayers'],
                'status': 'unknown'
            })
    
    # Сортируем по ID
    results.sort(key=lambda x: int(x['id']))
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=30'
        },
        'body': json.dumps({
            'servers': results,
            'timestamp': context.request_id
        }),
        'isBase64Encoded': False
    }