import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { demoSeals, demoTenants } from '@/data/demoData';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, 
  Area, AreaChart, ScatterChart, Scatter
} from 'recharts';
import { 
  Calendar, Clock, AlertTriangle, TrendingUp, MapPin,
  Users, Activity, Zap, Shield, Target, Eye,
  ChevronDown, ChevronUp, RefreshCw
} from 'lucide-react';

interface AdvancedAnalyticsProps {
  userRole: 'user' | 'admin';
}

export const AdvancedAnalytics: React.FC<AdvancedAnalyticsProps> = ({ userRole }) => {
  const [timeFilter, setTimeFilter] = useState<'day' | 'week' | 'month'>('month');
  const [isExpanded, setIsExpanded] = useState(false);

  // Time-based data generation
  const generateTimeData = () => {
    const now = new Date();
    const data = [];
    
    if (timeFilter === 'day') {
      for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        data.push({
          period: `${time.getHours()}:00`,
          placements: Math.floor(Math.random() * 8) + 1,
          removals: Math.floor(Math.random() * 3),
          checks: Math.floor(Math.random() * 12) + 2,
          anomalies: Math.floor(Math.random() * 2)
        });
      }
    } else if (timeFilter === 'week') {
      const days = ['B.e', 'Ç.a', 'Ç', 'C.a', 'C', 'Ş', 'B'];
      for (let i = 6; i >= 0; i--) {
        data.push({
          period: days[6 - i],
          placements: Math.floor(Math.random() * 50) + 10,
          removals: Math.floor(Math.random() * 15) + 2,
          checks: Math.floor(Math.random() * 80) + 20,
          anomalies: Math.floor(Math.random() * 5)
        });
      }
    } else {
      const months = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'İyun'];
      months.forEach(month => {
        data.push({
          period: month,
          placements: Math.floor(Math.random() * 200) + 50,
          removals: Math.floor(Math.random() * 50) + 10,
          checks: Math.floor(Math.random() * 300) + 100,
          anomalies: Math.floor(Math.random() * 15) + 2
        });
      });
    }
    
    return data;
  };

  const timeData = generateTimeData();

  // Anomaly detection data
  const anomalyData = [
    {
      type: 'Saxta plomblar',
      count: 12,
      severity: 'high',
      description: 'Eyni ID-li plomblar müxtəlif yerlərdə 30 dəq ərzində qeydiyyat'
    },
    {
      type: 'Tez-tez açılan',
      count: 8,
      severity: 'medium',
      description: 'Son həftədə 3+ dəfə açılan qapı/avadanlıq'
    },
    {
      type: 'Vaxt fərqləri',
      count: 5,
      severity: 'low',
      description: 'Qoyulma və çıxarılma vaxtları arasında qeyri-adi fərqlər'
    },
    {
      type: 'Coğrafi anomaliya',
      count: 3,
      severity: 'high',
      description: 'Eyni istifadəçi, eyni vaxtda müxtəlif filiallar'
    }
  ];

  // Recent activity data
  const recentlyCheckedBranches = demoTenants.slice(0, 3).map(tenant => ({
    name: tenant.name,
    location: tenant.location,
    lastCheck: `${Math.floor(Math.random() * 24)} saat əvvəl`,
    status: Math.random() > 0.3 ? 'normal' : 'attention'
  }));

  const recentSeals = demoSeals.slice(0, 5).map(seal => ({
    ...seal,
    timeAgo: `${Math.floor(Math.random() * 120)} dəq əvvəl`,
    action: Math.random() > 0.5 ? 'checked' : 'removed'
  }));

  // Frequently accessed items
  const frequentlyAccessed = [
    { item: 'Ana giriş qapısı', count: 23, risk: 'high' },
    { item: 'Server otağı', count: 18, risk: 'medium' },
    { item: 'Kassa aparatı', count: 15, risk: 'low' },
    { item: 'Arxiv şkafı', count: 12, risk: 'medium' },
    { item: 'Yanacaq çəni', count: 8, risk: 'high' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'hsl(var(--destructive))';
      case 'medium': return 'hsl(var(--warning))';
      case 'low': return 'hsl(var(--success))';
      default: return 'hsl(var(--muted))';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-destructive/20 text-destructive';
      case 'medium': return 'bg-warning/20 text-warning';
      case 'low': return 'bg-success/20 text-success';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Time Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Təkmil Analitika Hub
          </h2>
          <p className="text-muted-foreground">Anomaliya aşkarlama və məlumat intellekti</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex bg-muted rounded-lg p-1">
            {(['day', 'week', 'month'] as const).map((period) => (
              <Button
                key={period}
                variant={timeFilter === period ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setTimeFilter(period)}
                className="text-xs"
              >
                {period === 'day' ? 'Gün' : period === 'week' ? 'Həftə' : 'Ay'}
              </Button>
            ))}
          </div>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Time-based Activity Chart */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-primary" />
            <span>Vaxt ərzində fəaliyyət ({timeFilter === 'day' ? 'Saatlıq' : timeFilter === 'week' ? 'Həftəlik' : 'Aylıq'})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={timeData}>
              <defs>
                <linearGradient id="colorPlacements" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorRemovals" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorChecks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="period" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Area
                type="monotone"
                dataKey="placements"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#colorPlacements)"
                name="Yerləşdirilən"
              />
              <Area
                type="monotone"
                dataKey="removals"
                stroke="hsl(var(--destructive))"
                fillOpacity={1}
                fill="url(#colorRemovals)"
                name="Çıxarılan"
              />
              <Area
                type="monotone"
                dataKey="checks"
                stroke="hsl(var(--success))"
                fillOpacity={1}
                fill="url(#colorChecks)"
                name="Yoxlanılan"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Anomaly Detection */}
      <Card className="animate-fade-in border-destructive/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <span>Anomaliya Aşkarlama</span>
            <div className="ml-auto bg-destructive/10 text-destructive px-2 py-1 rounded-full text-xs">
              {anomalyData.reduce((sum, item) => sum + item.count, 0)} anomaliya
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {anomalyData.map((anomaly, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{anomaly.type}</h4>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getSeverityColor(anomaly.severity) }}
                    />
                    <span className="text-sm font-bold">{anomaly.count}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{anomaly.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recently Checked Branches */}
        {userRole === 'admin' && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Son yoxlanılan filialar</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentlyCheckedBranches.map((branch, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{branch.name}</h4>
                      <p className="text-sm text-muted-foreground">{branch.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{branch.lastCheck}</p>
                      <div className={`inline-flex px-2 py-1 rounded-full text-xs ${
                        branch.status === 'normal' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                      }`}>
                        {branch.status === 'normal' ? 'Normal' : 'Diqqət'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Seal Activity */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Son plomb fəaliyyətləri</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentSeals.map((seal, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      seal.action === 'checked' ? 'bg-success/20' : 'bg-destructive/20'
                    }`}>
                      {seal.action === 'checked' ? 
                        <Eye className="h-4 w-4 text-success" /> : 
                        <Target className="h-4 w-4 text-destructive" />
                      }
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{seal.sealNumber}</h4>
                      <p className="text-xs text-muted-foreground">{seal.objectName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs">{seal.timeAgo}</p>
                    <div className={`inline-flex px-2 py-1 rounded-full text-xs ${
                      seal.action === 'checked' ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
                    }`}>
                      {seal.action === 'checked' ? 'Yoxlandı' : 'Çıxarıldı'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Frequently Accessed Items */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>Tez-tez əlaqə qurulan obyektlər</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {frequentlyAccessed.slice(0, isExpanded ? 5 : 3).map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
                    <span className="text-sm font-bold text-primary">#{index + 1}</span>
                  </div>
                  <h4 className="font-medium">{item.item}</h4>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-bold">{item.count} dəfə</span>
                  <div className={`px-2 py-1 rounded-full text-xs ${getRiskColor(item.risk)}`}>
                    {item.risk === 'high' ? 'Yüksək risk' : item.risk === 'medium' ? 'Orta risk' : 'Aşağı risk'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};