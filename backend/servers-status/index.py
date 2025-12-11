import json
import os
import socket
import struct
from typing import Dict, Any, List

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Получает актуальный статус серверов DevilRust через RCON
    Args: event - HTTP запрос
          context - контекст выполнения функции
    Returns: JSON с данными об онлайне серверов
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
    
    rcon_creds_str: str = os.environ.get('RCON_CREDENTIALS', '{}')
    
    # Очищаем строку от возможных лишних символов
    rcon_creds_str = rcon_creds_str.strip()
    
    # Fallback на хардкод если секрет не настроен
    default_creds = {
        '1': {'password': 'jhSDQdfPBghUIGutyftyfGUDFyijgYF667337823', 'port': 10002},
        '2': {'password': 'zrd1ukdMfDSOvemHqVSae0bC', 'port': 2002},
        '3': {'password': 'BcIqAoR512YoyKh0TC8c2WHm', 'port': 3002},
        '4': {'password': 'QoSCMvSBKtY9kb7Y5eGeacyx', 'port': 4002},
        '5': {'password': 'Kfeuhcnj63545', 'port': 5002},
        '6': {'password': 'qRiQU2whLy6g', 'port': 6002},
        '7': {'password': 'DAwdpsdUuq12asddsawawe1164352484', 'port': 7002},
        '8': {'password': 'IuD1FkGGkEMdsmxDuBZ1r3Zs', 'port': 8002},
        '9': {'password': 'whv19kSAjnt5vikkj123z6CZQ5Wx7', 'port': 9002}
    }
    
    try:
        rcon_creds: Dict[str, Dict[str, Any]] = json.loads(rcon_creds_str)
    except:
        rcon_creds = default_creds
    
    server_host: str = '62.122.214.220'
    
    results: List[Dict[str, Any]] = []
    
    for server_id, creds in rcon_creds.items():
        rcon_port: int = creds['port']
        rcon_password: str = creds['password']
        
        game_port_map = {
            '1': 10000, '2': 1000, '3': 3000, '4': 4000, '5': 5000,
            '6': 6000, '7': 7000, '8': 8000, '9': 9000
        }
        max_players_map = {
            '1': 200, '2': 150, '3': 200, '4': 100, '5': 100,
            '6': 50, '7': 250, '8': 150, '9': 200
        }
        
        game_port = game_port_map.get(server_id, 0)
        max_players = max_players_map.get(server_id, 200)
        
        players = 0
        status = 'offline'
        
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.settimeout(1.5)
            sock.connect((server_host, rcon_port))
            
            request_id = 1
            
            # Аутентификация
            auth_packet = struct.pack('<iii', 10 + len(rcon_password), request_id, 3) + rcon_password.encode('utf-8') + b'\x00\x00'
            sock.sendall(auth_packet)
            
            # Читаем ответ аутентификации
            sock.settimeout(1.0)
            auth_response = sock.recv(4096)
            
            if len(auth_response) >= 12:
                response_id = struct.unpack('<i', auth_response[4:8])[0]
                
                if response_id == request_id:
                    # Команда global.playercount - быстрее чем serverinfo
                    command = 'global.playercount'
                    request_id = 2
                    cmd_packet = struct.pack('<iii', 10 + len(command), request_id, 2) + command.encode('utf-8') + b'\x00\x00'
                    sock.sendall(cmd_packet)
                    
                    # Читаем ответ
                    response = sock.recv(4096)
                    
                    if len(response) > 12:
                        body = response[12:-2].decode('utf-8', errors='ignore').strip()
                        
                        # global.playercount возвращает просто число
                        try:
                            players = int(body)
                            status = 'online'
                        except:
                            # Если не получилось - пробуем serverinfo
                            command2 = 'serverinfo'
                            request_id = 3
                            cmd_packet2 = struct.pack('<iii', 10 + len(command2), request_id, 2) + command2.encode('utf-8') + b'\x00\x00'
                            sock.sendall(cmd_packet2)
                            response2 = sock.recv(8192)
                            
                            if len(response2) > 12:
                                body2 = response2[12:-2].decode('utf-8', errors='ignore')
                                if 'players' in body2.lower():
                                    lines = body2.split('\n')
                                    for line in lines:
                                        if 'players' in line.lower() and ':' in line:
                                            parts = line.split(':')
                                            if len(parts) >= 2:
                                                player_info = parts[1].strip()
                                                try:
                                                    if '/' in player_info:
                                                        players = int(player_info.split('/')[0].strip())
                                                    else:
                                                        players = int(player_info.split()[0])
                                                    status = 'online'
                                                except:
                                                    status = 'online'
                                                break
            
            sock.close()
            
        except Exception as e:
            status = 'offline'
            players = 0
        
        results.append({
            'id': server_id,
            'ip': f'{server_host}:{game_port}',
            'players': players,
            'maxPlayers': max_players,
            'status': status
        })
    
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