import React, { useState } from 'react';
import { BookOpen, Calendar, User, ArrowLeft, ArrowRight, Sparkles, Clock } from 'lucide-react';
import { BLOG_POSTS } from '../data';
import { BlogPost } from '../types';

export default function BlogView() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Parse structured text line-by-line for beautiful Markdown layout
  const parseContentWithLayout = (text: string) => {
    return text.split('\n').map((line, idx) => {
      if (line.startsWith('### ')) {
        return <h4 key={idx} className="text-base font-bold text-gold uppercase mt-6 mb-2 tracking-wide">{line.replace('### ', '')}</h4>;
      }
      if (line.startsWith('## ') || line.startsWith('# ')) {
        return <h3 key={idx} className="text-xl font-serif text-white font-semibold mt-6 mb-3">{line.replace('## ', '').replace('# ', '')}</h3>;
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return (
          <li key={idx} className="list-disc pl-5 my-1.5 text-zinc-350 text-sm leading-relaxed">
            {line.substring(2)}
          </li>
        );
      }
      if (line.trim() === '') return <div key={idx} className="h-2" />;
      return <p key={idx} className="text-zinc-350 text-sm leading-relaxed mb-3.5 text-left">{line}</p>;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 animate-fadeIn" id="blog-panel">
      
      {/* Editorial Titles */}
      <div className="text-center space-y-2">
        <span className="text-xs text-gold uppercase tracking-widest font-black block">Magazine Élégance & Tendances</span>
        <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold tracking-tight">
          Savoir, Histoire et Styles d'Afrique
        </h2>
        <p className="text-zinc-400 text-sm max-w-xl mx-auto">
          Plongez au cœur de l'histoire passionnante de nos textiles et découvrez comment intégrer l'héritage africain dans les tenues quotidiennes.
        </p>
      </div>

      {/* Main Container Toggle (Read Post vs Lists) */}
      {selectedPost ? (
        <div className="max-w-3xl mx-auto space-y-6 text-left">
          
          {/* Back button */}
          <button
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-1.5 text-xs font-bold text-gold uppercase tracking-wider pb-2 border-b border-zinc-800/60 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour aux articles</span>
          </button>

          {/* Hero Article Banner */}
          <div className="relative rounded-2xl overflow-hidden border border-gold/15 h-80 sm:h-96">
            <img 
              src={selectedPost.image} 
              alt={selectedPost.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent"></div>
            
            {/* Category tag */}
            <span className="absolute top-4 left-4 px-3 py-1 bg-gold text-zinc-950 text-xs font-bold uppercase rounded">
              {selectedPost.category}
            </span>

            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-2xl sm:text-3.5xl font-serif text-white font-bold leading-tight">
                {selectedPost.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-300 mt-3 font-medium">
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-gold" /> Par {selectedPost.author}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-gold" /> {selectedPost.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-gold" /> {selectedPost.readingTime} de lecture</span>
              </div>
            </div>
          </div>

          {/* Article Contents */}
          <div className="bg-zinc-900 border border-zinc-850 p-6 sm:p-8 rounded-2xl shadow-xl">
            <div className="prose prose-invert max-w-none">
              {parseContentWithLayout(selectedPost.content)}
            </div>
          </div>

          {/* Bottom Back Button */}
          <button
            onClick={() => setSelectedPost(null)}
            className="w-full py-4.5 bg-zinc-950 hover:bg-zinc-900 border border-gold/20 hover:border-gold rounded-xl text-center text-xs text-gold hover:text-white font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            Retourner au Grand Journal
          </button>

        </div>
      ) : (
        /* GRID OF POST CARDS */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {BLOG_POSTS.map((post) => (
            <article 
              key={post.id}
              className="bg-zinc-900 border border-zinc-850/80 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between hover:border-gold/35 group transition-all duration-300"
            >
              
              {/* Card visual frame */}
              <div className="relative h-52 overflow-hidden bg-zinc-950">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Category Label */}
                <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-zinc-950/85 backdrop-blur border border-gold/30 text-gold text-[10px] font-bold uppercase rounded">
                  {post.category}
                </span>
              </div>

              {/* Card Body content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[10px] text-zinc-500 font-medium">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readingTime}</span>
                  </div>

                  <h3 className="text-base font-serif font-bold text-white group-hover:text-gold transition-colors duration-300 line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  
                  <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-850 flex justify-between items-center text-xs">
                  <span className="text-[11px] text-zinc-400">Écrit par <strong>{post.author}</strong></span>
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="flex items-center gap-0.5 text-gold font-bold uppercase tracking-wider text-[10px] group-hover:gap-1.5 transition-all text-right cursor-pointer"
                  >
                    <span>En savoir plus</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gold" />
                  </button>
                </div>
              </div>

            </article>
          ))}
        </div>
      )}

    </div>
  );
}
