import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Client {
  id: string;
  name: string;
  industry: string;
  needs: string[];
  score: number;
  contact: string;
  company: string;
  source: string;
}

const mockClients: Client[] = [
  {
    id: '1',
    name: 'Алексей Иванов',
    company: 'ТехноСтарт',
    industry: 'IT-стартапы',
    needs: ['Автоматизация продаж', 'CRM-система'],
    score: 95,
    contact: 'a.ivanov@techstart.ru',
    source: 'LinkedIn'
  },
  {
    id: '2',
    name: 'Мария Петрова',
    company: 'Ритейл Про',
    industry: 'Розничная торговля',
    needs: ['Управление складом', 'Аналитика продаж'],
    score: 88,
    contact: 'm.petrova@retail.ru',
    source: 'HeadHunter'
  },
  {
    id: '3',
    name: 'Дмитрий Соколов',
    company: 'Финансовые Решения',
    industry: 'Финансы',
    needs: ['Интеграция API', 'Безопасность данных'],
    score: 92,
    contact: 'd.sokolov@fin.ru',
    source: 'Habr Career'
  },
  {
    id: '4',
    name: 'Елена Смирнова',
    company: 'МедТех Инновации',
    industry: 'Медицинские технологии',
    needs: ['Мобильное приложение', 'База данных пациентов'],
    score: 85,
    contact: 'e.smirnova@medtech.ru',
    source: 'VC.ru'
  },
  {
    id: '5',
    name: 'Сергей Волков',
    company: 'ЭкоСтрой',
    industry: 'Строительство',
    needs: ['Учет материалов', 'Планирование проектов'],
    score: 79,
    contact: 's.volkov@ecostroy.ru',
    source: 'Telegram'
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [clients, setClients] = useState<Client[]>(mockClients);

  const industries = ['all', 'IT-стартапы', 'Розничная торговля', 'Финансы', 'Медицинские технологии', 'Строительство'];

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.needs.some(need => need.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesIndustry = selectedIndustry === 'all' || client.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  const stats = {
    total: clients.length,
    highPriority: clients.filter(c => c.score >= 90).length,
    mediumPriority: clients.filter(c => c.score >= 80 && c.score < 90).length,
    sources: [...new Set(clients.map(c => c.source))].length
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 rounded-2xl gradient-primary">
              <Icon name="Target" size={32} className="text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ClientFinder AI
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Умный поиск клиентов с использованием искусственного интеллекта
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 glass border-primary/20 hover:border-primary/40 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Всего клиентов</p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10">
                <Icon name="Users" size={24} className="text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 glass border-secondary/20 hover:border-secondary/40 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Высокий приоритет</p>
                <p className="text-3xl font-bold">{stats.highPriority}</p>
              </div>
              <div className="p-3 rounded-xl bg-secondary/10">
                <Icon name="TrendingUp" size={24} className="text-secondary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 glass border-accent/20 hover:border-accent/40 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Средний приоритет</p>
                <p className="text-3xl font-bold">{stats.mediumPriority}</p>
              </div>
              <div className="p-3 rounded-xl bg-accent/10">
                <Icon name="Activity" size={24} className="text-accent" />
              </div>
            </div>
          </Card>

          <Card className="p-6 glass border-primary/20 hover:border-primary/40 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Источников</p>
                <p className="text-3xl font-bold">{stats.sources}</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10">
                <Icon name="Globe" size={24} className="text-primary" />
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="search" className="space-y-6">
          <TabsList className="glass p-1.5">
            <TabsTrigger value="search" className="data-[state=active]:bg-primary/20">
              <Icon name="Search" size={18} className="mr-2" />
              Поиск
            </TabsTrigger>
            <TabsTrigger value="database" className="data-[state=active]:bg-primary/20">
              <Icon name="Database" size={18} className="mr-2" />
              База клиентов
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-primary/20">
              <Icon name="Settings" size={18} className="mr-2" />
              Настройки
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-primary/20">
              <Icon name="BarChart3" size={18} className="mr-2" />
              Аналитика
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            <Card className="p-6 glass">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="Sparkles" size={24} className="text-primary" />
                AI-поиск клиентов
              </h2>
              
              <div className="space-y-4">
                <div className="relative">
                  <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Введите запрос: 'нужна CRM', 'автоматизация', название компании..."
                    className="pl-10 h-12 glass border-primary/30 focus:border-primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {industries.map(industry => (
                    <Button
                      key={industry}
                      variant={selectedIndustry === industry ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedIndustry(industry)}
                      className={selectedIndustry === industry ? "gradient-primary" : "glass"}
                    >
                      {industry === 'all' ? 'Все отрасли' : industry}
                    </Button>
                  ))}
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 gap-4">
              {filteredClients.map((client, idx) => (
                <Card key={client.id} className="p-6 glass hover:border-primary/40 transition-all duration-300 hover:translate-x-1" style={{ animationDelay: `${idx * 50}ms` }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold">{client.name}</h3>
                        <Badge className="gradient-primary">{client.company}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Icon name="Building2" size={14} />
                        {client.industry}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground mb-1">Соответствие</div>
                      <div className="text-2xl font-bold text-primary">{client.score}%</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <Progress value={client.score} className="h-2" />
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <Icon name="Target" size={14} />
                      Потребности:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {client.needs.map((need, i) => (
                        <Badge key={i} variant="secondary" className="glass">
                          {need}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Icon name="Mail" size={14} />
                        {client.contact}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Globe" size={14} />
                        {client.source}
                      </span>
                    </div>
                    <Button size="sm" className="gradient-primary">
                      <Icon name="MessageSquare" size={16} className="mr-2" />
                      Связаться
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="database" className="space-y-6">
            <Card className="p-6 glass">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="Database" size={24} className="text-primary" />
                База клиентов
              </h2>
              <div className="space-y-4">
                {clients.map((client) => (
                  <div key={client.id} className="p-4 rounded-lg gradient-card border border-primary/10 hover:border-primary/30 transition-all">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{client.name}</h3>
                        <p className="text-sm text-muted-foreground">{client.company}</p>
                      </div>
                      <Badge variant={client.score >= 90 ? "default" : "secondary"}>
                        {client.score}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="p-6 glass">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="Settings" size={24} className="text-primary" />
                Настройки поиска
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Минимальный скор соответствия</label>
                  <Input type="number" defaultValue="70" className="glass" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Источники данных</label>
                  <div className="space-y-2">
                    {['LinkedIn', 'HeadHunter', 'Habr Career', 'VC.ru', 'Telegram'].map(source => (
                      <label key={source} className="flex items-center gap-2 p-3 rounded-lg glass hover:bg-primary/5 cursor-pointer transition-colors">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span>{source}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Ключевые запросы</label>
                  <Input placeholder="Добавить новый запрос..." className="glass mb-2" />
                  <div className="flex flex-wrap gap-2">
                    {['CRM', 'автоматизация', 'продажи', 'маркетинг'].map(tag => (
                      <Badge key={tag} variant="outline" className="glass">
                        {tag} <Icon name="X" size={12} className="ml-1 cursor-pointer" />
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 glass">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Icon name="PieChart" size={20} className="text-primary" />
                  Распределение по отраслям
                </h2>
                <div className="space-y-4">
                  {industries.filter(i => i !== 'all').map(industry => {
                    const count = clients.filter(c => c.industry === industry).length;
                    const percentage = (count / clients.length) * 100;
                    return (
                      <div key={industry}>
                        <div className="flex justify-between text-sm mb-2">
                          <span>{industry}</span>
                          <span className="text-muted-foreground">{count} ({percentage.toFixed(0)}%)</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card className="p-6 glass">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Icon name="TrendingUp" size={20} className="text-secondary" />
                  Эффективность источников
                </h2>
                <div className="space-y-4">
                  {['LinkedIn', 'HeadHunter', 'Habr Career', 'VC.ru', 'Telegram'].map(source => {
                    const count = clients.filter(c => c.source === source).length;
                    const percentage = (count / clients.length) * 100;
                    return (
                      <div key={source}>
                        <div className="flex justify-between text-sm mb-2">
                          <span>{source}</span>
                          <span className="text-muted-foreground">{count} лидов</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>

            <Card className="p-6 glass">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Icon name="Target" size={20} className="text-primary" />
                Популярные потребности
              </h2>
              <div className="flex flex-wrap gap-3">
                {Array.from(new Set(clients.flatMap(c => c.needs))).map(need => {
                  const count = clients.filter(c => c.needs.includes(need)).length;
                  return (
                    <div key={need} className="px-4 py-2 rounded-full gradient-card border border-primary/20">
                      <span className="font-medium">{need}</span>
                      <span className="ml-2 text-sm text-muted-foreground">({count})</span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
