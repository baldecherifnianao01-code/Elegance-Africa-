import React from 'react';
import { Target, Heart, Eye, Award, Sparkles, Sprout } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutView() {
  const values = [
    {
      icon: <Award className="w-6 h-6 text-gold" />,
      title: "Excellence du Savoir-Faire",
      description: "Chaque fil de Kenté ou trait de Bogolan est tissé et peint à la main par des artisans certifiés qui transmettent leur art de génération en génération."
    },
    {
      icon: <Heart className="w-6 h-6 text-gold" />,
      title: "Rémunération Équitable",
      description: "Nous soutenons directement les coopératives locales de Dakar, Bamako et Kumasi en reversant des commissions décentes qui renforcent l'économie des familles."
    },
    {
      icon: <Sprout className="w-6 h-6 text-gold" />,
      title: "Transition Éco-Responsable",
      description: "Nous favorisons l'usage de fibres naturelles biodégradables de coton biologique, d'argile naturelle et de décoctions végétales non polluantes."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-16" id="about-us-section">
      
      {/* Editorial Slogan Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <span className="text-xs text-gold uppercase tracking-widest font-black block">Notre Héritage</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold tracking-tight">
            Valoriser l'artisanat d'art africain d'hier à aujourd'hui.
          </h2>
          <p className="text-zinc-300 text-sm leading-relaxed">
            Élégance Africa est né d'une passion commune : celle de donner à la couture africaine la visibilité internationale qu'elle mérite. Trop souvent relégués au rang de simples souvenirs touristiques, les tissus comme le <strong>Bogolan Malien</strong>, le <strong>Kente Ghanéen</strong> et le prestigieux <strong>Bazin</strong> sont pourtant de véritables chef-d'œuvres techniques et artistiques.
          </p>
          <p className="text-zinc-400 text-sm leading-relaxed">
            À travers notre boutique e-commerce et ce projet d'études, nous voulons bâtir un pont culturel. Nous combinons des silhouettes modernes et ajustées pour l'homme et la femme urbaine moderne, avec des textiles d'exception ornés de motifs géométriques millénaires porteurs de sens.
          </p>
        </motion.div>

        {/* Big Illustration Panel representing custom modern traditional attire */}
        <div className="relative rounded-2xl overflow-hidden border border-gold/15 shadow-2xl h-96">
          <div className="absolute inset-0 bg-gold/10 mix-blend-color animate-pulse pointer-events-none"></div>
          <img 
            src="/src/assets/images/elegance_banner_1_1781364218592.jpg" 
            alt="Atelier Élégance Africa" 
            className="w-full h-full object-cover object-top hover:scale-103 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent flex items-end p-6">
            <div className="bg-zinc-950/80 backdrop-blur border border-gold/20 p-4 rounded-xl text-left">
              <span className="text-[10px] text-gold uppercase font-bold tracking-widest">Coopérative partenaire</span>
              <p className="text-sm font-serif text-white font-semibold mt-0.5">« Préserver chaque geste pour préserver l'identité. »</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Mission, Vision, Objectives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        {/* Mission */}
        <div className="p-6 bg-zinc-950 border border-zinc-850 rounded-xl space-y-3">
          <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
            <Target className="w-5.5 h-5.5" />
          </div>
          <h3 className="text-base font-serif text-white font-bold uppercase tracking-wide">Notre Mission Éthique</h3>
          <p className="text-sm text-zinc-350 leading-relaxed">
            Promouvoir activement l'excellence créative africaine tout en luttant contre la précarité des travailleurs du textile. En limitant les intermédiaires, nous developpons un canal transparent et rémunérateur pour les créateurs.
          </p>
        </div>

        {/* Vision */}
        <div className="p-6 bg-zinc-950 border border-zinc-850 rounded-xl space-y-3">
          <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
            <Eye className="w-5.5 h-5.5" />
          </div>
          <h3 className="text-base font-serif text-white font-bold uppercase tracking-wide">Notre Vision Internationale</h3>
          <p className="text-sm text-zinc-350 leading-relaxed">
            Faire du vêtement africain un choix incontournable de la haute couture quotidienne de luxe. Porter un costume en Wax ou un manteau Bogolan ne doit plus être limité aux cérémonies d'été, mais s'imposer mondialement.
          </p>
        </div>
      </div>

      {/* Corporate Values */}
      <div className="space-y-8">
        <div className="text-center space-y-1">
          <span className="text-xs text-gold uppercase tracking-widest font-black">Fondements</span>
          <h3 className="text-2xl font-serif text-white font-bold">Nos 3 Engagements Piliers</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {values.map((v, i) => (
            <div key={i} className="p-6 bg-zinc-900 border border-zinc-850 rounded-xl space-y-3 hover:border-gold/20 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gold/5 flex items-center justify-center border border-gold/15">
                {v.icon}
              </div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">{v.title}</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quote banner */}
      <div className="p-8 rounded-2xl bg-zinc-950 border border-gold/15 text-center space-y-4 relative overflow-hidden max-w-4xl mx-auto">
        <div className="absolute inset-0 african-wave-pattern opacity-5"></div>
        <div className="relative z-10">
          <p className="text-lg font-serif italic text-white md:px-12">
            « La mode passe, l'élégance de notre héritage demeure immortelle. L'Afrique insuffle sa couleur et sa force spirituelle aux silhouettes urbaines du monde entier. »
          </p>
          <div className="mt-4 flex justify-center items-center gap-2">
            <span className="h-px w-6 bg-gold"></span>
            <span className="text-xs uppercase text-gold tracking-widest font-bold">Comité Artistique, Élégance Africa</span>
            <span className="h-px w-6 bg-gold"></span>
          </div>
        </div>
      </div>

    </div>
  );
}
