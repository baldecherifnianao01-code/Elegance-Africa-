import React from 'react';
import { ArrowRight, Star, ShieldCheck, Sparkles, Award } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onDiscoverClick: () => void;
  onAdvisorClick: () => void;
}

export default function Hero({ onDiscoverClick, onAdvisorClick }: HeroProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  
  const campaignSlides = [
    {
      image: "/src/assets/images/elegance_banner_2_1781364238702.jpg",
      quote: "« L'authenticité des matières et l'ajustement sur-mesure d'un raffinement rare. »",
      author: "Cherif B., Casablanca"
    },
    {
      image: "/src/assets/images/elegance_banner_1_1781364218592.jpg",
      quote: "« Une fierté d'exhiber nos origines avec tant de minutie et d'élégance contemporaine. »",
      author: "Fatoumata B., Casablanca"
    },
    {
      image: "/src/assets/images/elegance_black_gold_1781364251280.jpg",
      quote: "« Le mariage somptueux de l'or et du noir de jais, l'allure d'une dynastie éternelle. »",
      author: "Aïssatou S., Paris"
    },
    {
      image: "/src/assets/images/elegance_white_prestige_1781364265136.jpg",
      quote: "« La pureté du blanc ciselé d'or fin. Une prestance majestueuse, résolument moderne. »",
      author: "Malick D., Bamako"
    }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % campaignSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [campaignSlides.length]);

  return (
    <div className="relative bg-zinc-950 overflow-hidden py-16 lg:py-24 border-b border-gold/10" id="hero-section">
      
      {/* Absolute cultural backdrop patterns and ambient glows */}
      <div className="absolute inset-0 subtle-african-grid opacity-30"></div>
      <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-gold/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-yellow-600/5 blur-3xl pointer-events-none"></div>
      
      {/* Accent corner brand borders reflecting prestige African geometry */}
      <div className="hidden lg:block absolute top-[5%] left-[3%] w-24 h-24 border-t-2 border-l-2 border-gold/20"></div>
      <div className="hidden lg:block absolute bottom-[5%] right-[3%] w-24 h-24 border-b-2 border-r-2 border-gold/20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Slogan, dynamic statements & CTAs */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 border border-gold/25 rounded-full text-xs font-semibold text-gold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow text-gold" />
              <span>Collection Panafricaine Prestige 2026</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-tight">
              L'élégance africaine <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-500 to-amber-600 font-normal italic">
                au service du monde.
              </span>
            </h1>
            
            <p className="text-zinc-300 text-base sm:text-lg max-w-xl font-light leading-relaxed">
              Élégance Africa célèbre le mariage d’un artisanat ancestral préservé et de coupes contemporaines haut de gamme. Chaque vêtement raconte une histoire de royauté, de couleur et de dignité culturelle.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={onDiscoverClick}
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-gold to-yellow-600 hover:from-gold-dark hover:to-gold text-zinc-950 text-sm font-bold uppercase tracking-wider rounded-lg shadow-lg hover:shadow-gold/20 transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                id="hero-cta-discover"
              >
                <span>Découvrir la collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={onAdvisorClick}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-zinc-900 hover:bg-zinc-850 border border-gold/30 hover:border-gold text-gold text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-gold animate-bounce" />
                <span>Conseiller Style IA</span>
              </button>
            </div>

            {/* Unique features flags */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-zinc-900">
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-white leading-none">100%</span>
                <span className="text-xs text-zinc-400 mt-1">Artisanal & Éthique</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-gold leading-none">Prestige</span>
                <span className="text-xs text-zinc-400 mt-1">Tissus Certifiés</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-white leading-none">Dakar</span>
                <span className="text-xs text-zinc-400 mt-1">Atelier Création</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Premium modeling mockup frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative justify-self-center lg:justify-self-end w-full max-w-md"
          >
            {/* Visual border box */}
            <div className="absolute -inset-1 bg-gradient-to-r from-gold/30 to-amber-600/30 rounded-2xl blur opacity-30"></div>
            
            <div className="relative bg-zinc-900 border border-gold/20 rounded-2xl overflow-hidden shadow-2xl">
              {/* Premium Background African weave texture overlay */}
              <div className="absolute top-0 right-0 h-16 w-16 african-wave-pattern opacity-15 transform translate-x-4 -translate-y-4 rounded-full"></div>
              
              <img 
                src={campaignSlides[currentSlide].image} 
                alt="Modèle Élégance Africa" 
                className="w-full h-[32rem] object-cover object-top hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Slider indicators navigation overlays */}
              <div className="absolute top-4 left-4 z-20 flex gap-1.5 bg-zinc-950/70 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-gold/20">
                {campaignSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-gold scale-125 font-bold' : 'bg-zinc-500/60 hover:bg-zinc-300'}`}
                    aria-label={`Aller au slide ${idx + 1}`}
                  />
                ))}
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-transparent">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="flex text-gold">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-zinc-400 font-medium">(130+ Avis)</span>
                </div>
                
                <p className="text-[13px] font-serif text-white font-semibold min-h-[48px] flex items-center transition-all duration-300">
                  {campaignSlides[currentSlide].quote}
                </p>
                <div className="mt-2 flex justify-between items-center border-t border-zinc-900 pt-2">
                  <span className="text-xs text-gold uppercase tracking-widest font-semibold">— {campaignSlides[currentSlide].author}</span>
                  <div className="flex items-center gap-1 text-[11px] text-zinc-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                    <span>Achat Certifié</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cultural Floating Badge */}
            <div className="absolute -bottom-4 -left-4 bg-zinc-950 border border-gold/30 p-4 rounded-xl shadow-xl flex items-center gap-3 max-w-[200px] z-20">
              <div className="p-2 bg-gradient-to-br from-gold to-yellow-600 rounded-lg text-zinc-950">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase">Savoir-Faire</h4>
                <p className="text-[10px] text-zinc-400">Tissage Kente et Bogolan fait main</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
