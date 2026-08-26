export type PropertyType = 
  | 'Casa' 
  | 'Terreno' 
  | 'Área'
  | 'Sobrado'
  | 'Comercial' 
  | 'Apartamento' 
  | 'Condomínio' 
  | 'Cobertura'
  | 'Temporada'
  | 'Sítio'
  | 'Chácara';

export type Purpose = 'Venda' | 'Aluguel' | 'Lançamento' | 'Venda e Aluguel';

export type PropertyBadge = 'Novo' | 'Destaque' | 'Oportunidade' | 'Exclusivo' | 'Lançamento' | 'Preço Baixou';

export interface Property {
  id: string;
  code: string;
  title: string;
  slug: string;
  type: PropertyType;
  purpose: Purpose;
  badge?: PropertyBadge;
  price: number; // Em BRL R$ (Ex: Venda)
  rentalPrice?: number; // Em BRL R$ (Ex: Locação)
  condoFee?: number; // Condomínio R$
  iptuAnnual?: number; // IPTU anual R$
  city: string;
  state: string;
  neighborhood: string;
  address: string;
  zipCode?: string;
  area: number; // m²
  bedrooms: number;
  suites: number;
  bathrooms: number;
  parkingSpaces: number;
  description: string;
  features: string[]; // Ex: ['Piscina', 'Churrasqueira', 'Mobiliado', 'Aceita Pet', 'Elevador', 'Varanda Gourmet', 'Portaria 24h', 'Academia']
  images: string[];
  virtualTourUrl?: string;
  videoUrl?: string;
  lat: number;
  lng: number;
  broker: {
    name: string;
    creci: string;
    phone: string;
    avatar: string;
  };
  featured: boolean;
  createdAt: string;
}

export interface Development {
  id: string;
  code: string;
  name: string;
  builder: string; // Construtora
  city: string;
  neighborhood: string;
  status: 'Lançamento' | 'Em Obras' | 'Pronto para Morar';
  progressPercentage: number;
  priceMin: number;
  priceMax: number;
  areaMin: number;
  areaMax: number;
  bedroomsMinMax: string; // ex: "2 a 4 quartos"
  deliveryDate: string; // ex: "Dezembro 2026"
  image: string;
  logoUrl?: string;
  description: string;
  features: string[];
}

export interface FilterState {
  purpose: Purpose | 'Todos';
  type: PropertyType | 'Todos';
  city: string;
  neighborhood: string;
  minPrice: number;
  maxPrice: number;
  minBedrooms: number;
  minSuites: number;
  minBathrooms: number;
  minParking: number;
  minArea: number;
  maxArea: number;
  code: string;
  selectedFeatures: string[];
  sortBy: 'recent' | 'price-asc' | 'price-desc' | 'area-desc';
  viewMode: 'grid' | 'list';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  rating: number;
  comment: string;
  avatar: string;
  propertyTypeBought: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  content: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  category: string;
}

export type PageView = 
  | 'home' 
  | 'imoveis' 
  | 'imovel-detalhe' 
  | 'sobre' 
  | 'contato';
