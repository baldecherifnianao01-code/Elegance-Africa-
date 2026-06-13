import React, { useState, useEffect } from 'react';
import { ShoppingBag, Star, Mail, ArrowRight, ShieldCheck, Sparkles, Database, ChevronRight, Search, Filter, Trash2, Plus, Minus, Key, RefreshCcw, CheckCircle, Users, Award, Headphones, Package, MapPin, Phone, MessageCircle, Eye, Flame, Activity, User as UserIcon, MessageSquare, Send, Instagram, Facebook, Youtube } from 'lucide-react';
import { motion } from 'motion/react';
import { Product, CartItem, Order, User } from './types';
import { INITIAL_PRODUCTS } from './data';

// Component Imports
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductDetails from './components/ProductDetails';
import AIAdvisor from './components/AIAdvisor';
import AcademicPortal from './components/AcademicPortal';
import AdminDashboard from './components/AdminDashboard';
import AboutView from './components/AboutView';
import BlogView from './components/BlogView';
import ContactView from './components/ContactView';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('home');
  
  // Product & Inventory state
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('elegance_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('elegance_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('elegance_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Active User State (Defaulting to client but options to simulate Admin)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('elegance_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFabric, setSelectedFabric] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');

  // UI States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  // Auth Form details
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authRole, setAuthRole] = useState<'admin' | 'user'>('admin'); // Defaulting to admin so teachers/jurors can test immediately
  const [authName, setAuthName] = useState('');

  // Checkout Form Details
  const [shippingName, setShippingName] = useState('');
  const [shippingEmail, setShippingEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingPhone, setShippingPhone] = useState('');
  const [paymentProvider, setPaymentProvider] = useState<'card' | 'wave' | 'orange' | 'moov'>('card');
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'form' | 'processing' | 'success'>('form');
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);
  
  // FAQ interaction State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Newsletter Subscribed State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Home Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Live Visitor Counter States with realistic microscopic fluctuations
  const [liveOnlineVisitors, setLiveOnlineVisitors] = useState(128);
  const [liveViewingNow, setLiveViewingNow] = useState(18);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveOnlineVisitors(prev => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const next = prev + delta;
        return next >= 115 && next <= 145 ? next : prev;
      });
      setLiveViewingNow(prev => {
        const delta = Math.floor(Math.random() * 3) - 1; // -1 to +1
        const next = prev + delta;
        return next >= 12 && next <= 25 ? next : prev;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('elegance_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('elegance_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('elegance_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('elegance_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('elegance_user');
    }
  }, [currentUser]);

  // Cart operations
  const handleAddToCart = (product: Product, quantity: number, selectedSize: string) => {
    setCart(prev => {
      const idx = prev.findIndex(item => item.product.id === product.id && item.selectedSize === selectedSize);
      if (idx > -1) {
        const cloned = [...prev];
        cloned[idx].quantity += quantity;
        return cloned;
      }
      return [...prev, { product, quantity, selectedSize }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, size: string, change: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId && item.selectedSize === size) {
          const nextQty = Math.max(1, item.quantity + change);
          // Clamp to maximum stock
          return { ...item, quantity: Math.min(item.product.stock, nextQty) };
        }
        return item;
      });
    });
  };

  const handleRemoveFromCart = (productId: string, size: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.selectedSize === size)));
  };

  const getSubtotal = () => {
    return cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  };

  // Checkout process simulation
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingName || !shippingEmail || !shippingAddress || !shippingPhone) return;

    setProcessingPayment(true);
    setPaymentStep('processing');

    // Simulate safe multi-hop banking processing delay
    setTimeout(() => {
      const subtotal = getSubtotal();
      const generatedOrderId = `CMD-${Math.floor(100000 + Math.random() * 900000)}`;
      
      const newOrder: Order = {
        id: generatedOrderId,
        customerName: shippingName,
        customerEmail: shippingEmail,
        address: shippingAddress,
        phone: shippingPhone,
        items: cart.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          selectedSize: item.selectedSize
        })),
        totalAmount: subtotal + 10, // 10 euro flat express shipping
        paymentMethod: paymentProvider === 'card' ? 'Visa/Mastercard Secured' : `${paymentProvider.toUpperCase()} Money Mobile`,
        status: 'Payé', // Automated callback hook
        createdAt: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
      };

      // Add to database
      setOrders(prev => [newOrder, ...prev]);
      
      // Deplete actual products stock counter
      setProducts(prevProducts => {
        return prevProducts.map(prod => {
          const cartMatch = cart.find(item => item.product.id === prod.id);
          if (cartMatch) {
            return { ...prod, stock: Math.max(0, prod.stock - cartMatch.quantity) };
          }
          return prod;
        });
      });

      // Clear Shopping Cart and store last checkout context
      setCart([]);
      setLastPlacedOrder(newOrder);
      setProcessingPayment(false);
      setPaymentStep('success');
    }, 2500);
  };

  // Search and catalogs filters calculations
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesFabric = selectedFabric === 'all' || p.fabric === selectedFabric;
    return matchesSearch && matchesCategory && matchesFabric;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0; // Default ordering
  });

  // Simulated Login/Compte Creator
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail) return;

    const mockUser: User = {
      id: `user-${Date.now()}`,
      name: authName || authEmail.split('@')[0],
      email: authEmail,
      role: authRole
    };

    setCurrentUser(mockUser);
    setIsAuthModalOpen(false);
    
    // Redirect to management if administrator
    if (mockUser.role === 'admin') {
      setActiveTab('admin');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#f5f5f5] font-sans flex flex-col justify-between selection:bg-gold selection:text-zinc-950 relative overflow-x-hidden" id="main-root">
      {/* Background Diamond Pattern Overlay from design theme */}
      <div className="absolute inset-0 artistic-diamond-pattern opacity-[0.035] pointer-events-none z-0"></div>

      {/* Decorative Brand Vertical Rail Element */}
      <div className="hidden xl:flex absolute right-4 top-1/2 -translate-y-1/2 flex-col items-center gap-8 pointer-events-none z-10">
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-[#D4AF37]/35 to-transparent"></div>
        <span className="text-[9px] uppercase tracking-[0.5em] text-[#D4AF37]/50 font-medium whitespace-nowrap" style={{ writingMode: 'vertical-rl' }}>
          ESSENCE DE L'AFRIQUE
        </span>
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-[#D4AF37]/35 to-transparent"></div>
      </div>
      
      {/* Navigation bar integration */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        cart={cart}
        setIsAuthModalOpen={setIsAuthModalOpen}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />

      {/* Primary Section Toggles router */}
      <main className="flex-grow">
        
        {/* ================= SECTION 1: HOME PAGE ================= */}
        {activeTab === 'home' && (
          <div className="space-y-16 pb-16">
            <Hero 
              onDiscoverClick={() => setActiveTab('shop')} 
              onAdvisorClick={() => setActiveTab('ai-advisor')}
            />

            {/* Quick Pitch details */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 bg-zinc-900 border border-zinc-850 rounded-xl space-y-3 hover:border-gold/20 transition-all text-left">
                  <span className="text-xs text-gold uppercase tracking-widest font-black block">Héritage Certifié</span>
                  <p className="text-sm font-serif text-white font-bold">Origine 100% Locale</p>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Chaque article de tissu Wax, Kenté ou Bogolan provient directement d'ateliers partenaires situés au Sénégal, Ghana et Mali.
                  </p>
                </div>
                <div className="p-6 bg-zinc-900 border border-zinc-850 rounded-xl space-y-3 hover:border-gold/20 transition-all text-left">
                  <span className="text-xs text-gold uppercase tracking-widest font-black block">Génie technologique</span>
                  <p className="text-sm font-serif text-white font-bold">Conseiller Styliste par IA</p>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Exclusivité de notre projet académique : discutez librement avec un bot intelligent capable d'harmoniser vos tenues en Wax.
                  </p>
                </div>
                <div className="p-6 bg-zinc-900 border border-zinc-850 rounded-xl space-y-3 hover:border-gold/20 transition-all text-left">
                  <span className="text-xs text-gold uppercase tracking-widest font-black block">Engagement Solidaire</span>
                  <p className="text-sm font-serif text-white font-bold">Mode durable et équitable</p>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Nous travaillons au respect des artisans. Notre modèle garantit une rémunération digne qui préserve le savoir-faire.
                  </p>
                </div>
              </div>
            </section>

            {/* Statistics Section (Counter) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-850 rounded-2xl p-6 sm:p-10 relative overflow-hidden shadow-xl text-left">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.06),transparent_60%)]"></div>
                <div className="absolute inset-0 african-wave-pattern opacity-5 pointer-events-none"></div>
                
                <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y divide-zinc-800/60 sm:divide-y-0 lg:divide-x lg:divide-zinc-850">
                  <div className="space-y-1 sm:space-y-2 pt-0">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold border border-gold/15 mb-3">
                      <Users className="w-5 h-5" />
                    </div>
                    <h4 className="text-3xl sm:text-4xl font-serif font-black text-white tracking-tight">
                      +500
                    </h4>
                    <p className="text-[10px] sm:text-xs text-zinc-400 font-bold uppercase tracking-widest">
                      Clients Heureux
                    </p>
                  </div>

                  <div className="space-y-1 sm:space-y-2 pt-4 sm:pt-0 lg:pl-8">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold border border-gold/15 mb-3">
                      <Package className="w-5 h-5" />
                    </div>
                    <h4 className="text-3xl sm:text-4xl font-serif font-black text-white tracking-tight">
                      +1200
                    </h4>
                    <p className="text-[10px] sm:text-xs text-zinc-400 font-bold uppercase tracking-widest">
                      Produits & Créations
                    </p>
                  </div>

                  <div className="space-y-1 sm:space-y-2 pt-4 sm:pt-0 lg:pl-8">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold border border-gold/15 mb-3">
                      <Award className="w-5 h-5" />
                    </div>
                    <h4 className="text-3xl sm:text-4xl font-serif font-black text-white tracking-tight">
                      98%
                    </h4>
                    <p className="text-[10px] sm:text-xs text-zinc-400 font-bold uppercase tracking-widest">
                      Satisfaction Client
                    </p>
                  </div>

                  <div className="space-y-1 sm:space-y-2 pt-4 sm:pt-0 lg:pl-8">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold border border-gold/15 mb-3">
                      <Headphones className="w-5 h-5" />
                    </div>
                    <h4 className="text-3xl sm:text-4xl font-serif font-black text-white tracking-tight">
                      24/7
                    </h4>
                    <p className="text-[10px] sm:text-xs text-zinc-400 font-bold uppercase tracking-widest">
                      Assistance & Suivi
                    </p>
                  </div>
                </div>
              </div>
            </section>


            {/* Cultural Storytelling Promo Card */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="p-8 bg-zinc-950 border border-gold/15 rounded-2xl flex flex-col md:flex-row gap-8 items-center text-left relative overflow-hidden">
                <div className="absolute inset-0 african-wave-pattern opacity-5 pointer-events-none"></div>
                <div className="w-24 h-24 rounded-full bg-gold/15 flex items-center justify-center text-gold border border-gold/25 relative overflow-hidden shrink-0">
                  <Sparkles className="w-10 h-10 animate-spin-slow text-gold" />
                </div>
                <div className="space-y-3">
                  <span className="text-xs text-gold uppercase tracking-widest font-bold block">Assistance personnalisée</span>
                  <h3 className="text-xl font-serif text-white font-bold">Un doute sur l’ajustement ou la signification d’un motif ?</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl">
                    Utilisez notre conseiller de style à intelligence artificielle. Il saura vous guider sur l'histoire secrète des lignes géométriques du Kenté ghanéen ou vous souffler des idées d'ensembles élégants.
                  </p>
                  <button 
                    onClick={() => setActiveTab('ai-advisor')}
                    className="inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-gold to-yellow-600 text-zinc-950 text-xs font-bold uppercase rounded-lg shadow-md hover:from-gold-dark transition-all pt-1 cursor-pointer"
                  >
                    <span>Consulter le Styliste IA</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </section>

            {/* 3. Brand Billboard / Photo Feature Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" id="brand-billboard-section">
              <div className="bg-zinc-900 border border-zinc-850 rounded-3xl overflow-hidden shadow-2xl relative">
                
                {/* Background ambient designs */}
                <div className="absolute inset-0 subtle-african-grid opacity-25"></div>
                <div className="absolute top-0 right-0 h-48 w-48 african-wave-pattern opacity-5 pointer-events-none rounded-full"></div>
                <div className="absolute -bottom-10 -left-10 w-72 h-72 rounded-full bg-gold/5 blur-3xl pointer-events-none"></div>

                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[550px]">
                  
                  {/* Left Column: Visual Print Poster (Responsive Showcase of the Photo) */}
                  <div className="lg:col-span-5 relative group min-h-[420px] lg:min-h-0 overflow-hidden bg-zinc-950">
                    <img 
                      src="/src/assets/images/elegance_white_prestige_1781364265136.jpg" 
                      alt="Affiche de Prestige Élégance Africa" 
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-zinc-950/30 lg:to-zinc-950/85"></div>
                    
                    {/* Golden design accent frame on image */}
                    <div className="absolute inset-4 border border-gold/25 pointer-events-none rounded-xl"></div>
                    <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-gold/40"></div>
                    <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-gold/40"></div>

                    {/* Floating badge over the photo reproducing the poster message */}
                    <div className="absolute bottom-8 left-8 right-8 bg-zinc-950/90 backdrop-blur-md border border-gold/25 p-4 rounded-xl text-left shadow-lg">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="text-[10px] text-gold uppercase tracking-widest font-mono font-black">Sélection Prestige</span>
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                        </span>
                      </div>
                      <p className="text-xs text-zinc-300 font-serif leading-relaxed italic">
                        « L’élégance n’est pas un choix, c’est une identité. »
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Narrative content interpreting the brand photo poster */}
                  <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between text-left relative z-10 space-y-8">
                    
                    {/* Logo/Insignia & Slogan */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shadow-inner">
                          <span className="font-serif font-black text-xl tracking-tighter">EA</span>
                        </div>
                        <div>
                          <p className="text-xs uppercase font-black tracking-widest text-gold font-mono">Style & Identité</p>
                          <h4 className="text-lg font-serif font-black text-white uppercase tracking-wider leading-none mt-0.5">Élégance Africa</h4>
                        </div>
                      </div>
                      
                      <p className="text-[10px] sm:text-xs text-zinc-400 font-mono italic max-w-md">
                        "L'ÉLEGANCE. NOTRE CULTURE, VOTRE STYLE."
                      </p>
                    </div>

                    {/* Main statements */}
                    <div className="space-y-4">
                      <h3 className="text-2xl sm:text-3xl font-serif text-white font-black tracking-tight leading-tight">
                        Vêtements pour Hommes & Femmes d'Exception
                      </h3>
                      <p className="text-xs text-zinc-300 leading-relaxed max-w-xl">
                        Inspiré par le modèle de prestige immortalisé dans cette œuvre d'art, notre atelier crée des pièces de haute couture fusionnant des drapés royaux et des textiles nobles. Des motifs en coton peigné aux finitions millimétrées faits pour ceux qui portent leur héritage avec fierté.
                      </p>
                    </div>

                    {/* Features grid with the 4 pillars from the poster layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      <div className="flex gap-3 bg-zinc-950/65 p-3.5 rounded-xl border border-zinc-850 hover:border-gold/20 transition-all">
                        <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold shrink-0">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="text-xs font-serif font-black text-white uppercase tracking-wider font-semibold">Design Africain</h5>
                          <p className="text-[10px] text-zinc-400 mt-0.5 leading-relaxed">
                            Célébration des géométries traditionnelles et symboliques sacrées d'Afrique.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 bg-zinc-950/65 p-3.5 rounded-xl border border-zinc-850 hover:border-gold/20 transition-all">
                        <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold shrink-0">
                          <Award className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="text-xs font-serif font-black text-white uppercase tracking-wider font-semibold">Matières de Qualité</h5>
                          <p className="text-[10px] text-zinc-400 mt-0.5 leading-relaxed">
                            Fils de coton ultra-doux, Bazin haute brillance, brocards d'or fin certifiés.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 bg-zinc-950/65 p-3.5 rounded-xl border border-zinc-850 hover:border-gold/20 transition-all">
                        <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold shrink-0">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="text-xs font-serif font-black text-white uppercase tracking-wider font-semibold">Finitions Soignées</h5>
                          <p className="text-[10px] text-zinc-400 mt-0.5 leading-relaxed">
                            Coutures doublées invisibles, ourlets renforcés et boutons dorés de précision.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 bg-zinc-950/65 p-3.5 rounded-xl border border-zinc-850 hover:border-gold/20 transition-all">
                        <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold shrink-0">
                          <Activity className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="text-xs font-serif font-black text-white uppercase tracking-wider font-semibold">Style Intemporel</h5>
                          <p className="text-[10px] text-zinc-400 mt-0.5 leading-relaxed">
                            Des designs royaux adaptés à toutes les générations pour affirmer son élégance.
                          </p>
                        </div>
                      </div>

                    </div>

                    {/* Bottom action banner & brand signature motto */}
                    <div className="pt-6 border-t border-zinc-850/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                      
                      <button 
                        onClick={() => {
                          setActiveTab('shop');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-gold to-amber-600 hover:from-amber-500 hover:to-gold active:scale-98 text-zinc-950 text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer group"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Acheter la Collection</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>

                      {/* Poster Footer Tickers */}
                      <div className="flex flex-col items-center sm:items-end text-center sm:text-right">
                        <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-black">
                          Une Marque. Une Identité. Une Fierté Africaine.
                        </p>
                        <div className="flex items-center gap-2.5 mt-1 text-[9px] text-gold font-mono font-black uppercase">
                          <span>Qualité ✓</span>
                          <span className="text-zinc-700">•</span>
                          <span>Passion ♥</span>
                          <span className="text-zinc-700">•</span>
                          <span>Élégance ✦</span>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </section>

            {/* Testimonials Banner */}
            <section className="bg-zinc-950 border-y border-gold/15 py-16" id="testimonials-section">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
                <div className="space-y-2">
                  <span className="text-xs text-gold uppercase tracking-widest font-black">La parole est à vous</span>
                  <h3 className="text-2xl sm:text-3xl font-serif text-white font-bold">Avis de nos Clients & Créateurs</h3>
                  <p className="text-xs text-zinc-400 max-w-xl mx-auto">
                    Leurs mots témoignent de notre engagement pour l'artisanat d'exception, le confort royal et la noblesse de nos tissus.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 text-left">
                  {[
                    {
                      name: "Fatou Mbaye",
                      role: "Styliste de Mode",
                      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=250",
                      rating: 5,
                      comment: "Les broderies or sur le bazin riche brillent superbement. Les finitions coutures sont d'une noblesse absolue !",
                      accent: "border-t-4 border-amber-500", // Gold accent
                    },
                    {
                      name: "Mamadou Balde",
                      role: "Directeur Artistique",
                      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=250",
                      rating: 5,
                      comment: "Ma veste en Bogolan authentique fait sensation lors de mes vernissages. Une coupe majestueuse et moderne.",
                      accent: "border-t-4 border-emerald-600", // Green accent
                    },
                    {
                      name: "Ousmane Dieng",
                      role: "Promoteur Culturel",
                      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
                      rating: 5,
                      comment: "La qualité du tissage Kente royal dépasse toutes mes attentes. L'éthique et l'authenticité sont au rendez-vous.",
                      accent: "border-t-4 border-red-600", // Red accent
                    },
                    {
                      name: "Alpha Diallo",
                      role: "Designer Textile",
                      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=250",
                      rating: 5,
                      comment: "Le Conseiller intelligent est extraordinaire ! Il m'enseigne avec précision l'histoire sacrée de chaque symbole.",
                      accent: "border-t-4 border-blue-600", // Blue accent
                    },
                    {
                      name: "Malang Diambang",
                      role: "Artisan d'Étoffe",
                      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250",
                      rating: 5,
                      comment: "Service client et suivi de commande irréprochables. Les livraisons arrivent à Dakar ou Bamako en un éclair.",
                      accent: "border-t-4 border-orange-500", // Orange accent
                    }
                  ].map((item, idx) => (
                    <div 
                      key={idx} 
                      className={`bg-white rounded-2xl p-5 ${item.accent} shadow-md flex flex-col justify-between space-y-4 hover:scale-[1.02] hover:shadow-lg transition-all duration-300 border border-zinc-200`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <img 
                            src={item.avatar} 
                            alt={item.name} 
                            className="w-11 h-11 rounded-full object-cover border border-zinc-200 shadow-xs"
                            referrerPolicy="no-referrer"
                          />
                          <div className="text-left">
                            <h4 className="text-xs font-serif font-black text-zinc-900 leading-tight">
                              {item.name}
                            </h4>
                            <p className="text-[9px] text-zinc-500 font-mono font-semibold">
                              {item.role}
                            </p>
                          </div>
                        </div>

                        <div className="flex text-amber-500 gap-0.5">
                          {Array.from({ length: item.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>

                        <p className="text-xs text-zinc-700 leading-relaxed italic font-medium">
                          « {item.comment} »
                        </p>
                      </div>
                      
                      <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[9px] text-zinc-400 font-bold tracking-wider uppercase">
                        <span>Avis vérifié</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Interactive FAQ Section */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" id="faq-section">
              <div className="text-center space-y-2">
                <span className="text-xs text-gold uppercase tracking-widest font-black">Besoin d'aide ?</span>
                <h3 className="text-2xl sm:text-3xl font-serif text-white font-bold">Foire Aux Questions (FAQ)</h3>
                <p className="text-xs text-zinc-400 max-w-xl mx-auto">
                  Retrouvez ici toutes les réponses à vos questions pour commander vos tenues de luxe en toute sérénité.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    q: "Comment commander chez Élégance Africa ?",
                    a: "Pour commander, rendez-vous dans l'onglet \"Boutique\" pour découvrir notre catalogue de pièces exclusives. Cliquez sur l'article désiré, choisissez votre taille, puis cliquez sur \"Ajouter au Panier\". Une fois vos articles sélectionnés, ouvrez votre Panier (l'icône sac en haut à droite), cliquez sur \"Procéder à la Livraison\", renseignez vos coordonnées de livraison, puis validez votre achat en sélectionnant votre moyen de règlement (Carte Bancaire, Wave, Orange Money ou Moov Money). Un e-mail de confirmation contenant votre récapitulatif vous sera instantanément généré !"
                  },
                  {
                    q: "Quels sont vos délais et zones de livraison ?",
                    a: "Nous expédions nos créations et tissus de prestige à domicile ou en point relais au Maroc (Casablanca, Rabat, Marrakech...), au Sénégal (Dakar), au Mali (Bamako), en Côte d'Ivoire et dans toute l'Afrique de l'Ouest sous 3 à 5 jours ouvrés. Les livraisons internationales vers l'Europe, l'Amérique ou l'Asie sont assurées via DHL Express sous 5 à 7 jours ouvrés."
                  },
                  {
                    q: "Puis-je commander des créations sur-mesure ou personnalisées ?",
                    a: "Absolument ! La tradition de la haute couture africaine réside dans l'art de l'ajustement fluide. Notre atelier principal de maîtres artisans basé à Casablanca peut concevoir des pièces sur-mesure. Interrogez notre Styliste virtuel par IA dans l'onglet \"Conseiller Style\" pour concevoir un assortiment harmonieux, ou décrivez-nous vos souhaits précis via le formulaire de l'onglet \"Nous Contacter\"."
                  },
                  {
                    q: "D'où proviennent vos étoffes d'envergure et tissus nobles ?",
                    a: "L'authenticité de nos matériaux est garantie sans compromis. Nos pagnes Wax Hollandais de qualité légendaire, notre tissu Bogolan teint authentiquement à la rivière avec de l'argile fermentée au Mali, et notre Kente royal brodé au fil d'or au Ghana soutiennent directement le commerce équitable et préservent un patrimoine traditionnel inestimable."
                  }
                ].map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div 
                      key={index} 
                      className="bg-zinc-900 border border-zinc-850 rounded-xl overflow-hidden transition-all duration-300 text-left"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full p-4 sm:p-5 flex justify-between items-center text-left hover:bg-zinc-850 transition-colors cursor-pointer outline-none"
                      >
                        <span className="text-sm font-semibold font-serif text-white hover:text-gold transition-colors flex items-center gap-2">
                          <span className="text-xs text-gold font-mono font-bold">0{index + 1}.</span>
                          {faq.q}
                        </span>
                        <div className="p-1 bg-zinc-950/50 rounded-lg border border-zinc-805 text-gold">
                          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </div>
                      </button>

                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.25 }}
                          className="px-5 pb-5 pt-1 text-xs text-zinc-300 leading-relaxed border-t border-zinc-950/60"
                        >
                          <p>{faq.a}</p>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Google Maps Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" id="google-maps-location">
              <div className="text-center space-y-2">
                <span className="text-xs text-gold uppercase tracking-widest font-black">Maison Élégance</span>
                <h3 className="text-2xl sm:text-3xl font-serif text-white font-bold">Retrouvez Notre Boutique & Atelier</h3>
                <p className="text-xs text-zinc-400 max-w-xl mx-auto">
                  Venez essayer nos étoffes de luxe ou échanger avec nos maîtres artisans dans notre atelier de Casablanca.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Info Card - Left Column */}
                <div className="lg:col-span-5 bg-zinc-900 border border-zinc-850 p-6 sm:p-8 rounded-2xl flex flex-col justify-between text-left relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 right-0 h-24 w-24 african-wave-pattern opacity-5 rounded-full pointer-events-none"></div>
                  
                  <div className="space-y-6">
                    <h4 className="text-base font-serif text-white font-bold uppercase tracking-wider border-b border-zinc-850 pb-3 flex items-center gap-2">
                      <span className="text-gold">📍</span> Informations de Contact
                    </h4>

                    <div className="space-y-5">
                      {/* Address */}
                      <div className="flex gap-3.5 items-start">
                        <div className="p-2.5 bg-zinc-950/80 border border-zinc-800 text-gold rounded-xl shrink-0">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <h5 className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Notre Adresse</h5>
                          <p className="text-sm font-semibold text-white mt-1 leading-relaxed">
                            Quartier Oulfa, Casablanca 20250, Maroc
                          </p>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="flex gap-3.5 items-start">
                        <div className="p-2.5 bg-zinc-950/80 border border-zinc-800 text-gold rounded-xl shrink-0">
                          <Phone className="w-5 h-5" />
                        </div>
                        <div>
                          <h5 className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Téléphone</h5>
                          <p className="text-sm font-semibold text-white mt-1 font-mono">
                            <a href="tel:+212688789184" className="hover:text-gold transition-all">
                              +2126 8878 9184
                            </a>
                          </p>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex gap-3.5 items-start">
                        <div className="p-2.5 bg-zinc-950/80 border border-zinc-800 text-gold rounded-xl shrink-0">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div>
                          <h5 className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Adresse E-mail</h5>
                          <p className="text-sm font-semibold text-white mt-1 font-mono truncate">
                            <a href="mailto:baldecherifnianao01@gmail.com" className="hover:text-gold transition-all">
                              baldecherifnianao01@gmail.com
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* WhatsApp CTA Row */}
                    <div className="pt-4 border-t border-zinc-850/80 space-y-3">
                      <h5 className="text-[10px] text-zinc-500 uppercase tracking-widest font-black">Assistance Directe WhatsApp</h5>
                      <a 
                        href="https://wa.me/212688789184" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-650 active:scale-98 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4 fill-current text-zinc-950" />
                        <span>Discuter sur WhatsApp</span>
                      </a>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-850/60 text-[10px] text-zinc-500 flex justify-between items-center font-mono">
                    <span>Atelier ouvert : Lun - Sam (9h - 19h)</span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Disponible
                    </span>
                  </div>
                </div>

                {/* Google Maps iFrame - Right Column */}
                <div className="lg:col-span-7 bg-zinc-900 border border-zinc-850 rounded-2xl overflow-hidden shadow-xl h-[380px] lg:h-auto min-h-[350px] relative">
                  <iframe 
                    title="Emplacement Élégance Africa Casablanca"
                    className="w-full h-full border-0 grayscale invert opacity-80 hover:opacity-95 transition-all duration-300"
                    src="https://maps.google.com/maps?q=Quartier%20Oulfa%2C%20Casablanca%2C%20Maroc&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                    allowFullScreen={true} 
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </section>

            {/* Live Visitors Stats & Newsletter Section */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" id="newsletter-and-live-activity">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-6 border-t border-zinc-900">
                
                {/* 1. Newsletter Section */}
                <div className="bg-zinc-900 border border-zinc-850 p-6 sm:p-8 rounded-2xl flex flex-col justify-between text-left relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 right-0 h-24 w-24 african-wave-pattern opacity-5 rounded-full pointer-events-none"></div>
                  
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20 text-gold mb-2">
                      <Mail className="w-5 h-5" />
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-serif text-white font-bold leading-tight">
                      Rejoignez l'Élite de la Haute Couture d'Afrique
                    </h3>
                    
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Laissez-vous guider au cœur de l'excellence artisanale. Inscrivez-vous pour recevoir nos invitations privées, nos fiches d'histoire de textile noble (Kente, Bogolan, Wax) et nos nouveautés exclusives directes des ateliers.
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-zinc-850/60">
                    {!newsletterSubscribed ? (
                      <form 
                        onSubmit={(e) => { 
                          e.preventDefault(); 
                          if (newsletterEmail) {
                            setNewsletterSubscribed(true);
                          }
                        }} 
                        className="space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input 
                            type="email" 
                            required
                            value={newsletterEmail}
                            onChange={(e) => setNewsletterEmail(e.target.value)}
                            placeholder="Entrez votre adresse e-mail" 
                            className="flex-grow bg-zinc-950/80 border border-zinc-800 rounded-xl text-xs p-3.5 text-zinc-100 placeholder-zinc-650 outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all font-mono"
                          />
                          <button 
                            type="submit" 
                            className="px-5 py-3.5 bg-gradient-to-r from-gold to-amber-600 hover:from-amber-500 hover:to-gold active:scale-98 text-zinc-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg cursor-pointer shrink-0"
                          >
                            Subscribe
                          </button>
                        </div>
                        <p className="text-[10px] text-zinc-500 italic">
                          En vous abonnant, vous acceptez notre politique de confidentialité. Désinscription en 1 clic.
                        </p>
                      </form>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 bg-gold/10 border border-gold/25 rounded-xl text-left space-y-2"
                      >
                        <div className="flex items-center gap-2 text-gold">
                          <CheckCircle className="w-5 h-5 shrink-0" />
                          <span className="text-xs font-bold uppercase tracking-wider">Inscription confirmée !</span>
                        </div>
                        <p className="text-xs text-zinc-300">
                          Bienvenue dans l'univers d'Élégance Africa. Un e-mail de bienvenue a été envoyé à <strong className="font-mono text-gold">{newsletterEmail}</strong>.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* 2. Live Visitor Counter Section */}
                <div className="bg-zinc-900 border border-zinc-850 p-6 sm:p-8 rounded-2xl flex flex-col justify-between text-left relative overflow-hidden shadow-xl" id="live-visitors-counter">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.04),transparent_60%)]"></div>
                  
                  <div className="space-y-4 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20 text-gold mb-2">
                      <Activity className="w-5 h-5" />
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-serif text-white font-bold leading-tight">
                      Activité & Engouement en Temps Réel
                    </h3>
                    
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Nos pièces d'exception étant produites en séries limitées, l'activité de la boutique est suivie de près par notre communauté d'esthètes.
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 mt-4 border-t border-zinc-850/60 relative z-10 font-sans">
                    {/* Element A: 128 visiteurs en ligne with pulsing dot */}
                    <div className="flex items-center gap-4 bg-zinc-950/60 p-3 rounded-xl border border-zinc-850">
                      <div className="relative flex h-3 w-3 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                      </div>
                      <div>
                        <p className="text-sm font-black text-white font-mono leading-none">
                          {liveOnlineVisitors}
                        </p>
                        <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold mt-1">
                          visiteurs en ligne en ce moment
                        </p>
                      </div>
                    </div>

                    {/* Element B: Plus de 2 450 personnes ont consulté ce produit aujourd'hui */}
                    <div className="flex items-center gap-3 bg-zinc-950/60 p-3 rounded-xl border border-zinc-850">
                      <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg border border-amber-500/20 shrink-0">
                        <Flame className="w-4 h-4 animate-pulse" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-zinc-200 leading-normal">
                          Plus de <span className="text-gold font-bold font-mono animate-pulse">2 450</span> personnes ont consulté ce produit aujourd'hui
                        </p>
                        <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold mt-0.5">
                          Tendance de consultation élevée ⚡
                        </p>
                      </div>
                    </div>

                    {/* Element C: 18 utilisateurs consultent actuellement cette page */}
                    <div className="flex items-center gap-3 bg-zinc-950/60 p-3 rounded-xl border border-zinc-850">
                      <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20 shrink-0">
                        <Eye className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-zinc-200 leading-normal">
                          <span className="text-blue-400 font-bold font-mono">{liveViewingNow}</span> utilisateurs consultent actuellement cette page
                        </p>
                        <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold mt-0.5">
                          Mise à jour en direct actif
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* 1. Section Formulaire de Contact */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" id="home-contact-form">
              <div className="text-center space-y-2">
                <span className="text-xs text-gold uppercase tracking-widest font-black">Prendre Contact</span>
                <h3 className="text-2xl sm:text-3xl font-serif text-white font-bold">Une Question ou un Projet Sur-Mesure ?</h3>
                <p className="text-xs text-zinc-400 max-w-xl mx-auto">
                  Contactez nos équipes d'artisans et notre direction de Casablanca directement via ce formulaire sécurisé.
                </p>
              </div>

              <div className="bg-zinc-900 border border-zinc-850 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl text-left">
                <div className="absolute top-0 right-0 h-32 w-32 african-wave-pattern opacity-5 rounded-full pointer-events-none"></div>

                {!contactSubmitted ? (
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (contactName && contactEmail && contactMessage) {
                        setContactSubmitted(true);
                      }
                    }}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Field A: Nom */}
                      <div className="space-y-1">
                        <label className="text-zinc-400 font-bold uppercase tracking-wider text-[9px] block">Votre Nom complet</label>
                        <div className="relative mt-1">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gold/60">
                            <UserIcon className="w-4 h-4" />
                          </span>
                          <input 
                            type="text" 
                            required
                            placeholder="Ex: Professeur Sissoko"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl text-xs pl-10 pr-4 py-3.5 text-zinc-100 placeholder-zinc-650 outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all font-serif"
                          />
                        </div>
                      </div>

                      {/* Field B: Email */}
                      <div className="space-y-1">
                        <label className="text-zinc-400 font-bold uppercase tracking-wider text-[9px] block">Adresse email de messagerie</label>
                        <div className="relative mt-1">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gold/60">
                            <Mail className="w-4 h-4" />
                          </span>
                          <input 
                            type="email" 
                            required
                            placeholder="Ex: contact@universite.com"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl text-xs pl-10 pr-4 py-3.5 text-zinc-100 placeholder-zinc-650 outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all font-mono"
                          />
                        </div>
                      </div>

                      {/* Field C: Téléphone */}
                      <div className="space-y-1">
                        <label className="text-zinc-400 font-bold uppercase tracking-wider text-[9px] block">Numéro de Téléphone (Optionnel)</label>
                        <div className="relative mt-1">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gold/60">
                            <Phone className="w-4 h-4" />
                          </span>
                          <input 
                            type="tel" 
                            placeholder="Ex: +212 688 789 184"
                            value={contactPhone}
                            onChange={(e) => setContactPhone(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl text-xs pl-10 pr-4 py-3.5 text-zinc-100 placeholder-zinc-650 outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Message Area */}
                    <div className="space-y-1">
                      <label className="text-zinc-400 font-bold uppercase tracking-wider text-[9px] block">Votre Message précis</label>
                      <div className="relative mt-1">
                        <span className="absolute top-3.5 left-3.5 flex items-start pointer-events-none text-gold/60">
                          <MessageSquare className="w-4 h-4" />
                        </span>
                        <textarea 
                          required
                          rows={4}
                          placeholder="Décrivez en quelques mots votre projet d'ajustement de taille, votre intérêt pour nos étoffes ou votre message pour le projet d'Artisanat d'Afrique..."
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl text-xs pl-10 pr-4 py-3.5 text-zinc-100 placeholder-zinc-650 outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all leading-relaxed"
                        ></textarea>
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="px-8 py-4 bg-gradient-to-r from-gold to-amber-600 hover:from-amber-500 hover:to-gold active:scale-98 text-zinc-950 font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg cursor-pointer flex items-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8 space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/15 flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle className="w-8 h-8 animate-bounce" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-serif font-bold text-white uppercase tracking-wider">Message Envoyé avec Succès !</h4>
                      <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                        Merci, <strong className="text-gold font-serif">{contactName}</strong>. Votre message a bien été transmis. Nos équipes reviendront vers vous à l'adresse <span className="font-mono text-zinc-300">{contactEmail}</span> sous 24 heures.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setContactSubmitted(false);
                        setContactName('');
                        setContactEmail('');
                        setContactPhone('');
                        setContactMessage('');
                      }}
                      className="px-5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-400 text-[10px] font-bold uppercase hover:text-gold transition-all cursor-pointer"
                    >
                      Envoyer un autre message
                    </button>
                  </motion.div>
                )}
              </div>
            </section>

            {/* 2. Section Réseaux Sociaux */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" id="home-social-networks">
              <div className="text-center space-y-2">
                <span className="text-xs text-gold uppercase tracking-widest font-black">Suivez L'Aventure</span>
                <h3 className="text-2xl sm:text-3xl font-serif text-white font-bold">Nos Communautés d'Héritage</h3>
                <p className="text-xs text-zinc-400 max-w-xl mx-auto">
                  Rejoignez plus de 180 000 passionnés de la haute couture, des étoffes ancestrales et du design africain contemporain.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    name: "Instagram",
                    handle: "@elegance_africa",
                    metric: "48.5K abonnés",
                    cta: "Découvrir nos Reels",
                    accent: "border-t-4 border-rose-500",
                    icon: <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 text-rose-500" />,
                    url: "https://instagram.com",
                  },
                  {
                    name: "TikTok",
                    handle: "@elegance.africa.pfe",
                    metric: "104K abonnés",
                    cta: "Voir nos essayages",
                    accent: "border-t-4 border-cyan-400",
                    icon: (
                      <svg 
                        className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 fill-current text-zinc-900" 
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.95 1.12 2.27 1.84 3.65 2.15l-.02 3.7c-1.39-.03-2.76-.46-3.92-1.25-.33-.23-.64-.5-.92-.78v7.4c.03 1.94-.57 3.86-1.74 5.39-1.32 1.74-3.41 2.82-5.61 2.94-2.2-.07-4.32-1.12-5.69-2.88-1.54-1.92-1.97-4.57-1.12-6.9 1-2.58 3.51-4.35 6.29-4.38.1 0 .2 0 .3.01v3.9c-.83-.06-1.68.21-2.31.75-.82.68-1.18 1.76-1.02 2.8.19 1.13.98 2.09 2.04 2.47 1.05.41 2.28.16 3.08-.63.63-.64.91-1.53.9-2.43V0l.9-.02z" />
                      </svg>
                    ),
                    url: "https://tiktok.com",
                  },
                  {
                    name: "Facebook",
                    handle: "Maison Élégance Africa",
                    metric: "24K abonnés",
                    cta: "Suivre nos événements",
                    accent: "border-t-4 border-blue-600",
                    icon: <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 text-blue-600" />,
                    url: "https://facebook.com",
                  },
                  {
                    name: "YouTube",
                    handle: "Élégance Africa TV",
                    metric: "12.8K abonnés",
                    cta: "Voir nos documentaires",
                    accent: "border-t-4 border-red-650",
                    icon: <Youtube className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 text-red-600" />,
                    url: "https://youtube.com",
                  }
                ].map((social, id) => (
                  <a 
                    key={id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`bg-white rounded-2xl p-6 ${social.accent} shadow-md flex flex-col justify-between space-y-6 hover:scale-[1.03] hover:shadow-xl transition-all duration-300 group`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center border border-zinc-200 text-zinc-800 group-hover:bg-zinc-50 transition-colors shrink-0">
                          {social.icon}
                        </div>
                        <div className="text-left">
                          <h4 className="text-xs font-black font-serif text-zinc-900 uppercase tracking-wider leading-none">
                            {social.name}
                          </h4>
                          <p className="text-[10px] text-zinc-500 font-mono mt-1">
                            {social.handle}
                          </p>
                        </div>
                      </div>
                      
                      <div className="w-2 h-2 rounded-full bg-emerald-500" title="Profil actif"></div>
                    </div>

                    <div className="space-y-1 bg-zinc-50/75 border border-zinc-100 p-3 rounded-xl">
                      <p className="text-xl font-bold text-zinc-900 font-mono text-center">
                        {social.metric}
                      </p>
                      <p className="text-[8px] text-zinc-400 uppercase tracking-widest text-center font-black">
                        Audience Active
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-zinc-100 text-[10px] font-bold group-hover:text-amber-500 text-zinc-400 transition-colors">
                      <span>{social.cta}</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </a>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* ================= SECTION 2: SHOP / CATALOGUE ================= */}
        {activeTab === 'shop' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left">
            
            {/* Title section */}
            <div className="border-b border-zinc-900 pb-4">
              <span className="text-xs text-gold uppercase tracking-widest font-black">Collections Limitées</span>
              <h2 className="text-3xl font-serif text-white font-bold tracking-tight">Le Catalogue Élégance Africa</h2>
            </div>

            {/* Filters panel */}
            <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-850 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              {/* Category selector */}
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-black block">Genre / Collection :</span>
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 outline-none"
                >
                  <option value="all">Toutes les collections</option>
                  <option value="hommes">Hommes</option>
                  <option value="femmes">Femmes</option>
                  <option value="enfants">Enfants</option>
                  <option value="accessoires">Accessoires</option>
                </select>
              </div>

              {/* Fabric selector */}
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-black block">Type de textile :</span>
                <select 
                  value={selectedFabric} 
                  onChange={(e) => setSelectedFabric(e.target.value)}
                  className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 outline-none"
                >
                  <option value="all">Tous les tissus</option>
                  <option value="wax">Wax Hollandais</option>
                  <option value="kente">Kenté Royal</option>
                  <option value="bogolan">Bogolan du Mali</option>
                  <option value="dashiki">Dashiki Léger</option>
                  <option value="ndop">Ndop Bamileke</option>
                  <option value="autre">Bazin/Autre</option>
                </select>
              </div>

              {/* Price Sort */}
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-black block">Trier les articles :</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 outline-none"
                >
                  <option value="default">Ordre alphabétique</option>
                  <option value="price-asc">Prix : croissant</option>
                  <option value="price-desc">Prix : décroissant</option>
                </select>
              </div>

              {/* Search String */}
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-black block">Rechercher par mot-clé :</span>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Ex: brodé, veste, coton"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-gold/45 rounded-lg p-2.5 pl-8 text-xs text-zinc-200 outline-none"
                  />
                  <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-3.5" />
                </div>
              </div>
            </div>

            {/* Catalog Grid */}
            {filteredProducts.length === 0 ? (
              <div className="p-12 text-center bg-zinc-950 border border-zinc-850 rounded-2xl max-w-md mx-auto space-y-4">
                <span className="text-3xl">🏜️</span>
                <h3 className="text-base font-serif text-white font-bold uppercase">Aucun article trouvé</h3>
                <p className="text-xs text-zinc-400">Vos critères de filtrage (tissu ou genre) ne correspondent à aucun habit de notre collection. Faites une nouvelle sélection.</p>
                <button 
                  onClick={() => { setSelectedCategory('all'); setSelectedFabric('all'); setSearchQuery(''); }}
                  className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-xs text-gold rounded font-bold"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((p) => (
                  <div 
                    key={p.id} 
                    className="bg-zinc-900 border border-zinc-850 rounded-xl overflow-hidden shadow group hover:border-gold/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                    onClick={() => setSelectedProduct(p)}
                  >
                    <div className="relative h-72 overflow-hidden bg-zinc-950">
                      <img 
                        src={p.images[0]} 
                        alt={p.name} 
                        className="w-full h-full object-cover group-hover:scale-104 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Fabric and low stock tags */}
                      <span className="absolute bottom-3 left-3 px-2 py-0.5 bg-zinc-950/85 backdrop-blur border border-gold/30 text-gold text-[9px] font-bold uppercase rounded">
                        Tissu: {p.fabric}
                      </span>
                      {p.stock <= 4 ? (
                        <span className="absolute top-3 right-3 px-2 py-0.5 bg-red-950/90 text-red-400 border border-red-800 text-[8px] font-bold uppercase rounded">
                          Stock Limité ({p.stock})
                        </span>
                      ) : (
                        <span className="absolute top-3 right-3 px-2 py-0.5 bg-zinc-950/85 text-green-400 border border-green-800 text-[8px] font-bold uppercase rounded">
                          Disponible
                        </span>
                      )}
                    </div>

                    <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-black block">Collection {p.category}</span>
                        <h4 className="text-sm font-serif font-bold text-white group-hover:text-gold transition-colors line-clamp-1">
                          {p.name}
                        </h4>
                        <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">
                          {p.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-zinc-900 flex justify-between items-center text-xs">
                        <span className="font-bold text-gold font-serif text-base">{p.price} €</span>
                        <span className="text-xs font-semibold text-zinc-300 bg-zinc-955 px-2 py-1 rounded border border-zinc-800 hover:border-gold/30 transition-all">Consulter</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* ================= SECTION 3: BLOG & ARTISANAT ================= */}
        {activeTab === 'blog' && <BlogView />}

        {/* ================= SECTION 4: ABOUT MARK =============== */}
        {activeTab === 'about' && <AboutView />}

        {/* ================= SECTION 5: CONTACT PAGE ================= */}
        {activeTab === 'contact' && <ContactView />}

        {/* ================= SECTION 6: AI STYLE ASSISTANT ================= */}
        {activeTab === 'ai-advisor' && <AIAdvisor />}

        {/* ================= SECTION 7: ACADEMIC PORTAL ================= */}
        {activeTab === 'academic' && <AcademicPortal />}

        {/* ================= SECTION 8: ADMIN BACK OFFICE ================= */}
        {activeTab === 'admin' && currentUser?.role === 'admin' && (
          <AdminDashboard 
            products={products} 
            setProducts={setProducts} 
            orders={orders} 
            setOrders={setOrders} 
          />
        )}

        {/* ================= SECTION 9: SHOPPING CART & PAYMENT ================= */}
        {activeTab === 'cart' && (
          <div className="max-w-4xl mx-auto px-4 py-12" id="cart-root-view">
            
            <div className="text-left border-b border-zinc-900 pb-3 mb-8">
              <span className="text-xs text-gold uppercase tracking-widest font-black block">Mon Sac</span>
              <h2 className="text-2xl sm:text-3xl font-serif text-white font-bold">Panier d'Achat</h2>
            </div>

            {cart.length === 0 ? (
              <div className="p-12 bg-zinc-900 border border-zinc-850 rounded-2xl text-center space-y-4 max-w-md mx-auto">
                <span className="text-3xl">🛍️</span>
                <h3 className="text-base font-serif text-white font-bold uppercase">Votre Panier est vide</h3>
                <p className="text-xs text-zinc-400">Pour continuer vos achats scolaires, explorez nos manteaux en Bogolan, robes Wax ou boubous traditionnels.</p>
                <button
                  onClick={() => setActiveTab('shop')}
                  className="px-6 py-3 bg-gradient-to-r from-gold to-yellow-600 hover:from-gold-dark text-zinc-950 text-xs font-bold uppercase rounded-lg shadow cursor-pointer"
                >
                  Découvrir la collection
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* List of items */}
                <div className="lg:col-span-2 space-y-4">
                  {cart.map((item, idx) => (
                    <div 
                      key={`${item.product.id}-${item.selectedSize}`} 
                      className="p-4 bg-zinc-950 border border-zinc-850 rounded-xl flex items-center gap-4 text-left justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name} 
                          className="w-16 h-16 object-cover rounded border border-zinc-800"
                        />
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-white font-serif line-clamp-1">{item.product.name}</h4>
                          <p className="text-[10px] text-zinc-500 uppercase">Tissu: {item.product.fabric} | Taille: {item.selectedSize}</p>
                          <span className="text-gold font-bold font-serif text-sm mt-1 block">{item.product.price} €</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        {/* Operators */}
                        <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded">
                          <button 
                            onClick={() => handleUpdateCartQuantity(item.product.id, item.selectedSize, -1)}
                            className="px-2 py-1 text-zinc-400 hover:text-white font-bold text-xs"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-bold text-white">{item.quantity}</span>
                          <button 
                            onClick={() => handleUpdateCartQuantity(item.product.id, item.selectedSize, 1)}
                            className="px-2 py-1 text-zinc-400 hover:text-white font-bold text-xs"
                          >
                            +
                          </button>
                        </div>

                        {/* Delete button */}
                        <button
                          onClick={() => handleRemoveFromCart(item.product.id, item.selectedSize)}
                          className="p-2 text-zinc-500 hover:text-rose-450 hover:bg-rose-950/20 rounded transition-all"
                          title="Supprimer du panier"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>

                {/* Totals panel */}
                <div className="lg:col-span-1">
                  <div className="p-6 bg-zinc-900 border border-zinc-850 rounded-2xl space-y-4 text-left">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-850 pb-2">Récapitulatif de Commande</h3>
                    
                    <div className="space-y-2 text-xs text-zinc-400">
                      <div className="flex justify-between">
                        <span>Sous-total articles:</span>
                        <span className="text-white font-bold">{getSubtotal()} €</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Livraison Suivie :</span>
                        <span className="text-green-400 font-bold">10 €</span>
                      </div>
                      <div className="h-px bg-zinc-800 my-2"></div>
                      <div className="flex justify-between text-sm font-serif">
                        <span className="font-bold text-white uppercase">Montant total:</span>
                        <span className="font-bold text-gold">{getSubtotal() + 10} €</span>
                      </div>
                    </div>

                    <p className="text-[10px] text-zinc-500 italic block leading-relaxed pt-2">
                      Il s'agit d'une simulation commerciale dans le cadre de la soutenance universitaire. Aucun débit réel ne sera opéré.
                    </p>

                    {/* Simulation purchase trigger button */}
                    <button
                      onClick={() => setIsCheckoutOpen(true)}
                      className="w-full py-3.5 bg-gradient-to-r from-gold to-yellow-600 hover:from-gold-dark hover:to-gold text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow-md hover:shadow-gold/20 transition-all text-center block cursor-pointer"
                    >
                      Procéder au paiement
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

      </main>

      {/* ================= AUTHENTICATION MODAL ================= */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm" onClick={() => setIsAuthModalOpen(false)}></div>
          
          <div className="relative bg-zinc-900 border border-gold/20 rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl text-left space-y-4">
            <h3 className="text-lg font-serif text-white font-bold border-b border-zinc-800 pb-2">Connexion Académique</h3>
            <p className="text-xs text-zinc-400">Pour tester le tableau de bord d'administration et de commandes, connectez-vous avec le rôle Administrateur.</p>

            <form onSubmit={handleAuthSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-zinc-450 uppercase font-black tracking-wider block">Identité / Nom complet</label>
                <input 
                  type="text" 
                  placeholder="Ex: Professeur Koné" 
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded p-2.5 outline-none focus:border-gold/30 text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-450 uppercase font-black tracking-wider block">Adresse de test email</label>
                <input 
                  type="email" 
                  required
                  placeholder="Ex: jury@universite.edu" 
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded p-2.5 outline-none focus:border-gold/30 text-white"
                />
              </div>

              {/* Role select */}
              <div className="space-y-1.5">
                <label className="text-zinc-450 uppercase font-black tracking-wider block">Rôle de Connexion :</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1.5 text-zinc-300 text-xs">
                    <input 
                      type="radio" 
                      value="admin" 
                      checked={authRole === 'admin'} 
                      onChange={() => setAuthRole('admin')} 
                      className="accent-gold"
                    />
                    <span>Administrateur</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-zinc-300 text-xs">
                    <input 
                      type="radio" 
                      value="user" 
                      checked={authRole === 'user'} 
                      onChange={() => setAuthRole('user')} 
                      className="accent-gold"
                    />
                    <span>Client Standard</span>
                  </label>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full py-3 bg-gradient-to-r from-gold to-yellow-600 hover:from-gold-dark hover:to-gold text-zinc-950 font-bold uppercase tracking-wider rounded transition-all cursor-pointer"
              >
                Se connecter
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= MULTI-PROVIDER SECURE CHECKOUT MODAL ================= */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="fixed inset-0 bg-zinc-950/85 backdrop-blur-sm" onClick={() => { if (paymentStep !== 'processing') setIsCheckoutOpen(false); }}></div>
          
          <div className="relative bg-zinc-900 border border-gold/20 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-left space-y-6 z-10">
            
            {/* 1. STATE FORM */}
            {paymentStep === 'form' && (
              <div className="space-y-4">
                <div className="border-b border-zinc-800 pb-2">
                  <h3 className="text-base font-serif text-white font-bold uppercase tracking-wider text-amber-500">
                    Simulation de Paiement Sécurisé
                  </h3>
                  <p className="text-[11px] text-zinc-400 mt-1">Saisissez les coordonnées scolaires de facturation fictive pour générer l'ordre.</p>
                </div>

                <form onSubmit={handleProceedToPayment} className="space-y-4 text-xs">
                  {/* Customer Information */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-zinc-400 font-bold uppercase tracking-wider text-[9px]">Nom Destinataire</label>
                      <input 
                        type="text" required placeholder="Cherif Nianao Balde" value={shippingName} onChange={(e) => setShippingName(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded p-2.5 text-zinc-100 outline-none focus:border-amber-500/30"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-zinc-400 font-bold uppercase tracking-wider text-[9px]">Numéro Téléphone</label>
                      <input 
                        type="text" required placeholder="+221 77 000 00 00" value={shippingPhone} onChange={(e) => setShippingPhone(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded p-2.5 text-zinc-100 outline-none focus:border-amber-500/30"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-400 font-bold uppercase tracking-wider text-[9px]">Adresse courriel électronique</label>
                    <input 
                      type="email" required placeholder="pfe-mali@universite.edu" value={shippingEmail} onChange={(e) => setShippingEmail(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded p-2.5 text-zinc-100 outline-none focus:border-amber-500/30"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-400 font-bold uppercase tracking-wider text-[9px]">Adresse de Livraison complète (Pays, Ville, Quartier)</label>
                    <input 
                      type="text" required placeholder="Casablanca, Quartier Oulfa, Imm 45" value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded p-2.5 text-zinc-100 outline-none focus:border-amber-500/30"
                    />
                  </div>

                  {/* Payment provider selector */}
                  <div className="space-y-2">
                    <label className="text-zinc-400 font-bold uppercase tracking-wider text-[9px] block">Opérateur de Paiement :</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentProvider('card')}
                        className={`p-2.5 rounded border text-center font-bold ${
                          paymentProvider === 'card' ? 'bg-gold/10 border-gold text-gold' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                        }`}
                      >
                        Visa / MasterCard
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentProvider('wave')}
                        className={`p-2.5 rounded border text-center font-bold ${
                          paymentProvider === 'wave' ? 'bg-blue-600/10 border-blue-500 text-blue-400' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                        }`}
                      >
                        Wave Sénégal
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentProvider('orange')}
                        className={`p-2.5 rounded border text-center font-bold ${
                          paymentProvider === 'orange' ? 'bg-amber-600/10 border-amber-500 text-amber-500' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                        }`}
                      >
                        Orange Money
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentProvider('moov')}
                        className={`p-2.5 rounded border text-center font-bold relative overflow-hidden ${
                          paymentProvider === 'moov' ? 'bg-indigo-600/10 border-indigo-500 text-indigo-400' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                        }`}
                      >
                        Moov Money
                      </button>
                    </div>
                  </div>

                  <div className="h-px bg-zinc-800/60 my-2"></div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsCheckoutOpen(false)}
                      className="flex-1 py-3 bg-zinc-950 hover:bg-zinc-850 rounded text-zinc-400 font-bold tracking-wider uppercase border border-zinc-800"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold tracking-wider uppercase rounded shadow-lg cursor-pointer"
                    >
                      Payer {getSubtotal() + 10} €
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* 2. PROCESSING SPINNER */}
            {paymentStep === 'processing' && (
              <div className="text-center p-12 space-y-4">
                <RefreshCcw className="w-12 h-12 text-gold animate-spin mx-auto" />
                <h4 className="text-sm font-bold text-white uppercase tracking-widest">Connexion passerelle sécurisée</h4>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-xs mx-auto">
                  Veuillez patienter... L'API académique simule la vérification du solde sur le réseau 3D Secure et l'enregistrement de l'opération en base de données.
                </p>
              </div>
            )}

            {/* 3. SUCCESS / RECEIPT COMPONENT */}
            {paymentStep === 'success' && lastPlacedOrder && (
              <div className="space-y-4 text-center">
                <CheckCircle className="w-14 h-14 text-green-400 mx-auto animate-bounce" />
                <h3 className="text-lg font-serif text-white font-bold uppercase">Paiement Validé !</h3>
                <p className="text-xs text-zinc-300">
                  L'ordre a été reçu et comptabilisé sous la référence : <br />
                  <strong className="text-gold font-mono tracking-widest text-base block mt-1">{lastPlacedOrder.id}</strong>
                </p>

                {/* Simulated Invoice receipt */}
                <div className="p-4 bg-zinc-950 rounded border border-zinc-850 text-left text-[11px] font-mono space-y-1 text-zinc-400">
                  <div className="flex justify-between border-b border-zinc-900 pb-1.5 text-white font-bold">
                    <span>REÇU / FACTURE</span>
                    <span>ÉLÉGANCE AFRICA</span>
                  </div>
                  <p>Client : {lastPlacedOrder.customerName}</p>
                  <p>Date : {lastPlacedOrder.createdAt}</p>
                  <p>Moyen de règlement : {lastPlacedOrder.paymentMethod}</p>
                  <p>Livré à : {lastPlacedOrder.address}</p>
                  <p className="text-yellow-600 pt-1.5 font-bold uppercase">Détails articles commandés :</p>
                  {lastPlacedOrder.items.map((i, k) => (
                    <p key={k}>— {i.productName} (x{i.quantity}) [Taille:{i.selectedSize}] : {i.price} €</p>
                  ))}
                  <div className="flex justify-between border-t border-zinc-900 pt-1.5 text-gold font-bold">
                    <span>Net à Payer académique :</span>
                    <span>{lastPlacedOrder.totalAmount} €</span>
                  </div>
                </div>

                <p className="text-[10px] text-zinc-500 italic leading-relaxed">
                  Note : Vous pouvez surveiller et valider l'expédition de cette commande en vous connectant comme Administrateur sur l'onglet dédié !
                </p>

                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setPaymentStep('form');
                    setActiveTab('home');
                  }}
                  className="w-full py-3 bg-gradient-to-r from-gold to-yellow-600 text-zinc-950 font-bold uppercase tracking-wider rounded cursor-pointer"
                >
                  Retourner à l'Accueil
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ================= GLOBAL PREMIUM FOOTER ================= */}
      <footer className="bg-zinc-950 border-t border-gold/10 mt-16 py-12 text-xs text-zinc-400" id="global-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
          
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gold rounded flex items-center justify-center text-zinc-950 font-serif font-bold">
                É
              </div>
              <span className="text-sm font-bold text-white uppercase tracking-widest font-serif">Élégance Africa</span>
            </div>
            <p className="text-zinc-500 leading-relaxed text-[11px]">
              La préservation éthique et la modernisation de la mode africaine d'envergure. Projet d'études académique d'excellence.
            </p>
            {/* Embedded Mini Social Icons List */}
            <div className="flex items-center gap-2.5 pt-2">
              <a 
                href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-rose-500 hover:border-rose-500 transition-all duration-300"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-300"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://tiktok.com" target="_blank" rel="noopener noreferrer" 
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-cyan-500 hover:border-cyan-500 transition-all duration-300"
                title="TikTok"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.95 1.12 2.27 1.84 3.65 2.15l-.02 3.7c-1.39-.03-2.76-.46-3.92-1.25-.33-.23-.64-.5-.92-.78v7.4c.03 1.94-.57 3.86-1.74 5.39-1.32 1.74-3.41 2.82-5.61 2.94-2.2-.07-4.32-1.12-5.69-2.88-1.54-1.92-1.97-4.57-1.12-6.9 1-2.58 3.51-4.35 6.29-4.38.1 0 .2 0 .3.01v3.9c-.83-.06-1.68.21-2.31.75-.82.68-1.18 1.76-1.02 2.8.19 1.13.98 2.09 2.04 2.47 1.05.41 2.28.16 3.08-.63.63-.64.91-1.53.9-2.43V0l.9-.02z" />
                </svg>
              </a>
              <a 
                href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all duration-300"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-serif text-amber-500">Collections</h4>
            <ul className="space-y-1.5 pt-1">
              <li><button onClick={() => { setSelectedCategory('hommes'); setActiveTab('shop'); }} className="hover:text-gold block transition-all cursor-pointer">Vêtements Hommes</button></li>
              <li><button onClick={() => { setSelectedCategory('femmes'); setActiveTab('shop'); }} className="hover:text-gold block transition-all cursor-pointer">Vêtements Femmes</button></li>
              <li><button onClick={() => { setSelectedCategory('enfants'); setActiveTab('shop'); }} className="hover:text-gold block transition-all cursor-pointer">Vêtements Enfants</button></li>
              <li><button onClick={() => { setSelectedCategory('accessoires'); setActiveTab('shop'); }} className="hover:text-gold block transition-all cursor-pointer">Bijoux / Accessoires</button></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-serif text-amber-500">Savoir Ancestral</h4>
            <ul className="space-y-1.5 pt-1">
              <li><button onClick={() => { setSelectedFabric('wax'); setActiveTab('shop'); }} className="hover:text-gold block transition-all cursor-pointer">Wax Hollandais</button></li>
              <li><button onClick={() => { setSelectedFabric('kente'); setActiveTab('shop'); }} className="hover:text-gold block transition-all cursor-pointer">Kenté Royal</button></li>
              <li><button onClick={() => { setSelectedFabric('bogolan'); setActiveTab('shop'); }} className="hover:text-gold block transition-all cursor-pointer">Bogolan Bambara</button></li>
              <li><button onClick={() => setActiveTab('blog')} className="hover:text-gold block transition-all cursor-pointer">Magazine / Blog</button></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-serif text-amber-500">Contact & Atelier</h4>
            <ul className="space-y-2.5 text-[11px] text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="text-gold shrink-0">📍</span>
                <span className="text-left">Quartier Oulfa, Casablanca 20250, Maroc</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold shrink-0">📞</span>
                <a href="tel:+212688789184" className="hover:text-gold font-mono">+2126 8878 9184</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold shrink-0">✉️</span>
                <a href="mailto:baldecherifnianao01@gmail.com" className="hover:text-gold font-mono truncate max-w-[190px]">balde@gmail.com</a>
              </li>
              <li className="pt-1.5 border-t border-zinc-900/60 flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Atelier ouvert : Lun - Sam</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal micro copyright notice */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-zinc-650 text-[10px] tracking-wide">
          <span>© 2026 Élégance Africa. Projet d'Excellence Académique de Fin d'Études.</span>
          <span>Casablanca — Dakar — Bamako | Réalisé par Balde Chérif Nianao</span>
        </div>
      </footer>

      {/* ================= PRODUCT LIGHTBOX DETAILS DRAWER ================= */}
      {selectedProduct && (
        <ProductDetails 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

    </div>
  );
}
