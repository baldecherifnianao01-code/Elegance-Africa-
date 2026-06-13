import React, { useState } from 'react';
import { X, ShoppingBag, Check, Shield, Truck, RotateCcw, Award } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, selectedSize: string) => void;
}

export default function ProductDetails({ product, onClose, onAddToCart }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  // Map fabric labels to nice descriptions
  const getFabricName = (fabric: string) => {
    switch (fabric) {
      case 'wax': return 'Imprimé Wax Hollandais Premium';
      case 'kente': return 'Kenté Royal Tissé Main';
      case 'bogolan': return 'Bogolan Traditionnel à l\'Argile';
      case 'ndop': return 'Ndop des Chefferies Bamiléké';
      case 'dashiki': return 'Garde-Robe Dashiki Ornementé';
      default: return 'Bazin Riche Brodé Traditionnel';
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedSize);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        
        {/* Dark background overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-zinc-950/80 backdrop-blur-sm" 
          aria-hidden="true"
          onClick={onClose}
        ></div>

        {/* Center alignment spacer */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-zinc-900 border border-gold/20 rounded-2xl shadow-2xl sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white bg-zinc-950/50 rounded-full border border-zinc-800 hover:border-gold/30 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Left Column: Premium image display */}
            <div className="relative h-96 md:h-full min-h-[400px]">
              <img
                src={product.images[0]}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-black/30"></div>
              
              {/* Product Badges */}
              <div className="absolute bottom-4 left-4 space-y-2">
                <span className="inline-block px-3 py-1 bg-zinc-950/80 backdrop-blur border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest rounded-full">
                  {getFabricName(product.fabric)}
                </span>
                {product.stock <= 4 && (
                  <span className="block text-red-400 text-xs font-semibold bg-red-950/80 backdrop-blur border border-red-900 px-3 py-1 rounded-full w-max">
                    Stock Limité : Seulement {product.stock} restants
                  </span>
                )}
              </div>
            </div>

            {/* Right Column: Detailed info & operations */}
            <div className="p-6 sm:p-8 space-y-6 flex flex-col justify-between">
              <div>
                <span className="text-xs text-gold uppercase tracking-widest font-black">
                  Collection {product.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-white font-bold mt-1 tracking-tight">
                  {product.name}
                </h2>
                
                <div className="flex items-baseline gap-3 mt-2">
                  <span className="text-3xl font-bold text-gold font-serif">{product.price} €</span>
                  <span className="text-xs text-zinc-400">Simulation académique de paiement</span>
                </div>

                <div className="h-px bg-zinc-800 my-4"></div>

                <p className="text-zinc-300 text-sm leading-relaxed">
                  {product.description}
                </p>

                {/* Cultural Heritage detail box */}
                <div className="mt-4 p-3 bg-zinc-950 rounded-lg border border-gold/10 flex gap-2.5 items-start">
                  <Award className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Héritage Artisanal</h4>
                    <p className="text-[11px] text-zinc-400">
                      Ce produit soutient le commerce équitable de nos artisans à Dakar, Bamako et Kumasi. Teinture écologique longue tenue.
                    </p>
                  </div>
                </div>

                {/* Size Selection */}
                {product.sizes.length > 0 && (
                  <div className="mt-6 flex flex-col gap-2">
                    <span className="text-xs text-zinc-400 uppercase tracking-widest font-bold">
                      Sélectionnez la taille :
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 text-xs font-bold rounded border uppercase transition-all duration-300 ${
                            selectedSize === size
                              ? 'bg-gold border-gold text-zinc-950 shadow shadow-gold/20'
                              : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-gold/50'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features Checklist */}
                <div className="mt-6 space-y-2">
                  <span className="text-xs text-zinc-400 uppercase tracking-widest font-bold block">
                    Caractéristiques du produit :
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-zinc-300">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Purchase form bottom */}
              <div className="mt-6 pt-6 border-t border-zinc-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center bg-zinc-950 rounded-lg border border-zinc-800">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-zinc-400 hover:text-white"
                    >
                      -
                    </button>
                    <span className="px-4 text-sm font-bold text-white">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-3 py-1.5 text-zinc-400 hover:text-white"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-zinc-400">En stock : {product.stock} pièces</span>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={handleAddToCart}
                    disabled={isAdded || product.stock === 0}
                    className={`w-full py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 ${
                      product.stock === 0
                        ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                        : isAdded
                        ? 'bg-green-600 text-white'
                        : 'bg-gradient-to-r from-gold to-yellow-600 hover:from-gold-dark hover:to-gold text-zinc-950 shadow-md cursor-pointer'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 animate-bounce" />
                        <span>Ajouté au panier !</span>
                      </>
                    ) : product.stock === 0 ? (
                      <span>Rupture de stock</span>
                    ) : (
                      <>
                        <ShoppingBag className="w-4.5 h-4.5" />
                        <span>Ajouter au sac d'achat</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Commitments icons */}
                <div className="grid grid-cols-3 gap-2 text-[10px] text-zinc-400 pt-2 text-center border-t border-zinc-900">
                  <div className="flex flex-col items-center gap-1">
                    <Shield className="w-4.5 h-4.5 text-gold" />
                    <span>Laval sécurisé</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Truck className="w-4.5 h-4.5 text-gold" />
                    <span>Livraison Suivie</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <RotateCcw className="w-4.5 h-4.5 text-gold" />
                    <span>Retours facilités</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
