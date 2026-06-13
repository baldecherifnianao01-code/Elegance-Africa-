import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, HelpCircle, ArrowRight, CornerDownLeft, RefreshCcw } from 'lucide-react';
import { motion } from 'motion/react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export default function AIAdvisor() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Bonjour ! Je suis **Élégance Africa Bot**, votre styliste personnel. \n\nJe suis là pour vous conseiller sur les parures, expliquer la signification spirituelle de nos motifs ancestraux, et concevoir un look sur-mesure digne de la haute couture panafricaine.\n\nQuelle est l'occasion ou le tissu que vous souhaitez explorer aujourd'hui ?",
      timestamp: '08:52'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Quick suggestion prompts
  const suggestions = [
    { text: 'Tenue de mariage traditionnel chic', label: 'Mariage' },
    { text: 'Comment insérer le Bogolan dans un look de bureau ?', label: 'Buro-Wax' },
    { text: 'Signification sacrée des motifs du tissu Kenté', label: 'Histoire Kenté' },
    { text: 'Assortir les accessoires Massai aux robes de soirée', label: 'Accessoires' }
  ];

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages.slice(-6) // Send recent context
        })
      });

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: data.text || "Désolé, je ne parviens pas à obtenir de conseils d'experts pour le moment. Veuillez réessayer.",
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg: ChatMessage = {
        id: `msg-${Date.now() + 2}`,
        sender: 'assistant',
        text: "Oups ! Mon carnet de tendances à Dakar a rencontré une perturbation. Permettez-moi de vous suggérer un look classique : un ensemble ajusté en **Wax Hollandais** orné de bijoux dorés fins.",
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        text: "Bonjour ! Je suis **Élégance Africa Bot**, votre styliste personnel. \n\nPrêt pour une nouvelle exploration stylistique ?",
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Safe custom markdown light renderer for elegant display
  const renderStyledText = (text: string) => {
    return text.split('\n').map((line, lineIdx) => {
      let content: React.ReactNode = line;

      // Handle Titles (### or ## or #)
      if (line.startsWith('### ')) {
        return <h4 key={lineIdx} className="text-sm font-bold text-gold uppercase mt-4 mb-2 tracking-wide font-sans">{line.replace('### ', '')}</h4>;
      }
      if (line.startsWith('## ') || line.startsWith('# ')) {
        return <h3 key={lineIdx} className="text-base font-serif text-white font-semibold mt-4 mb-2">{line.replace('## ', '').replace('# ', '')}</h3>;
      }

      // Handle Bullet points
      if (line.startsWith('* ') || line.startsWith('- ')) {
        const itemText = line.substring(2);
        return (
          <div key={lineIdx} className="flex items-start gap-2 pl-3 my-1.5 text-zinc-300">
            <span className="text-gold mt-1 text-xs font-bold">•</span>
            <span className="flex-1">{parseBoldText(itemText)}</span>
          </div>
        );
      }

      // Regular paragraph line with bold parsing
      return <p key={lineIdx} className="text-zinc-300 leading-relaxed text-sm mb-2">{parseBoldText(line)}</p>;
    });
  };

  const parseBoldText = (text: string) => {
    // Basic bold markdown parser: replace **text** with styled strong elements
    const parts = text.split(/\*\*([^*]+)\*\*/g);
    return parts.map((part, idx) => {
      if (idx % 2 === 1) {
        return <strong key={idx} className="text-gold font-bold">{part}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8" id="ai-advisor-panel">
      
      {/* Decorative Title Frame */}
      <div className="text-center mb-8 space-y-2">
        <div className="text-xs text-gold uppercase tracking-widest font-black flex items-center justify-center gap-1">
          <Sparkles className="w-4 h-4 text-gold" />
          <span>Intelligence Artificielle de Stylisme</span>
        </div>
        <h2 className="text-3xl font-serif text-white font-bold tracking-tight">
          Conseiller de Style Élégance Africa
        </h2>
        <p className="text-zinc-400 text-sm max-w-lg mx-auto">
          Posez vos questions sur les associations de tissus, l'histoire des coupes traditionnelles et créez votre garde-robe de rêve.
        </p>
      </div>

      <div className="bg-zinc-900 border border-gold/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[600px] relative">
        <div className="absolute inset-0 subtle-african-grid opacity-15 pointer-events-none"></div>

        {/* Chat Header */}
        <div className="bg-zinc-950 px-6 py-4 border-b border-gold/10 flex justify-between items-center z-10 relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-yellow-600 flex items-center justify-center border border-gold-light/25 shadow">
              <Sparkles className="w-5 h-5 text-zinc-950" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Styliste Virtuel</h3>
              <p className="text-[10px] text-green-400 flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping"></span>
                <span>En direct d'Élégance Africa</span>
              </p>
            </div>
          </div>
          <button 
            onClick={handleReset}
            className="p-2 text-zinc-400 hover:text-gold hover:bg-zinc-900 rounded-lg transition-all"
            title="Réinitialiser la conversation"
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 z-10 relative bg-zinc-900/60 scrollbar-thin">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3.5 max-w-[85%] ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              {/* Avatar Icon */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                msg.sender === 'user' 
                  ? 'bg-zinc-800 border-zinc-700 text-zinc-300' 
                  : 'bg-gold/10 border-gold/30 text-gold'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div className={`p-4 rounded-2xl shadow ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-br from-gold/10 to-yellow-600/5 border border-gold/20 rounded-tr-none'
                  : 'bg-zinc-950 border border-zinc-850 rounded-tl-none'
              }`}>
                <div className="text-xs font-mono text-zinc-500 mb-1">
                  {msg.sender === 'user' ? 'Vous' : 'Styliste Élégance Africa'} — {msg.timestamp}
                </div>
                <div className="space-y-1">
                  {renderStyledText(msg.text)}
                </div>
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-start gap-3.5 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/35 flex items-center justify-center text-gold">
                <Sparkles className="w-4 h-4 animate-spin-slow" />
              </div>
              <div className="bg-zinc-950 border border-zinc-850 p-4 rounded-2xl rounded-tl-none">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gold animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-gold animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-gold animate-bounce [animation-delay:0.4s]"></span>
                  <span className="text-xs text-zinc-400 italic">Le conseiller recherche dans les carnets d'artisanat ...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        {/* Dynamic suggestion panel */}
        {messages.length === 1 && !isLoading && (
          <div className="px-6 py-3 bg-zinc-950 border-t border-gold/10 z-10 space-y-2">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-gold" />
              Sujets suggérés pour votre soutenance :
            </span>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((sug, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(sug.text)}
                  className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:border-gold/30 rounded-lg text-xs text-zinc-300 hover:text-white flex items-center gap-1.5 transition-all text-left cursor-pointer"
                >
                  <ArrowRight className="w-3 h-3 text-gold" />
                  <span>{sug.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputMessage);
          }}
          className="p-4 bg-zinc-950 border-t border-gold/10 z-10 flex gap-2 relative bg-cover bg-no-repeat"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={isLoading}
            placeholder="Écrivez votre message (ex: Proposez-moi une robe de gala en Wax et Kente)"
            className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-gold/50 rounded-lg px-4 py-3.5 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-all"
            id="chat-input"
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className="px-4 bg-gradient-to-r from-gold to-yellow-600 hover:from-gold-dark hover:to-gold disabled:from-zinc-900 disabled:to-zinc-900 disabled:opacity-50 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            id="chat-submit-btn"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Envoyer</span>
          </button>
        </form>

      </div>
    </div>
  );
}
