import type { User, Product, Order, Customer, InventoryItem, DashboardStats } from '../types/index';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Koray Kılıç',
    email: 'koray.kilic@eagles-erp.com',
    role: 'admin',
    department: 'IT',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Koray',
    isActive: true,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Ayşe Demir',
    email: 'ayse.demir@eagles-erp.com',
    role: 'manager',
    department: 'Sales',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ayse',
    isActive: true,
    createdAt: '2024-02-01'
  },
  {
    id: '3',
    name: 'Mehmet Kaya',
    email: 'mehmet.kaya@eagles-erp.com',
    role: 'employee',
    department: 'Marketing',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mehmet',
    isActive: true,
    createdAt: '2024-02-15'
  },
  {
    id: '4',
    name: 'Fatma Özkan',
    email: 'fatma.ozkan@eagles-erp.com',
    role: 'manager',
    department: 'Finance',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatma',
    isActive: true,
    createdAt: '2024-03-01'
  }
];

// Mock Products
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Laptop Dell XPS 13',
    description: '13 inç 4K Ultra HD InfinityEdge Touch Display, Intel Core i7, 16GB RAM, 512GB SSD',
    category: 'Electronics',
    price: 25000,
    stock: 15,
    sku: 'DELL-XPS13-001',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300',
    isActive: true,
    createdAt: '2024-01-10'
  },
  {
    id: '2',
    name: 'iPhone 15 Pro',
    description: '6.1 inç Super Retina XDR display, A17 Pro chip, 48MP kamera sistemi',
    category: 'Electronics',
    price: 45000,
    stock: 25,
    sku: 'APPLE-IP15P-001',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300',
    isActive: true,
    createdAt: '2024-01-15'
  },
  {
    id: '3',
    name: 'Samsung 4K Smart TV',
    description: '55 inç 4K Ultra HD Smart LED TV, Crystal Display, HDR',
    category: 'Electronics',
    price: 12000,
    stock: 8,
    sku: 'SAMSUNG-TV55-001',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300',
    isActive: true,
    createdAt: '2024-01-20'
  },
  {
    id: '4',
    name: 'Nike Air Max 270',
    description: 'Erkek spor ayakkabısı, hafif ve konforlu, çeşitli renkler',
    category: 'Fashion',
    price: 1200,
    stock: 50,
    sku: 'NIKE-AM270-001',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300',
    isActive: true,
    createdAt: '2024-02-01'
  },
  {
    id: '5',
    name: 'Adidas Ultraboost 22',
    description: 'Kadın koşu ayakkabısı, Boost midsole teknolojisi',
    category: 'Fashion',
    price: 1800,
    stock: 30,
    sku: 'ADIDAS-UB22-001',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300',
    isActive: true,
    createdAt: '2024-02-05'
  },
  {
    id: '6',
    name: 'Apple Watch Series 9',
    description: '45mm GPS + Cellular, Always-On Retina display, S9 chip',
    category: 'Electronics',
    price: 15000,
    stock: 12,
    sku: 'APPLE-AW9-001',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300',
    isActive: true,
    createdAt: '2024-02-10'
  }
];

// Mock Customers
export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Ali Veli',
    email: 'ali.veli@email.com',
    phone: '+90 532 123 4567',
    address: 'İstanbul, Türkiye',
    company: 'ABC Şirketi',
    totalOrders: 15,
    totalSpent: 125000,
    isActive: true,
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Zeynep Kaya',
    email: 'zeynep.kaya@email.com',
    phone: '+90 533 234 5678',
    address: 'Ankara, Türkiye',
    company: 'XYZ Ltd.',
    totalOrders: 8,
    totalSpent: 67000,
    isActive: true,
    createdAt: '2024-01-15'
  },
  {
    id: '3',
    name: 'Mustafa Özkan',
    email: 'mustafa.ozkan@email.com',
    phone: '+90 534 345 6789',
    address: 'İzmir, Türkiye',
    totalOrders: 22,
    totalSpent: 189000,
    isActive: true,
    createdAt: '2024-02-01'
  },
  {
    id: '4',
    name: 'Elif Demir',
    email: 'elif.demir@email.com',
    phone: '+90 535 456 7890',
    address: 'Bursa, Türkiye',
    company: 'DEF A.Ş.',
    totalOrders: 5,
    totalSpent: 32000,
    isActive: true,
    createdAt: '2024-02-15'
  }
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: '1',
    customerName: 'Ali Veli',
    customerEmail: 'ali.veli@email.com',
    products: [
      {
        productId: '1',
        productName: 'Laptop Dell XPS 13',
        quantity: 1,
        unitPrice: 25000,
        totalPrice: 25000
      },
      {
        productId: '6',
        productName: 'Apple Watch Series 9',
        quantity: 1,
        unitPrice: 15000,
        totalPrice: 15000
      }
    ],
    totalAmount: 40000,
    status: 'delivered',
    orderDate: '2024-03-01',
    deliveryDate: '2024-03-03'
  },
  {
    id: '2',
    customerName: 'Zeynep Kaya',
    customerEmail: 'zeynep.kaya@email.com',
    products: [
      {
        productId: '2',
        productName: 'iPhone 15 Pro',
        quantity: 1,
        unitPrice: 45000,
        totalPrice: 45000
      }
    ],
    totalAmount: 45000,
    status: 'shipped',
    orderDate: '2024-03-02',
    deliveryDate: '2024-03-05'
  },
  {
    id: '3',
    customerName: 'Mustafa Özkan',
    customerEmail: 'mustafa.ozkan@email.com',
    products: [
      {
        productId: '4',
        productName: 'Nike Air Max 270',
        quantity: 2,
        unitPrice: 1200,
        totalPrice: 2400
      },
      {
        productId: '5',
        productName: 'Adidas Ultraboost 22',
        quantity: 1,
        unitPrice: 1800,
        totalPrice: 1800
      }
    ],
    totalAmount: 4200,
    status: 'processing',
    orderDate: '2024-03-03'
  },
  {
    id: '4',
    customerName: 'Elif Demir',
    customerEmail: 'elif.demir@email.com',
    products: [
      {
        productId: '3',
        productName: 'Samsung 4K Smart TV',
        quantity: 1,
        unitPrice: 12000,
        totalPrice: 12000
      }
    ],
    totalAmount: 12000,
    status: 'pending',
    orderDate: '2024-03-04'
  }
];

// Mock Inventory - Maritime Equipment
export const mockInventory: InventoryItem[] = [
  {
    id: '1',
    productId: '1',
    productName: 'Yaşam Can Simidi (Life Jacket)',
    quantity: 45,
    minStock: 20,
    maxStock: 100,
    location: 'Güverte Depo - Can Simidi Bölümü',
    lastUpdated: '2024-03-04'
  },
  {
    id: '2',
    productId: '2',
    productName: 'Yangın Söndürücü (Fire Extinguisher)',
    quantity: 12,
    minStock: 8,
    maxStock: 30,
    location: 'Makine Dairesi - Yangın Güvenliği',
    lastUpdated: '2024-03-04'
  },
  {
    id: '3',
    productId: '3',
    productName: 'Halat (Rope) - 50mm Çap',
    quantity: 8,
    minStock: 5,
    maxStock: 20,
    location: 'Güverte Depo - Halat Bölümü',
    lastUpdated: '2024-03-04'
  },
  {
    id: '4',
    productId: '4',
    productName: 'Motor Yağı (Engine Oil) - 20L',
    quantity: 25,
    minStock: 15,
    maxStock: 60,
    location: 'Makine Dairesi - Yağ Deposu',
    lastUpdated: '2024-03-04'
  },
  {
    id: '5',
    productId: '5',
    productName: 'Dizel Yakıt Filtresi (Diesel Fuel Filter)',
    quantity: 18,
    minStock: 10,
    maxStock: 40,
    location: 'Makine Dairesi - Filtre Deposu',
    lastUpdated: '2024-03-04'
  },
  {
    id: '6',
    productId: '6',
    productName: 'Navigasyon Haritası (Navigation Chart)',
    quantity: 35,
    minStock: 20,
    maxStock: 80,
    location: 'Köprü Üstü - Harita Odası',
    lastUpdated: '2024-03-04'
  },
  {
    id: '7',
    productId: '7',
    productName: 'Seyir Fenerleri (Navigation Lights)',
    quantity: 6,
    minStock: 4,
    maxStock: 12,
    location: 'Güverte Depo - Elektrik Bölümü',
    lastUpdated: '2024-03-04'
  },
  {
    id: '8',
    productId: '8',
    productName: 'Su Pompası (Water Pump)',
    quantity: 3,
    minStock: 2,
    maxStock: 8,
    location: 'Makine Dairesi - Pompa Deposu',
    lastUpdated: '2024-03-04'
  },
  {
    id: '9',
    productId: '9',
    productName: 'Çapa (Anchor) - 500kg',
    quantity: 2,
    minStock: 1,
    maxStock: 4,
    location: 'Güverte Depo - Çapa Bölümü',
    lastUpdated: '2024-03-04'
  },
  {
    id: '10',
    productId: '10',
    productName: 'İlk Yardım Kutusu (First Aid Kit)',
    quantity: 15,
    minStock: 8,
    maxStock: 25,
    location: 'Sağlık Odası - İlk Yardım Deposu',
    lastUpdated: '2024-03-04'
  },
  {
    id: '11',
    productId: '11',
    productName: 'Radyo İletişim Cihazı (Radio Communication)',
    quantity: 4,
    minStock: 3,
    maxStock: 8,
    location: 'Köprü Üstü - İletişim Odası',
    lastUpdated: '2024-03-04'
  },
  {
    id: '12',
    productId: '12',
    productName: 'Güverte Boyası (Deck Paint) - 20L',
    quantity: 22,
    minStock: 12,
    maxStock: 50,
    location: 'Güverte Depo - Boya Bölümü',
    lastUpdated: '2024-03-04'
  }
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalRevenue: 101200,
  totalOrders: 4,
  totalCustomers: 4,
  totalProducts: 6,
  lowStockItems: 1,
  recentOrders: mockOrders.slice(0, 3),
  topProducts: mockProducts.slice(0, 3)
}; 