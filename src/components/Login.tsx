import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { 
  Shield, 
  Lock, 
  User, 
  Sparkles, 
  Zap, 
  Eye, 
  EyeOff,
  Cpu,
  Globe,
  Activity
} from 'lucide-react';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (login(username, password)) {
      toast.success('Sistem girişi uğurlu!', {
        description: 'AI security protokolları aktifləşdirildi',
        duration: 3000,
      });
    } else {
      toast.error('Giriş məlumatları yanlışdır', {
        description: 'Təhlükəsizlik protokolları məlumatları təsdiq etmədi',
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-info/10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 gradient-electric opacity-20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 gradient-sunset opacity-20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 gradient-aurora opacity-30 rounded-full blur-2xl animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-6">
        <Card className="glass animate-bounce-in shadow-2xl">
          <CardHeader className="text-center space-y-4">
            {/* Modern Logo */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="p-4 gradient-primary rounded-2xl pulse-glow animate-rotate-in">
                  <Shield className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 p-2 bg-accent rounded-full animate-bounce-in" style={{animationDelay: '0.5s'}}>
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div className="absolute -bottom-2 -left-2 p-1 bg-info rounded-full animate-scale-in" style={{animationDelay: '0.7s'}}>
                  <Zap className="h-3 w-3 text-white" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2 animate-slide-up" style={{animationDelay: '0.3s'}}>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-info bg-clip-text text-transparent">
                PlombTech AI
              </CardTitle>
              <CardDescription className="text-base flex items-center justify-center space-x-2">
                <Cpu className="h-4 w-4" />
                <span>Next-Gen Security Platform</span>
              </CardDescription>
            </div>

            {/* Status Indicators */}
            <div className="flex justify-center space-x-4 animate-fade-in" style={{animationDelay: '0.6s'}}>
              <div className="flex items-center space-x-1 px-2 py-1 bg-success/10 rounded-full border border-success/20">
                <Globe className="h-3 w-3 text-success animate-pulse" />
                <span className="text-xs text-success">Online</span>
              </div>
              <div className="flex items-center space-x-1 px-2 py-1 bg-info/10 rounded-full border border-info/20">
                <Activity className="h-3 w-3 text-info" />
                <span className="text-xs text-info">Secure</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2 animate-slide-up" style={{animationDelay: '0.4s'}}>
                  <Label htmlFor="username" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>İstifadəçi adı</span>
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="user və ya admin"
                    className="glass border-primary/20 focus:border-primary/50 transition-all duration-300"
                    required
                  />
                </div>
                
                <div className="space-y-2 animate-slide-up" style={{animationDelay: '0.5s'}}>
                  <Label htmlFor="password" className="flex items-center space-x-2">
                    <Lock className="h-4 w-4" />
                    <span>Şifrə</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="user və ya admin"
                      className="glass border-primary/20 focus:border-primary/50 transition-all duration-300 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 gradient-primary hover:opacity-90 transition-all duration-300 hover-lift animate-bounce-in"
                style={{animationDelay: '0.6s'}}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <Activity className="h-4 w-4 animate-spin" />
                    <span>Sistemə daxil olunur...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4" />
                    <span>Secure Login</span>
                  </div>
                )}
              </Button>
            </form>
            
            <div className="mt-6 p-4 glass rounded-xl border border-primary/20 animate-fade-in" style={{animationDelay: '0.8s'}}>
              <p className="text-sm text-center space-y-2">
                <span className="flex items-center justify-center space-x-2 font-semibold text-primary">
                  <Sparkles className="h-4 w-4" />
                  <span>Demo Access Credentials</span>
                </span>
                <span className="block text-muted-foreground">
                  <strong className="text-primary">User:</strong> user / user<br/>
                  <strong className="text-accent">Admin:</strong> admin / admin
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};