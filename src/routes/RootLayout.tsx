import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Bell, User, Menu, Sparkles, Plus } from 'lucide-react';
import { AIAssistant } from '../features/workspace/components/AIAssistant';

export function RootLayout() {
  const [isLeftNavOpen, setIsLeftNavOpen] = useState(true);
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden transition-colors duration-200">

      {/* Navigation Rail (Left Sidebar) */}
      <aside
        className={`overflow-hidden flex-shrink-0 flex flex-col bg-[var(--color-background-light)] transition-all duration-300 ease-in-out ${isLeftNavOpen ? 'w-[260px] border-r border-[var(--color-border-light)]' : 'w-0'
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
              <NavLink 
                to="/dashboard/chat"
                className={({ isActive }) => `block w-full text-left px-3 py-2 rounded-md font-medium text-sm transition-colors ${isActive ? 'bg-[var(--color-primary)] text-white' : 'hover:bg-black/5 text-[var(--color-text-light)]'}`}
              >
                Chat
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/dashboard/team"
                className={({ isActive }) => `block w-full text-left px-3 py-2 rounded-md font-medium text-sm transition-colors ${isActive ? 'bg-[var(--color-primary)] text-white' : 'hover:bg-black/5 text-[var(--color-text-light)]'}`}
              >
                Team
              </NavLink>
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
            <div className="flex items-center gap-2">
              <select className="bg-transparent border border-[var(--color-border-light)] rounded-md px-3 py-1.5 text-sm font-medium focus:outline-none focus:border-[var(--color-primary)] cursor-pointer">
                <option>Default Workspace</option>
                <option>Project Alpha</option>
              </select>
              <button 
                className="p-1.5 rounded-md border border-dashed border-[var(--color-border-light)] hover:bg-[var(--color-primary)]/5 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/50 text-[var(--color-text-light)]/60 transition-colors tooltip"
                title="Add Workspace"
              >
                <Plus size={16} />
              </button>
            </div>
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
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative min-w-0 flex flex-col">
          <Outlet />
        </main>
      </div>

      {/* Right-Hand Sidebar (AI Assistant) */}
      <AIAssistant isOpen={isAiPanelOpen} />

    </div>
  );
}
