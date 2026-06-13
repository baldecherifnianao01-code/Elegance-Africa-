import React, { useState } from 'react';
import { LayoutDashboard, ShoppingBag, Users, Layers, AlertCircle, Plus, Trash2, Edit2, CheckCircle2 } from 'lucide-react';
import { Product, Order } from '../types';

interface AdminDashboardProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

export default function AdminDashboard({ products, setProducts, orders, setOrders }: AdminDashboardProps) {
  // Stats counter
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState<'hommes' | 'femmes' | 'enfants' | 'accessoires'>('femmes');
  const [newProductFabric, setNewProductFabric] = useState<'wax' | 'kente' | 'bogolan' | 'ndop' | 'dashiki' | 'autre'>('wax');
  const [newProductPrice, setNewProductPrice] = useState(120);
  const [newProductStock, setNewProductStock] = useState(10);
  const [newProductDesc, setNewProductDesc] = useState('');

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim()) return;

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name: newProductName,
      description: newProductDesc || 'Nouveau vêtement de création africaine haut de gamme.',
      price: Number(newProductPrice),
      category: newProductCategory,
      images: ['/src/assets/images/elegance_banner_1_1781364218592.jpg'], // Fallback custom photoshoot banner
      fabric: newProductFabric,
      stock: Number(newProductStock),
      sizes: ['S', 'M', 'L', 'XL'],
      features: ['Pur coton supérieur', 'Entretien facile', 'Tissé main tradition']
    };

    setProducts(prev => [newProd, ...prev]);
    // Reset form fields
    setNewProductName('');
    setNewProductDesc('');
    setNewProductPrice(120);
    setNewProductStock(10);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleUpdateOrderStatus = (orderId: string, nextStatus: 'Payé' | 'Expédié' | 'Livré') => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: nextStatus } : o));
  };

  // Compute metric numbers
  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const totalItemsSold = orders.reduce((acc, o) => acc + o.items.reduce((sum, item) => sum + item.quantity, 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8" id="admin-dashboard-panel">
      
      {/* Decorative Title Block */}
      <div className="text-left py-4 border-b border-rose-950/40">
        <div className="text-xs text-rose-450 uppercase tracking-widest font-black flex items-center gap-1">
          <LayoutDashboard className="w-4 h-4 text-rose-500 animate-pulse" />
          <span>Tableau de Bord Administrateur (Simulation Académique)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif text-white font-bold">
          Console de Gestion Élégance Africa
        </h2>
        <p className="text-zinc-400 text-sm">
          Simulez la réception des transactions clients, gérez le stock d'articles et analysez les chiffres clés de votre projet scolaire.
        </p>
      </div>

      {/* Grid of Key Info Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5 bg-zinc-950 border border-zinc-850 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-gold/10 rounded-lg text-gold">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider block">Chiffre d'Affaires</span>
            <span className="text-xl font-bold font-serif text-white">{totalRevenue} €</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-5 bg-zinc-950 border border-zinc-850 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-amber-600/10 rounded-lg text-amber-500">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider block">Articles Vendus</span>
            <span className="text-xl font-bold font-mono text-white">{totalItemsSold} pièces</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-5 bg-zinc-950 border border-zinc-850 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-rose-600/10 rounded-lg text-rose-400">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider block">Total Commandes</span>
            <span className="text-xl font-bold font-mono text-white">{orders.length} transactions</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-5 bg-zinc-950 border border-zinc-850 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-teal-650/10 rounded-lg text-teal-400">
            <Users className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider block">Total Catalogue</span>
            <span className="text-xl font-bold font-serif text-white">{products.length} articles</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left column (Form Add Cloth) */}
        <div className="space-y-6 lg:col-span-1">
          <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-850 text-left space-y-4">
            <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-zinc-800 pb-2">
              <Plus className="w-4.5 h-4.5 text-gold" />
              <span>Nouveau Produit</span>
            </h3>

            <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
              {/* Product name */}
              <div className="space-y-1.5">
                <label className="text-zinc-400 font-bold uppercase tracking-wider">Nom du vêtement</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Robe Courte Bogolan Luxury"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-gold/40 rounded-lg p-2.5 outline-none text-zinc-100"
                />
              </div>

              {/* Price & stock */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-zinc-400 font-bold uppercase tracking-wider">Prix (€)</label>
                  <input
                    type="number"
                    required
                    value={newProductPrice}
                    onChange={(e) => setNewProductPrice(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-gold/40 rounded-lg p-2.5 outline-none text-zinc-100 font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-zinc-400 font-bold uppercase tracking-wider">Stock initial</label>
                  <input
                    type="number"
                    required
                    value={newProductStock}
                    onChange={(e) => setNewProductStock(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-gold/40 rounded-lg p-2.5 outline-none text-zinc-100 font-mono"
                  />
                </div>
              </div>

              {/* Category & fabric */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-zinc-400 font-bold uppercase tracking-wider">Catégorie</label>
                  <select
                    value={newProductCategory}
                    onChange={(e) => setNewProductCategory(e.target.value as any)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-gold/40 rounded-lg p-2.5 outline-none text-zinc-200"
                  >
                    <option value="hommes">Hommes</option>
                    <option value="femmes">Femmes</option>
                    <option value="enfants">Enfants</option>
                    <option value="accessoires">Accessoires</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-zinc-400 font-bold uppercase tracking-wider">Tissu principal</label>
                  <select
                    value={newProductFabric}
                    onChange={(e) => setNewProductFabric(e.target.value as any)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-gold/40 rounded-lg p-2.5 outline-none text-zinc-200"
                  >
                    <option value="wax">Wax</option>
                    <option value="kente">Kente</option>
                    <option value="bogolan">Bogolan</option>
                    <option value="ndop">Ndop</option>
                    <option value="dashiki">Dashiki</option>
                    <option value="autre">Bazin/Autre</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-zinc-400 font-bold uppercase tracking-wider">Description textuelle</label>
                <textarea
                  placeholder="Décrivez l'origine et les coupes de la création ..."
                  value={newProductDesc}
                  onChange={(e) => setNewProductDesc(e.target.value)}
                  rows={3}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-gold/40 rounded-lg p-2.5 outline-none text-zinc-100"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-gold to-yellow-600 hover:from-gold-dark hover:to-gold text-zinc-950 font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer"
              >
                Ajouter au catalogue
              </button>
            </form>
          </div>
        </div>

        {/* Right columns (Orders lists & Stock list) */}
        <div className="space-y-6 lg:col-span-2">
          
          {/* Order management table list */}
          <div className="bg-zinc-950 border border-zinc-850 p-6 rounded-xl text-left space-y-4">
            <h3 className="text-base font-bold text-white uppercase tracking-wider border-b border-zinc-850 pb-2">
              Suivi des Commandes Simulation ({orders.length})
            </h3>
            
            {orders.length === 0 ? (
              <p className="text-zinc-500 text-xs italic">Aucune commande n'a encore été enregistrée dans ce navigateur.</p>
            ) : (
              <div className="divide-y divide-zinc-900 space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="pt-3 text-[11px] text-zinc-350 space-y-2">
                    <div className="flex justify-between items-center bg-zinc-900/50 p-2 rounded">
                      <span className="font-mono text-white font-bold">{order.id}</span>
                      <span className="text-zinc-400">Par {order.customerName} ({order.customerEmail})</span>
                      <span className="font-bold text-gold">{order.totalAmount} €</span>
                    </div>

                    <div className="pl-2 space-y-1">
                      <p><strong>Adresse :</strong> {order.address} | <strong>Tél:</strong> {order.phone}</p>
                      <p><strong>Moyen :</strong> {order.paymentMethod} | <strong>Statut :</strong> <span className={`px-1.5 py-0.5 rounded font-bold uppercase text-[9px] ${
                        order.status === 'Payé' ? 'bg-green-500/10 text-green-400' :
                        order.status === 'Expédié' ? 'bg-blue-500/10 text-blue-400' : 'bg-yellow-500/10 text-yellow-500'
                      }`}>{order.status}</span></p>
                      <p><strong>Articles :</strong> {order.items.map(i => `${i.productName} (x${i.quantity}) [${i.selectedSize}]`).join(', ')}</p>
                    </div>

                    {/* Status operators buttons */}
                    <div className="flex gap-2">
                      {order.status === 'En attente' && (
                        <button
                          onClick={() => handleUpdateOrderStatus(order.id, 'Payé')}
                          className="px-2.5 py-1 bg-green-950 text-green-400 hover:bg-green-900 rounded font-bold"
                        >
                          Valider paiement
                        </button>
                      )}
                      {order.status === 'Payé' && (
                        <button
                          onClick={() => handleUpdateOrderStatus(order.id, 'Expédié')}
                          className="px-2.5 py-1 bg-blue-950 text-blue-400 hover:bg-blue-900 rounded font-bold"
                        >
                          Marquer Expédié
                        </button>
                      )}
                      {order.status === 'Expédié' && (
                        <button
                          onClick={() => handleUpdateOrderStatus(order.id, 'Livré')}
                          className="px-2.5 py-1 bg-amber-950 text-amber-500 hover:bg-amber-900 rounded font-bold"
                        >
                          Marquer Livré
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Manage Catalog Stocks list */}
          <div className="bg-zinc-950 border border-zinc-850 p-6 rounded-xl text-left space-y-4">
            <h3 className="text-base font-bold text-white uppercase tracking-wider border-b border-zinc-850 pb-2 flex justify-between items-center">
              <span>Inventaire du catalogue ({products.length} articles)</span>
              <span className="text-[10px] text-zinc-500">Mise à jour directe du site</span>
            </h3>

            <div className="max-h-72 overflow-y-auto space-y-2.5">
              {products.map((p) => (
                <div key={p.id} className="flex justify-between items-center p-3 bg-zinc-900/60 hover:bg-zinc-900 rounded-lg border border-zinc-850 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={p.images[0]} alt={p.name} className="w-10 h-10 object-cover rounded" />
                    <div>
                      <h4 className="font-bold text-white">{p.name}</h4>
                      <p className="text-[10px] text-zinc-400 uppercase">Tissu: {p.fabric} | Cat : {p.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="block text-gold font-bold">{p.price} €</span>
                      <span className={`text-[10px] font-bold ${p.stock <= 3 ? 'text-red-400' : 'text-zinc-500'}`}>Stock: {p.stock}</span>
                    </div>

                    <button
                      onClick={() => handleDeleteProduct(p.id)}
                      className="p-1.5 text-rose-450 hover:bg-rose-950/40 rounded transition-all"
                      title="Supprimer d'Élégance Africa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
