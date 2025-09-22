export interface User {
  id: string;
  username: string;
  role: 'user' | 'admin';
  tenantId: string;
}

export interface Tenant {
  id: string;
  name: string;
  location: string;
}

export interface Seal {
  id: string;
  sealNumber: string;
  objectType: 'техника' | 'чəн/капы' | 'дигəр';
  objectName: string;
  equipmentNumber?: string; // Texnika üçün əsas avadanlıq nömrəsi
  objectNumber?: string;
  deviceSerial?: string;
  techModel?: string;
  location: string;
  status: 'мөhүрлү' | 'йохланыб' | 'ачылыб';
  createdAt: Date;
  lastChecked?: Date;
  tenantId: string;
  notes?: string;
}

export interface SealStatistics {
  total: number;
  byStatus: Record<string, number>;
  byType: Record<string, number>;
  byTenant: Record<string, number>;
}