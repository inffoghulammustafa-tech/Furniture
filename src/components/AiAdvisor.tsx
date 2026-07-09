/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, User, HelpCircle, Hammer, Info } from 'lucide-react';
import { Message } from '../types';

interface AiAdvisorProps {
  isOpen: boolean;
  onClose: () => void;
}

const CONVERSATION_SUGGESTIONS = [
  "Which wood is best suited for coastal humidity in Karachi?",
  "How do you care for a natural beeswax finish on Sheesham?",
  "What is the structural difference between mortise-and-tenon vs nails?",
  "Can you recommend a table layout that comfortably seats 8 adults?"
];

export default function AiAdvisor({ isOpen, onClose }: AiAdvisorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Assalam-o-Alaikum, I am Kabir, Woodwork Advisor at Holzcraft. I guide our clients in selecting the appropriate timbers, sizing, and structural configurations. Whether you want to understand wood density, joinery physics, or require design inspiration for your home, I am here to assist. What are you looking to design today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle message sending
  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setUserInput('');
    setIsLoading(true);

    try {
      // Gather conversation history to send to server
      const chatHistory = [...messages, userMsg].map(m => ({
        sender: m.sender,
        text: m.text
      }));

      const response = await fetch("/api/gemini/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory })
      });

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Server returned error: ${response.status} ${response.statusText}. Response: ${text.substring(0, 100)}`);
      }

      if (!response.ok) {
        throw new Error(data.error || `Failed to communicate with advisor. Status: ${response.status}`);
      }

      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error("AI Advisor error:", err);
      const errorMsg: Message = {
        id: `error-${Date.now()}`,
        sender: 'assistant',
        text: `I apologize, but I am facing difficulty connecting back to the main workshop office right now. \n\n*Technical Details:* ${err.message || 'Server connection error'}. Please verify that the Gemini API Key is configured in the secrets menu.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 pointer-events-auto"
          />

          {/* Lateral Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed top-0 right-0 h-full w-full max-w-lg bg-charcoal border-l border-line shadow-2xl z-50 flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-line flex items-center justify-between bg-charcoal/90 backdrop-blur-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-walnut border border-oak/30 flex items-center justify-center text-oak">
                  <Hammer className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ivory flex items-center gap-1.5">
                    Kabir <span className="text-xs uppercase font-mono font-medium text-sage tracking-wider border border-sage/30 px-1.5 py-0.5">Ustad</span>
                  </h3>
                  <span className="text-[10px] font-mono text-ivory-dim/70 block">Holzcraft Atelier Design Companion</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-ivory-dim hover:text-oak border border-line/40 rounded-full hover:border-oak transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body Message Space */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-grain">
              {/* Informative top badge */}
              <div className="p-4 bg-line/20 border border-line text-xs font-sans leading-relaxed text-ivory-dim flex gap-3">
                <Info className="w-4 h-4 text-oak shrink-0 mt-0.5" />
                <div>
                  <span className="text-oak font-semibold block mb-0.5">Craftsman Consultations</span>
                  Our AI Advisor possesses deep localized understanding of timber characteristics, traditional joinery limits, and climate science in Pakistan. Feel free to seek care instructions or design advice.
                </div>
              </div>

              {/* Messages track */}
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    {/* Avatar icon */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border text-xs ${
                        msg.sender === 'user'
                          ? 'bg-line border-line text-ivory'
                          : 'bg-walnut border-oak/40 text-oak'
                      }`}
                    >
                      {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Hammer className="w-3.5 h-3.5" />}
                    </div>

                    {/* Message Bubble */}
                    <div className="flex flex-col max-w-[80%]">
                      <div
                        className={`p-4 rounded-sm text-xs font-sans whitespace-pre-wrap leading-relaxed shadow-sm ${
                          msg.sender === 'user'
                            ? 'bg-oak text-charcoal rounded-tr-none'
                            : 'bg-charcoal/80 border border-line text-ivory-dim rounded-tl-none'
                        }`}
                      >
                        {/* Inline markdown replacements for basic aesthetics */}
                        {msg.text.split('\n').map((line, lIdx) => {
                          // basic bold and list parser
                          let formattedLine = line;
                          if (line.startsWith('* ')) {
                            formattedLine = '• ' + line.substring(2);
                          }
                          return (
                            <p key={lIdx} className={lIdx > 0 ? 'mt-2' : ''}>
                              {formattedLine}
                            </p>
                          );
                        })}
                      </div>
                      <span className={`text-[9px] font-mono mt-1 text-ivory-dim/40 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Loading Typist state */}
                {isLoading && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-walnut border border-oak/40 flex items-center justify-center text-oak animate-spin shrink-0">
                      <Hammer className="w-3.5 h-3.5" />
                    </div>
                    <div className="p-4 bg-charcoal/50 border border-line rounded-sm rounded-tl-none max-w-[80%] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-oak animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-2 h-2 rounded-full bg-oak animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-2 h-2 rounded-full bg-oak animate-bounce" />
                      <span className="text-[10px] text-sage font-mono uppercase tracking-widest ml-1">Sanding Timber...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Quick Suggestions & Input Footer Area */}
            <div className="p-6 border-t border-line bg-charcoal/90">
              {/* Prepopulated Suggestions chips */}
              {messages.length === 1 && !isLoading && (
                <div className="mb-4">
                  <span className="text-[9px] font-mono uppercase text-sage tracking-widest block mb-2 flex items-center gap-1">
                    <HelpCircle className="w-3 h-3" /> Quick questions for the workshop
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {CONVERSATION_SUGGESTIONS.map((sug, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleSuggestionClick(sug)}
                        className="text-left text-[11px] font-sans text-ivory-dim hover:text-oak hover:border-oak/60 border border-line/50 p-2.5 bg-black/20 hover:bg-black/40 transition-colors"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input field */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(userInput);
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Ask Kabir about Sheesham care, mortise joints..."
                  disabled={isLoading}
                  className="flex-1 bg-charcoal border border-line p-3 text-xs text-ivory placeholder-ivory-dim/40 focus:outline-none focus:border-oak transition-colors font-sans"
                />
                <button
                  type="submit"
                  disabled={!userInput.trim() || isLoading}
                  className="bg-oak text-charcoal hover:bg-ivory disabled:bg-line/40 disabled:text-ivory-dim/40 p-3 flex items-center justify-center transition-colors font-semibold"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
