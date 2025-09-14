import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Tenant } from '@/types';
import { demoUsers, demoTenants } from '@/data/demoData';

interface AuthContextType {
  user: User | null;
  tenant: Tenant | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  setSelectedTenant: (tenantId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tenant, setTenant] = useState<Tenant | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('upt_user');
    const savedTenant = localStorage.getItem('upt_tenant');
    
    if (savedUser && savedTenant) {
      setUser(JSON.parse(savedUser));
      setTenant(JSON.parse(savedTenant));
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    // Demo login: user/user or admin/admin
    if ((username === 'user' && password === 'user') || (username === 'admin' && password === 'admin')) {
      const foundUser = demoUsers.find(u => u.username === username);
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('upt_user', JSON.stringify(foundUser));
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setTenant(null);
    localStorage.removeItem('upt_user');
    localStorage.removeItem('upt_tenant');
  };

  const setSelectedTenant = (tenantId: string) => {
    const foundTenant = demoTenants.find(t => t.id === tenantId);
    if (foundTenant) {
      setTenant(foundTenant);
      localStorage.setItem('upt_tenant', JSON.stringify(foundTenant));
    }
  };

  return (
    <AuthContext.Provider value={{ user, tenant, login, logout, setSelectedTenant }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};