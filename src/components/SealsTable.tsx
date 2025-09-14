import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { demoSeals, demoTenants } from '@/data/demoData';
import { Search, Download, Filter } from 'lucide-react';
import { toast } from 'sonner';
import { Seal } from '@/types';

interface SealsTableProps {
  userRole: 'user' | 'admin';
}

export const SealsTable: React.FC<SealsTableProps> = ({ userRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [tenantFilter, setTenantFilter] = useState<string>('all');

  const filteredSeals = useMemo(() => {
    return demoSeals.filter(seal => {
      const matchesSearch = 
        seal.sealNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seal.objectName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || seal.status === statusFilter;
      const matchesType = typeFilter === 'all' || seal.objectType === typeFilter;
      const matchesTenant = tenantFilter === 'all' || seal.tenantId === tenantFilter;
      
      return matchesSearch && matchesStatus && matchesType && matchesTenant;
    });
  }, [searchTerm, statusFilter, typeFilter, tenantFilter]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'мөhүрлү':
        return <Badge className="bg-success text-success-foreground hover:bg-success/80">Möhürlü</Badge>;
      case 'йохланыб':
        return <Badge className="bg-warning text-warning-foreground hover:bg-warning/80">Yoxlanıb</Badge>;
      case 'ачылыб':
        return <Badge variant="destructive">Açılıb</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTenantName = (tenantId: string) => {
    return demoTenants.find(t => t.id === tenantId)?.name || 'Naməlum';
  };

  const handleExport = () => {
    toast.success('Export uğurla tamamlandı', {
      description: `${filteredSeals.length} qeyd CSV formatında export edildi`,
    });
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <CardTitle className="text-xl font-semibold flex items-center space-x-2">
            <Filter className="h-5 w-5 text-primary" />
            <span>Plomb İnventarı</span>
          </CardTitle>
          <Button onClick={handleExport} className="gradient-primary hover:opacity-90">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Advanced Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Plomb № və ya obyekt adı..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {userRole === 'admin' && (
            <Select value={tenantFilter} onValueChange={setTenantFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filial seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Bütün filiallar</SelectItem>
                {demoTenants.map(tenant => (
                  <SelectItem key={tenant.id} value={tenant.id}>
                    {tenant.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Bütün statuslar</SelectItem>
              <SelectItem value="мөhүрлү">Möhürlü</SelectItem>
              <SelectItem value="йохланыб">Yoxlanıb</SelectItem>
              <SelectItem value="ачылыб">Açılıb</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Obyekt növü" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Bütün növlər</SelectItem>
              <SelectItem value="техника">Texnika</SelectItem>
              <SelectItem value="чəн/капы">Çən / Qapı</SelectItem>
              <SelectItem value="дигəр">Digər</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
          <span>
            <strong>{filteredSeals.length}</strong> nəticə tapıldı 
            {filteredSeals.length !== demoSeals.length && (
              <span> (Ümumi: {demoSeals.length})</span>
            )}
          </span>
          {(searchTerm || statusFilter !== 'all' || typeFilter !== 'all' || tenantFilter !== 'all') && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setTypeFilter('all');
                setTenantFilter('all');
              }}
            >
              Filterləri təmizlə
            </Button>
          )}
        </div>

        {/* Professional Table */}
        <div className="rounded-lg border border-border shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-semibold">Plomb №</TableHead>
                {userRole === 'admin' && <TableHead className="font-semibold">Filial</TableHead>}
                <TableHead className="font-semibold">Obyekt növü</TableHead>
                <TableHead className="font-semibold">Obyekt adı</TableHead>
                <TableHead className="font-semibold">Yerləşmə</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Tarix</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSeals.map((seal, index) => (
                <TableRow 
                  key={seal.id} 
                  className="hover:bg-muted/30 transition-colors"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell className="font-mono font-medium text-primary">
                    {seal.sealNumber}
                  </TableCell>
                  {userRole === 'admin' && (
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {getTenantName(seal.tenantId)}
                      </Badge>
                    </TableCell>
                  )}
                  <TableCell>
                    <span className="text-sm bg-secondary px-2 py-1 rounded-md">
                      {seal.objectType}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">{seal.objectName}</TableCell>
                  <TableCell className="text-muted-foreground">{seal.location}</TableCell>
                  <TableCell>{getStatusBadge(seal.status)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {seal.createdAt.toLocaleDateString('az-AZ')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredSeals.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">Heç bir nəticə tapılmadı</h3>
            <p className="text-muted-foreground">
              Axtarış kriteriyalarını dəyişdirərək yenidən cəhd edin
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};