"use client";

import React, { useState } from "react";
import {
  IconSearch,
  IconSend,
  IconPlus,
  IconDotsVertical,
  IconX,
} from "@tabler/icons-react";

interface Message {
  id: string;
  text: string;
  time: string;
  isMe: boolean;
}

interface Conversation {
  id: string;
  user: {
    name: string;
    role: "Parent" | "Agent" | "Academy";
    avatar: string;
  };
  lastMessage: string;
  time: string;
  unreadCount?: number;
}

const roleColors: Record<string, string> = {
  Parent: "text-blue-400",
  Agent: "text-yellow-400",
  Academy: "text-green-400",
};

const roleBadgeColors: Record<string, string> = {
  Parent: "bg-blue-500/10 text-blue-400",
  Agent: "bg-yellow-500/10 text-yellow-400",
  Academy: "bg-green-500/10 text-green-400",
};

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
    user: { name: "James Harper", role: "Agent", avatar: "https://i.pravatar.cc/100?u=james" },
    lastMessage: "We can arrange a trial next week.",
    time: "45 mins ago",
    unreadCount: 1,
  },
  {
    id: "3",
    user: { name: "Santos Academy", role: "Academy", avatar: "https://i.pravatar.cc/100?u=santos" },
    lastMessage: "Interested in a partnership agreement.",
    time: "2 hours ago",
  },
  {
    id: "4",
    user: { name: "Linda Chen", role: "Parent", avatar: "https://i.pravatar.cc/100?u=linda" },
    lastMessage: "When is the next training session?",
    time: "3 hours ago",
  },
  {
    id: "5",
    user: { name: "Marco Ricci", role: "Agent", avatar: "https://i.pravatar.cc/100?u=marco" },
    lastMessage: "The player is open to offers.",
    time: "Yesterday",
  },
  {
    id: "6",
    user: { name: "Ajax Youth Academy", role: "Academy", avatar: "https://i.pravatar.cc/100?u=ajax" },
    lastMessage: "Let's discuss the loan terms.",
    time: "Yesterday",
  },
];

const messagesByConv: Record<string, Message[]> = {
  "1": [
    { id: "1", text: "Hi, I wanted to ask about Marcus' performance.", time: "10:30 AM", isMe: false },
    { id: "2", text: "Hello! Marcus is doing great in training. His passing accuracy has improved significantly.", time: "10:32 AM", isMe: true },
    { id: "3", text: "That's wonderful to hear! Thanks for the update.", time: "10:35 AM", isMe: false },
  ],
  "2": [
    { id: "1", text: "We represent David Chen and believe he would be a great fit for your club.", time: "09:00 AM", isMe: false },
    { id: "2", text: "Thanks for reaching out. We'd love to arrange a trial.", time: "09:15 AM", isMe: true },
    { id: "3", text: "We can arrange a trial next week. What dates work for you?", time: "09:20 AM", isMe: false },
  ],
  "3": [
    { id: "1", text: "We're exploring partnership opportunities with top clubs.", time: "08:00 AM", isMe: false },
    { id: "2", text: "We'd be very interested. Can you share your proposal?", time: "08:10 AM", isMe: true },
    { id: "3", text: "Interested in a partnership agreement. We'll send the docs over.", time: "08:15 AM", isMe: false },
  ],
};

const participants = [
  { id: "1", name: "Robert Silva", role: "Parent", avatar: "https://i.pravatar.cc/100?u=robert" },
  { id: "2", name: "Linda Chen", role: "Parent", avatar: "https://i.pravatar.cc/100?u=linda" },
  { id: "3", name: "James Harper", role: "Agent", avatar: "https://i.pravatar.cc/100?u=james" },
  { id: "4", name: "Marco Ricci", role: "Agent", avatar: "https://i.pravatar.cc/100?u=marco" },
  { id: "5", name: "Santos Academy", role: "Academy", avatar: "https://i.pravatar.cc/100?u=santos" },
  { id: "6", name: "Ajax Youth Academy", role: "Academy", avatar: "https://i.pravatar.cc/100?u=ajax" },
];

type FilterTab = "All" | "Parents" | "Agents" | "Academies";

export const ClubChat = () => {
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState("1");
  const [activeConv, setActiveConv] = useState("1");
  const [filterTab, setFilterTab] = useState<FilterTab>("All");
  const [inputMessage, setInputMessage] = useState("");

  const filterMap: Record<FilterTab, string | null> = {
    All: null,
    Parents: "Parent",
    Agents: "Agent",
    Academies: "Academy",
  };

  const filteredConversations = conversations.filter(
    (c) => !filterMap[filterTab] || c.user.role === filterMap[filterTab]
  );

  const activeConvData = conversations.find((c) => c.id === activeConv);
  const activeMessages = messagesByConv[activeConv] ?? [];

  const tabs: FilterTab[] = ["All", "Parents", "Agents", "Academies"];

  return (
    <div className="flex flex-col gap-6 h-full min-h-[calc(100vh-120px)]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black uppercase text-white italic tracking-tighter">Chat</h1>
          <p className="text-white/40 font-bold uppercase tracking-widest text-[11px] mt-1">
            Communicate with parents, agents &amp; academies
          </p>
        </div>
        <button
          onClick={() => setShowNewChatModal(true)}
          className="bg-[#E31B23] hover:bg-[#C2181F] text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[11px] flex items-center gap-2 transition-all shadow-lg shadow-[#E31B23]/20"
        >
          <IconPlus size={18} />
          New Chat
        </button>
      </div>

      <div className="flex flex-1 gap-6 min-h-0">
        {/* Sidebar */}
        <div className="w-[320px] bg-[#111111] rounded-3xl border border-white/10 flex flex-col overflow-hidden shrink-0">
          {/* Search */}
          <div className="p-4 pb-2">
            <div className="relative">
              <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-all"
              />
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-1 px-4 pb-3">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`flex-1 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                  filterTab === tab
                    ? "bg-[#E31B23] text-white"
                    : "bg-white/5 text-white/30 hover:text-white/60"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActiveConv(conv.id)}
                className={`w-full p-4 flex items-start gap-3 hover:bg-white/[0.03] transition-all text-left border-b border-white/[0.02] last:border-0 ${
                  conv.id === activeConv ? "bg-white/[0.04] border-l-2 border-l-[#E31B23]" : ""
                }`}
              >
                <div className="w-11 h-11 rounded-full overflow-hidden border border-white/10 shrink-0">
                  <img src={conv.user.avatar} alt={conv.user.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <h3 className="text-sm font-bold text-white truncate">{conv.user.name}</h3>
                    <span className="text-[9px] text-white/20 font-bold uppercase shrink-0 ml-1">{conv.time}</span>
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${roleBadgeColors[conv.user.role]}`}>
                    {conv.user.role}
                  </span>
                  <p className="text-[11px] text-white/40 truncate leading-relaxed mt-1">{conv.lastMessage}</p>
                </div>
                {conv.unreadCount && (
                  <div className="w-5 h-5 bg-[#E31B23] rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0">
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
            {activeConvData && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0">
                  <img src={activeConvData.user.avatar} alt={activeConvData.user.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{activeConvData.user.name}</h3>
                  <p className={`text-[10px] font-black uppercase tracking-widest ${roleColors[activeConvData.user.role]}`}>
                    {activeConvData.user.role}
                  </p>
                </div>
              </div>
            )}
            <button className="text-white/20 hover:text-white transition-colors">
              <IconDotsVertical size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
            {activeMessages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.isMe ? "items-end" : "items-start"}`}>
                <div
                  className={`max-w-[70%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.isMe
                      ? "bg-[#E31B23] text-white rounded-tr-none shadow-lg shadow-[#E31B23]/10"
                      : "bg-white/5 text-white/80 rounded-tl-none border border-white/10"
                  }`}
                >
                  {msg.text}
                  <div className={`text-[9px] mt-2 font-bold uppercase ${msg.isMe ? "text-white/60" : "text-white/20"}`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            <div className="relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type a message..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-all"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#E31B23] hover:bg-[#C2181F] rounded-xl flex items-center justify-center text-white transition-all shadow-lg shadow-[#E31B23]/20">
                <IconSend size={18} />
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
              <h2 className="text-2xl font-black uppercase text-white italic tracking-tight">New Chat</h2>
              <button
                onClick={() => setShowNewChatModal(false)}
                className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-all"
              >
                <IconX size={20} />
              </button>
            </div>

            <div className="p-8">
              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/40">Select Participant</label>
                <div className="flex flex-col gap-2 max-h-[260px] overflow-y-auto pr-1">
                  {participants.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedParticipant(p.id)}
                      className={`p-3 rounded-xl border flex items-center gap-3 transition-all text-left ${
                        selectedParticipant === p.id
                          ? "bg-[#E31B23]/5 border-[#E31B23] text-white"
                          : "bg-white/[0.02] border-white/10 text-white hover:border-white/20"
                      }`}
                    >
                      <div className="w-9 h-9 rounded-full overflow-hidden border border-white/10 shrink-0">
                        <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold">{p.name}</p>
                      </div>
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${roleBadgeColors[p.role]}`}>
                        {p.role}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 pt-0 flex justify-end gap-4">
              <button
                onClick={() => setShowNewChatModal(false)}
                className="px-6 py-3 rounded-xl border border-white/10 text-[11px] font-black uppercase tracking-widest text-white hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
              <button className="px-6 py-3 rounded-xl bg-[#E31B23] hover:bg-[#C2181F] text-[11px] font-black uppercase tracking-widest text-white transition-all shadow-lg shadow-[#E31B23]/20">
                Start Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubChat;
