export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'hommes' | 'femmes' | 'enfants' | 'accessoires';
  images: string[];
  fabric: 'wax' | 'kente' | 'bogolan' | 'ndop' | 'dashiki' | 'autre';
  stock: number;
  sizes: string[];
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  address: string;
  phone: string;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    selectedSize: string;
  }[];
  totalAmount: number;
  paymentMethod: string;
  status: 'En attente' | 'Payé' | 'Expédié' | 'Livré';
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  category: string;
  date: string;
  author: string;
  readingTime: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// Interactive academic metadata types
export interface DbTable {
  name: string;
  description: string;
  columns: {
    name: string;
    type: string;
    primaryKey?: boolean;
    foreignKey?: string;
    nullable?: boolean;
  }[];
}

export interface UmlClass {
  name: string;
  attributes: string[];
  methods: string[];
}

export interface UmlUseCase {
  actor: string;
  useCases: string[];
}
