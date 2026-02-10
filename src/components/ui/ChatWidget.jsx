import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bot, Send } from 'lucide-react';

const ChatWidget = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showAiBubble, setShowAiBubble] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: '¡Hola! Soy la IA del Cluster. ¿Buscas algún proveedor en específico?', sender: 'ai' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowAiBubble(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, isChatOpen]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const newMessage = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: '¡Entendido! Estoy analizando nuestra base de datos...', 
        sender: 'ai' 
      }]);
    }, 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Burbuja de aviso */}
        <AnimatePresence>
        {showAiBubble && !isChatOpen && (
            <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            className="relative bg-white border border-gray-200 shadow-xl rounded-xl p-4 w-56 text-left origin-bottom-right"
            >
            <button onClick={(e) => {e.stopPropagation(); setShowAiBubble(false);}} className="absolute -top-2 -left-2 bg-slate-200 hover:bg-red-500 hover:text-white text-gray-500 rounded-full p-1 transition-colors">
                <X className="h-3 w-3" />
            </button>
            <p className="text-xs text-gray-500 leading-snug">¿Necesitas ayuda? ¡Puedo buscar por ti!</p>
            </motion.div>
        )}
        </AnimatePresence>

        {/* Botón flotante */}
        <motion.button 
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => { setIsChatOpen(!isChatOpen); if(showAiBubble) setShowAiBubble(false); }}
            className={`h-14 w-14 rounded-full shadow-2xl flex items-center justify-center transition-all z-50 ${isChatOpen ? 'bg-slate-800 rotate-90' : 'bg-gradient-to-br from-indigo-600 to-violet-600'}`}
        >
            {isChatOpen ? <X className="h-6 w-6 text-white" /> : <Bot className="h-7 w-7 text-white" />}
        </motion.button>

        {/* Ventana de Chat */}
        <AnimatePresence>
        {isChatOpen && (
            <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[90vw] md:w-96 h-[500px] max-h-[70vh] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden origin-bottom-right z-40"
            >
             {/* Header del Chat */}
             <div className="bg-slate-900 p-4 flex items-center gap-3">
                 <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center"><Bot className="h-5 w-5 text-white" /></div>
                 <h3 className="text-white font-bold text-sm">Cluster AI</h3>
             </div>
             
             {/* Lista Mensajes */}
             <div className="flex-1 bg-slate-50 p-4 overflow-y-auto custom-scrollbar">
                 <div className="flex flex-col gap-4">
                 {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'}`}>
                            {msg.text}
                        </div>
                    </div>
                 ))}
                 {isTyping && <div className="text-xs text-gray-400">Escribiendo...</div>}
                 <div ref={messagesEndRef} />
                 </div>
             </div>

             {/* Input */}
             <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-200 flex gap-2">
                 <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Escribe..." className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-indigo-500" />
                 <button type="submit" disabled={!inputValue.trim()} className="bg-indigo-600 text-white p-2 rounded-xl"><Send className="h-5 w-5" /></button>
             </form>
            </motion.div>
        )}
        </AnimatePresence>
    </div>
  );
};

export default ChatWidget;