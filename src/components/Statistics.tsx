import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { demoSeals, demoTenants } from '@/data/demoData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { TrendingUp, Package, CheckCircle, AlertCircle } from 'lucide-react';

export const Statistics = () => {
  const { tenant, user } = useAuth();

  // All seals for admin, only tenant seals for user
  const relevantSeals = user?.role === 'admin' 
    ? demoSeals 
    : demoSeals.filter(seal => seal.tenantId === tenant?.id);

  // Branch statistics
  const branchStats = demoTenants.map(branch => {
    const branchSeals = demoSeals.filter(seal => seal.tenantId === branch.id);
    return {
      name: branch.name,
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
      value: relevantSeals.filter(s => s.objectType === 'техника').length,
      color: '#3b82f6'
    },
    {
      name: 'Çən/Qapı',
      value: relevantSeals.filter(s => s.objectType === 'чəн/капы').length,
      color: '#10b981'
    },
    {
      name: 'Digər',
      value: relevantSeals.filter(s => s.objectType === 'дигəр').length,
      color: '#f59e0b'
    }
  ];

  // Status overview
  const totalSeals = relevantSeals.length;
  const sealedCount = relevantSeals.filter(s => s.status === 'мөhүрлү').length;
  const checkedCount = relevantSeals.filter(s => s.status === 'йохланыб').length;
  const openedCount = relevantSeals.filter(s => s.status === 'ачылыб').length;

  // Recent activity (last 10 seals)
  const recentActivity = relevantSeals
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ümumi Plomblar</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSeals}</div>
            <p className="text-xs text-muted-foreground">
              {user?.role === 'admin' ? 'Bütün filiallarda' : tenant?.name}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Möhürlü</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{sealedCount}</div>
            <p className="text-xs text-muted-foreground">
              {totalSeals > 0 ? Math.round((sealedCount / totalSeals) * 100) : 0}% ümumidən
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yoxlanıb</CardTitle>
            <AlertCircle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{checkedCount}</div>
            <p className="text-xs text-muted-foreground">
              {totalSeals > 0 ? Math.round((checkedCount / totalSeals) * 100) : 0}% ümumidən
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Açılıb</CardTitle>
            <TrendingUp className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{openedCount}</div>
            <p className="text-xs text-muted-foreground">
              {totalSeals > 0 ? Math.round((openedCount / totalSeals) * 100) : 0}% ümumidən
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Branch Chart - Only show for admin */}
        {user?.role === 'admin' && (
          <Card>
            <CardHeader>
              <CardTitle>Filiallara görə statistika</CardTitle>
              <CardDescription>Hər filialda plomb sayı</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={branchStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Object Type Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Obyekt növlərinə görə bölgü</CardTitle>
            <CardDescription>Plombların obyekt növlərinə görə paylanması</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={typeStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {typeStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Son fəaliyyət</CardTitle>
          <CardDescription>Son əlavə edilən plomblar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((seal) => (
              <div key={seal.id} className="flex items-center justify-between border-b pb-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{seal.sealNumber} - {seal.objectName}</p>
                  <p className="text-xs text-muted-foreground">{seal.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">
                    {seal.createdAt.toLocaleDateString('az-AZ')}
                  </p>
                </div>
              </div>
            ))}
            {recentActivity.length === 0 && (
              <p className="text-center text-muted-foreground py-4">
                Heç bir fəaliyyət tapılmadı
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};