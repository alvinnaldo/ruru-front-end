import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Bell, User, Menu, Sparkles, Plus, Settings, LogOut } from 'lucide-react';
import { AIAssistant } from '../features/workspace/components/AIAssistant';
import { useClickOutside } from '../hooks/useClickOutside';

export function RootLayout() {
  const [isLeftNavOpen, setIsLeftNavOpen] = useState(true);
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);

  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const workspaceRef = useClickOutside<HTMLDivElement>(() => setIsWorkspaceOpen(false));
  const notificationsRef = useClickOutside<HTMLDivElement>(() => setIsNotificationsOpen(false));
  const profileRef = useClickOutside<HTMLDivElement>(() => setIsProfileOpen(false));

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
              <NavLink 
                to="/dashboard/timeline"
                className={({ isActive }) => `block w-full text-left px-3 py-2 rounded-md font-medium text-sm transition-colors ${isActive ? 'bg-[var(--color-primary)] text-white' : 'hover:bg-black/5 text-[var(--color-text-light)]'}`}
              >
                Timeline
              </NavLink>
            </li>
            <div className="pt-4 mt-4 border-t border-[var(--color-border-light)]">
              <li>
                <NavLink 
                  to="/dashboard/invitations"
                  className={({ isActive }) => `block w-full text-left px-3 py-2 mb-1 rounded-md font-medium text-sm transition-colors ${isActive ? 'bg-[var(--color-primary)] text-white' : 'hover:bg-black/5 text-[var(--color-text-light)]'}`}
                >
                  Invitations
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/dashboard/settings"
                  className={({ isActive }) => `block w-full text-left px-3 py-2 rounded-md font-medium text-sm transition-colors ${isActive ? 'bg-[var(--color-primary)] text-white' : 'hover:bg-black/5 text-[var(--color-text-light)]'}`}
                >
                  Settings
                </NavLink>
              </li>
            </div>
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
              
              <div className="relative" ref={workspaceRef}>
                <button 
                  onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
                  className="p-1.5 rounded-md border border-dashed border-[var(--color-border-light)] hover:bg-[var(--color-primary)]/5 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/50 text-[var(--color-text-light)]/60 transition-colors tooltip"
                  title="Add Workspace"
                >
                  <Plus size={16} />
                </button>
                
                {isWorkspaceOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-[var(--color-border-light)] p-4 z-50 animate-in fade-in zoom-in-95 duration-200">
                    <h3 className="text-sm font-semibold mb-3">Create New Workspace</h3>
                    <input 
                      type="text" 
                      placeholder="Workspace Name" 
                      className="w-full px-3 py-2 text-sm border border-[var(--color-border-light)] rounded-md mb-3 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                    />
                    <button className="w-full bg-[var(--color-primary)] text-white text-sm font-medium py-2 rounded-md hover:opacity-90 transition-opacity">
                      Create Workspace
                    </button>
                  </div>
                )}
              </div>
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

            <div className="relative" ref={notificationsRef}>
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`p-2 rounded-full transition-colors ${isNotificationsOpen ? 'bg-black/5' : 'hover:bg-black/5'}`} 
                aria-label="Notifications"
              >
                <div className="relative">
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-[var(--color-accent)] rounded-full border border-[var(--color-background-light)]"></span>
                </div>
              </button>
              
              {isNotificationsOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-[var(--color-border-light)] z-50 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                  <div className="p-4 border-b border-[var(--color-border-light)]">
                    <h3 className="text-sm font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto p-2">
                    <div className="p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors mb-1">
                      <p className="text-sm text-[var(--color-text-light)]"><span className="font-semibold text-[var(--color-primary)]">Alvin</span> mentioned you in <span className="font-medium">Project Alpha</span></p>
                      <span className="text-xs text-[var(--color-text-light)]/50 mt-1 block">10 mins ago</span>
                    </div>
                    <div className="p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
                      <p className="text-sm text-[var(--color-text-light)]">New task assigned to you: <span className="font-medium">Design System</span></p>
                      <span className="text-xs text-[var(--color-text-light)]/50 mt-1 block">1 hour ago</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`p-1 rounded-full overflow-hidden border-2 transition-colors ${isProfileOpen ? 'border-[var(--color-primary)]' : 'border-transparent hover:border-[var(--color-border-light)] bg-black/5'}`} 
                aria-label="User profile"
              >
                <User size={24} className="opacity-70" />
              </button>

              {isProfileOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-[var(--color-border-light)] z-50 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                  <div className="p-4 border-b border-[var(--color-border-light)] flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex flex-shrink-0 items-center justify-center text-lg font-bold">
                      AN
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold truncate">Alvin Naldo</h3>
                      <p className="text-xs text-[var(--color-text-light)]/60 truncate">alvin@example.com</p>
                    </div>
                  </div>
                  <div className="p-2">
                    <NavLink 
                      to="/dashboard/settings"
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full flex items-center px-3 py-2 text-sm text-[var(--color-text-light)] hover:bg-slate-50 rounded-md transition-colors"
                    >
                      <Settings className="w-4 h-4 mr-2 text-[var(--color-text-light)]/70" />
                      Profile Settings
                    </NavLink>
                    <button className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors mt-1">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
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
