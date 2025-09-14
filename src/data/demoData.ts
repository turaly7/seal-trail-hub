import { Tenant, Seal, User } from '@/types';

export const demoTenants: Tenant[] = [
  { id: '1', name: 'Баш офис', location: 'Bakı şəhəri' },
  { id: '2', name: 'Mingəçevir', location: 'Mingəçevir şəhəri' },
  { id: '3', name: 'Sumqayıt', location: 'Sumqayıt şəhəri' },
  { id: '4', name: 'Gəncə', location: 'Gəncə şəhəri' },
];

export const demoUsers: User[] = [
  { id: '1', username: 'user', role: 'user', tenantId: '1' },
  { id: '2', username: 'admin', role: 'admin', tenantId: '1' },
];

export const demoSeals: Seal[] = [
  // Baş ofis seals
  { id: '1', sealNumber: 'PL001', objectType: 'техника', objectName: 'GPS Tracker Unit 1', techModel: 'GT-200', deviceSerial: 'GPS001', location: 'Mərkəzi anbar', status: 'мөhүрлү', createdAt: new Date('2024-01-15'), tenantId: '1' },
  { id: '2', sealNumber: 'PL002', objectType: 'техника', objectName: 'Communication Device', techModel: 'COM-150', deviceSerial: 'COM001', location: 'Texniki otaq', status: 'йохланыб', createdAt: new Date('2024-01-20'), tenantId: '1' },
  { id: '3', sealNumber: 'PL003', objectType: 'чəн/капы', objectName: 'Əsas elektrik şkafı', objectNumber: 'ESK-01', location: 'Elektrik otağı', status: 'мөhүрлү', createdAt: new Date('2024-02-01'), tenantId: '1' },
  { id: '4', sealNumber: 'PL004', objectType: 'чəн/капы', objectName: 'Server otaq qapısı', objectNumber: 'SOQ-01', location: 'Server mərkəzi', status: 'мөhүрлү', createdAt: new Date('2024-02-05'), tenantId: '1' },
  { id: '5', sealNumber: 'PL005', objectType: 'дигəр', objectName: 'Sənəd arxivi', location: 'Arxiv otağı', status: 'мөhүрлү', createdAt: new Date('2024-02-10'), tenantId: '1', notes: 'Gizli sənədlər' },
  { id: '6', sealNumber: 'PL006', objectType: 'техника', objectName: 'GPS Tracker Unit 2', techModel: 'GT-200', deviceSerial: 'GPS002', location: 'Təhlükəsizlik', status: 'ачылыб', createdAt: new Date('2024-02-15'), tenantId: '1' },
  { id: '7', sealNumber: 'PL007', objectType: 'техника', objectName: 'Network Switch', techModel: 'NS-48', deviceSerial: 'NET001', location: 'IT otaq', status: 'мөhүрлү', createdAt: new Date('2024-02-20'), tenantId: '1' },
  { id: '8', sealNumber: 'PL008', objectType: 'чəн/капы', objectName: 'Maliyyə şöbəsi qapısı', objectNumber: 'MSQ-01', location: 'Maliyyə', status: 'йохланыб', createdAt: new Date('2024-02-25'), tenantId: '1' },

  // Mingəçevir seals
  { id: '9', sealNumber: 'MG001', objectType: 'техника', objectName: 'Turbina monitor', techModel: 'TM-500', deviceSerial: 'TUR001', location: 'Turbina zalı 1', status: 'мөhүрлү', createdAt: new Date('2024-01-10'), tenantId: '2' },
  { id: '10', sealNumber: 'MG002', objectType: 'техника', objectName: 'Generator control', techModel: 'GC-300', deviceSerial: 'GEN001', location: 'Generator bloqu', status: 'мөhүрлү', createdAt: new Date('2024-01-18'), tenantId: '2' },
  { id: '11', sealNumber: 'MG003', objectType: 'чəн/капы', objectName: 'Turbina zalı qapısı', objectNumber: 'TZQ-01', location: 'Turbina mərkəzi', status: 'мөhүрлү', createdAt: new Date('2024-01-25'), tenantId: '2' },
  { id: '12', sealNumber: 'MG004', objectType: 'чəн/капы', objectName: 'Yüksək gərginlik şkafı', objectNumber: 'YGS-01', location: 'Elektrik stansiyası', status: 'йохланыб', createdAt: new Date('2024-02-02'), tenantId: '2' },
  { id: '13', sealNumber: 'MG005', objectType: 'техника', objectName: 'SCADA Terminal', techModel: 'SC-100', deviceSerial: 'SCA001', location: 'Nəzarət otağı', status: 'мөhүрлү', createdAt: new Date('2024-02-08'), tenantId: '2' },
  { id: '14', sealNumber: 'MG006', objectType: 'дигəр', objectName: 'Təhlükəsizlik kamera sistemi', location: 'Perimetr', status: 'мөhүрлү', createdAt: new Date('2024-02-12'), tenantId: '2', notes: 'Kritik infrastruktur' },
  { id: '15', sealNumber: 'MG007', objectType: 'техника', objectName: 'Su səviyyə sensoru', techModel: 'WSL-200', deviceSerial: 'WSL001', location: 'Su anbarı', status: 'ачылыб', createdAt: new Date('2024-02-18'), tenantId: '2' },
  { id: '16', sealNumber: 'MG008', objectType: 'чəн/капы', objectName: 'Transformer qapısı', objectNumber: 'TRQ-01', location: 'Transformer mərkəzi', status: 'мөhүрлү', createdAt: new Date('2024-02-22'), tenantId: '2' },

  // Sumqayıt seals
  { id: '17', sealNumber: 'SQ001', objectType: 'техника', objectName: 'Petrokimya sensor', techModel: 'PS-150', deviceSerial: 'PET001', location: 'Reaksiya bloqu A', status: 'мөhүрлү', createdAt: new Date('2024-01-12'), tenantId: '3' },
  { id: '18', sealNumber: 'SQ002', objectType: 'техника', objectName: 'Təzyiq ölçən', techModel: 'PM-80', deviceSerial: 'PRS001', location: 'Boru sistemi', status: 'йохланыб', createdAt: new Date('2024-01-22'), tenantId: '3' },
  { id: '19', sealNumber: 'SQ003', objectType: 'чəн/капы', objectName: 'Kimyəvi anbar qapısı', objectNumber: 'KAQ-01', location: 'Kimyəvi anbar', status: 'мөhүрлү', createdAt: new Date('2024-01-28'), tenantId: '3' },
  { id: '20', sealNumber: 'SQ004', objectType: 'чəн/капы', objectName: 'Təhlükəli maddələr şkafı', objectNumber: 'TMS-01', location: 'Laboratoriya', status: 'мөhүрлү', createdAt: new Date('2024-02-03'), tenantId: '3' },
  { id: '21', sealNumber: 'SQ005', objectType: 'техника', objectName: 'Gas analyzer', techModel: 'GA-250', deviceSerial: 'GAS001', location: 'Təmizləmə bloqu', status: 'ачылыб', createdAt: new Date('2024-02-07'), tenantId: '3' },
  { id: '22', sealNumber: 'SQ006', objectType: 'дигəр', objectName: 'Təcili durum sistemi', location: 'Mərkəzi nəzarət', status: 'мөhүрлү', createdAt: new Date('2024-02-14'), tenantId: '3', notes: 'Fövqəladə hallar üçün' },
  { id: '23', sealNumber: 'SQ007', objectType: 'техника', objectName: 'Flow meter', techModel: 'FM-120', deviceSerial: 'FLW001', location: 'Əsas boru kəməri', status: 'мөhүрлү', createdAt: new Date('2024-02-19'), tenantId: '3' },
  { id: '24', sealNumber: 'SQ008', objectType: 'чəн/капы', objectName: 'Neft məhsulları tankı', objectNumber: 'NMT-01', location: 'Tank sahəsi', status: 'йохланыб', createdAt: new Date('2024-02-24'), tenantId: '3' },

  // Gəncə seals
  { id: '25', sealNumber: 'GN001', objectType: 'техника', objectName: 'Kənd təsərrüfatı sensoru', techModel: 'AS-90', deviceSerial: 'AGR001', location: 'Sahə A', status: 'мөhүрлү', createdAt: new Date('2024-01-14'), tenantId: '4' },
  { id: '26', sealNumber: 'GN002', objectType: 'техника', objectName: 'Suvarma sistemi nəzarətçisi', techModel: 'IC-200', deviceSerial: 'IRR001', location: 'Suvarma mərkəzi', status: 'мөhүрлү', createdAt: new Date('2024-01-24'), tenantId: '4' },
  { id: '27', sealNumber: 'GN003', objectType: 'чəн/капы', objectName: 'Gübrə anbarı qapısı', objectNumber: 'GAQ-01', location: 'Gübrə anbarı', status: 'йохланыб', createdAt: new Date('2024-01-30'), tenantId: '4' },
  { id: '28', sealNumber: 'GN004', objectType: 'чəн/капы', objectName: 'Toxum anbarı şkafı', objectNumber: 'TAS-01', location: 'Toxum anbarı', status: 'мөhүрлү', createdAt: new Date('2024-02-04'), tenantId: '4' },
  { id: '29', sealNumber: 'GN005', objectType: 'техника', objectName: 'Meteoroloji stansiya', techModel: 'MS-400', deviceSerial: 'MET001', location: 'Mərkəzi sahə', status: 'мөhүрлү', createdAt: new Date('2024-02-09'), tenantId: '4' },
  { id: '30', sealNumber: 'GN006', objectType: 'дигəр', objectName: 'GPS traktor sistemi', location: 'Maşın parkı', status: 'ачылыб', createdAt: new Date('2024-02-16'), tenantId: '4', notes: 'Texniki xidmət' },
  { id: '31', sealNumber: 'GN007', objectType: 'техника', objectName: 'Temperatur monitor', techModel: 'TM-75', deviceSerial: 'TMP001', location: 'Saxlama anbarı', status: 'мөhүрлү', createdAt: new Date('2024-02-21'), tenantId: '4' },
  { id: '32', sealNumber: 'GN008', objectType: 'чəн/капы', objectName: 'Məhsul emalı bloqu', objectNumber: 'MEB-01', location: 'Emal mərkəzi', status: 'йохланыб', createdAt: new Date('2024-02-26'), tenantId: '4' },
];