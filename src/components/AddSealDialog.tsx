import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { demoTenants } from '@/data/demoData';
import { toast } from 'sonner';

interface AddSealDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddSealDialog: React.FC<AddSealDialogProps> = ({ open, onOpenChange }) => {
  const { user } = useAuth();
  const [objectType, setObjectType] = useState<string>('');
  const [tenantId, setTenantId] = useState<string>('');
  const [sealNumber, setSealNumber] = useState('');
  const [objectName, setObjectName] = useState('');
  const [equipmentNumber, setEquipmentNumber] = useState('');
  const [objectNumber, setObjectNumber] = useState('');
  const [deviceSerial, setDeviceSerial] = useState('');
  const [techModel, setTechModel] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [additionalSeals, setAdditionalSeals] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sealNumber || !objectType || !objectName || !location || (user?.role === 'admin' && !tenantId)) {
      toast.error('Xahiş edirik bütün mütləq sahələri doldurun');
      return;
    }

    // Demo məqsədilə sadəcə toast göstəririk
    const selectedTenant = user?.role === 'admin' 
      ? demoTenants.find(t => t.id === tenantId)?.name 
      : 'Cari filial';
      
    toast.success(`Yeni plomb əlavə edildi: ${sealNumber}`, {
      description: `${objectType} - ${objectName} (${selectedTenant})`
    });
    
    // Formu təmizlə
    setSealNumber('');
    setObjectName('');
    setEquipmentNumber('');
    setObjectNumber('');
    setDeviceSerial('');
    setTechModel('');
    setLocation('');
    setNotes('');
    setObjectType('');
    setTenantId('');
    setAdditionalSeals([]);
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Mobile appla avtomatik əlavə et</DialogTitle>
          <DialogDescription>
            Plomb məlumatlarını daxil edin. Admin olaraq filial seçimi mütləqdir.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Admin filial seçimi */}
          {user?.role === 'admin' && (
            <div className="space-y-2">
              <Label htmlFor="tenant">Filial *</Label>
              <Select value={tenantId} onValueChange={setTenantId} required>
                <SelectTrigger>
                  <SelectValue placeholder="Filial seçin" />
                </SelectTrigger>
                <SelectContent>
                  {demoTenants.map(tenant => (
                    <SelectItem key={tenant.id} value={tenant.id}>
                      {tenant.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sealNumber">Plomb № *</Label>
              <Input
                id="sealNumber"
                value={sealNumber}
                onChange={(e) => setSealNumber(e.target.value)}
                placeholder="PL001"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="objectType">Obyekt növü *</Label>
              <Select value={objectType} onValueChange={setObjectType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Obyekt növünü seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="техника">Texnika</SelectItem>
                  <SelectItem value="чəн/капы">Çən / Qapı</SelectItem>
                  <SelectItem value="дигəр">Digər obyektlər</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="objectName">Obyekt adı *</Label>
            <Input
              id="objectName"
              value={objectName}
              onChange={(e) => setObjectName(e.target.value)}
              placeholder="GPS Tracker Unit 1"
              required
            />
          </div>

          {objectType === 'техника' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="equipmentNumber">Əsas texnikanın nömrəsi *</Label>
                <Input
                  id="equipmentNumber"
                  value={equipmentNumber}
                  onChange={(e) => setEquipmentNumber(e.target.value)}
                  placeholder="EQ-001"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="techModel">Model/Marka</Label>
                  <Input
                    id="techModel"
                    value={techModel}
                    onChange={(e) => setTechModel(e.target.value)}
                    placeholder="Toyota-8FD25"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deviceSerial">GPS avadanlıq seriya №</Label>
                  <Input
                    id="deviceSerial"
                    value={deviceSerial}
                    onChange={(e) => setDeviceSerial(e.target.value)}
                    placeholder="GPS001"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Əlavə plomblar</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => setAdditionalSeals([...additionalSeals, ''])}
                  >
                    + Plomb əlavə et
                  </Button>
                </div>
                {additionalSeals.map((seal, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={seal}
                      onChange={(e) => {
                        const newSeals = [...additionalSeals];
                        newSeals[index] = e.target.value;
                        setAdditionalSeals(newSeals);
                      }}
                      placeholder={`Əlavə plomb ${index + 2}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newSeals = additionalSeals.filter((_, i) => i !== index);
                        setAdditionalSeals(newSeals);
                      }}
                    >
                      Sil
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {objectType === 'чəн/капы' && (
            <div className="space-y-2">
              <Label htmlFor="objectNumber">Obyekt №</Label>
              <Input
                id="objectNumber"
                value={objectNumber}
                onChange={(e) => setObjectNumber(e.target.value)}
                placeholder="ESK-01"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="location">Yerləşmə ərazisi *</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Mərkəzi anbar"
              required
            />
          </div>

          {objectType === 'дигəр' && (
            <div className="space-y-2">
              <Label htmlFor="notes">Qeydlər</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Əlavə məlumatlar..."
                rows={3}
              />
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Ləğv et
            </Button>
            <Button type="submit">
              Plomb əlavə et
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};