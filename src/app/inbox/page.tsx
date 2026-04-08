'use client';

import React, { useState, useEffect, useRef } from 'react';
import NavBar from '@/components/ui/NavBar';
import BottomNav from '@/components/ui/BottomNav';
import ModernButton from '@/components/ui/ModernButton';
import { 
  Send, 
  Paperclip, 
  MoreVertical, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'them';
  time: string;
  status?: 'sent' | 'delivered' | 'read';
}

interface Contact {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread?: number;
  online: boolean;
  statusText: string;
}

export default function Inbox() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'all' | 'negotiating'>('all');
  const [selectedContactId, setSelectedContactId] = useState(1);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mobileShowChat, setMobileShowChat] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const contacts: Contact[] = [
    { 
      id: 1, 
      name: 'NeoGenesis Studio', 
      avatar: '/portfolio/avatar.png', 
      lastMessage: '分镜初稿已经上传到项目附件，请查收。', 
      time: '14:20', 
      unread: 2, 
      online: true,
      statusText: '在线接单中'
    },
    { 
      id: 2, 
      name: 'Silk Road AI', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=silk', 
      lastMessage: '关于《剑意江湖》的色彩风格建议...', 
      time: '昨天', 
      online: false,
      statusText: '离线'
    }
  ];

  const [chatMessages, setChatMessages] = useState<Record<number, Message[]>>({
    1: [
      { id: 1, text: '您好！我是 NeoGenesis 的视觉负责人。', sender: 'them', time: '10:00' },
      { id: 2, text: '关于您提交的《霓虹之眼》剧本，我们初步评估是可以接单的。', sender: 'them', time: '10:05' },
      { id: 3, text: '太好了，我看过你们的作品集，非常喜欢那种光影质感。', sender: 'me', time: '10:10', status: 'read' },
    ],
    2: []
  });

  const selectedContact = contacts.find(c => c.id === selectedContactId) || contacts[0];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [selectedContactId, chatMessages, mobileShowChat]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };
    setChatMessages(prev => ({
      ...prev,
      [selectedContactId]: [...(prev[selectedContactId] || []), newMessage]
    }));
    setInputText('');
    
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const reply: Message = {
          id: Date.now() + 1,
          text: '收到。我会针对您的需求微调一下技术方案，稍后在 Brief 中更新条款。',
          sender: 'them',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => ({
          ...prev,
          [selectedContactId]: [...(prev[selectedContactId] || []), reply]
        }));
      }, 2000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col h-screen overflow-hidden safe-pb selection:bg-primary/20">
      <NavBar activeTab="messages" />

      <main className="flex-1 w-full flex overflow-hidden bg-white relative">
        {/* Contact List Aside */}
        <aside className={`${mobileShowChat ? 'hidden' : 'flex'} w-full md:w-80 lg:w-96 flex-col border-r border-slate-50 bg-white z-20`}>
          <div className="p-6">
            <h1 className="text-2xl font-headline font-black mb-6 tracking-tight">洽谈大厅</h1>
            <div className="flex p-1 bg-slate-50 rounded-2xl mb-4">
              <button 
                onClick={() => setActiveTab('all')}
                className={`flex-1 py-2.5 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all ${
                  activeTab === 'all' ? 'bg-white text-primary shadow-sm' : 'text-slate-400'
                }`}
              >
                全部私信
              </button>
              <button 
                onClick={() => setActiveTab('negotiating')}
                className={`flex-1 py-2.5 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all ${
                  activeTab === 'negotiating' ? 'bg-white text-primary shadow-sm' : 'text-slate-400'
                }`}
              >
                约稿中 (1)
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar">
            {contacts.map((contact) => (
              <div 
                key={contact.id} 
                onClick={() => {
                  setSelectedContactId(contact.id);
                  setMobileShowChat(true);
                }}
                className={`flex items-center gap-4 p-5 cursor-pointer transition-all border-b border-slate-50 relative ${
                  selectedContactId === contact.id ? 'bg-primary/5' : 'hover:bg-slate-50'
                }`}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 overflow-hidden shadow-sm border border-slate-50">
                    <img src={contact.avatar} alt="" className="w-full h-full object-cover" />
                  </div>
                  {contact.online && (
                    <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-sm"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h4 className="font-headline font-black text-sm text-on-surface">{contact.name}</h4>
                    <span className="text-[9px] font-bold text-slate-300">{contact.time}</span>
                  </div>
                  <p className="text-xs text-slate-400 truncate font-medium pr-5">{contact.lastMessage}</p>
                </div>
                {contact.unread && (
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-[8px] font-black text-white">{contact.unread}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Chat Detail View */}
        <section className={`${mobileShowChat ? 'flex' : 'hidden md:flex'} flex-1 flex flex-col bg-slate-50/30 relative h-full overflow-hidden`}>
          <header className="p-4 md:p-6 border-b border-slate-100 bg-white/90 backdrop-blur-2xl flex items-center justify-between z-30">
            <div className="flex items-center gap-4">
              <button onClick={() => setMobileShowChat(false)} className="md:hidden p-2 -ml-2 text-slate-400 active:scale-90 transition-transform"><ArrowLeft size={18} /></button>
              <div className="w-10 h-10 rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden">
                <img src={selectedContact.avatar} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-headline font-black text-base text-on-surface flex items-center gap-2">
                  {selectedContact.name}
                  <div className="flex items-center gap-1 text-[8px] font-black uppercase text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
                    <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                    {selectedContact.statusText}
                  </div>
                </h3>
              </div>
            </div>
            <button className="p-2 text-slate-300"><MoreVertical size={20} /></button>
          </header>

          {/* Negotiating Context Card - Inline */}
          {selectedContactId === 1 && (
            <div className="px-5 pt-5 pb-0">
               <div className="bg-slate-900 rounded-[2.25rem] p-5 border border-white/10 shadow-2xl relative overflow-hidden group">
                  <div className="flex items-center justify-between mb-4">
                     <div className="flex flex-col">
                        <span className="text-[8px] font-black text-primary uppercase tracking-widest mb-0.5">约稿进行中 / NEGOTIATION</span>
                        <h4 className="text-[13px] font-black text-white">关于《赛博朋克：霓虹之眼》的约稿 Brief</h4>
                     </div>
                     <Sparkles size={16} className="text-primary animate-pulse" />
                  </div>
                  <div className="flex gap-2">
                     <ModernButton variant="glass" size="sm" className="bg-white/10 border-white/5 text-white flex-1 text-[10px] py-3 font-black">查看条款</ModernButton>
                     <ModernButton variant="primary" size="sm" className="flex-1 text-[10px] py-3 font-black shadow-lg shadow-primary/20" onClick={() => {
                        showToast('正在生成约稿合约...', 'info');
                     }}>立即签约</ModernButton>
                  </div>
                  <div className="absolute right-[-10%] top-[-10%] w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
               </div>
            </div>
          )}

          {/* Message List */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-8 space-y-8 no-scrollbar">
            {(chatMessages[selectedContactId] || []).map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                <div className={`max-w-[85%] ${msg.sender === 'me' ? 'bg-primary text-white rounded-[1.75rem] rounded-tr-none' : 'bg-white text-on-surface rounded-[1.75rem] rounded-tl-none shadow-sm border border-slate-50'} p-4.5 shadow-sm`}>
                  <p className="text-[13px] font-medium leading-relaxed tracking-tight">{msg.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-slate-200 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-200 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-slate-200 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input Footer */}
          <footer className="p-5 bg-white border-t border-slate-100 shadow-2xl relative z-40">
            <div className="flex items-center gap-3">
              <button className="text-slate-300 active:text-primary transition-colors"><Paperclip size={20} /></button>
              <div className="flex-1">
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="请输入您的想法..." 
                  className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-sm font-black focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                />
              </div>
              <ModernButton onClick={handleSend} variant="primary" size="md" className="rounded-2xl w-12 h-12 !p-0 shadow-xl shadow-primary/20">
                <Send size={20} />
              </ModernButton>
            </div>
          </footer>
        </section>
      </main>

      <BottomNav activeTab="messages" />
    </div>
  );
}
