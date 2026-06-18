import { useState } from 'react';
import { useChannels, useMessages } from '../hooks/useChat';
import { Hash, Lock, CircleUser, Send, Plus, Search, MoreVertical, Paperclip, Smile } from 'lucide-react';

export function ChatPage() {
  const { data: channels, isLoading: channelsLoading } = useChannels();
  const [activeChannelId, setActiveChannelId] = useState<string>('c1');
  const { data: messages, isLoading: messagesLoading } = useMessages(activeChannelId);

  const [inputText, setInputText] = useState('');

  const activeChannel = channels?.find(c => c.id === activeChannelId);

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row bg-white h-full">
      {/* Channel Sidebar */}
      <div className="w-full md:w-64 border-r border-[var(--color-border-light)] bg-slate-50/50 flex flex-col flex-shrink-0">
        <div className="h-16 flex items-center px-4 border-b border-[var(--color-border-light)] justify-between flex-shrink-0">
          <h2 className="font-semibold text-[var(--color-text-light)]">Workspace Chat</h2>
          <button className="p-1 hover:bg-black/5 rounded text-[var(--color-text-light)]/60">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 border-b border-[var(--color-border-light)]/50">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-light)]/40" />
            <input
              type="text"
              placeholder="Search channels..."
              className="w-full pl-9 pr-3 py-1.5 text-sm rounded-md border border-[var(--color-border-light)] bg-white focus:outline-none focus:border-[var(--color-primary)] transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-6">
          {channelsLoading ? (
            <div className="p-4 text-sm text-[var(--color-text-light)]/50 text-center animate-pulse">Loading channels...</div>
          ) : (
            <>
              {/* Public Channels */}
              <div>
                <h3 className="px-2 text-xs font-semibold text-[var(--color-text-light)]/40 uppercase tracking-wider mb-2">Channels</h3>
                <div className="space-y-0.5">
                  {channels?.filter(c => c.type !== 'direct').map(channel => (
                    <button
                      key={channel.id}
                      onClick={() => setActiveChannelId(channel.id)}
                      className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md text-sm transition-colors ${activeChannelId === channel.id ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-medium' : 'hover:bg-black/5 text-[var(--color-text-light)]/70'}`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        {channel.type === 'private' ? <Lock className="w-4 h-4 opacity-70" /> : <Hash className="w-4 h-4 opacity-70" />}
                        <span className="truncate">{channel.name}</span>
                      </div>
                      {channel.unreadCount && (
                        <span className="px-1.5 py-0.5 bg-[var(--color-primary)] text-white text-[10px] font-bold rounded-full">
                          {channel.unreadCount}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct Messages */}
              <div>
                <h3 className="px-2 text-xs font-semibold text-[var(--color-text-light)]/40 uppercase tracking-wider mb-2">Direct Messages</h3>
                <div className="space-y-0.5">
                  {channels?.filter(c => c.type === 'direct').map(channel => (
                    <button
                      key={channel.id}
                      onClick={() => setActiveChannelId(channel.id)}
                      className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md text-sm transition-colors ${activeChannelId === channel.id ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-medium' : 'hover:bg-black/5 text-[var(--color-text-light)]/70'}`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <CircleUser className="w-4 h-4 opacity-70" />
                        <span className="truncate">{channel.name}</span>
                      </div>
                      {channel.unreadCount && (
                        <span className="px-1.5 py-0.5 bg-[var(--color-primary)] text-white text-[10px] font-bold rounded-full">
                          {channel.unreadCount}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        {/* Chat Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-[var(--color-border-light)] flex-shrink-0">
          <div className="flex items-center gap-3">
            {activeChannel?.type === 'private' ? <Lock className="w-5 h-5 text-[var(--color-text-light)]/50" /> :
              activeChannel?.type === 'direct' ? <CircleUser className="w-5 h-5 text-[var(--color-text-light)]/50" /> :
                <Hash className="w-5 h-5 text-[var(--color-text-light)]/50" />}
            <div>
              <h3 className="font-semibold">{activeChannel?.name || 'Select a channel'}</h3>
              {activeChannel?.type !== 'direct' && <p className="text-xs text-[var(--color-text-light)]/50">3 members</p>}
            </div>
          </div>
          <button className="p-2 hover:bg-black/5 rounded-md text-[var(--color-text-light)]/50 transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messagesLoading ? (
            <div className="h-full flex items-center justify-center text-[var(--color-text-light)]/40">Loading messages...</div>
          ) : messages && messages.length > 0 ? (
            messages.map((msg) => {
              const isCurrentUser = msg.userId === 'u1'; // Mock current user ID
              return (
                <div key={msg.id} className={`flex gap-4 ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center font-bold flex-shrink-0 text-sm border border-[var(--color-primary)]/20">
                    {msg.userName.substring(0, 2).toUpperCase()}
                  </div>
                  <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'} max-w-[70%]`}>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-semibold text-sm">{msg.userName}</span>
                      <span className="text-xs text-[var(--color-text-light)]/40">{formatTime(msg.timestamp)}</span>
                    </div>
                    <div className={`px-4 py-2.5 rounded-2xl text-sm shadow-sm ${isCurrentUser ? 'bg-[var(--color-primary)] text-white rounded-tr-none' : 'bg-slate-100 text-[var(--color-text-light)] rounded-tl-none border border-[var(--color-border-light)]/50'}`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-[var(--color-text-light)]/40 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-2">
                <Hash className="w-8 h-8 opacity-20" />
              </div>
              <p className="font-medium">Welcome to the beginning of the <span className="font-bold">#{activeChannel?.name}</span> channel.</p>
              <p className="text-sm">This is the start of your conversation.</p>
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-[var(--color-border-light)] bg-slate-50/30">
          <div className="bg-white border border-[var(--color-border-light)] rounded-xl flex flex-col shadow-sm focus-within:border-[var(--color-primary)] focus-within:ring-1 focus-within:ring-[var(--color-primary)] transition-all">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Message ${activeChannel?.type === 'direct' ? '' : '#'}${activeChannel?.name}...`}
              className="w-full px-4 py-3 bg-transparent border-none resize-none focus:outline-none text-sm min-h-[80px]"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (inputText.trim()) {
                    // Trigger mock send message
                    setInputText('');
                  }
                }
              }}
            />
            <div className="px-3 py-2 border-t border-[var(--color-border-light)]/50 flex items-center justify-between bg-slate-50/50 rounded-b-xl">
              <div className="flex items-center gap-1">
                <button className="p-1.5 hover:bg-black/5 rounded text-[var(--color-text-light)]/50 transition-colors tooltip" title="Attach file">
                  <Paperclip className="w-4 h-4" />
                </button>
                <button className="p-1.5 hover:bg-black/5 rounded text-[var(--color-text-light)]/50 transition-colors tooltip" title="Add emoji">
                  <Smile className="w-4 h-4" />
                </button>
              </div>
              <button
                className={`p-1.5 rounded-md transition-all flex items-center gap-2 px-3 text-sm font-medium ${inputText.trim() ? 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] shadow-sm' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
          </div>
          <div className="text-center mt-2 flex justify-between items-center px-1">
            <p className="text-[10px] text-[var(--color-text-light)]/40 font-medium"><strong>Return</strong> to send, <strong>Shift + Return</strong> for new line</p>
          </div>
        </div>
      </div>

    </div>
  );
}
