import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { demoSeals } from '@/data/demoData';
import { AddSealDialog } from './AddSealDialog';
import { StatCards } from './StatCards';
import { SealsTable } from './SealsTable';
import { ChartSection } from './ChartSection';
import { 
  Plus, 
  Scan, 
  LogOut,
  Shield,
  User,
  BarChart3,
  Table,
  TrendingUp
} from 'lucide-react';
import { toast } from 'sonner';

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState<'overview' | 'table' | 'charts'>('overview');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const sealStats = {
    total: demoSeals.length,
    sealed: demoSeals.filter(s => s.status === 'мөhүрлү').length,
    checked: demoSeals.filter(s => s.status === 'йохланыб').length,
    opened: demoSeals.filter(s => s.status === 'ачылыб').length,
  };

  const handleScanSimulation = () => {
    const sealNumbers = ['SIM001', 'SIM002', 'SIM003', 'SIM004', 'SIM005'];
    const randomSeal = sealNumbers[Math.floor(Math.random() * sealNumbers.length)];
    toast.success(`Plomb skan edildi: ${randomSeal}`, {
      description: 'Yeni plomb avtomatik olaraq sistemə əlavə edildi',
      duration: 3000,
    });
  };

  const navigationItems = [
    { id: 'overview', label: 'Ümumi baxış', icon: TrendingUp },
    { id: 'table', label: 'Cədvəl görünüşü', icon: Table },
    { id: 'charts', label: 'Qrafiklər', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Professional Header */}
      <header className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    Universal Plomp Tracker
                  </h1>
                  <p className="text-sm text-muted-foreground">Professional SaaS Platform</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                {user?.role === 'admin' ? (
                  <Shield className="h-4 w-4 text-primary" />
                ) : (
                  <User className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="font-medium">{user?.username}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground capitalize">{user?.role}</span>
              </div>
              <Button variant="outline" onClick={logout} className="hover:bg-destructive hover:text-destructive-foreground transition-colors">
                <LogOut className="h-4 w-4 mr-2" />
                Çıxış
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="border-b bg-card/50">
        <div className="container mx-auto px-6">
          <div className="flex space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as any)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-all duration-200 flex items-center space-x-2 ${
                    activeSection === item.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {activeSection === 'overview' && (
          <div className="space-y-8">
            {/* Quick Actions */}
            <Card className="glass animate-fade-in">
              <CardHeader>
                <CardTitle className="text-lg">Tez əməliyyatlar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    onClick={() => setIsAddDialogOpen(true)}
                    className="h-20 text-lg gradient-primary hover:opacity-90 transition-all duration-300 hover:scale-105"
                    size="lg"
                  >
                    <Plus className="h-6 w-6 mr-3" />
                    Yeni plomb əlavə et
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleScanSimulation}
                    className="h-20 text-lg border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300"
                    size="lg"
                  >
                    <Scan className="h-6 w-6 mr-3" />
                    Scan simulyasiya
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setActiveSection('table')}
                    className="h-20 text-lg border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300"
                    size="lg"
                  >
                    <Table className="h-6 w-6 mr-3" />
                    Inventara bax
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Statistics Cards */}
            <div className="animate-slide-up">
              <StatCards data={sealStats} />
            </div>

            {/* Charts Preview */}
            <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
              <ChartSection userRole={user?.role || 'user'} />
            </div>
          </div>
        )}

        {activeSection === 'table' && (
          <div className="animate-fade-in">
            <SealsTable userRole={user?.role || 'user'} />
          </div>
        )}

        {activeSection === 'charts' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Analitik Mərkəz</h2>
              <p className="text-muted-foreground">Ətraflı statistika və təhlillər</p>
            </div>
            <StatCards data={sealStats} />
            <ChartSection userRole={user?.role || 'user'} />
          </div>
        )}
      </main>

      <AddSealDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen} 
      />
    </div>
  );
};