import json
import random
from typing import Dict, Any, List
from datetime import datetime

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Search and generate potential clients based on query and filters
    Args: event with httpMethod, queryStringParameters (query, industry, minScore)
    Returns: JSON with found clients and metadata
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'GET':
        params = event.get('queryStringParameters') or {}
        query = params.get('query', '').lower()
        industry = params.get('industry', 'all')
        min_score = int(params.get('minScore', '70'))
        
        client_requests = [
            'Создать сайт', 'Разработать сайт', 'Сделать сайт-визитку', 'Лендинг под ключ',
            'Интернет-магазин', 'Онлайн-магазин', 'Создать интернет-магазин',
            'Создать бота', 'Telegram бот', 'Разработать бота', 'Чат-бот для бизнеса',
            'Отредактировать фото', 'Обработать фото', 'Ретушь фото', 'Оживить фото',
            'Восстановить старое фото', 'Улучшить качество фото',
            'Создать логотип', 'Разработать фирменный стиль', 'Дизайн логотипа',
            'Настроить рекламу', 'Контекстная реклама', 'Реклама в Яндекс',
            'SMM продвижение', 'Ведение соцсетей', 'Контент для Instagram',
            'Мобильное приложение', 'Разработать приложение', 'iOS приложение',
            'CRM-система', 'Автоматизация бизнеса', 'Внедрить CRM',
            'SEO продвижение', 'Продвижение сайта', 'Поднять в поиске',
            'Email-рассылка', 'Настроить рассылки', 'Email-маркетинг',
            '1C настройка', '1C интеграция', 'Доработать 1C',
            'Видеомонтаж', 'Смонтировать видео', 'Создать видеоролик',
            'Написать тексты', 'Копирайтинг', 'Тексты для сайта',
            'Настроить аналитику', 'Яндекс.Метрика', 'Google Analytics'
        ]
        
        clients_pool = [
            {
                'id': f'client_{random.randint(1000, 9999)}',
                'name': random.choice(['Алексей', 'Мария', 'Дмитрий', 'Елена', 'Сергей', 'Анна', 'Иван', 'Ольга', 'Максим', 'Екатерина']) + ' ' + 
                        random.choice(['Иванов', 'Петрова', 'Соколов', 'Смирнова', 'Волков', 'Новикова', 'Федоров', 'Морозова', 'Кузнецов', 'Попова']),
                'company': random.choice(['ТехноСтарт', 'Ритейл Про', 'Финансовые Решения', 'МедТех Инновации', 'ЭкоСтрой', 
                                         'ЦифроМаркет', 'БизнесПро', 'ИТ Системы', 'Логистика 24', 'Авто Плюс', 'Красота и Здоровье',
                                         'Фитнес Клуб', 'Кафе "Уют"', 'Строй Мастер', 'Детский мир', 'Модный Дом']),
                'industry': random.choice(['IT-стартапы', 'Розничная торговля', 'Финансы', 'Медицинские технологии', 
                                          'Строительство', 'E-commerce', 'Логистика', 'Производство', 'Красота и здоровье',
                                          'Образование', 'Недвижимость', 'Общепит', 'Фитнес', 'Услуги']),
                'needs': random.sample(client_requests, k=random.randint(1, 3)),
                'score': random.randint(min_score, 98),
                'contact': f'contact@company{random.randint(1, 100)}.ru',
                'source': random.choice(['LinkedIn', 'HeadHunter', 'Habr Career', 'VC.ru', 'Telegram', 'Avito', 'Яндекс.Услуги', 'Профи.ру']),
                'foundAt': datetime.now().isoformat()
            }
            for _ in range(random.randint(5, 12))
        ]
        
        filtered_clients = clients_pool
        
        if industry != 'all':
            filtered_clients = [c for c in filtered_clients if c['industry'] == industry]
        
        if query:
            filtered_clients = [
                c for c in filtered_clients 
                if query in c['name'].lower() or 
                   query in c['company'].lower() or
                   any(query in need.lower() for need in c['needs'])
            ]
        
        filtered_clients = [c for c in filtered_clients if c['score'] >= min_score]
        
        filtered_clients.sort(key=lambda x: x['score'], reverse=True)
        
        response_data = {
            'clients': filtered_clients,
            'total': len(filtered_clients),
            'query': query,
            'filters': {
                'industry': industry,
                'minScore': min_score
            },
            'timestamp': datetime.now().isoformat()
        }
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(response_data, ensure_ascii=False),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }