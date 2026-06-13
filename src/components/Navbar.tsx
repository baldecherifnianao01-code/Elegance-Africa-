import React, { useState } from 'react';
import { ShoppingBag, Sparkles, BookOpen, Database, LayoutDashboard, User, Menu, X, Phone, MapPin } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cart: CartItem[];
  setIsAuthModalOpen: (open: boolean) => void;
  currentUser: { name: string; role: 'admin' | 'user' } | null;
  setCurrentUser: (user: any | null) => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  cart,
  setIsAuthModalOpen,
  currentUser,
  setCurrentUser
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { id: 'home', label: 'Accueil' },
    { id: 'shop', label: 'Boutique' },
    { id: 'testimonials', label: 'Avis' },
    { id: 'location', label: 'Adresse' },
    { id: 'newsletter', label: 'Newsletter' },
    { id: 'blog', label: 'Blog' },
    { id: 'about', label: 'À Propos' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleTabChange = (tabId: string) => {
    setIsMobileMenuOpen(false);

    const anchorMap: { [key: string]: string } = {
      testimonials: 'testimonials-section',
      location: 'google-maps-location',
      newsletter: 'newsletter-and-live-activity'
    };

    if (anchorMap[tabId]) {
      const targetId = anchorMap[tabId];
      if (activeTab !== 'home') {
        setActiveTab('home');
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      setActiveTab(tabId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isLinkActive = (linkId: string) => {
    if (['testimonials', 'location', 'newsletter'].includes(linkId)) {
      return false; // represent sub-sections of Accueil, keep them in normal state
    }
    return activeTab === linkId;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0F0F0F]/90 backdrop-blur-md border-b border-[#D4AF37]/20 shadow-lg" id="elegance-header">
      {/* Top micro bar for branding/announcements */}
      <div className="bg-gold px-4 py-1.5 text-center text-xs font-medium text-zinc-950 flex justify-between items-center max-w-7xl mx-auto rounded-b-md">
        <div className="hidden sm:flex items-center gap-4 text-[11px] tracking-wide">
          <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +212688789184</span>
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Casablanca, Maroc</span>
        </div>
        <span className="mx-auto uppercase font-bold tracking-widest text-[10px] sm:text-xs">
          Projet de Fin d'Études • Mention Excellence • Élégance Africa
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Brand Logo with luxurious typography styling */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none" 
            onClick={() => handleTabChange('home')}
            id="nav-logo"
          >
            {/* Elegant Shield/Crown Design Icon Representing Traditional African Patterns */}
            <div className="w-11 h-11 bg-gradient-to-br from-gold to-yellow-600 rounded-lg flex items-center justify-center shadow-md border border-gold-light/20 relative overflow-hidden">
              <div className="absolute inset-0 african-wave-pattern opacity-10"></div>
              <span className="text-zinc-950 font-serif text-2xl font-black tracking-tighter">É</span>
            </div>
            <div>
              <h1 className="text-xl font-serif text-white tracking-widest font-black leading-none uppercase">
                Élégance <span className="text-gold font-normal">Africa</span>
              </h1>
              <p className="text-[9px] font-sans tracking-[0.2em] text-zinc-400 uppercase font-light">
                Haute Couture & Héritage
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleTabChange(link.id)}
                className={`text-sm font-medium tracking-wide uppercase transition-all duration-300 relative py-2 ${
                  isLinkActive(link.id)
                    ? 'text-gold'
                    : 'text-zinc-300 hover:text-white'
                }`}
              >
                {link.label}
                {isLinkActive(link.id) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold to-yellow-600 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Special Buttons (AI Advisor, Academic Deliverables, Cart, Admin Dashboard) */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* AI Advisor Trigger Button */}
            <button
              onClick={() => handleTabChange('ai-advisor')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 border ${
                activeTab === 'ai-advisor'
                  ? 'bg-gold text-zinc-950 border-gold shadow-md shadow-gold/20'
                  : 'bg-zinc-900 text-gold border-gold/30 hover:bg-gold/10'
              }`}
            >
              <Sparkles className="w-4.5 h-4.5 animate-pulse" />
              <span>Conseils IA</span>
            </button>

            {/* Academic deliverables button */}
            <button
              onClick={() => handleTabChange('academic')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeTab === 'academic'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-zinc-900 text-amber-500 hover:bg-zinc-850 border border-zinc-800'
              }`}
              title="Livrables académiques: Diagrammes UML, Base de Données, Rapport"
            >
              <Database className="w-4 h-4 text-amber-500" />
              <span>Livrables PFE</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => handleTabChange('cart')}
              className="relative p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-gold/30 text-zinc-300 hover:text-gold transition-all duration-350"
              id="cart-trigger"
            >
              <ShoppingBag className="w-5.5 h-5.5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gold text-zinc-950 font-bold text-[10px] w-5 h-5 flex items-center justify-center rounded-full border border-zinc-950 shadow-md">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Admin or Auth Button */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                {currentUser.role === 'admin' ? (
                  <button
                    onClick={() => handleTabChange('admin')}
                    className={`flex items-center gap-1.5 px-3 py-2 bg-rose-950/40 text-rose-400 border border-rose-900/50 hover:bg-rose-900/30 rounded-lg text-xs font-medium transition-all ${
                      activeTab === 'admin' ? 'ring-2 ring-rose-500' : ''
                    }`}
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>Admin</span>
                  </button>
                ) : (
                  <span className="text-xs text-zinc-400 bg-zinc-900 px-2 py-1 rounded">
                    Client
                  </span>
                )}
                <button
                  onClick={() => {
                    setCurrentUser(null);
                    handleTabChange('home');
                  }}
                  className="text-xs text-zinc-500 hover:text-white transition-all underline"
                >
                  Déco.
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 bg-zinc-900 border border-zinc-850 hover:border-zinc-700 hover:bg-zinc-850 rounded-lg text-xs font-medium text-zinc-300 transition-all cursor-pointer"
              >
                <User className="w-4 h-4 text-gold" />
                <span>Connexion</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => handleTabChange('cart')}
              className="relative p-2 bg-zinc-900 border border-zinc-850 rounded-lg text-zinc-300"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-zinc-950 text-[9px] w-4.5 h-4.5 flex items-center justify-center rounded-full font-bold">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 bg-zinc-900 border border-zinc-850 rounded-lg text-zinc-350 hover:text-gold transition-all"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950 border-t border-gold/10 px-4 py-6 space-y-4 animate-fadeIn">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleTabChange(link.id)}
                className={`text-left text-base font-medium tracking-wider uppercase py-2 ${
                  isLinkActive(link.id) ? 'text-gold pl-2 border-l-2 border-gold' : 'text-zinc-300'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="h-px bg-zinc-900 my-2"></div>
            
            {/* Special Actions in Mobile menu */}
            <button
              onClick={() => handleTabChange('ai-advisor')}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                activeTab === 'ai-advisor'
                  ? 'bg-gold text-zinc-950'
                  : 'bg-zinc-900 text-gold border border-gold/30'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Conseils IA</span>
            </button>

            <button
              onClick={() => handleTabChange('academic')}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                activeTab === 'academic'
                  ? 'bg-amber-600 text-white'
                  : 'bg-zinc-900 text-amber-500 border border-zinc-800'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Livrables Académiques</span>
            </button>

            {currentUser && currentUser.role === 'admin' && (
              <button
                onClick={() => handleTabChange('admin')}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-rose-950 text-rose-400 rounded-lg text-xs font-bold uppercase"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Espace Administration</span>
              </button>
            )}

            {!currentUser ? (
              <button
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-medium text-zinc-300"
              >
                <User className="w-4 h-4 text-gold" />
                <span>Connexion utilisateur</span>
              </button>
            ) : (
              <div className="flex justify-between items-center bg-zinc-900 px-4 py-3 rounded-lg">
                <span className="text-xs text-zinc-400">Rôle: {currentUser.role === 'admin' ? 'Admin' : 'Client'}</span>
                <button
                  onClick={() => {
                    setCurrentUser(null);
                    handleTabChange('home');
                  }}
                  className="text-xs text-rose-400 underline font-medium"
                >
                  Déconnexion ({currentUser.name})
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
