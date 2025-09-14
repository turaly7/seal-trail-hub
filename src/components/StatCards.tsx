import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Package, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

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
    <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              {title}
            </p>
            <div className="flex items-baseline space-x-2">
              <p className="text-3xl font-bold">
                {value.toLocaleString()}
              </p>
              {total && (
                <Badge variant="outline" className="text-xs">
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
          <div className="flex-shrink-0">
            <div className="p-3 rounded-full bg-primary/10">
              {icon}
            </div>
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Ümumi Plomblar"
        value={data.total}
        icon={<Package className="h-6 w-6 text-primary" />}
        trend={{ value: 12, isPositive: true }}
        className="border-l-4 border-l-primary"
      />
      <StatCard
        title="Möhürlü"
        value={data.sealed}
        total={data.total}
        icon={<CheckCircle className="h-6 w-6 text-success" />}
        trend={{ value: 8, isPositive: true }}
        className="border-l-4 border-l-success"
      />
      <StatCard
        title="Yoxlanıb"
        value={data.checked}
        total={data.total}
        icon={<AlertCircle className="h-6 w-6 text-warning" />}
        trend={{ value: 3, isPositive: false }}
        className="border-l-4 border-l-warning"
      />
      <StatCard
        title="Açılıb"
        value={data.opened}
        total={data.total}
        icon={<XCircle className="h-6 w-6 text-destructive" />}
        trend={{ value: 15, isPositive: false }}
        className="border-l-4 border-l-destructive"
      />
    </div>
  );
};