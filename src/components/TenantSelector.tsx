import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { demoTenants } from '@/data/demoData';
import { MapPin, Building2 } from 'lucide-react';

export const TenantSelector = () => {
  const { user, setSelectedTenant, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-primary/5 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Filial seçimi</h1>
            <p className="text-muted-foreground">Xoş gəlmisiniz, {user?.username}!</p>
          </div>
          <Button variant="outline" onClick={logout}>
            Çıxış
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {demoTenants.map((tenant) => (
            <Card key={tenant.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  {tenant.name}
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {tenant.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => setSelectedTenant(tenant.id)}
                  className="w-full"
                >
                  Filialı seç
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};