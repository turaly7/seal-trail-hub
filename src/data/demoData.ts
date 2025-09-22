import { Tenant, Seal, User } from '@/types';

export const demoTenants: Tenant[] = [
  { id: '1', name: 'Şirvan YP filialı', location: 'Şirvan' },
  { id: '2', name: 'Mərkəzi anbar', location: 'Bakı' },
  { id: '3', name: 'Saatlı filialı', location: 'Saatlı' },
  { id: '4', name: 'Saatlı İFT', location: 'Saatlı' },
  { id: '5', name: 'İmişli filialı', location: 'İmişli' },
  { id: '6', name: 'İmişli Araz PQM', location: 'İmişli' },
  { id: '7', name: 'İmişli İFT', location: 'İmişli' },
  { id: '8', name: 'Beyləqan filialı', location: 'Beyləqan' },
  { id: '9', name: 'Beyləqan 7 Oba PQM', location: 'Beyləqan' },
  { id: '10', name: 'Beyləqan İFT', location: 'Beyləqan' },
  { id: '11', name: 'Zərdab PZ', location: 'Zərdab' },
  { id: '12', name: 'Kürdəmir PQM', location: 'Kürdəmir' },
  { id: '13', name: 'Ağcabədi PZ', location: 'Ağcabədi' },
  { id: '14', name: 'Ağcabədi İFT', location: 'Ağcabədi' },
  { id: '15', name: 'Lənbəran İFT', location: 'Lənbəran' },
  { id: '16', name: 'Bərdə ASC', location: 'Bərdə' },
  { id: '17', name: 'Bərdə PZ', location: 'Bərdə' },
  { id: '18', name: 'Mustafaağalı PQM', location: 'Mustafaağalı' },
  { id: '19', name: 'Tərtər PZ', location: 'Tərtər' },
  { id: '20', name: 'Ağdam PZ', location: 'Ağdam' },
  { id: '21', name: 'Gəncə Tekstil', location: 'Gəncə' },
  { id: '22', name: 'Yevlax İFT', location: 'Yevlax' },
  { id: '23', name: 'Yevlax PZ', location: 'Yevlax' },
  { id: '24', name: 'Goranboy PQM', location: 'Goranboy' },
  { id: '25', name: 'Mingəçevir TP', location: 'Mingəçevir' },
  { id: '26', name: 'Muğan Pambıq ASC', location: 'Muğan' },
  { id: '27', name: 'Sumqayıt Xovlu ASC', location: 'Sumqayıt' },
  { id: '28', name: 'Göyçay ASC', location: 'Göyçay' },
  { id: '29', name: 'Bakı İplik', location: 'Bakı' },
  { id: '30', name: 'Baş ofis', location: 'Bakı' },
  { id: '31', name: 'Sabirabad PZ', location: 'Sabirabad' },
  { id: '32', name: 'Moranlı PQM', location: 'Moranlı' },
  { id: '33', name: 'Qaratəpə PQM', location: 'Qaratəpə' },
  { id: '34', name: 'Neftçala PZ', location: 'Neftçala' },
  { id: '35', name: 'Xolqarabucaq PQM', location: 'Xolqarabucaq' },
  { id: '36', name: 'Salyan PZ', location: 'Salyan' },
  { id: '37', name: 'Şəfəq PQM', location: 'Şəfəq' },
  { id: '38', name: 'Biləsuvar PZ', location: 'Biləsuvar' },
  { id: '39', name: 'Səmədabad PQM', location: 'Səmədabad' },
];

export const demoUsers: User[] = [
  { id: '1', username: 'user', role: 'user', tenantId: '1' },
  { id: '2', username: 'admin', role: 'admin', tenantId: '1' },
];

export const demoSeals: Seal[] = [
  // Şirvan YP filialı
  { id: '1', sealNumber: 'SY001', objectType: 'техника', objectName: 'Kömək maşını', techModel: 'Kamaz-4310', deviceSerial: 'KM001', location: 'Avtomobil parkı', status: 'мөhүрлү', createdAt: new Date('2024-01-15'), tenantId: '1', equipmentNumber: 'EQ-001' },
  { id: '2', sealNumber: 'SY002', objectType: 'техника', objectName: 'Kömək maşını', techModel: 'Kamaz-4310', deviceSerial: 'KM001', location: 'Avtomobil parkı', status: 'мөhүрлү', createdAt: new Date('2024-01-15'), tenantId: '1', equipmentNumber: 'EQ-001' },
  { id: '3', sealNumber: 'SY003', objectType: 'техника', objectName: 'Kömək maşını', techModel: 'Kamaz-4310', deviceSerial: 'KM001', location: 'Avtomobil parkı', status: 'мөhүрлү', createdAt: new Date('2024-01-15'), tenantId: '1', equipmentNumber: 'EQ-001' },
  { id: '4', sealNumber: 'SY004', objectType: 'техника', objectName: 'Elektrik generatoru', techModel: 'CAT-250KW', deviceSerial: 'GEN001', location: 'Texniki anbar', status: 'йохланыб', createdAt: new Date('2024-01-20'), tenantId: '1', equipmentNumber: 'EQ-002' },
  { id: '5', sealNumber: 'SY005', objectType: 'техника', objectName: 'Elektrik generatoru', techModel: 'CAT-250KW', deviceSerial: 'GEN001', location: 'Texniki anbar', status: 'мөhүрлү', createdAt: new Date('2024-01-20'), tenantId: '1', equipmentNumber: 'EQ-002' },
  { id: '6', sealNumber: 'SY006', objectType: 'чəн/капы', objectName: 'Əsas elektrik şkafı', objectNumber: 'ESK-01', location: 'Elektrik otağı', status: 'мөhүрлү', createdAt: new Date('2024-02-01'), tenantId: '1' },
  { id: '7', sealNumber: 'SY007', objectType: 'дигəр', objectName: 'İnkubator sistemi', location: 'Laboratoriya', status: 'ачылыб', createdAt: new Date('2024-02-05'), tenantId: '1', notes: 'Texniki baxış' },

  // Mərkəzi anbar  
  { id: '8', sealNumber: 'MA001', objectType: 'техника', objectName: 'Forklift', techModel: 'Toyota-8FD25', deviceSerial: 'FL001', location: 'Anbar zalı A', status: 'мөhүрлү', createdAt: new Date('2024-01-10'), tenantId: '2', equipmentNumber: 'EQ-003' },
  { id: '9', sealNumber: 'MA002', objectType: 'техника', objectName: 'Forklift', techModel: 'Toyota-8FD25', deviceSerial: 'FL001', location: 'Anbar zalı A', status: 'мөhүрлү', createdAt: new Date('2024-01-10'), tenantId: '2', equipmentNumber: 'EQ-003' },
  { id: '10', sealNumber: 'MA003', objectType: 'техника', objectName: 'İnventarizasiya skaneri', techModel: 'Honeywell-CT40', deviceSerial: 'SC001', location: 'Qəbul mərkəzi', status: 'йохланыб', createdAt: new Date('2024-01-18'), tenantId: '2', equipmentNumber: 'EQ-004' },
  { id: '11', sealNumber: 'MA004', objectType: 'чəн/капы', objectName: 'Maliyyə şöbəsi qapısı', objectNumber: 'MSQ-01', location: 'İdarə binası', status: 'мөhүрлү', createdAt: new Date('2024-01-25'), tenantId: '2' },
  { id: '12', sealNumber: 'MA005', objectType: 'дигəр', objectName: 'Təhlükəsizlik kamera sistemi', location: 'Perimetr', status: 'мөhүрлү', createdAt: new Date('2024-02-02'), tenantId: '2', notes: 'Kriтік infrastruktur' },

  // Saatlı filialı (Saxta plomblar - eyni vaxtda 2 yerdə qeydiyyat)
  { id: '13', sealNumber: 'ST001', objectType: 'техника', objectName: 'GPS Tracker', techModel: 'GT-300', deviceSerial: 'GPS001', location: 'Saatlı anbar', status: 'мөhүрлү', createdAt: new Date('2024-02-15T10:30:00'), tenantId: '3', equipmentNumber: 'EQ-005' },
  { id: '14', sealNumber: 'ST001', objectType: 'техника', objectName: 'GPS Tracker', techModel: 'GT-300', deviceSerial: 'GPS001', location: 'Gəncə anbar', status: 'мөhүрлү', createdAt: new Date('2024-02-15T10:45:00'), tenantId: '21', equipmentNumber: 'EQ-005' }, // Saxta - eyni ID, fərqli yer
  { id: '15', sealNumber: 'ST002', objectType: 'чəн/капы', objectName: 'Server otaq qapısı', objectNumber: 'SOQ-01', location: 'IT mərkəzi', status: 'йохланыб', createdAt: new Date('2024-02-20'), tenantId: '3' },
  
  // Saatlı İFT
  { id: '16', sealNumber: 'SI001', objectType: 'техника', objectName: 'Emal maşını', techModel: 'Bosch-EM500', deviceSerial: 'EM001', location: 'Emal sexı', status: 'мөhүрлү', createdAt: new Date('2024-01-12'), tenantId: '4', equipmentNumber: 'EQ-006' },
  { id: '17', sealNumber: 'SI002', objectType: 'техника', objectName: 'Emal maşını', techModel: 'Bosch-EM500', deviceSerial: 'EM001', location: 'Emal sexı', status: 'ачылыб', createdAt: new Date('2024-01-12'), tenantId: '4', equipmentNumber: 'EQ-006' },
  { id: '18', sealNumber: 'SI003', objectType: 'дигəр', objectName: 'Temperatür nəzarət sistemi', location: 'Soyuducu kamera', status: 'мөhүрлү', createdAt: new Date('2024-01-22'), tenantId: '4', notes: 'Kritik temperatur' },

  // İmişli filialı (Tez-tez çıxarılan plomblar)
  { id: '19', sealNumber: 'IM001', objectType: 'техника', objectName: 'Traktor', techModel: 'John Deere-6120M', deviceSerial: 'TR001', location: 'Sahə maşınları', status: 'ачылыб', createdAt: new Date('2024-01-05'), lastChecked: new Date('2024-02-10'), tenantId: '5', equipmentNumber: 'EQ-007' }, // 5 dəfə çıxarılıb
  { id: '20', sealNumber: 'IM002', objectType: 'техника', objectName: 'Traktor', techModel: 'John Deere-6120M', deviceSerial: 'TR001', location: 'Sahə maşınları', status: 'ачылыб', createdAt: new Date('2024-01-05'), lastChecked: new Date('2024-02-12'), tenantId: '5', equipmentNumber: 'EQ-007' },
  { id: '21', sealNumber: 'IM003', objectType: 'чəн/капы', objectName: 'Gübrə anbarı qapısı', objectNumber: 'GAQ-01', location: 'Gübrə anbarı', status: 'ачылыб', createdAt: new Date('2024-01-28'), lastChecked: new Date('2024-02-15'), tenantId: '5' }, // 7 dəfə çıxarılıb

  // İmişli Araz PQM
  { id: '22', sealNumber: 'IA001', objectType: 'техника', objectName: 'Su pompa stansiyası', techModel: 'Grundfos-CR64', deviceSerial: 'PS001', location: 'Pompa mərkəzi', status: 'мөhүрлү', createdAt: new Date('2024-01-30'), tenantId: '6', equipmentNumber: 'EQ-008' },
  { id: '23', sealNumber: 'IA002', objectType: 'дигəр', objectName: 'Automatik suvarma sistemi', location: 'Əsas sahə', status: 'йохланыб', createdAt: new Date('2024-02-04'), tenantId: '6', notes: 'Mövsümi yoxlama' },

  // İmişli İFT  
  { id: '24', sealNumber: 'II001', objectType: 'техника', objectName: 'Toxum təmizləmə maşını', techModel: 'Petkus-K531', deviceSerial: 'TM001', location: 'Toxum emalı', status: 'мөhүрлү', createdAt: new Date('2024-02-08'), tenantId: '7', equipmentNumber: 'EQ-009' },
  { id: '25', sealNumber: 'II002', objectType: 'чəн/капы', objectName: 'Toxum anbarı şkafı', objectNumber: 'TAS-01', location: 'Toxum anbarı', status: 'мөhүрлү', createdAt: new Date('2024-02-12'), tenantId: '7' },

  // Beyləqan filialı (Anomaliya - plomb qoyulub, dərhal çıxarılıb)
  { id: '26', sealNumber: 'BL001', objectType: 'техника', objectName: 'Dizel generator', techModel: 'Caterpillar-C15', deviceSerial: 'DG001', location: 'Enerji mərkəzi', status: 'ачылыб', createdAt: new Date('2024-02-20T14:30:00'), lastChecked: new Date('2024-02-20T14:45:00'), tenantId: '8', equipmentNumber: 'EQ-010' }, // 15 dəqiqə fərq - anomaliya
  { id: '27', sealNumber: 'BL002', objectType: 'чəн/капы', objectName: 'Yanacaq anbarı qapısı', objectNumber: 'YAQ-01', location: 'Yanacaq anbarı', status: 'мөhүрлү', createdAt: new Date('2024-02-18'), tenantId: '8' },

  // Beyləqan 7 Oba PQM
  { id: '28', sealNumber: 'BO001', objectType: 'техника', objectName: 'Meteoroloji stansiya', techModel: 'Vaisala-WXT536', deviceSerial: 'MS001', location: 'Əsas sahə', status: 'мөhүрлү', createdAt: new Date('2024-02-16'), tenantId: '9', equipmentNumber: 'EQ-011' },
  { id: '29', sealNumber: 'BO002', objectType: 'дигəр', objectName: 'Torpaq analiz sensoru', location: 'Test sahəsi', status: 'йохланыб', createdAt: new Date('2024-02-22'), tenantId: '9', notes: 'Torpaq pH testi' },

  // Daha çox filiallar üçün məlumatlar...
  // Gəncə Tekstil (Saxta plomblar)
  { id: '30', sealNumber: 'GT001', objectType: 'техника', objectName: 'Toxucu dəzgah', techModel: 'Toyota-AT180', deviceSerial: 'TD001', location: 'İstehsal zalı A', status: 'мөhүрлү', createdAt: new Date('2024-02-10T09:15:00'), tenantId: '21', equipmentNumber: 'EQ-012' },
  { id: '31', sealNumber: 'GT001', objectType: 'техника', objectName: 'Toxucu dəzgah', techModel: 'Toyota-AT180', deviceSerial: 'TD001', location: 'Sumqayıt anbar', status: 'мөhүрлү', createdAt: new Date('2024-02-10T09:30:00'), tenantId: '27', equipmentNumber: 'EQ-012' }, // Saxta

  // Mingəçevir TP
  { id: '32', sealNumber: 'MT001', objectType: 'техника', objectName: 'Turbina', techModel: 'Siemens-SGT-800', deviceSerial: 'TB001', location: 'Turbina zalı 1', status: 'мөhүрлү', createdAt: new Date('2024-01-25'), tenantId: '25', equipmentNumber: 'EQ-013' },
  { id: '33', sealNumber: 'MT002', objectType: 'техника', objectName: 'Turbina', techModel: 'Siemens-SGT-800', deviceSerial: 'TB001', location: 'Turbina zalı 1', status: 'мөhүрлү', createdAt: new Date('2024-01-25'), tenantId: '25', equipmentNumber: 'EQ-013' },
  { id: '34', sealNumber: 'MT003', objectType: 'чəн/капы', objectName: 'Nəzarət otağı qapısı', objectNumber: 'NOQ-01', location: 'Nəzarət mərkəzi', status: 'мөhүрлү', createdAt: new Date('2024-02-01'), tenantId: '25' },

  // Bakı İplik
  { id: '35', sealNumber: 'BI001', objectType: 'техника', objectName: 'İplik maşını', techModel: 'Rieter-G35', deviceSerial: 'IM001', location: 'İplik istehsalı', status: 'йохланыб', createdAt: new Date('2024-02-14'), tenantId: '29', equipmentNumber: 'EQ-014' },
  { id: '36', sealNumber: 'BI002', objectType: 'дигəр', objectName: 'Keyfiyyət nəzarət sistemi', location: 'QC laboratoriyası', status: 'мөhүрлү', createdAt: new Date('2024-02-18'), tenantId: '29', notes: 'ISO sertifikatı' },

  // Baş ofis
  { id: '37', sealNumber: 'BO001', objectType: 'техника', objectName: 'Server', techModel: 'Dell-PowerEdge-R740', deviceSerial: 'SV001', location: 'Data mərkəzi', status: 'мөhүрлү', createdAt: new Date('2024-02-20'), tenantId: '30', equipmentNumber: 'EQ-015' },
  { id: '38', sealNumber: 'BO002', objectType: 'чəн/капы', objectName: 'Maliyyə vault qapısı', objectNumber: 'MVQ-01', location: 'Maliyyə mərkəzi', status: 'мөhүрлү', createdAt: new Date('2024-02-25'), tenantId: '30' },
  { id: '39', sealNumber: 'BO003', objectType: 'дигəр', objectName: 'Biometrik giriş sistemi', location: 'Əsas giriş', status: 'йохланыб', createdAt: new Date('2024-02-28'), tenantId: '30', notes: 'Təhlükəsizlik yeniləməsi' },
];