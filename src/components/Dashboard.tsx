import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { demoSeals } from '@/data/demoData';
import { AddSealDialog } from './AddSealDialog';
import { SealInventory } from './SealInventory';
import { Statistics } from './Statistics';
import { 
  Plus, 
  Scan, 
  Package, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  Building2,
  LogOut
} from 'lucide-react';
import { toast } from 'sonner';

export const Dashboard = () => {
  const { user, tenant, logout, setSelectedTenant } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'inventory' | 'statistics'>('dashboard');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const tenantSeals = demoSeals.filter(seal => seal.tenantId === tenant?.id);
  
  const sealStats = {
    total: tenantSeals.length,
    sealed: tenantSeals.filter(s => s.status === 'мөhүрлү').length,
    checked: tenantSeals.filter(s => s.status === 'йохланыб').length,
    opened: tenantSeals.filter(s => s.status === 'ачылыб').length,
  };

  const handleScanSimulation = () => {
    const sealNumbers = ['SIM001', 'SIM002', 'SIM003', 'SIM004', 'SIM005'];
    const randomSeal = sealNumbers[Math.floor(Math.random() * sealNumbers.length)];
    toast.success(`Yeni plomb skan edildi: ${randomSeal}`, {
      description: 'Avtomatik olaraq inventara əlavə edildi'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold">Universal Plomp Tracker</h1>
              </div>
              <Badge variant="outline" className="text-primary">
                {tenant?.name}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setSelectedTenant('')}>
                Filial dəyiş
              </Button>
              <Button variant="outline" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Çıxış
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {['dashboard', 'inventory', 'statistics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab === 'dashboard' && 'Ana səhifə'}
                {tab === 'inventory' && 'İnventar'}
                {tab === 'statistics' && 'Statistika'}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={() => setIsAddDialogOpen(true)}
                className="h-24 text-lg"
                size="lg"
              >
                <Plus className="h-6 w-6 mr-2" />
                Yeni plomb əlavə et
              </Button>
              <Button
                variant="outline"
                onClick={handleScanSimulation}
                className="h-24 text-lg"
                size="lg"
              >
                <Scan className="h-6 w-6 mr-2" />
                Scan simulyasiya
              </Button>
              <Button
                variant="outline"
                onClick={() => setActiveTab('inventory')}
                className="h-24 text-lg"
                size="lg"
              >
                <Package className="h-6 w-6 mr-2" />
                İnventara bax
              </Button>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ümumi plomblar</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{sealStats.total}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Möhürlü</CardTitle>
                  <CheckCircle className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">{sealStats.sealed}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Yoxlanıb</CardTitle>
                  <AlertCircle className="h-4 w-4 text-warning" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-warning">{sealStats.checked}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Açılıb</CardTitle>
                  <XCircle className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">{sealStats.opened}</div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && <SealInventory />}
        {activeTab === 'statistics' && <Statistics />}
      </main>

      <AddSealDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen} 
      />
    </div>
  );
};