'use client';

import React, { useState, useEffect, useRef } from 'react';
import NavBar from '@/components/ui/NavBar';
import BottomNav from '@/components/ui/BottomNav';
import ModernButton from '@/components/ui/ModernButton';
import { 
  Search, 
  Send, 
  Paperclip, 
  Smile, 
  MoreVertical, 
  Circle,
  FileText,
  Clock,
  CheckCheck,
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
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  const [selectedContactId, setSelectedContactId] = useState(1);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mobileShowChat, setMobileShowChat] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const contacts: Contact[] = [
    { 
      id: 1, 
      name: 'NeoGenesis 工作室', 
      avatar: '/portfolio/avatar.png', 
      lastMessage: '分镜初稿已经上传到项目附件，请查收。', 
      time: '14:20', 
      unread: 2, 
      online: true,
      statusText: '活跃'
    },
    { 
      id: 2, 
      name: 'Silk Road AI', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=silk', 
      lastMessage: '关于《剑意江湖》的商业片色彩风格建议...', 
      time: '昨天', 
      online: false,
      statusText: '离线'
    },
    { 
      id: 3, 
      name: '未来影业 - 王经理', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=manager', 
      lastMessage: '新项目的预算已经批下来了。', 
      time: '周一', 
      online: true,
      statusText: '工作中'
    },
  ];

  const [chatMessages, setChatMessages] = useState<Record<number, Message[]>>({
    1: [
      { id: 1, text: '您好！关于《霓虹之眼》的剧本我们已经拆解完成了。', sender: 'them', time: '10:00' },
      { id: 2, text: '太好了，AI 生成的角色原画我看过了，非常符合预期。', sender: 'me', time: '10:05', status: 'read' },
      { id: 3, text: '分镜初稿已经上传到项目附件，请查收。', sender: 'them', time: '14:20' },
    ],
    2: [
      { id: 11, text: '关于《剑意江湖》的商业片色彩风格建议，我觉得可以更偏向水墨材质一些。', sender: 'them', time: '昨天 11:30' },
    ],
    3: [
      { id: 21, text: '新项目的预算已经批下来了。', sender: 'them', time: '周一' },
    ]
  });

  const selectedContact = contacts.find(c => c.id === selectedContactId) || contacts[0];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [selectedContactId, chatMessages]);

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
    
    // Simulate thinking/reply
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const reply: Message = {
          id: Date.now() + 1,
          text: '好的，我已经收到了。稍后会给您详细反馈。',
          sender: 'them',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => ({
          ...prev,
          [selectedContactId]: [...(prev[selectedContactId] || []), reply]
        }));
        showToast(`收到来自 ${selectedContact.name} 的消息`, 'info');
      }, 2500);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col h-screen overflow-hidden">
      <NavBar activeTab="messages" />

      <main className="flex-1 max-w-[1600px] mx-auto w-full flex overflow-hidden border-x border-slate-100 bg-white relative">
        {/* 左侧：联系人列表 */}
        <aside className={`${mobileShowChat ? 'hidden' : 'flex'} md:flex w-full md:w-80 lg:w-96 flex-shrink-0 flex-col border-r border-slate-50 overflow-hidden`}>
          <div className="p-6 border-b border-slate-50 bg-white">
            <h1 className="text-2xl font-headline font-black mb-6 tracking-tight">消息中心</h1>
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="搜索对话或创作者..." 
                className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              />
            </div>
            <div className="flex p-1 bg-slate-50 rounded-xl">
              <button 
                onClick={() => setActiveTab('all')}
                className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                  activeTab === 'all' ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                全部消息
              </button>
              <button 
                onClick={() => setActiveTab('unread')}
                className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                  activeTab === 'unread' ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                未读 (2)
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-white custom-scrollbar">
            {contacts.map((contact) => (
              <div 
                key={contact.id} 
                onClick={() => {
                  setSelectedContactId(contact.id);
                  setMobileShowChat(true);
                }}
                className={`group flex items-center gap-4 p-5 cursor-pointer transition-all border-l-4 ${
                  selectedContactId === contact.id ? 'bg-primary/5 border-primary shadow-inner' : 'border-transparent hover:bg-slate-50'
                }`}
              >
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 overflow-hidden shadow-sm">
                    <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" />
                  </div>
                  {contact.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className={`font-headline font-black text-sm truncate ${selectedContactId === contact.id ? 'text-primary' : 'text-on-surface'}`}>
                      {contact.name}
                    </h4>
                    <span className="text-[10px] font-bold text-slate-400">{contact.time}</span>
                  </div>
                  <p className="text-xs text-secondary truncate font-medium">{contact.lastMessage}</p>
                </div>
                {contact.unread && (
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-[10px] font-black text-white">{contact.unread}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* 右侧：聊天详情 */}
        <section className={`${mobileShowChat ? 'flex' : 'hidden'} md:flex flex-1 flex flex-col bg-[#FDFDFF] relative h-full overflow-hidden`}>
          <header className="p-4 md:p-6 border-b border-slate-50 bg-white/80 backdrop-blur-md flex items-center justify-between z-10">
            <div className="flex items-center gap-3 md:gap-4">
              <button 
                onClick={() => setMobileShowChat(false)}
                className="md:hidden p-2 -ml-2 text-slate-400 hover:text-primary transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-slate-100 overflow-hidden shadow-sm">
                <img src={selectedContact.avatar} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-headline font-black text-lg text-on-surface flex items-center gap-2">
                  {selectedContact.name}
                  <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-emerald-500 px-2 py-0.5 bg-emerald-50 rounded-lg">
                    <Circle size={8} fill="currentColor" />
                    {selectedContact.statusText}
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">认证合作伙伴 / PARTNER</p>
              </div>
            </div>
            {/* Hiring Context Badge */}
            {typeof window !== 'undefined' && window.location.search.includes('mode=hire') && (
              <div className="hidden lg:flex items-center gap-3 bg-primary/5 px-4 py-2 rounded-2xl border border-primary/10">
                <Sparkles size={16} className="text-primary animate-pulse" />
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">约稿协商中</span>
              </div>
            )}
          </header>

          {/* Hiring Proposal Overlay (Simulated) */}
          {typeof window !== 'undefined' && window.location.search.includes('mode=hire') && selectedContactId === 1 && (
            <div className="mx-8 mt-8 p-6 bg-slate-900 text-white rounded-[2rem] shadow-2xl relative overflow-hidden border border-white/10 animate-in fade-in zoom-in duration-500">
               <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                     <h4 className="font-headline font-black text-xl tracking-tight">约稿草案确认</h4>
                     <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">待确认</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                     <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">意向金额</p>
                        <p className="text-xl font-headline font-black text-primary-fixed-dim">¥ 15,000</p>
                     </div>
                     <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">交付周期</p>
                        <p className="text-xl font-headline font-black text-white">14 个工作日</p>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <ModernButton 
                        variant="glass" 
                        fullWidth 
                        className="bg-white text-slate-900 border-none h-12 text-xs font-black shadow-xl"
                        onClick={() => {
                           showToast('约稿确认成功！项目已转入制作阶段。', 'success');
                           window.location.href = '/client';
                        }}
                     >
                        确认发起约稿
                     </ModernButton>
                     <ModernButton variant="glass" fullWidth className="bg-white/10 border-white/10 text-white h-12 text-xs font-black">
                        修改条款
                     </ModernButton>
                  </div>
               </div>
               <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-[80px]"></div>
            </div>
          )}

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed custom-scrollbar">
            {(chatMessages[selectedContactId] || []).map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                <div className={`max-w-[70%] group ${msg.sender === 'me' ? 'flex flex-row-reverse gap-4' : 'flex gap-4'}`}>
                   <div className="space-y-2">
                    <div className={`p-4 shadow-xl ${
                      msg.sender === 'me' 
                        ? 'bg-primary text-white rounded-t-[1.5rem] rounded-bl-[1.5rem] shadow-primary/20' 
                        : 'bg-white text-on-surface rounded-t-[1.5rem] rounded-br-[1.5rem] border border-slate-50'
                    }`}>
                      <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                    </div>
                    <div className={`flex items-center gap-2 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{msg.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start animate-in fade-in duration-300">
                <div className="bg-white p-4 rounded-t-2xl rounded-br-2xl border border-slate-100 flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </div>

          <footer className="p-8 border-t border-slate-100 bg-white shadow-2xl relative z-10">
            <div className="flex items-center gap-6">
              <div className="flex-1 relative">
                <textarea 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  rows={1}
                  placeholder="请输入您的回复..." 
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 pr-16 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium resize-none shadow-inner"
                />
              </div>
              <ModernButton onClick={handleSend} variant="primary" size="md" className="rounded-2xl w-14 h-14 !p-0 shadow-xl shadow-primary/20">
                <Send size={24} />
              </ModernButton>
            </div>
          </footer>
        </section>
      </main>

      <BottomNav activeTab="messages" />
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
