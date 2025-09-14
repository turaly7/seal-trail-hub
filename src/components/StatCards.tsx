import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  Sparkles,
  Zap,
  Shield,
  Activity
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  total?: number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  total, 
  icon, 
  trend, 
  className = '' 
}) => {
  const percentage = total && total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <Card className={`relative overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 glass animate-bounce-in group ${className}`}>
      <CardContent className="p-6 relative">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-20 h-20 gradient-primary opacity-10 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 gradient-electric opacity-5 rounded-full blur-lg"></div>
        <div className="flex items-center justify-between relative z-10">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              {title}
            </p>
            <div className="flex items-baseline space-x-2">
              <p className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                {value.toLocaleString()}
              </p>
              {total && (
                <Badge variant="outline" className="text-xs gradient-electric text-white border-none">
                  {percentage}%
                </Badge>
              )}
            </div>
            {trend && (
              <div className="flex items-center space-x-1">
                {trend.isPositive ? (
                  <TrendingUp className="h-4 w-4 text-success" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-destructive" />
                )}
                <span className={`text-sm font-medium ${
                  trend.isPositive ? 'text-success' : 'text-destructive'
                }`}>
                  {trend.value}%
                </span>
                <span className="text-sm text-muted-foreground">son ay</span>
              </div>
            )}
          </div>
          <div className="flex-shrink-0 relative">
            <div className="p-4 rounded-xl gradient-primary group-hover:animate-pulse">
              {icon}
            </div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full animate-ping"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface StatCardsProps {
  data: {
    total: number;
    sealed: number;
    checked: number;
    opened: number;
  };
}

export const StatCards: React.FC<StatCardsProps> = ({ data }) => {
  const cardConfigs = [
    {
      title: "Total Plomblar",
      value: data.total,
      icon: <Package className="h-7 w-7 text-white" />,
      trend: { value: 12, isPositive: true },
      className: "border-l-4 border-l-primary",
      bgIcon: <Sparkles className="h-4 w-4" />
    },
    {
      title: "Möhürlü Plomblar", 
      value: data.sealed,
      total: data.total,
      icon: <Shield className="h-7 w-7 text-white" />,
      trend: { value: 8, isPositive: true },
      className: "border-l-4 border-l-success",
      bgIcon: <CheckCircle className="h-4 w-4" />
    },
    {
      title: "Yoxlanılan",
      value: data.checked,
      total: data.total,
      icon: <Activity className="h-7 w-7 text-white" />,
      trend: { value: 3, isPositive: false },
      className: "border-l-4 border-l-warning",
      bgIcon: <AlertCircle className="h-4 w-4" />
    },
    {
      title: "Açılmış Plomblar",
      value: data.opened,
      total: data.total,
      icon: <Zap className="h-7 w-7 text-white" />,
      trend: { value: 15, isPositive: false },
      className: "border-l-4 border-l-destructive",
      bgIcon: <XCircle className="h-4 w-4" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cardConfigs.map((config, index) => (
        <div key={index} style={{animationDelay: `${index * 100}ms`}}>
          <StatCard {...config} />
        </div>
      ))}
    </div>
  );
};