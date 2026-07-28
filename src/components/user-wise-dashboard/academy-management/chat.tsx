"use client";

import React, { useState } from "react";
import { 
  IconSearch, 
  IconSend, 
  IconPlus, 
  IconDotsVertical, 
  IconX,
  IconUser,
  IconUsers
} from "@tabler/icons-react";

interface Message {
  id: string;
  senderId: string;
  text: string;
  time: string;
  isMe: boolean;
}

interface Conversation {
  id: string;
  user: {
    name: string;
    role: string;
    avatar: string;
  };
  lastMessage: string;
  time: string;
  unreadCount?: number;
}

const conversations: Conversation[] = [
  {
    id: "1",
    user: { name: "Robert Silva", role: "Parent", avatar: "https://i.pravatar.cc/100?u=robert" },
    lastMessage: "Thanks for the update on Marcus..",
    time: "10 mins ago",
    unreadCount: 2,
  },
  {
    id: "2",
    user: { name: "Linda Chen", role: "Parent", avatar: "https://i.pravatar.cc/100?u=linda" },
    lastMessage: "When is the next training session?",
    time: "1 hour ago",
  },
  {
    id: "3",
    user: { name: "Michael Jordan", role: "Parent", avatar: "https://i.pravatar.cc/100?u=michael" },
    lastMessage: "I have a question about the fees",
    time: "2 hours ago",
    unreadCount: 1,
  },
];

const messages: Message[] = [
  { id: "1", senderId: "robert", text: "Hi, I wanted to ask about Marcus' performance.", time: "10:30 AM", isMe: false },
  { id: "2", senderId: "me", text: "Hello! Marcus is doing great in training. His passing accuracy has improved significantly.", time: "10:32 AM", isMe: true },
  { id: "3", senderId: "robert", text: "That's wonderful to hear! Thanks for the update.", time: "10:35 AM", isMe: false },
];

const participants = [
  { id: "1", name: "Robert Silva", role: "Parent", avatar: "https://i.pravatar.cc/100?u=robert" },
  { id: "2", name: "Linda Chen", role: "Parent", avatar: "https://i.pravatar.cc/100?u=linda" },
  { id: "3", name: "Michael Jordan", role: "Parent", avatar: "https://i.pravatar.cc/100?u=michael" },
  { id: "4", name: "David Martinez", role: "Parent", avatar: "https://i.pravatar.cc/100?u=david" },
];

const AcademyChat = () => {
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [chatType, setChatType] = useState<"individual" | "group">("individual");
  const [selectedParticipant, setSelectedParticipant] = useState("1");

  return (
    <div className="flex flex-col gap-6 h-full min-h-[calc(100vh-120px)]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black uppercase text-white font-orbitron tracking-tight">Chat</h1>
          <p className="text-white/40 font-bold uppercase tracking-widest text-[11px] mt-1">Communicate with parents and staff</p>
        </div>
        <button 
          onClick={() => setShowNewChatModal(true)}
          className="bg-[#E31B23] hover:bg-[#C2181F] text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[11px] flex items-center gap-2 transition-all shadow-lg shadow-[#E31B23]/20"
        >
          <IconPlus size={18} />
          Create New Chat
        </button>
      </div>

      <div className="flex flex-1 gap-6 min-h-0">
        {/* Sidebar */}
        <div className="w-[320px] bg-[#111111] rounded-3xl border border-white/10 flex flex-col overflow-hidden">
          <div className="p-4">
            <div className="relative">
              <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                type="text" 
                placeholder="Search conversations..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-all"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {conversations.map((conv) => (
              <button 
                key={conv.id}
                className={`w-full p-4 flex items-start gap-3 hover:bg-white/[0.03] transition-all text-left border-b border-white/[0.02] last:border-0 ${conv.id === "1" ? "bg-white/[0.03]" : ""}`}
              >
                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 shrink-0">
                  <img src={conv.user.avatar} alt={conv.user.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <h3 className="text-sm font-bold text-white truncate">{conv.user.name}</h3>
                    <span className="text-[10px] text-white/20 font-bold uppercase">{conv.time}</span>
                  </div>
                  <p className="text-[11px] text-white/40 truncate leading-relaxed">{conv.lastMessage}</p>
                </div>
                {conv.unreadCount && (
                  <div className="w-5 h-5 bg-[#E31B23] rounded-full flex items-center justify-center text-[10px] font-black text-white ml-2">
                    {conv.unreadCount}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-[#111111] rounded-3xl border border-white/10 flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0">
                <img src="https://i.pravatar.cc/100?u=robert" alt="Robert Silva" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Robert Silva</h3>
                <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">Parent</p>
              </div>
            </div>
            <button className="text-white/20 hover:text-white transition-colors">
              <IconDotsVertical size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.isMe ? "items-end" : "items-start"}`}>
                <div className={`max-w-[70%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.isMe 
                    ? "bg-[#E31B23] text-white rounded-tr-none shadow-lg shadow-[#E31B23]/10" 
                    : "bg-white/5 text-white/80 rounded-tl-none border border-white/10"
                }`}>
                  {msg.text}
                  <div className={`text-[9px] mt-2 font-bold uppercase ${msg.isMe ? "text-white/60" : "text-white/20"}`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/10">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Type a message..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/10 transition-all"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#E31B23] hover:bg-[#C2181F] rounded-xl flex items-center justify-center text-white transition-all shadow-lg shadow-[#E31B23]/20">
                <IconSend size={18} className="fill-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* New Chat Modal */}
      {showNewChatModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowNewChatModal(false)} />
          
          <div className="relative w-full max-w-lg bg-[#111111] rounded-[32px] border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="p-8 pb-4 flex justify-between items-center border-b border-white/10">
              <h2 className="text-2xl font-black uppercase text-white font-orbitron tracking-tight">Create New Chat</h2>
              <button 
                onClick={() => setShowNewChatModal(false)}
                className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-all"
              >
                <IconX size={20} />
              </button>
            </div>

            <div className="p-8 flex flex-col gap-8">
              {/* Chat Type Selection */}
              <div className="space-y-4">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/40">Chat Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setChatType("individual")}
                    className={`p-6 rounded-2xl border flex flex-col items-center gap-3 transition-all ${
                      chatType === "individual" 
                        ? "bg-[#E31B23]/5 border-[#E31B23] text-white" 
                        : "bg-white/5 border-white/10 text-white/40 hover:border-white/10"
                    }`}
                  >
                    <IconUser size={24} className={chatType === "individual" ? "text-[#E31B23]" : ""} />
                    <div className="text-center">
                      <p className="text-sm font-bold uppercase tracking-tight">Individual Chat</p>
                      <p className="text-[10px] font-medium opacity-60">Chat with one person</p>
                    </div>
                  </button>
                  <button 
                    onClick={() => setChatType("group")}
                    className={`p-6 rounded-2xl border flex flex-col items-center gap-3 transition-all ${
                      chatType === "group" 
                        ? "bg-[#E31B23]/5 border-[#E31B23] text-white" 
                        : "bg-white/5 border-white/10 text-white/40 hover:border-white/10"
                    }`}
                  >
                    <IconUsers size={24} className={chatType === "group" ? "text-[#E31B23]" : ""} />
                    <div className="text-center">
                      <p className="text-sm font-bold uppercase tracking-tight">Group Chat</p>
                      <p className="text-[10px] font-medium opacity-60">Chat with multiple people</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Participant Selection */}
              <div className="space-y-4">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/40">Select Participants (Select 1)</label>
                <div className="flex flex-col gap-2 max-h-[240px] overflow-y-auto custom-scrollbar pr-2">
                  {participants.map((p) => (
                    <button 
                      key={p.id}
                      onClick={() => setSelectedParticipant(p.id)}
                      className={`p-3 rounded-xl border flex items-center gap-3 transition-all text-left ${
                        selectedParticipant === p.id 
                          ? "bg-[#E31B23]/5 border-[#E31B23] text-white" 
                          : "bg-white/[0.02] border-white/10 text-white hover:border-white/10"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0">
                        <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{p.name}</p>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{p.role}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 border-t border-white/5 flex justify-end gap-4">
              <button 
                onClick={() => setShowNewChatModal(false)}
                className="px-8 py-3 rounded-xl border border-white/10 text-[11px] font-black uppercase tracking-widest text-white hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
              <button className="px-8 py-3 rounded-xl bg-[#E31B23] hover:bg-[#C2181F] text-[11px] font-black uppercase tracking-widest text-white transition-all shadow-lg shadow-[#E31B23]/20">
                Create Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademyChat;