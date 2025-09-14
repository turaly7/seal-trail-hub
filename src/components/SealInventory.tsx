import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { demoSeals } from '@/data/demoData';
import { Search, Filter, Download } from 'lucide-react';
import { toast } from 'sonner';

export const SealInventory = () => {
  const { tenant } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const tenantSeals = demoSeals.filter(seal => seal.tenantId === tenant?.id);

  const filteredSeals = useMemo(() => {
    return tenantSeals.filter(seal => {
      const matchesSearch = 
        seal.sealNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seal.objectName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || seal.status === statusFilter;
      const matchesType = typeFilter === 'all' || seal.objectType === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [tenantSeals, searchTerm, statusFilter, typeFilter]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'мөhүрлү':
        return <Badge className="bg-success text-success-foreground">Möhürlü</Badge>;
      case 'йохланыб':
        return <Badge className="bg-warning text-warning-foreground">Yoxlanıb</Badge>;
      case 'ачылыб':
        return <Badge variant="destructive">Açılıb</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleExport = () => {
    toast.success('CSV faylı export edildi', {
      description: `${filteredSeals.length} qeyd uğurla export edildi`
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Plomb İnventarı</span>
            <Button onClick={handleExport} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Plomb № və ya obyekt adı ilə axtarın..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
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
              <SelectTrigger className="w-full md:w-48">
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

          {/* Results count */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              {filteredSeals.length} nəticə tapıldı (Ümumi: {tenantSeals.length})
            </p>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plomb №</TableHead>
                  <TableHead>Obyekt növü</TableHead>
                  <TableHead>Obyekt adı</TableHead>
                  <TableHead>Yerləşmə</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Yaradılma tarixi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSeals.map((seal) => (
                  <TableRow key={seal.id}>
                    <TableCell className="font-medium">{seal.sealNumber}</TableCell>
                    <TableCell>{seal.objectType}</TableCell>
                    <TableCell>{seal.objectName}</TableCell>
                    <TableCell>{seal.location}</TableCell>
                    <TableCell>{getStatusBadge(seal.status)}</TableCell>
                    <TableCell>{seal.createdAt.toLocaleDateString('az-AZ')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredSeals.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Heç bir nəticə tapılmadı</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};