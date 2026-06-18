import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Loader2 } from 'lucide-react';

type AIMessage = {
  id: string;
  role: 'user' | 'ai';
  content: string;
};

export function AIAssistant({ isOpen }: { isOpen: boolean }) {
  const [messages, setMessages] = useState<AIMessage[]>([
    { id: '1', role: 'ai', content: "Hello! I'm Ruru, your AI assistant. How can I help you with your project today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg: AIMessage = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      const aiMsg: AIMessage = { 
        id: (Date.now() + 1).toString(), 
        role: 'ai', 
        content: "I've logged your request. I am a mock AI, but in the future, I will help you automate tasks and analyze your workspace data!" 
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <aside
      className={`overflow-hidden flex-shrink-0 flex flex-col bg-[var(--color-background-light)] transition-all duration-300 ease-in-out ${isOpen ? 'w-[320px] border-l border-[var(--color-border-light)]' : 'w-0'
        }`}
    >
      <div className="p-4 border-b border-[var(--color-border-light)] h-16 flex items-center min-w-[320px] flex-shrink-0 bg-white">
        <Sparkles className="w-5 h-5 text-[var(--color-primary)] mr-2" />
        <span className="font-semibold tracking-tight">Ruru AI</span>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto min-w-[320px] bg-slate-50/50">
        <div className="flex flex-col gap-4 pb-2">
          {messages.map(msg => (
            <div 
              key={msg.id} 
              className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm leading-relaxed ${
                msg.role === 'ai' 
                  ? 'bg-white rounded-tl-none border border-[var(--color-border-light)] self-start text-[var(--color-text-light)]' 
                  : 'bg-[var(--color-primary)] text-white rounded-tr-none self-end'
              }`}
            >
              {msg.content}
            </div>
          ))}
          {isTyping && (
            <div className="max-w-[85%] p-3 rounded-2xl rounded-tl-none border border-[var(--color-border-light)] bg-white self-start flex items-center gap-2 text-sm text-[var(--color-text-light)]/60 shadow-sm">
              <Loader2 className="w-4 h-4 animate-spin text-[var(--color-primary)]" />
              Ruru is typing...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 border-t border-[var(--color-border-light)] bg-white min-w-[320px] flex-shrink-0">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Ruru..."
            className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-[var(--color-border-light)] bg-slate-50 focus:bg-white focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all text-sm"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors ${
              input.trim() ? 'text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] shadow-sm' : 'text-slate-400 bg-transparent'
            }`}
          >
            <Send size={14} className={input.trim() ? 'ml-0.5' : ''} />
          </button>
        </div>
      </div>
    </aside>
  );
}
