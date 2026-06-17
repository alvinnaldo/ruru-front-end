import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="min-h-screen w-full bg-[var(--color-background-light)] flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-[var(--color-primary)] rounded-xl flex items-center justify-center shadow-lg shadow-[var(--color-primary)]/20 mb-4">
            <span className="text-white font-bold text-2xl tracking-tighter">R</span>
          </div>
          <h1 className="text-3xl font-bold text-[var(--color-text-light)] tracking-tight">Ruru</h1>
          <p className="text-[var(--color-text-light)]/60 mt-2 text-sm text-center">
            Your workspace, streamlined.
          </p>
        </div>
        
        {/* Container for the Auth Form */}
        <div className="bg-[var(--color-surface-light)] rounded-2xl shadow-xl shadow-slate-200/50 border border-[var(--color-border-light)] overflow-hidden">
          <Outlet />
        </div>
        
        <div className="mt-8 text-center text-sm text-[var(--color-text-light)]/50">
          &copy; {new Date().getFullYear()} Ruru. All rights reserved.
        </div>
      </div>
    </div>
  );
}
