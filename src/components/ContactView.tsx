import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Heart, Star, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function ContactView() {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;

    // Simulate sending form content safely and show dynamic feedback
    setShowSuccess(true);
    setFormName('');
    setFormEmail('');
    setFormMessage('');

    setTimeout(() => {
      setShowSuccess(false);
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 animate-fadeIn" id="contact-panel">
      
      {/* Decorative Title Block */}
      <div className="text-center space-y-1">
        <span className="text-xs text-gold uppercase tracking-widest font-black block">Écrivez-nous</span>
        <h2 className="text-3xl font-serif text-white font-bold tracking-tight">
          Entrons en Contact
        </h2>
        <p className="text-zinc-450 text-sm max-w-md mx-auto font-light">
          Pour une commande de haute couture sur-mesure, des questions sur nos collections ou un partenariat académique.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
        
        {/* Left column (Form) */}
        <div className="bg-zinc-900 border border-zinc-850 p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col justify-between text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 h-24 w-24 african-wave-pattern opacity-5 rounded-full pointer-events-none"></div>

          <div className="space-y-6">
            <h3 className="text-lg font-serif text-white font-bold border-b border-zinc-805 pb-3">
              Envoyer un Message
            </h3>

            {showSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-green-950/40 border border-green-900/60 rounded-xl space-y-3 text-center"
              >
                <CheckCircle className="w-10 h-10 text-green-400 mx-auto animate-bounce" />
                <h4 className="text-sm font-bold text-white uppercase">Message Envoyé avec Succès !</h4>
                <p className="text-xs text-zinc-300 leading-relaxed max-w-sm mx-auto">
                  Merci pour l'intérêt que vous portez à Élégance Africa. Nos maîtres stylistes à Dakar étudieront votre demande et vous répondront sous 24 heures ouvrées.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest block">Nom complet</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Cheikh Tidiane"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-850 focus:border-gold/50 rounded-lg p-3 text-sm text-zinc-100 placeholder-zinc-650 outline-none transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest block">Adresse e-mail</label>
                  <input
                    type="email"
                    required
                    placeholder="Ex: cheikh@gmail.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-850 focus:border-gold/50 rounded-lg p-3 text-sm text-zinc-100 placeholder-zinc-650 outline-none transition-all"
                  />
                </div>

                {/* Message body */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest block">Votre Message</label>
                  <textarea
                    required
                    placeholder="Dites-nous tout sur votre événement ou la création africaine que vous souhaitez commander..."
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    rows={4}
                    className="w-full bg-zinc-950 border border-zinc-850 focus:border-gold/50 rounded-lg p-3 text-sm text-zinc-100 placeholder-zinc-650 outline-none transition-all"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-gold to-yellow-600 hover:from-gold-dark hover:to-gold text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-all duration-300 shadow-md cursor-pointer"
                  id="contact-submit-btn"
                >
                  <Send className="w-4 h-4" />
                  <span>Envoyer ma demande</span>
                </button>
              </form>
            )}
          </div>
          
          <div className="mt-6 pt-5 border-t border-zinc-850/80 text-[11px] text-zinc-500 flex justify-between items-center">
            <span>Données cryptées SSL</span>
            <span className="flex items-center gap-0.5"><Heart className="w-3.5 h-3.5 text-gold" /> Fait avec dévouement</span>
          </div>
        </div>

        {/* Right column (Coordinates & visual map location) */}
        <div className="space-y-6 flex flex-col justify-between text-left">
          
          {/* Coordinates lists card */}
          <div className="p-6 bg-zinc-950 border border-zinc-850 rounded-2xl space-y-5">
            <h3 className="text-base font-serif text-white font-bold uppercase tracking-wider border-b border-zinc-850 pb-2">
              📞 Nos Coordonnées
            </h3>

            <div className="space-y-4">
              {/* Coordinate item 1 - Adresse */}
              <div className="flex gap-3 items-start">
                <div className="p-2.5 bg-zinc-900 border border-zinc-800 text-gold rounded-lg mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-widest">Adresse</h4>
                  <p className="text-xs text-zinc-400 mt-1">
                    Quartier Oulfa, Casablanca 20250, Maroc
                  </p>
                </div>
              </div>

              {/* Coordinate item 2 - Téléphone */}
              <div className="flex gap-3 items-start">
                <div className="p-2.5 bg-zinc-900 border border-zinc-800 text-gold rounded-lg mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-widest">Téléphone</h4>
                  <p className="text-xs text-zinc-400 mt-1">
                    <a href="tel:+212688789184" className="hover:text-gold transition-colors font-mono">
                      +212688789184
                    </a>
                  </p>
                </div>
              </div>

              {/* Coordinate item 3 - Email */}
              <div className="flex gap-3 items-start">
                <div className="p-2.5 bg-zinc-900 border border-zinc-800 text-gold rounded-lg mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-widest">Email</h4>
                  <p className="text-xs text-zinc-400 mt-1 font-mono">
                    <a href="mailto:baldecherifnianao01@gmail.com" className="hover:text-gold transition-colors">
                      baldecherifnianao01@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Coordinate item 4 - WhatsApp */}
              <div className="flex gap-3 items-start">
                <div className="p-2.5 bg-zinc-900 border border-zinc-800 text-gold rounded-lg mt-0.5">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-widest font-serif">WhatsApp</h4>
                  <div className="mt-1">
                    <a 
                      href="https://wa.me/212688789184" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-green-400 hover:text-green-305 font-bold bg-green-950/40 px-3 py-1.5 rounded border border-green-900/40 transition-all hover:bg-green-900/30"
                    >
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      Contactez-nous sur WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-850">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-black block mb-2">Suivez Élégance Africa :</span>
              <div className="flex gap-2">
                {['Instagram', 'WhatsApp', 'Pinterest', 'LinkedIn'].map((app, idx) => {
                  if (app === 'WhatsApp') {
                    return (
                      <a 
                        key={idx} 
                        href="https://wa.me/212688789184"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 hover:border-gold/45 text-xs text-zinc-400 hover:text-white rounded cursor-pointer transition-all"
                      >
                        {app}
                      </a>
                    );
                  }
                  return (
                    <span 
                      key={idx} 
                      className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 hover:border-gold/45 text-xs text-zinc-400 hover:text-white rounded cursor-pointer transition-all"
                    >
                      {app}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Styled Geographic Map Illustration for PFE defense */}
          <div className="relative bg-zinc-900 border border-zinc-850 rounded-2xl p-4 h-64 overflow-hidden shadow-md">
            {/* Visual Grid Lines simulating a map */}
            <div className="absolute inset-0 subtle-african-grid opacity-25"></div>
            
            {/* Morocco stylized contour */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-gold/10 flex items-center justify-center">
              <div className="w-36 h-36 rounded-full border border-gold/20 flex items-center justify-center animate-pulse">
                <div className="w-24 h-24 rounded-full bg-gold/5 flex items-center justify-center"></div>
              </div>
            </div>

            {/* Simulated Casablanca city lines */}
            <div className="absolute bottom-8 left-12 h-0.5 w-40 bg-zinc-800 transform rotate-45 pointer-events-none"></div>
            <div className="absolute bottom-16 left-6 h-0.5 w-32 bg-zinc-800 transform -rotate-12 pointer-events-none"></div>

            {/* Marker Indicator */}
            <div className="absolute top-1/2 left-1/3 p-3 bg-zinc-950 border border-gold rounded-xl shadow-xl z-10 flex items-center gap-2 max-w-[200px]">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-ping shrink-0" />
              <div>
                <h4 className="text-[10px] font-bold text-white uppercase leading-none">Maison Mère</h4>
                <p className="text-[9px] text-zinc-400 mt-1 font-mono">Casablanca, Maroc (HQ)</p>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 text-[9px] font-mono text-zinc-500 bg-zinc-950 px-2 py-1 rounded border border-zinc-850">
              Coordonnées : 33.5731° N, 7.5898° W
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
