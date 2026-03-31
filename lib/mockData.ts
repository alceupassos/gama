// GAMA SERVICES - CENTRALIZED MOCK DATA FOR DEMO & DEVELOPMENT

export interface Branch {
  id: string;
  name: string;
  city: string;
  address: string;
  color: string;
}

export interface Employee {
  id: string;
  full_name: string;
  role: string;
  avatar_url: string;
  branch_id: string;
  status: 'online' | 'offline' | 'on_break' | 'busy';
  current_os?: string;
  last_location?: string;
  phone: string;
  kpis: {
    os_completed: number;
    avg_completion_time: string;
    client_rating: number;
    punctuality: number;
  };
}

export interface WorkOrder {
  id: string;
  client_name: string;
  address: string;
  service_type: string;
  description: string;
  status: 'pending' | 'scheduled' | 'in_progress' | 'done' | 'canceled';
  priority: 'low' | 'medium' | 'high';
  scheduled_date: string;
  tech_id: string;
  branch_id: string;
  progress: number;
  photos: string[];
}

export interface Client {
  id: string;
  name: string;
  segment: string;
  contact_person: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  contract_value: string;
  last_service_date: string;
  branch_id: string;
}

export interface Quote {
  id: string;
  client_id: string;
  client_name: string;
  service_type: string;
  value: string;
  status: 'pending' | 'approved' | 'rejected' | 'draft';
  created_at: string;
  expires_at: string;
}

export const MOCK_BRANCHES: Branch[] = [
  { id: 'br-hq', name: 'Gama HQ', city: 'Cajamar', address: 'Bairro do Gato Preto, 100', color: 'sky' },
  { id: 'br-osa', name: 'Gama Osasco', city: 'Osasco', address: 'Vila Yara, 450', color: 'amber' },
  { id: 'br-bar', name: 'Gama Barueri', city: 'Alphaville', address: 'Alameda Rio Negro, 1200', color: 'violet' },
  { id: 'br-jun', name: 'Gama Jundiaí', city: 'Jundiaí', address: 'Av. 9 de Julho, 2100', color: 'emerald' },
];

export const MOCK_USER_ADMIN = {
  id: 'admin-123',
  full_name: 'Alessandra Gama',
  role: 'Diretora de Operações',
  avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alessandra',
  company: 'Gama Services HQ'
};

export const MOCK_USER_TECH = {
  id: 'emp-1',
  full_name: 'Carlos Oliveira',
  role: 'Técnico HVAC Senior',
  avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
  branch_id: 'br-hq',
  phone: '(11) 98765-4321'
};

export const MOCK_USER_CLIENT = {
  id: 'client-99',
  name: 'Condomínio Sol Nascente',
  contact: 'Marta Silva',
  role: 'Síndica Profissional',
  avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marta',
};

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: 'emp-1',
    full_name: 'Carlos Oliveira',
    role: 'Técnico HVAC Senior',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    branch_id: 'br-hq',
    status: 'online',
    current_os: 'OS-2024-001',
    last_location: 'Cajamar, Centro',
    phone: '(11) 98765-4321',
    kpis: { os_completed: 124, avg_completion_time: '2.5h', client_rating: 4.9, punctuality: 98 }
  },
  {
    id: 'emp-2',
    full_name: 'Ana Rodrigues',
    role: 'Eletricista Predial',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    branch_id: 'br-osa',
    status: 'busy',
    current_os: 'OS-2024-004',
    last_location: 'Osasco, Norte',
    phone: '(11) 97777-8888',
    kpis: { os_completed: 98, avg_completion_time: '3.1h', client_rating: 4.8, punctuality: 95 }
  },
  {
    id: 'emp-3',
    full_name: 'Marcos Silva',
    role: 'Hidráulica e Civil',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcos',
    branch_id: 'br-bar',
    status: 'offline',
    phone: '(11) 96666-5555',
    kpis: { os_completed: 156, avg_completion_time: '1.8h', client_rating: 4.7, punctuality: 92 }
  },
  {
    id: 'emp-4',
    full_name: 'Juliana Costa',
    role: 'Supervisora de Facilities',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juliana',
    branch_id: 'br-hq',
    status: 'online',
    phone: '(11) 95555-4444',
    kpis: { os_completed: 45, avg_completion_time: 'N/A', client_rating: 5.0, punctuality: 100 }
  },
  {
    id: 'emp-5',
    full_name: 'Ricardo Lima',
    role: 'Técnico Refrigeração',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ricardo',
    branch_id: 'br-jun',
    status: 'on_break',
    phone: '(11) 94444-3333',
    kpis: { os_completed: 87, avg_completion_time: '2.8h', client_rating: 4.6, punctuality: 90 }
  },
];

export const MOCK_WORK_ORDERS: WorkOrder[] = [
  { 
    id: 'OS-2024-001', 
    client_name: 'Condomínio Sol Nascente', 
    address: 'Av. Paulista, 1500 - Bela Vista, SP', 
    service_type: 'Manutenção Ar Condicionado', 
    description: 'Limpeza de filtros e carga de gás em 4 unidades split.',
    status: 'in_progress', 
    priority: 'high', 
    scheduled_date: '2026-03-30',
    tech_id: 'emp-1',
    branch_id: 'br-hq',
    progress: 65,
    photos: []
  },
  { 
    id: 'OS-2024-002', 
    client_name: 'Escola Estadual Centro', 
    address: 'Rua das Flores, 300 - Cajamar Centro, SP', 
    service_type: 'Revisão Elétrica', 
    description: 'Troca de disjuntores no quadro principal e teste de aterramento.',
    status: 'pending', 
    priority: 'medium', 
    scheduled_date: '2026-03-31',
    tech_id: 'emp-2',
    branch_id: 'br-osa',
    progress: 0,
    photos: []
  },
  { 
    id: 'OS-2024-003', 
    client_name: 'Shopping Norte', 
    address: 'Rodovia Anhanguera, km 35 - Gato Preto, SP', 
    service_type: 'Reparo Hidráulico', 
    description: 'Vazamento em tubulação de 50mm no banheiro de serviço.',
    status: 'done', 
    priority: 'low', 
    scheduled_date: '2026-03-25',
    tech_id: 'emp-3',
    branch_id: 'br-hq',
    progress: 100,
    photos: []
  },
  { 
    id: 'OS-2024-004', 
    client_name: 'Banco Itaú - Ag. 0450', 
    address: 'Rua Direita, 12 - Barueri Centro, SP', 
    service_type: 'Manutenção Elétrica', 
    description: 'Verificação de curto-circuito em luminárias do andar superior.',
    status: 'in_progress', 
    priority: 'high', 
    scheduled_date: '2026-03-30',
    tech_id: 'emp-2',
    branch_id: 'br-bar',
    progress: 30,
    photos: []
  },
  { 
    id: 'OS-2024-005', 
    client_name: 'Centro Logístico Cajamar', 
    address: 'Distrito Industrial III, Cajamar, SP', 
    service_type: 'Facilities / Conservação', 
    description: 'Limpeza e impermeabilização de piso vinílico (Galpão A).',
    status: 'scheduled', 
    priority: 'medium', 
    scheduled_date: '2026-04-02',
    tech_id: 'emp-4',
    branch_id: 'br-hq',
    progress: 0,
    photos: []
  },
];

export const MOCK_KPI_REPORTS = {
  revenue_month: 'R$ 58.420',
  revenue_trend: '+15.2%',
  os_completed: 142,
  os_trend: '+9%',
  new_clients: 8,
  alerts: 2
};

export const MOCK_CLIENTS: Client[] = [
  { id: 'cli-1', name: 'Condomínio Sol Nascente', segment: 'Residencial', contact_person: 'Marta Silva', email: 'marta@solnascente.com', phone: '(11) 98888-7777', status: 'active', contract_value: 'R$ 4.500/mês', last_service_date: '2026-03-30', branch_id: 'br-hq' },
  { id: 'cli-2', name: 'Escola Estadual Centro', segment: 'Educação', contact_person: 'Diretor José', email: 'contato@escola.gov.br', phone: '(11) 97777-6666', status: 'active', contract_value: 'R$ 2.800/mês', last_service_date: '2026-03-31', branch_id: 'br-osa' },
  { id: 'cli-3', name: 'Shopping Norte', segment: 'Varejo', contact_person: 'Gerente Roberto', email: 'adm@shoppingnorte.com', phone: '(11) 96666-4444', status: 'active', contract_value: 'R$ 15.200/mês', last_service_date: '2026-03-25', branch_id: 'br-hq' },
  { id: 'cli-4', name: 'Banco Itaú - Ag. 0450', segment: 'Financeiro', contact_person: 'Sérgio Santos', email: 'ag0450@itau.com', phone: '(11) 95555-3333', status: 'active', contract_value: 'R$ 1.200/visita', last_service_date: '2026-03-30', branch_id: 'br-bar' },
  { id: 'cli-5', name: 'Centro Logístico Cajamar', segment: 'Logística', contact_person: 'Eng. Paulo', email: 'paulo@centrolog.com', phone: '(11) 94444-2222', status: 'active', contract_value: 'R$ 8.900/mês', last_service_date: '2026-04-02', branch_id: 'br-hq' },
];

export const MOCK_QUOTES: Quote[] = [
  { id: 'Q-2024-001', client_id: 'cli-1', client_name: 'Condomínio Sol Nascente', service_type: 'Instalação VRF Central', value: 'R$ 85.400', status: 'pending', created_at: '2026-03-28', expires_at: '2026-04-15' },
  { id: 'Q-2024-002', client_id: 'cli-3', client_name: 'Shopping Norte', service_type: 'Retrofit Elétrico Galpão B', value: 'R$ 124.000', status: 'approved', created_at: '2026-03-20', expires_at: '2026-04-05' },
  { id: 'Q-2024-003', client_id: 'cli-5', client_name: 'Centro Logístico Cajamar', service_type: 'Limpeza Industrial Pesada', value: 'R$ 12.500', status: 'draft', created_at: '2026-03-29', expires_at: '2026-04-20' },
  { id: 'Q-2024-004', client_id: 'cli-2', client_name: 'Escola Estadual Centro', service_type: 'Manutenção Preventiva Semestral', value: 'R$ 4.800', status: 'rejected', created_at: '2026-03-10', expires_at: '2026-03-25' },
];
