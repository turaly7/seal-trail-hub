import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { AlertTriangle, TrendingUp, Clock, MapPin, Shield, Zap, Calendar, Users, Activity, Eye, AlertCircle } from 'lucide-react';
import { demoSeals, demoTenants } from '@/data/demoData';
import { useAuth } from '@/contexts/AuthContext';

interface AdvancedAnalyticsProps {
  userRole: 'user' | 'admin';
}

export const AdvancedAnalytics: React.FC<AdvancedAnalyticsProps> = ({ userRole }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('daily');

  const getTenantName = (tenantId: string) => {
    const tenant = demoTenants.find(t => t.id === tenantId);
    return tenant?.name || 'Naməlum filial';
  };

  // Chart colors
  const COLORS = {
    primary: 'hsl(var(--primary))',
    secondary: 'hsl(var(--secondary))',
    accent: 'hsl(var(--accent))',
    warning: 'hsl(var(--warning))',
    destructive: 'hsl(var(--destructive))',
    success: 'hsl(var(--success))',
    muted: 'hsl(var(--muted))'
  };

  const CHART_COLORS = [COLORS.primary, COLORS.secondary, COLORS.accent, COLORS.warning, COLORS.destructive, COLORS.success];

  // Daily data
  const dailyData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    placements: Math.floor(Math.random() * 10) + 1,
    removals: Math.floor(Math.random() * 3),
    checks: Math.floor(Math.random() * 8) + 2,
    anomalies: Math.floor(Math.random() * 2)
  }));

  // Weekly data
  const weeklyData = [
    { day: 'B.e', placements: 45, removals: 8, checks: 67, anomalies: 2 },
    { day: 'Ç.a', placements: 52, removals: 12, checks: 74, anomalies: 4 },
    { day: 'Ç', placements: 38, removals: 6, checks: 58, anomalies: 1 },
    { day: 'C.a', placements: 61, removals: 15, checks: 89, anomalies: 6 },
    { day: 'C', placements: 48, removals: 9, checks: 72, anomalies: 3 },
    { day: 'Ş', placements: 33, removals: 4, checks: 51, anomalies: 1 },
    { day: 'B', placements: 28, removals: 3, checks: 42, anomalies: 0 }
  ];

  // Monthly data
  const monthlyData = [
    { month: 'Yanvar', placements: 1250, removals: 180, checks: 1890, anomalies: 24 },
    { month: 'Fevral', placements: 1180, removals: 165, checks: 1750, anomalies: 18 },
    { month: 'Mart', placements: 1420, removals: 210, checks: 2100, anomalies: 32 },
    { month: 'Aprel', placements: 1350, removals: 195, checks: 1980, anomalies: 28 },
    { month: 'May', placements: 1480, removals: 220, checks: 2150, anomalies: 35 },
    { month: 'İyun', placements: 1320, removals: 185, checks: 1920, anomalies: 22 }
  ];

  const fakeSeals = useMemo(() => {
    const sealGroups = new Map();
    demoSeals.forEach(seal => {
      const key = seal.sealNumber;
      if (!sealGroups.has(key)) {
        sealGroups.set(key, []);
      }
      sealGroups.get(key).push(seal);
    });
    
    return Array.from(sealGroups.entries())
      .filter(([_, seals]) => seals.length > 1)
      .map(([sealNumber, seals]) => ({
        sealNumber,
        locations: seals.map(s => `${getTenantName(s.tenantId)} (${s.location})`),
        timeDiff: Math.abs(new Date(seals[1]?.createdAt).getTime() - new Date(seals[0]?.createdAt).getTime()) / (1000 * 60), // minutes
        count: seals.length,
        seals: seals
      }));
  }, []);

  const detailedFakeSeals = useMemo(() => {
    const fakeItems = [];
    fakeSeals.forEach(fake => {
      fake.seals.forEach((seal, index) => {
        fakeItems.push({
          id: seal.id,
          sealNumber: seal.sealNumber,
          objectName: seal.objectName,
          location: `${getTenantName(seal.tenantId)} - ${seal.location}`,
          createdAt: seal.createdAt,
          suspicionLevel: fake.timeDiff < 30 ? 'Yüksək' : fake.timeDiff < 60 ? 'Orta' : 'Aşağı'
        });
      });
    });
    return fakeItems;
  }, [fakeSeals]);

  const frequentlyRemoved = useMemo(() => {
    return demoSeals
      .filter(seal => seal.status === 'ачылыб')
      .reduce((acc, seal) => {
        const key = `${seal.objectName}-${seal.tenantId}`;
        if (!acc[key]) {
          acc[key] = {
            objectName: seal.objectName,
            location: getTenantName(seal.tenantId),
            count: 0,
            lastRemoved: seal.lastChecked || seal.createdAt,
            seals: []
          };
        }
        acc[key].count++;
        acc[key].seals.push(seal);
        if (seal.lastChecked && seal.lastChecked > acc[key].lastRemoved) {
          acc[key].lastRemoved = seal.lastChecked;
        }
        return acc;
      }, {} as Record<string, any>);
  }, []);

  const detailedFrequentlyRemoved = useMemo(() => {
    return Object.values(frequentlyRemoved)
      .filter((item: any) => item.count >= 2)
      .flatMap((item: any) => 
        item.seals.map((seal: any) => ({
          id: seal.id,
          sealNumber: seal.sealNumber,
          objectName: seal.objectName,
          location: `${getTenantName(seal.tenantId)} - ${seal.location}`,
          removedAt: seal.lastChecked || seal.createdAt,
          totalRemovals: item.count
        }))
      )
      .sort((a, b) => b.totalRemovals - a.totalRemovals);
  }, [frequentlyRemoved]);

  const anomalies = useMemo(() => {
    return demoSeals
      .filter(seal => {
        if (!seal.lastChecked) return false;
        const timeDiff = (seal.lastChecked.getTime() - seal.createdAt.getTime()) / (1000 * 60); // minutes
        return timeDiff < 60; // Less than 1 hour
      })
      .map(seal => ({
        id: seal.id,
        sealNumber: seal.sealNumber,
        objectName: seal.objectName,
        location: `${getTenantName(seal.tenantId)} - ${seal.location}`,
        timeDiff: (seal.lastChecked!.getTime() - seal.createdAt.getTime()) / (1000 * 60),
        createdAt: seal.createdAt,
        removedAt: seal.lastChecked!,
        severity: (seal.lastChecked!.getTime() - seal.createdAt.getTime()) / (1000 * 60) < 30 ? 'Kritik' : 'Yüksək'
      }))
      .sort((a, b) => a.timeDiff - b.timeDiff);
  }, []);

  const recentlyChecked = useMemo(() => {
    return demoSeals
      .filter(seal => seal.status === 'йохланыб')
      .sort((a, b) => (b.lastChecked || b.createdAt).getTime() - (a.lastChecked || a.createdAt).getTime())
      .slice(0, 10)
      .map(seal => ({
        id: seal.id,
        sealNumber: seal.sealNumber,
        objectName: seal.objectName,
        location: `${getTenantName(seal.tenantId)} - ${seal.location}`,
        checkedAt: seal.lastChecked || seal.createdAt
      }));
  }, []);

  const recentlyRemoved = useMemo(() => {
    return demoSeals
      .filter(seal => seal.status === 'ачылыб')
      .sort((a, b) => (b.lastChecked || b.createdAt).getTime() - (a.lastChecked || a.createdAt).getTime())
      .slice(0, 10)
      .map(seal => ({
        id: seal.id,
        sealNumber: seal.sealNumber,
        objectName: seal.objectName,
        location: `${getTenantName(seal.tenantId)} - ${seal.location}`,
        removedAt: seal.lastChecked || seal.createdAt
      }));
  }, []);

  const recentlyCheckedBranches = useMemo(() => {
    const branchActivity = demoTenants.map(tenant => {
      const tenantSeals = demoSeals.filter(seal => seal.tenantId === tenant.id);
      const lastActivity = tenantSeals.reduce((latest, seal) => {
        const activityDate = seal.lastChecked || seal.createdAt;
        return activityDate > latest ? activityDate : latest;
      }, new Date(0));
      
      return {
        tenantId: tenant.id,
        name: tenant.name,
        location: tenant.location,
        lastActivity,
        totalSeals: tenantSeals.length,
        activeSeals: tenantSeals.filter(s => s.status === 'мөhүрлү').length
      };
    }).sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime());
    
    return branchActivity.slice(0, 10);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Analitika Hub
          </h2>
          <p className="text-muted-foreground mt-1">Təkmil analitika və anomaliya aşkarlama sistemi</p>
        </div>
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary animate-pulse" />
          <Badge variant="outline" className="animate-bounce-in">
            Canlı məlumat
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Quick Stats Cards */}
        <Card className="glass-effect border-border/60">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-warning flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Saxta plomblar
              </CardTitle>
              <Badge variant="destructive" className="animate-pulse">
                {detailedFakeSeals.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {fakeSeals.slice(0, 3).map((fake, index) => (
                <Alert key={index} className="border-warning/20 bg-warning/5">
                  <AlertDescription className="text-xs">
                    <strong>{fake.sealNumber}</strong><br/>
                    {fake.locations.join(' və ')}<br/>
                    <span className="text-muted-foreground">
                      {fake.timeDiff < 30 ? '⚠️ Yüksək risk' : '⚡ Şübhəli'}
                    </span>
                  </AlertDescription>
                </Alert>
              ))}
              {fakeSeals.length > 3 && (
                <p className="text-xs text-muted-foreground text-center">
                  və {fakeSeals.length - 3} daha çox...
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-border/60">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-destructive flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Tez-tez çıxarılan
              </CardTitle>
              <Badge variant="secondary">
                {detailedFrequentlyRemoved.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.values(frequentlyRemoved).slice(0, 3).map((item: any, index) => (
                <Alert key={index} className="border-destructive/20 bg-destructive/5">
                  <AlertDescription className="text-xs">
                    <strong>{item.objectName}</strong><br/>
                    {item.location}<br/>
                    <span className="text-muted-foreground">
                      {item.count} dəfə çıxarılıb
                    </span>
                  </AlertDescription>
                </Alert>
              ))}
              {Object.keys(frequentlyRemoved).length > 3 && (
                <p className="text-xs text-muted-foreground text-center">
                  və {Object.keys(frequentlyRemoved).length - 3} daha çox...
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-border/60">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-orange-500 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Anomaliyalar
              </CardTitle>
              <Badge variant="outline" className="border-orange-500/50">
                {anomalies.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {anomalies.slice(0, 3).map((anomaly, index) => (
                <Alert key={index} className="border-orange-500/20 bg-orange-500/5">
                  <AlertDescription className="text-xs">
                    <strong>{anomaly.sealNumber}</strong><br/>
                    {anomaly.objectName}<br/>
                    <span className="text-muted-foreground">
                      {Math.round(anomaly.timeDiff)} dəqiqə fərq - {anomaly.severity}
                    </span>
                  </AlertDescription>
                </Alert>
              ))}
              {anomalies.length > 3 && (
                <p className="text-xs text-muted-foreground text-center">
                  və {anomalies.length - 3} daha çox...
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-border/60">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-primary flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Ümumi baxış
              </CardTitle>
              <Badge variant="default" className="animate-scale-in">
                OK
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Aktiv plomblar</span>
                <span className="font-semibold text-success">{demoSeals.filter(s => s.status === 'мөhүрлү').length}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Son yoxlanılan</span>
                <span className="font-semibold">{demoSeals.filter(s => s.status === 'йохланыб').length}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Çıxarılan</span>
                <span className="font-semibold text-destructive">{demoSeals.filter(s => s.status === 'ачылыб').length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="daily">Günlük</TabsTrigger>
            <TabsTrigger value="weekly">Həftəlik</TabsTrigger>
            <TabsTrigger value="monthly">Aylıq</TabsTrigger>
            <TabsTrigger value="insights">İnkişaf</TabsTrigger>
            <TabsTrigger value="details">Detallı</TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="space-y-6">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Günlük fəaliyyət (Saatlıq)
                </CardTitle>
                <CardDescription>Bugünkü plomb fəaliyyətlərinin saatlıq paylanması</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={dailyData}>
                    <defs>
                      <linearGradient id="colorPlacements" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorRemovals" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS.destructive} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={COLORS.destructive} stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
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
                      stroke={COLORS.primary}
                      fillOpacity={1}
                      fill="url(#colorPlacements)"
                      name="Yerləşdirilən"
                    />
                    <Area
                      type="monotone"
                      dataKey="removals"
                      stroke={COLORS.destructive}
                      fillOpacity={1}
                      fill="url(#colorRemovals)"
                      name="Çıxarılan"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-6">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Həftəlik trend analizi
                </CardTitle>
                <CardDescription>Son həftədə plomb fəaliyyətlərinin dinamikası</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="placements" fill={COLORS.primary} name="Yerləşdirilən" />
                    <Bar dataKey="removals" fill={COLORS.destructive} name="Çıxarılan" />
                    <Bar dataKey="checks" fill={COLORS.success} name="Yoxlanılan" />
                    <Bar dataKey="anomalies" fill={COLORS.warning} name="Anomaliyalar" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-6">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Aylıq statistika
                </CardTitle>
                <CardDescription>İlin ilk 6 ayının ümumi statistikası</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="placements" 
                      stroke={COLORS.primary} 
                      strokeWidth={3}
                      name="Yerləşdirilən"
                      dot={{ fill: COLORS.primary, strokeWidth: 2, r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="removals" 
                      stroke={COLORS.destructive} 
                      strokeWidth={3}
                      name="Çıxarılan"
                      dot={{ fill: COLORS.destructive, strokeWidth: 2, r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="checks" 
                      stroke={COLORS.success} 
                      strokeWidth={3}
                      name="Yoxlanılan"
                      dot={{ fill: COLORS.success, strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>Status paylanması</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Möhürlü', value: demoSeals.filter(s => s.status === 'мөhүрлү').length, fill: COLORS.success },
                          { name: 'Yoxlanıb', value: demoSeals.filter(s => s.status === 'йохланыб').length, fill: COLORS.warning },
                          { name: 'Açılıb', value: demoSeals.filter(s => s.status === 'ачылыб').length, fill: COLORS.destructive }
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>Obyekt növləri</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Texnika', value: demoSeals.filter(s => s.objectType === 'техника').length, fill: COLORS.primary },
                          { name: 'Çən/Qapı', value: demoSeals.filter(s => s.objectType === 'чəн/капы').length, fill: COLORS.accent },
                          { name: 'Digər', value: demoSeals.filter(s => s.objectType === 'дигəр').length, fill: COLORS.secondary }
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Saxta plomblar detallı */}
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    Saxta plomblar - Detallı məlumat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-h-60 overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Plomb №</TableHead>
                          <TableHead>Obyekt</TableHead>
                          <TableHead>Yer</TableHead>
                          <TableHead>Risk</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {detailedFakeSeals.map((seal) => (
                          <TableRow key={seal.id}>
                            <TableCell className="font-mono text-xs">{seal.sealNumber}</TableCell>
                            <TableCell className="text-xs">{seal.objectName}</TableCell>
                            <TableCell className="text-xs">{seal.location}</TableCell>
                            <TableCell>
                              <Badge variant={seal.suspicionLevel === 'Yüksək' ? 'destructive' : seal.suspicionLevel === 'Orta' ? 'secondary' : 'outline'}>
                                {seal.suspicionLevel}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* Tez-tez çıxarılan plomblar detallı */}
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-destructive" />
                    Tez-tez çıxarılan plomblar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-h-60 overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Plomb №</TableHead>
                          <TableHead>Obyekt</TableHead>
                          <TableHead>Yer</TableHead>
                          <TableHead>Sayı</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {detailedFrequentlyRemoved.map((seal) => (
                          <TableRow key={seal.id}>
                            <TableCell className="font-mono text-xs">{seal.sealNumber}</TableCell>
                            <TableCell className="text-xs">{seal.objectName}</TableCell>
                            <TableCell className="text-xs">{seal.location}</TableCell>
                            <TableCell>
                              <Badge variant={seal.totalRemovals >= 5 ? 'destructive' : 'secondary'}>
                                {seal.totalRemovals}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* Anomaliyalar detallı */}
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                    Anomaliyalar - Detallı məlumat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-h-60 overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Plomb №</TableHead>
                          <TableHead>Obyekt</TableHead>
                          <TableHead>Yer</TableHead>
                          <TableHead>Fərq</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {anomalies.map((anomaly) => (
                          <TableRow key={anomaly.id}>
                            <TableCell className="font-mono text-xs">{anomaly.sealNumber}</TableCell>
                            <TableCell className="text-xs">{anomaly.objectName}</TableCell>
                            <TableCell className="text-xs">{anomaly.location}</TableCell>
                            <TableCell>
                              <Badge variant={anomaly.severity === 'Kritik' ? 'destructive' : 'secondary'}>
                                {Math.round(anomaly.timeDiff)}m
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* Son yoxlanılan filiallar */}
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Son yoxlanılan filiallar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-h-60 overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Filial</TableHead>
                          <TableHead>Yer</TableHead>
                          <TableHead>Son aktivlik</TableHead>
                          <TableHead>Aktiv plomblar</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentlyCheckedBranches.map((branch) => (
                          <TableRow key={branch.tenantId}>
                            <TableCell className="text-xs font-medium">{branch.name}</TableCell>
                            <TableCell className="text-xs">{branch.location}</TableCell>
                            <TableCell className="text-xs">
                              {branch.lastActivity.toLocaleDateString('az-AZ', { 
                                day: '2-digit', 
                                month: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {branch.activeSeals}/{branch.totalSeals}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Son yoxlanılan plomblar */}
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    Son yoxlanılan plomblar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-h-60 overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Plomb №</TableHead>
                          <TableHead>Obyekt</TableHead>
                          <TableHead>Yer</TableHead>
                          <TableHead>Tarix</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentlyChecked.map((seal) => (
                          <TableRow key={seal.id}>
                            <TableCell className="font-mono text-xs">{seal.sealNumber}</TableCell>
                            <TableCell className="text-xs">{seal.objectName}</TableCell>
                            <TableCell className="text-xs">{seal.location}</TableCell>
                            <TableCell className="text-xs">
                              {seal.checkedAt.toLocaleDateString('az-AZ', { 
                                day: '2-digit', 
                                month: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* Son çıxarılan plomblar */}
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    Son çıxarılan plomblar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-h-60 overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Plomb №</TableHead>
                          <TableHead>Obyekt</TableHead>
                          <TableHead>Yer</TableHead>
                          <TableHead>Tarix</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentlyRemoved.map((seal) => (
                          <TableRow key={seal.id}>
                            <TableCell className="font-mono text-xs">{seal.sealNumber}</TableCell>
                            <TableCell className="text-xs">{seal.objectName}</TableCell>
                            <TableCell className="text-xs">{seal.location}</TableCell>
                            <TableCell className="text-xs">
                              {seal.removedAt.toLocaleDateString('az-AZ', { 
                                day: '2-digit', 
                                month: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};