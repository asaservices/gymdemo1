import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  ExternalLink,
  Volume2,
  VolumeX,
  RotateCcw,
  Phone,
  Check,
  CheckCheck,
  ChevronRight,
  ShieldCheck,
  Calendar,
  CreditCard,
  Dumbbell,
  Info,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { GymDeskActionCard, GymDeskChatMessage, GymDeskQuickPrompt, PageId } from '../../types';
import {
  GYMDESK_INITIAL_PROMPTS,
  getGymDeskInstantReply,
} from '../../data/gymdeskReplies';
import { playChatSound } from '../../utils/sound';

interface FloatingWhatsAppChatProps {
  onOpenTrial: () => void;
  onNavigate: (page: PageId) => void;
}

const STORAGE_KEY = 'gymdesk_chat_history_v1';
const SOUND_SETTING_KEY = 'gymdesk_chat_sound_enabled';

export const FloatingWhatsAppChat: React.FC<FloatingWhatsAppChatProps> = ({
  onOpenTrial,
  onNavigate,
}) => {
  const { language, isRTL, siteConfig } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showCallout, setShowCallout] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Helper to format time
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Initial welcome message per language
  const getInitialMessages = (lang: typeof language): GymDeskChatMessage[] => [
    {
      id: 'msg-welcome-1',
      sender: 'gymdesk',
      text:
        lang === 'ar'
          ? `👋 **أهلاً بك في كونسيرج جيم ديسك دبي!**\n\nنحن هنا لمساعدتك على مدار الساعة بخصوص حجز تجربة VIP المجانية، باقات العضوية، المدربين الشخصيين، ومرافق الاستشفاء.\n\nكيف يمكننا مساعدتك اليوم؟ يمكنك اختيار أحد المواضيع السريعة أدناه أو كتابة استفسارك.`
          : `👋 **Welcome to GYM DEMO Dubai — GymDesk Concierge!**\n\nI am your 24/7 instant reception assistant. I can help you reserve a complimentary VIP Day Pass, explore membership tiers, consult with master coaches, or check facility amenities.\n\nHow can I help you today?`,
      timestamp: getCurrentTime(),
      status: 'read',
      suggestedPrompts: GYMDESK_INITIAL_PROMPTS[lang],
    },
  ];

  const [messages, setMessages] = useState<GymDeskChatMessage[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = sessionStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch {
        // Use default
      }
    }
    return getInitialMessages(language);
  });

  // Sound preference initialization
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSound = localStorage.getItem(SOUND_SETTING_KEY);
      if (savedSound !== null) {
        setSoundEnabled(savedSound === 'true');
      }
    }
  }, []);

  // Update initial message if language changes and only 1 message exists
  useEffect(() => {
    if (messages.length <= 1) {
      setMessages(getInitialMessages(language));
    }
  }, [language]);

  // Persist messages
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } catch {
        // Storage full or unavailable
      }
    }
  }, [messages]);

  // Auto-scroll on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Dismiss floating teaser callout after 8 seconds or when opened
  useEffect(() => {
    if (isOpen) {
      setShowCallout(false);
      setHasUnread(false);
    }
  }, [isOpen]);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    localStorage.setItem(SOUND_SETTING_KEY, String(next));
  };

  const handleResetChat = () => {
    const initial = getInitialMessages(language);
    setMessages(initial);
    sessionStorage.removeItem(STORAGE_KEY);
    if (soundEnabled) playChatSound('receive');
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsgId = `msg-user-${Date.now()}`;
    const userMsg: GymDeskChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: query,
      timestamp: getCurrentTime(),
      status: 'sent',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    if (soundEnabled) playChatSound('send');

    // Simulate instant intelligent response with typing indicator (500ms)
    setIsTyping(true);

    setTimeout(() => {
      const responseData = getGymDeskInstantReply(query, language);
      const gymDeskMsg: GymDeskChatMessage = {
        id: `msg-gymdesk-${Date.now()}`,
        sender: 'gymdesk',
        text: responseData.replyText,
        timestamp: getCurrentTime(),
        status: 'read',
        actionCards: responseData.actionCards,
        suggestedPrompts: responseData.suggestedPrompts,
      };

      setIsTyping(false);
      setMessages((prev) =>
        prev.map((m) => (m.id === userMsgId ? { ...m, status: 'read' } : m)).concat(gymDeskMsg)
      );

      if (soundEnabled) playChatSound('receive');
    }, 600);
  };

  const handleActionClick = (card: GymDeskActionCard) => {
    switch (card.ctaAction) {
      case 'open_trial':
        onOpenTrial();
        break;
      case 'navigate_membership':
        onNavigate('membership');
        break;
      case 'navigate_programs':
        onNavigate('programs');
        break;
      case 'navigate_contact':
        onNavigate('contact');
        break;
      case 'navigate_about':
        onNavigate('about');
        break;
      case 'open_whatsapp': {
        const text = card.ctaPayload || 'Hi GymDesk Front Desk, I have a question.';
        const phone = '97150000000';
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
        break;
      }
      case 'call_gym': {
        window.location.href = `tel:${card.ctaPayload || '+97140000000'}`;
        break;
      }
    }
  };

  const handleOpenDirectWhatsApp = () => {
    const draft = inputText.trim() || 'Hi GymDesk Dubai Front Desk, I have an inquiry.';
    const phone = '97150000000';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(draft)}`, '_blank');
  };

  const renderCardIcon = (type?: string) => {
    switch (type) {
      case 'trial':
        return <Calendar className="w-4 h-4 text-amber-400 shrink-0" />;
      case 'membership':
        return <CreditCard className="w-4 h-4 text-emerald-400 shrink-0" />;
      case 'program':
        return <Dumbbell className="w-4 h-4 text-amber-400 shrink-0" />;
      case 'phone':
        return <Phone className="w-4 h-4 text-emerald-400 shrink-0" />;
      case 'whatsapp':
        return <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />;
      default:
        return <Info className="w-4 h-4 text-emerald-400 shrink-0" />;
    }
  };

  return (
    <>
      {/* Floating Launcher: Dark Pill + Green Circular WhatsApp Button */}
      <div
        className={`fixed bottom-6 ${
          isRTL ? 'left-6 flex-row-reverse' : 'right-6 flex-row'
        } z-50 flex items-center gap-3 pointer-events-auto select-none`}
      >
        {/* Pill Badge matching the screenshot */}
        <AnimatePresence>
          {showCallout && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -15 : 15, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              onClick={() => {
                setIsOpen(true);
                setHasUnread(false);
                setTimeout(() => inputRef.current?.focus(), 200);
              }}
              className="group bg-[#161a1d] hover:bg-[#1c2226] text-white border border-[#2d3439] hover:border-[#3e484f] rounded-full pl-3.5 pr-3 py-2 shadow-2xl flex items-center gap-3 cursor-pointer transition-all duration-200"
            >
              {/* Green online dot */}
              <div className="relative flex items-center justify-center shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00D775] shadow-[0_0_8px_#00D775]" />
              </div>

              {/* Text content */}
              <div className="flex flex-col text-left leading-tight pr-1">
                <span className="text-[13px] font-bold text-white tracking-wide group-hover:text-emerald-300 transition-colors">
                  {language === 'ar' ? 'محادثة مع جيم ديسك' : 'Chat with Gym Desk'}
                </span>
                <span className="text-[11px] text-zinc-400 font-normal mt-0.5">
                  {language === 'ar' ? 'رد فوري على واتساب' : 'Instant reply on WhatsApp'}
                </span>
              </div>

              {/* Dismiss X button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCallout(false);
                }}
                className="w-5 h-5 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors ml-1"
                aria-label="Dismiss"
              >
                <X className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Circular WhatsApp Icon Button matching screenshot */}
        <motion.button
          id="gymdesk-whatsapp-trigger"
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.93 }}
          onClick={() => {
            setIsOpen((prev) => !prev);
            if (!isOpen) {
              setHasUnread(false);
              setTimeout(() => inputRef.current?.focus(), 200);
            }
          }}
          className={`w-[54px] h-[54px] md:w-[58px] md:h-[58px] rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 relative ${
            isOpen
              ? 'bg-[#1f2c34] text-white border border-white/20'
              : 'bg-[#00D775] hover:bg-[#00e87e] text-white shadow-[#00D775]/25 shadow-xl'
          }`}
          aria-label="Chat with Gym Desk"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white stroke-[2.5]" />
          ) : (
            /* WhatsApp Outline Speech Bubble Icon matching the screenshot */
            <svg
              className="w-7 h-7 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          )}
        </motion.button>
      </div>

      {/* Floating WhatsApp Dialog Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="gymdesk-chat-window"
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`fixed bottom-24 ${
              isRTL ? 'left-4 sm:left-6' : 'right-4 sm:right-6'
            } z-50 w-[calc(100vw-2rem)] sm:w-[410px] md:w-[430px] h-[580px] max-h-[82vh] bg-[#0b141a] text-[#e9edef] rounded-2xl shadow-2xl border border-emerald-900/40 flex flex-col overflow-hidden backdrop-blur-xl`}
          >
            {/* WhatsApp Header */}
            <div className="bg-[#202c33] border-b border-white/10 px-4 py-3 flex items-center justify-between select-none relative z-10">
              <div className="flex items-center gap-3">
                {/* Concierge Avatar */}
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 p-[2px] flex items-center justify-center shadow-inner">
                    <div className="w-full h-full rounded-full bg-[#111b21] flex items-center justify-center text-white font-bold text-sm tracking-wider">
                      GD
                    </div>
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#202c33] rounded-full" />
                </div>

                {/* Name & Online Status */}
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold text-sm text-white tracking-wide">
                      {language === 'ar' ? 'جيم ديسك دبي' : 'GymDesk Concierge'}
                    </h3>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>
                      {language === 'ar' ? 'رد فوري ⚡ متصل الآن' : 'Instant Reply ⚡ Active'}
                    </span>
                  </p>
                </div>
              </div>

              {/* Header Action Controls */}
              <div className="flex items-center gap-1">
                {/* Sound Toggle */}
                <button
                  onClick={toggleSound}
                  title={soundEnabled ? 'Mute Sounds' : 'Enable Sounds'}
                  className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Toggle chat sounds"
                >
                  {soundEnabled ? (
                    <Volume2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-zinc-500" />
                  )}
                </button>

                {/* Direct WhatsApp External Button */}
                <button
                  onClick={handleOpenDirectWhatsApp}
                  title={language === 'ar' ? 'فتح في واتساب' : 'Open in WhatsApp App'}
                  className="p-2 text-emerald-400 hover:text-emerald-300 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Open in WhatsApp"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>

                {/* Reset Conversation */}
                <button
                  onClick={handleResetChat}
                  title={language === 'ar' ? 'إعادة ضبط المحادثة' : 'Clear & Reset'}
                  className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Reset chat"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Minimize Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors ml-0.5"
                  aria-label="Close chat window"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Sub-header Notice */}
            <div className="bg-[#182229] px-4 py-1.5 text-[11px] text-zinc-400 flex items-center justify-between border-b border-white/5">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <span className="text-emerald-400">🔒</span>{' '}
                {language === 'ar'
                  ? 'محادثة آمنة ومباشرة مع كونسيرج دبي'
                  : 'Official GYM DEMO 24/7 Dubai Concierge'}
              </span>
              <span className="text-zinc-500 text-[10px]">
                {siteConfig.phoneDemo}
              </span>
            </div>

            {/* Chat Messages Stream Area */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5 bg-[#0b141a] bg-opacity-95 custom-scrollbar relative">
              {/* WhatsApp-like subtle background pattern */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(#25D366 1px, transparent 1px)`,
                  backgroundSize: '16px 16px',
                }}
              />

              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      isUser ? 'items-end' : 'items-start'
                    } relative z-10`}
                  >
                    {/* Message Bubble */}
                    <div
                      className={`max-w-[88%] sm:max-w-[84%] rounded-2xl p-3 text-xs leading-relaxed shadow-md ${
                        isUser
                          ? 'bg-[#005c4b] text-[#e9edef] rounded-tr-none'
                          : 'bg-[#202c33] text-[#d1d7db] rounded-tl-none border border-white/5'
                      }`}
                    >
                      {/* Formatted Text with bold and lists support */}
                      <div className="whitespace-pre-line font-normal space-y-1">
                        {msg.text.split('\n').map((line, idx) => {
                          // Simple bold parser
                          const parts = line.split(/(\*\*.*?\*\*)/g);
                          return (
                            <p key={idx} className="leading-relaxed">
                              {parts.map((part, pIdx) => {
                                if (part.startsWith('**') && part.endsWith('**')) {
                                  return (
                                    <strong key={pIdx} className="text-white font-semibold">
                                      {part.slice(2, -2)}
                                    </strong>
                                  );
                                }
                                return part;
                              })}
                            </p>
                          );
                        })}
                      </div>

                      {/* Timestamp & Read Status */}
                      <div
                        className={`flex items-center gap-1 text-[10px] mt-1.5 ${
                          isUser ? 'justify-end text-emerald-200/80' : 'justify-end text-zinc-400'
                        }`}
                      >
                        <span>{msg.timestamp}</span>
                        {isUser && (
                          <CheckCheck className="w-3.5 h-3.5 text-sky-400 stroke-[2.5]" />
                        )}
                      </div>
                    </div>

                    {/* Embedded Action Cards (if GymDesk provided interactive cards) */}
                    {msg.actionCards && msg.actionCards.length > 0 && (
                      <div className="w-full max-w-[90%] mt-2 space-y-1.5">
                        {msg.actionCards.map((card, cIdx) => (
                          <div
                            key={cIdx}
                            className="bg-[#182229] border border-emerald-500/20 rounded-xl p-2.5 flex items-center justify-between gap-2 shadow-md hover:border-emerald-500/50 transition-colors"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="w-7 h-7 rounded-lg bg-black/40 flex items-center justify-center shrink-0 border border-white/5">
                                {renderCardIcon(card.iconType)}
                              </div>
                              <div className="min-w-0">
                                <div className="text-xs font-semibold text-white truncate">
                                  {card.title}
                                </div>
                                {card.description && (
                                  <div className="text-[10px] text-zinc-400 truncate">
                                    {card.description}
                                  </div>
                                )}
                              </div>
                            </div>
                            <button
                              onClick={() => handleActionClick(card)}
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold tracking-wide shrink-0 flex items-center gap-1 shadow cursor-pointer transition-all active:scale-95"
                            >
                              <span>{card.ctaText}</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Quick suggestion prompt chips (if attached to message) */}
                    {msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
                      <div className="w-full mt-2.5 flex flex-wrap gap-1.5">
                        {msg.suggestedPrompts.map((prompt) => (
                          <button
                            key={prompt.id}
                            onClick={() => handleSendMessage(prompt.query)}
                            className="bg-[#182229] hover:bg-[#202c33] text-zinc-300 hover:text-emerald-400 border border-white/10 hover:border-emerald-500/40 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <span>{prompt.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-start">
                  <div className="bg-[#202c33] text-zinc-300 rounded-2xl rounded-tl-none px-3.5 py-2.5 text-xs flex items-center gap-1.5 shadow-md border border-white/5">
                    <span className="text-[11px] text-zinc-400 font-medium mr-1">
                      {language === 'ar' ? 'جيم ديسك يكتب...' : 'GymDesk is typing'}
                    </span>
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Drawer Pills at bottom */}
            <div className="bg-[#111b21] px-3 py-2 border-t border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[10px] text-zinc-500 shrink-0 uppercase font-semibold">
                {language === 'ar' ? 'استفسارات سريعة:' : 'Quick Topics:'}
              </span>
              {GYMDESK_INITIAL_PROMPTS[language].map((prompt) => (
                <button
                  key={prompt.id}
                  onClick={() => handleSendMessage(prompt.query)}
                  className="bg-[#1f2c34] hover:bg-[#2a3942] text-zinc-300 hover:text-emerald-400 text-[10px] whitespace-nowrap px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer shrink-0 border border-white/5"
                >
                  {prompt.label}
                </button>
              ))}
            </div>

            {/* WhatsApp Input Bar */}
            <div className="bg-[#202c33] p-2.5 border-t border-white/10 flex items-center gap-2">
              {/* WhatsApp direct app action */}
              <button
                type="button"
                onClick={handleOpenDirectWhatsApp}
                title={language === 'ar' ? 'فتح المحادثة في تطبيق واتساب' : 'Switch to WhatsApp App'}
                className="p-2 text-zinc-400 hover:text-[#25D366] rounded-xl hover:bg-white/5 transition-colors shrink-0"
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.952 3.71 1.453 5.711 1.454h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </button>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex-1 flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={
                    language === 'ar'
                      ? 'اكتب استفسارك هنا (رد فوري)...'
                      : 'Type a message (instant reply)...'
                  }
                  className="flex-1 bg-[#2a3942] text-white placeholder-zinc-400 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />

                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                    inputText.trim()
                      ? 'bg-[#25D366] text-black shadow-lg hover:scale-105 active:scale-95 cursor-pointer'
                      : 'bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-60'
                  }`}
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4 fill-current ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
