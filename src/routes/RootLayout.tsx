import { Outlet } from 'react-router-dom';
import { Bell, User } from 'lucide-react';

export function RootLayout() {

  return (
    <div className="flex h-screen overflow-hidden transition-colors duration-200">

      {/* Navigation Rail (Left Sidebar) */}
      <aside className="w-[260px] border-r border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] flex-shrink-0 flex flex-col bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)]">
        <div className="p-4 flex items-center h-16 border-b border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]">
          <span className="font-bold text-xl tracking-tight">Ruru</span>
        </div>
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            <li>
              <button className="w-full text-left px-3 py-2 rounded-md bg-[var(--color-primary)] text-white font-medium text-sm">
                Dashboard
              </button>
            </li>
            <li>
              <button className="w-full text-left px-3 py-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 font-medium text-sm transition-colors">
                Taskboard
              </button>
            </li>
            <li>
              <button className="w-full text-left px-3 py-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 font-medium text-sm transition-colors">
                Chat
              </button>
            </li>
            <li>
              <button className="w-full text-left px-3 py-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 font-medium text-sm transition-colors">
                Team
              </button>
            </li>
            <li>
              <button className="w-full text-left px-3 py-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 font-medium text-sm transition-colors">
                Timeline
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)]">
        {/* Top Navigation Bar */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] flex-shrink-0 bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)]">
          <div className="flex items-center gap-4">
            {/* Workspace Switcher */}
            <select className="bg-transparent border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] rounded-md px-3 py-1.5 text-sm font-medium focus:outline-none focus:border-[var(--color-primary)] cursor-pointer">
              <option>Default Workspace</option>
              <option>Project Alpha</option>
            </select>
          </div>

          <div className="flex items-center gap-4">

            <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors" aria-label="Notifications">
              <div className="relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-[var(--color-accent)] rounded-full border border-[var(--color-background-light)] dark:border-[var(--color-background-dark)]"></span>
              </div>
            </button>
            <button className="p-1 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden" aria-label="User profile">
              <User size={24} className="opacity-70" />
            </button>
          </div>
        </header>

        {/* Main Content Wrapper */}
        <main className="flex-1 overflow-auto p-6 relative">
          <Outlet />
        </main>
      </div>

      {/* Right-Hand Sidebar (AI Assistant) */}
      <aside className="w-[320px] border-l border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] flex-shrink-0 flex flex-col bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)]">
        <div className="p-4 border-b border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] h-16 flex items-center">
          <span className="font-semibold">Ruru AI</span>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          {/* AI Chat content placeholder */}
          <div className="flex flex-col gap-4">
            <div className="bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] p-3 rounded-lg rounded-tl-none border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] text-sm shadow-sm">
              Hello! I'm Ruru, your AI assistant. How can I help you with your project today?
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)]">
          <div className="relative">
            <input
              type="text"
              placeholder="Ask Ruru..."
              className="w-full pl-3 pr-10 py-2 rounded-md border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] bg-transparent focus:outline-none focus:border-[var(--color-primary)] transition-colors text-sm"
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
