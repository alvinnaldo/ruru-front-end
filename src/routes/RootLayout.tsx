import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Bell, User, Menu, Sparkles } from 'lucide-react';

export function RootLayout() {
  const [isLeftNavOpen, setIsLeftNavOpen] = useState(true);
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden transition-colors duration-200">

      {/* Navigation Rail (Left Sidebar) */}
      <aside 
        className={`overflow-hidden flex-shrink-0 flex flex-col bg-[var(--color-background-light)] transition-all duration-300 ease-in-out ${
          isLeftNavOpen ? 'w-[260px] border-r border-[var(--color-border-light)]' : 'w-0'
        }`}
      >
        <div className="p-4 flex items-center h-16 border-b border-[var(--color-border-light)] min-w-[260px]">
          <span className="font-bold text-xl tracking-tight">Ruru</span>
        </div>
        <nav className="flex-1 p-4 overflow-y-auto min-w-[260px]">
          <ul className="space-y-2">
            <li>
              <NavLink 
                to="/dashboard"
                end
                className={({ isActive }) => `block w-full text-left px-3 py-2 rounded-md font-medium text-sm transition-colors ${isActive ? 'bg-[var(--color-primary)] text-white' : 'hover:bg-black/5 text-[var(--color-text-light)]'}`}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/dashboard/taskboard"
                className={({ isActive }) => `block w-full text-left px-3 py-2 rounded-md font-medium text-sm transition-colors ${isActive ? 'bg-[var(--color-primary)] text-white' : 'hover:bg-black/5 text-[var(--color-text-light)]'}`}
              >
                Taskboard
              </NavLink>
            </li>
            <li>
              <button className="w-full text-left px-3 py-2 rounded-md hover:bg-black/5 font-medium text-sm transition-colors">
                Chat
              </button>
            </li>
            <li>
              <button className="w-full text-left px-3 py-2 rounded-md hover:bg-black/5 font-medium text-sm transition-colors">
                Team
              </button>
            </li>
            <li>
              <button className="w-full text-left px-3 py-2 rounded-md hover:bg-black/5 font-medium text-sm transition-colors">
                Timeline
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[var(--color-surface-light)] min-w-0">
        {/* Top Navigation Bar */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-[var(--color-border-light)] flex-shrink-0 bg-[var(--color-background-light)]">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsLeftNavOpen(!isLeftNavOpen)}
              className="p-2 -ml-2 rounded-md hover:bg-black/5 text-[var(--color-text-light)]/70 transition-colors"
              aria-label="Toggle navigation menu"
            >
              <Menu size={20} />
            </button>
            
            {/* Workspace Switcher */}
            <select className="bg-transparent border border-[var(--color-border-light)] rounded-md px-3 py-1.5 text-sm font-medium focus:outline-none focus:border-[var(--color-primary)] cursor-pointer">
              <option>Default Workspace</option>
              <option>Project Alpha</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsAiPanelOpen(!isAiPanelOpen)}
              className={`p-2 rounded-md transition-colors ${isAiPanelOpen ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'hover:bg-black/5 text-[var(--color-text-light)]/70'}`}
              aria-label="Toggle AI panel"
            >
              <Sparkles size={20} />
            </button>

            <div className="w-px h-6 bg-[var(--color-border-light)] mx-1"></div>

            <button className="p-2 rounded-full hover:bg-black/5 transition-colors" aria-label="Notifications">
              <div className="relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-[var(--color-accent)] rounded-full border border-[var(--color-background-light)]"></span>
              </div>
            </button>
            <button className="p-1 rounded-full bg-black/5 overflow-hidden" aria-label="User profile">
              <User size={24} className="opacity-70" />
            </button>
          </div>
        </header>

        {/* Main Content Wrapper */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 relative min-w-0 flex flex-col">
          <Outlet />
        </main>
      </div>

      {/* Right-Hand Sidebar (AI Assistant) */}
      <aside 
        className={`overflow-hidden flex-shrink-0 flex flex-col bg-[var(--color-background-light)] transition-all duration-300 ease-in-out ${
          isAiPanelOpen ? 'w-[320px] border-l border-[var(--color-border-light)]' : 'w-0'
        }`}
      >
        <div className="p-4 border-b border-[var(--color-border-light)] h-16 flex items-center min-w-[320px]">
          <Sparkles className="w-5 h-5 text-[var(--color-primary)] mr-2" />
          <span className="font-semibold">Ruru AI</span>
        </div>
        <div className="flex-1 p-4 overflow-y-auto min-w-[320px]">
          {/* AI Chat content placeholder */}
          <div className="flex flex-col gap-4">
            <div className="bg-[var(--color-surface-light)] p-3 rounded-lg rounded-tl-none border border-[var(--color-border-light)] text-sm shadow-sm">
              Hello! I'm Ruru, your AI assistant. How can I help you with your project today?
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-[var(--color-border-light)] bg-[var(--color-surface-light)] min-w-[320px]">
          <div className="relative">
            <input
              type="text"
              placeholder="Ask Ruru..."
              className="w-full pl-3 pr-10 py-2 rounded-md border border-[var(--color-border-light)] bg-transparent focus:outline-none focus:border-[var(--color-primary)] transition-colors text-sm"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 rounded-sm transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
            </button>
          </div>
        </div>
      </aside>

    </div>
  );
}
