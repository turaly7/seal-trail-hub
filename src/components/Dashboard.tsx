import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { demoSeals } from '@/data/demoData';
import { AddSealDialog } from './AddSealDialog';
import { StatCards } from './StatCards';
import { SealsTable } from './SealsTable';
import { AdvancedAnalytics } from './AdvancedAnalytics';
import { 
  Plus, 
  Scan, 
  LogOut,
  QrCode,
  User,
  BarChart3,
  Table,
  TrendingUp,
  Sparkles,
  Zap,
  Target,
  Activity,
  Eye,
  Settings,
  Bell,
  Star,
  Layers,
  Cpu,
  Globe,
  Rocket
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
      description: 'AI-powered sistem avtomatik olaraq plombu tanıdı və sistemə əlavə etdi',
      duration: 4000,
    });
  };

  const navigationItems = [
    { id: 'overview', label: 'Ümumi baxış', icon: Eye, gradient: 'gradient-electric' },
    { id: 'table', label: 'Smart Cədvəl', icon: Layers, gradient: 'gradient-ocean' },
    { id: 'charts', label: 'Analytics Hub', icon: Activity, gradient: 'gradient-sunset' },
  ];

  const quickActions = [
    {
      title: 'AI Plomb Əlavə Et',
      subtitle: 'Smart recognition system',
      icon: Sparkles,
      gradient: 'gradient-primary',
      action: () => setIsAddDialogOpen(true),
    },
    {
      title: 'Quantum Scan',
      subtitle: 'Ultra-fast detection',
      icon: Zap,
      gradient: 'gradient-electric',
      action: handleScanSimulation,
    },
    {
      title: 'Real-time Analytics',
      subtitle: 'Live monitoring dashboard',
      icon: Target,
      gradient: 'gradient-ocean',
      action: () => setActiveSection('charts'),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Ultra Modern Header */}
      <header className="border-b glass sticky top-0 z-50 animate-fade-in">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4">
                {/* Modern Logo */}
                <div className="relative">
                  <div className="p-3 rounded-xl gradient-primary pulse-glow animate-rotate-in">
                    <QrCode className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 p-1 bg-accent rounded-full animate-bounce-in" style={{animationDelay: '0.3s'}}>
                    <Sparkles className="h-3 w-3 text-white" />
                  </div>
                </div>
                <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-info bg-clip-text text-transparent">
                    PlombTech AI
                  </h1>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Cpu className="h-3 w-3" />
                    <span>Next-Gen Security Platform</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-1 h-1 bg-success rounded-full animate-pulse"></div>
                      <span className="text-success">Live</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Status Indicators */}
              <div className="hidden md:flex items-center space-x-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
                <div className="flex items-center space-x-2 px-3 py-1 bg-success/10 rounded-full border border-success/20">
                  <Globe className="h-4 w-4 text-success animate-pulse" />
                  <span className="text-sm text-success font-medium">Online</span>
                </div>
                <div className="flex items-center space-x-2 px-3 py-1 bg-info/10 rounded-full border border-info/20">
                  <Activity className="h-4 w-4 text-info" />
                  <span className="text-sm text-info font-medium">{sealStats.total} Active</span>
                </div>
              </div>
              
              {/* User Profile */}
              <div className="flex items-center space-x-3 px-4 py-2 glass rounded-xl hover-lift animate-scale-in" style={{animationDelay: '0.5s'}}>
                <div className="relative">
                  {user?.role === 'admin' ? (
                    <div className="p-2 gradient-primary rounded-lg">
                      <QrCode className="h-4 w-4 text-white" />
                    </div>
                  ) : (
                    <div className="p-2 bg-muted rounded-lg">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <p className="text-sm font-semibold">{user?.username}</p>
                  <p className="text-xs text-muted-foreground flex items-center space-x-1">
                    <Star className="h-3 w-3" />
                    <span className="capitalize">{user?.role}</span>
                  </p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-2 animate-fade-in" style={{animationDelay: '0.6s'}}>
                <Button variant="outline" size="sm" className="hover-glow">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="hover-glow">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={logout} 
                  className="hover-lift hover:shadow-xl transition-all duration-300"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Exit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Futuristic Navigation */}
      <nav className="border-b glass">
        <div className="container mx-auto px-6">
          <div className="flex space-x-2">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as any)}
                  className={`relative py-4 px-6 font-medium text-sm transition-all duration-300 flex items-center space-x-3 rounded-t-xl hover-lift animate-bounce-in ${
                    activeSection === item.id
                      ? 'text-white'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  {activeSection === item.id && (
                    <div className={`absolute inset-0 ${item.gradient} rounded-t-xl opacity-90`}></div>
                  )}
                  <div className="relative z-10 flex items-center space-x-3">
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                    {activeSection === item.id && (
                      <Rocket className="h-4 w-4 animate-bounce" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Dynamic Content */}
      <main className="container mx-auto px-6 py-8">
        {activeSection === 'overview' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4 animate-fade-in">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-info bg-clip-text text-transparent">
                AI-Powered Plomb Management
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Next-generation security tracking with quantum-level precision and real-time analytics
              </p>
            </div>

            {/* Quick Actions Grid */}
            <Card className="glass hover-lift animate-slide-up" style={{animationDelay: '0.2s'}}>
              <CardHeader>
                <CardTitle className="text-xl flex items-center space-x-2">
                  <Zap className="h-6 w-6 text-primary animate-pulse" />
                  <span>Lightning Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      onClick={action.action}
                      className={`h-24 text-lg ${action.gradient} hover:opacity-90 transition-all duration-500 hover-lift animate-bounce-in group`}
                      style={{animationDelay: `${index * 150}ms`}}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <action.icon className="h-8 w-8 text-white group-hover:animate-pulse" />
                        <div className="text-center">
                          <div className="font-bold text-white">{action.title}</div>
                          <div className="text-xs text-white/80">{action.subtitle}</div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Statistics */}
            <div className="animate-slide-up" style={{animationDelay: '0.4s'}}>
              <StatCards data={sealStats} />
            </div>

            {/* Mini Charts Preview */}
            <div className="animate-fade-in" style={{animationDelay: '0.6s'}}>
              <AdvancedAnalytics userRole={user?.role || 'user'} />
            </div>
          </div>
        )}

        {activeSection === 'table' && (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Smart Data Table
              </h2>
              <p className="text-muted-foreground mt-2 flex items-center justify-center space-x-2">
                <Layers className="h-4 w-4" />
                <span>Advanced filtering and real-time updates</span>
              </p>
            </div>
            <SealsTable userRole={user?.role || 'user'} />
          </div>
        )}

        {activeSection === 'charts' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-accent via-primary to-info bg-clip-text text-transparent">
                Analytics Command Center
              </h2>
              <p className="text-muted-foreground mt-2 flex items-center justify-center space-x-2">
                <Activity className="h-4 w-4" />
                <span>Real-time insights and predictive analytics</span>
              </p>
            </div>
            <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
              <StatCards data={sealStats} />
            </div>
            <div className="animate-fade-in" style={{animationDelay: '0.4s'}}>
              <AdvancedAnalytics userRole={user?.role || 'user'} />
            </div>
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