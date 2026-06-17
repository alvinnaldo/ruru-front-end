import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Layout, MessageSquare, Zap, Shield, ArrowRight, CheckCircle2 } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background-light)] selection:bg-[var(--color-primary)] selection:text-white flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-[var(--color-border-light)] bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--color-primary)] rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-lg tracking-tighter">R</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-[var(--color-text-light)]">Ruru</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-[var(--color-text-light)]/80 hover:text-[var(--color-primary)] transition-colors">
              Log in
            </Link>
            <Link to="/register">
              <Button variant="primary">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32">
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-primary)]/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-accent)]/5 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-8 border border-[var(--color-primary)]/20">
            <span className="flex h-2 w-2 rounded-full bg-[var(--color-primary)]"></span>
            Ruru 2.0 is now live
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[var(--color-text-light)] max-w-4xl leading-tight">
            Manage projects with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[#6bd8cb]">absolute clarity.</span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-[var(--color-text-light)]/60 max-w-2xl">
            Ruru brings your tasks, chat, and AI assistant into one highly visual, beautifully organized workspace. Stop searching, start building.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link to="/register" className="w-full sm:w-auto">
              <Button variant="primary" className="h-14 px-8 text-base shadow-lg shadow-[var(--color-primary)]/25 hover:shadow-xl hover:shadow-[var(--color-primary)]/30 w-full">
                Start for free <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/login" className="w-full sm:w-auto">
              <Button variant="outline" className="h-14 px-8 text-base w-full bg-white">
                View Demo
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 flex items-center gap-6 text-sm text-[var(--color-text-light)]/50 font-medium">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[var(--color-primary)]" /> No credit card required</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[var(--color-primary)]" /> Cancel anytime</div>
          </div>
        </div>
      </section>

      {/* App Preview Mockup */}
      <section className="max-w-6xl mx-auto px-6 -mt-12 mb-32 relative z-10">
        <div className="rounded-2xl border border-[var(--color-border-light)] bg-white/50 backdrop-blur-xl shadow-2xl p-2 overflow-hidden transform transition-transform hover:scale-[1.01] duration-500">
          <div className="rounded-xl border border-[var(--color-border-light)] bg-[var(--color-background-light)] h-[500px] flex flex-col overflow-hidden">
            <div className="h-12 border-b border-[var(--color-border-light)] flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="ml-4 w-64 h-6 rounded-md bg-white border border-[var(--color-border-light)] flex items-center px-2">
                <div className="w-4 h-4 rounded-full bg-[var(--color-primary)]/20 mr-2" />
                <div className="h-2 w-24 bg-slate-200 rounded-full" />
              </div>
            </div>
            <div className="flex-1 flex">
              <div className="w-48 border-r border-[var(--color-border-light)] p-4 flex flex-col gap-3">
                <div className="h-4 w-24 bg-slate-200 rounded-full mb-4" />
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-full bg-slate-100 rounded-md" />
                ))}
              </div>
              <div className="flex-1 p-8 flex gap-6">
                {[1, 2, 3].map((col) => (
                  <div key={col} className="flex-1 bg-slate-50 rounded-xl border border-[var(--color-border-light)] p-4 flex flex-col gap-4">
                    <div className="h-4 w-20 bg-slate-200 rounded-full" />
                    {[1, 2].map((card) => (
                      <div key={card} className="h-24 bg-white border border-[var(--color-border-light)] rounded-lg shadow-sm p-4 flex flex-col justify-between">
                         <div className="h-3 w-3/4 bg-slate-200 rounded-full" />
                         <div className="flex justify-between">
                            <div className="h-6 w-16 bg-[var(--color-primary)]/10 rounded-full" />
                            <div className="h-6 w-6 rounded-full bg-slate-300" />
                         </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-white border-y border-[var(--color-border-light)] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Everything you need, nothing you don't.</h2>
            <p className="text-[var(--color-text-light)]/60 max-w-2xl mx-auto">
              Built on a foundation of speed and simplicity, Ruru replaces the clutter of legacy tools with a streamlined, intelligent interface.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-[var(--color-background-light)] border border-[var(--color-border-light)] hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] mb-4">
                <Layout className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Visual Boards</h3>
              <p className="text-sm text-[var(--color-text-light)]/60">Organize tasks with fluid, drag-and-drop Kanban boards that make status tracking effortless.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-[var(--color-background-light)] border border-[var(--color-border-light)] hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-[var(--color-accent)] mb-4">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Contextual Chat</h3>
              <p className="text-sm text-[var(--color-text-light)]/60">Real-time workspace chat integrated directly next to your tasks. Keep conversations where the work happens.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-[var(--color-background-light)] border border-[var(--color-border-light)] hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">AI Assistant</h3>
              <p className="text-sm text-[var(--color-text-light)]/60">Your dedicated Ruru AI lives in the sidebar, ready to summarize tasks, draft updates, or answer questions.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-[var(--color-background-light)] border border-[var(--color-border-light)] hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-[var(--color-accent)] mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Role Security</h3>
              <p className="text-sm text-[var(--color-text-light)]/60">Strict role-based access for Leaders, Users, and Observers ensures your workspace stays protected.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--color-background-light)] py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--color-text-light)]/50">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[var(--color-text-light)]/20 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">R</span>
            </div>
            <span className="font-medium">Ruru Inc.</span>
          </div>
          <div>
            &copy; {new Date().getFullYear()} Ruru. All rights reserved. Designed with precision.
          </div>
        </div>
      </footer>
    </div>
  );
}
