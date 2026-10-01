import React, { useState, useRef, useEffect } from 'react';
import {
  FaRobot,
  FaXmark,
  FaPaperPlane,
  FaComments,
  FaRotateRight,
} from 'react-icons/fa6';
import { Sparkles } from 'lucide-react';
import { askAshwinAI, ChatMessage } from '../../services/aiService';

const QUICK_QUESTIONS = [
  'About Ashwin',
  'Projects',
  'Skills',
  'Experience',
  'Contact',
];

const INITIAL_MESSAGE: ChatMessage = {
  id: 'init-msg',
  sender: 'assistant',
  text: "Hello! I am **Ashwin AI**, your personal guide to Ashwin Kurekar's work, engineering projects, skills, and technical background.\n\nAsk me anything or select a quick topic below!",
  timestamp: 'Just now',
};

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isLoading]);

  // Handle ESC key to close assistant
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSend = async (queryText?: string) => {
    const textToSend = (queryText || input).trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput('');
    setIsLoading(true);

    try {
      const replyText = await askAshwinAI(textToSend, messages);
      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const errorMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'assistant',
        text: "I'm having trouble connecting right now. Feel free to reach out to Ashwin directly via email at ashwinkurekar07@gmail.com!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearHistory = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  // Basic markdown-like parser for bold text and bullet points
  const renderFormattedText = (text: string) => {
    return text.split('\n').map((line, idx) => {
      // Bullet list item
      if (line.startsWith('• ') || line.startsWith('- ')) {
        const content = line.substring(2);
        return (
          <li key={idx} className="ml-3 list-disc my-1 leading-relaxed">
            <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(content) }} />
          </li>
        );
      }
      if (line.match(/^\d+\.\s/)) {
        return (
          <div key={idx} className="my-1.5 font-medium leading-relaxed">
            <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(line) }} />
          </div>
        );
      }
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }
      return (
        <p key={idx} className="my-1 leading-relaxed">
          <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(line) }} />
        </p>
      );
    });
  };

  const formatInlineMarkdown = (str: string) => {
    // Bold
    let formatted = str.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
    // Links
    formatted = formatted.replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" target="_blank" rel="noreferrer" class="text-cyan-400 underline hover:text-cyan-300">$1</a>'
    );
    return formatted;
  };

  return (
    <>
      {/* Floating AI Orb Trigger Button (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center gap-3 p-2.5 sm:px-4 sm:py-3 rounded-full bg-zinc-900/90 hover:bg-zinc-800/95 border border-cyan-500/40 hover:border-cyan-400 text-white shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] transition-all duration-300 cursor-pointer active:scale-95"
          aria-label={isOpen ? 'Close Ashwin AI Assistant' : 'Open Ashwin AI Assistant'}
          aria-expanded={isOpen}
        >
          {/* Animated pulsing outer rings */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500/30 to-sky-400/30 blur-sm group-hover:blur-md transition-all -z-10 animate-pulse" />

          {/* Futuristic orb visual */}
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-600 flex items-center justify-center text-black shadow-inner">
            <Sparkles className="w-4 h-4 text-white" />
            {/* Status indicator dot */}
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-zinc-900" />
          </div>

          {/* Label */}
          <div className="hidden sm:flex flex-col text-left pr-1">
            <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5 font-display">
              AK AI
              <span className="text-[10px] font-mono text-cyan-400 font-normal">v1.0</span>
            </span>
            <span className="text-[11px] text-zinc-400 font-mono">Ask Ashwin AI</span>
          </div>
        </button>
      </div>

      {/* Interactive Chat Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Ashwin AI Portfolio Assistant"
          className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[82vh] h-[580px] rounded-3xl bg-[#0b0c12]/95 backdrop-blur-2xl border border-zinc-700/80 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(56,189,248,0.15)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Top Panel Header */}
          <div className="px-5 py-4 bg-zinc-900/60 border-b border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <FaRobot className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-zinc-900" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white font-display">Ashwin AI</h3>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    Active
                  </span>
                </div>
                <p className="text-[11px] font-mono text-zinc-400">Portfolio AI Assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleClearHistory}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Reset Chat History"
                aria-label="Reset chat history"
              >
                <FaRotateRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Close Assistant (Esc)"
                aria-label="Close chat panel"
              >
                <FaXmark className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Question Chips */}
          <div className="px-4 py-2.5 bg-zinc-950/40 border-b border-zinc-800/60 overflow-x-auto scrollbar-none flex items-center gap-2">
            <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 shrink-0">
              Suggestions:
            </span>
            {QUICK_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                disabled={isLoading}
                className="shrink-0 px-2.5 py-1 text-[11px] rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-cyan-500/40 text-zinc-300 hover:text-cyan-300 transition-colors cursor-pointer disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3 h-3" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-600 to-sky-600 text-white rounded-tr-sm shadow-md'
                      : 'bg-zinc-900/80 border border-zinc-800/80 text-zinc-200 rounded-tl-sm'
                  }`}
                >
                  <div className="text-zinc-100">{renderFormattedText(msg.text)}</div>
                  <div
                    className={`mt-1.5 text-[10px] font-mono ${
                      msg.sender === 'user' ? 'text-cyan-200/80 text-right' : 'text-zinc-500'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {/* Thinking / Loading Animation */}
            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3 h-3 animate-spin" />
                </div>
                <div className="rounded-2xl rounded-tl-sm p-3.5 bg-zinc-900/80 border border-zinc-800 flex items-center gap-2 text-zinc-400 text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.3s]" />
                  <span className="ml-1 text-[11px] text-zinc-400">Consulting portfolio knowledge...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 bg-zinc-900/70 border-t border-zinc-800/80">
            <div className="flex items-center gap-2 bg-zinc-950/90 rounded-2xl border border-zinc-800 focus-within:border-cyan-500/60 p-1.5 transition-colors">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Ask me anything about Ashwin..."
                className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none resize-none max-h-24 overflow-y-auto"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="p-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-semibold disabled:opacity-30 disabled:hover:bg-cyan-400 transition-colors cursor-pointer"
                aria-label="Send message"
              >
                <FaPaperPlane className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="mt-1.5 px-2 flex items-center justify-between text-[10px] font-mono text-zinc-500">
              <span>Enter to send · Shift+Enter for newline</span>
              <span className="flex items-center gap-1">
                <FaComments className="w-2.5 h-2.5" />
                Portfolio Mode
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
