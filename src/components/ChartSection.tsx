import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { demoSeals, demoTenants } from '@/data/demoData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';
import { BarChart3, PieChart as PieChartIcon, Activity } from 'lucide-react';

interface ChartSectionProps {
  userRole: 'user' | 'admin';
}

const COLORS = {
  primary: '#ef4444',
  secondary: '#3b82f6',
  success: '#22c55e',
  warning: '#f59e0b',
  info: '#06b6d4',
  purple: '#8b5cf6',
};

export const ChartSection: React.FC<ChartSectionProps> = ({ userRole }) => {
  // Branch statistics for admin
  const branchStats = demoTenants.map(branch => {
    const branchSeals = demoSeals.filter(seal => seal.tenantId === branch.id);
    return {
      name: branch.name.replace(/\s+/g, '\n'),
      total: branchSeals.length,
      sealed: branchSeals.filter(s => s.status === 'мөhүрлү').length,
      checked: branchSeals.filter(s => s.status === 'йохланыб').length,
      opened: branchSeals.filter(s => s.status === 'ачылыб').length,
    };
  });

  // Object type statistics
  const typeStats = [
    {
      name: 'Texnika',
      value: demoSeals.filter(s => s.objectType === 'техника').length,
      color: COLORS.primary,
    },
    {
      name: 'Çən/Qapı',
      value: demoSeals.filter(s => s.objectType === 'чəн/капы').length,
      color: COLORS.success,
    },
    {
      name: 'Digər',
      value: demoSeals.filter(s => s.objectType === 'дигəр').length,
      color: COLORS.warning,
    }
  ];

  // Monthly activity simulation
  const monthlyActivity = [
    { month: 'Yan', seals: 45, checks: 12 },
    { month: 'Fev', seals: 52, checks: 18 },
    { month: 'Mar', seals: 48, checks: 15 },
    { month: 'Apr', seals: 61, checks: 22 },
    { month: 'May', seals: 55, checks: 19 },
    { month: 'İyun', seals: 67, checks: 28 },
  ];

  // Status distribution
  const statusStats = [
    {
      name: 'Möhürlü',
      value: demoSeals.filter(s => s.status === 'мөhүрлү').length,
      color: COLORS.success,
    },
    {
      name: 'Yoxlanıb',
      value: demoSeals.filter(s => s.status === 'йохланыб').length,
      color: COLORS.warning,
    },
    {
      name: 'Açılıb',
      value: demoSeals.filter(s => s.status === 'ачылыб').length,
      color: COLORS.primary,
    }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg shadow-lg p-3">
          <p className="font-medium text-sm">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Branch Statistics - Only for admin */}
      {userRole === 'admin' && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span>Filiallara görə statistika</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={branchStats} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="sealed" name="Möhürlü" fill={COLORS.success} radius={[4, 4, 0, 0]} />
                <Bar dataKey="checked" name="Yoxlanıb" fill={COLORS.warning} radius={[4, 4, 0, 0]} />
                <Bar dataKey="opened" name="Açılıb" fill={COLORS.primary} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Object Type Distribution */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PieChartIcon className="h-5 w-5 text-primary" />
            <span>Obyekt növləri</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={typeStats}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}\n${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {typeStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Status Distribution */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PieChartIcon className="h-5 w-5 text-primary" />
            <span>Status paylanması</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusStats}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {statusStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-4 mt-4">
            {statusStats.map((stat, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: stat.color }}
                />
                <span className="text-sm text-muted-foreground">{stat.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Activity Trend */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-primary" />
            <span>Aylıq fəaliyyət</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyActivity}>
              <defs>
                <linearGradient id="colorSeals" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorChecks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.secondary} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={COLORS.secondary} stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="seals"
                stroke={COLORS.primary}
                fillOpacity={1}
                fill="url(#colorSeals)"
                name="Yeni plomblar"
              />
              <Area
                type="monotone"
                dataKey="checks"
                stroke={COLORS.secondary}
                fillOpacity={1}
                fill="url(#colorChecks)"
                name="Yoxlamalar"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};