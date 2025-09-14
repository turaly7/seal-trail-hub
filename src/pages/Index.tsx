import React from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Login } from '@/components/Login';
import { TenantSelector } from '@/components/TenantSelector';
import { Dashboard } from '@/components/Dashboard';

const AppContent = () => {
  const { user, tenant } = useAuth();

  if (!user) {
    return <Login />;
  }

  if (!tenant) {
    return <TenantSelector />;
  }

  return <Dashboard />;
};

const Index = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;
