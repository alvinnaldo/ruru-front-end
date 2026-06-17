import { useWorkspaceMetrics, useRecentActivity } from '../hooks/useWorkspace';
import { useAuthStore } from '../../../store/authStore';
import { Clock, CheckCircle2, AlertCircle, MessageSquare, Briefcase, Plus, RefreshCw } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const { data: metrics, isLoading: metricsLoading } = useWorkspaceMetrics();
  const { data: activity, isLoading: activityLoading } = useRecentActivity();

  const greeting = user?.name ? `Good morning, ${user.name.split(' ')[0]}` : 'Good morning';

  const formatRelativeTime = (dateString: string) => {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    const diff = new Date(dateString).getTime() - new Date().getTime();
    const diffHours = Math.round(diff / (1000 * 60 * 60));
    
    if (Math.abs(diffHours) < 1) {
      const diffMins = Math.round(diff / (1000 * 60));
      return rtf.format(diffMins, 'minute');
    }
    return rtf.format(diffHours, 'hour');
  };

  return (
    <div className="h-full flex flex-col max-w-6xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-end justify-between mb-8 pt-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-light)]">{greeting}</h1>
          <p className="text-[var(--color-text-light)]/60 mt-1">Here's what's happening in your workspace today.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" /> Refresh
          </Button>
          <Button variant="primary">
            <Plus className="w-4 h-4 mr-2" /> New Task
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard 
          title="Active Tasks" 
          value={metrics?.activeTasks} 
          loading={metricsLoading} 
          icon={<Briefcase className="w-5 h-5 text-[var(--color-primary)]" />} 
          colorClass="text-[var(--color-primary)]"
        />
        <MetricCard 
          title="Completed This Week" 
          value={metrics?.completedThisWeek} 
          loading={metricsLoading} 
          icon={<CheckCircle2 className="w-5 h-5 text-[var(--color-primary)]" />} 
          colorClass="text-[var(--color-primary)]"
        />
        <MetricCard 
          title="Needs Attention" 
          value={metrics?.needsAttention} 
          loading={metricsLoading} 
          icon={<AlertCircle className="w-5 h-5 text-[var(--color-accent)]" />} 
          colorClass="text-[var(--color-accent)]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-0 pb-8">
        {/* Main Content Area (e.g. Activity) */}
        <div className="lg:col-span-2 border border-[var(--color-border-light)] rounded-2xl bg-white shadow-sm flex flex-col overflow-hidden">
          <div className="px-6 py-4 border-b border-[var(--color-border-light)] bg-slate-50/50">
            <h2 className="font-semibold text-lg flex items-center">
              <Clock className="w-5 h-5 mr-2 text-[var(--color-text-light)]/60" /> 
              Recent Activity
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto p-0 min-h-[300px]">
            {activityLoading ? (
              <div className="p-8 flex justify-center text-[var(--color-text-light)]/40">
                Loading activity...
              </div>
            ) : activity && activity.length > 0 ? (
              <div className="divide-y divide-[var(--color-border-light)]">
                {activity.map((item) => (
                  <div key={item.id} className="p-6 hover:bg-slate-50 transition-colors flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 border border-[var(--color-border-light)] flex items-center justify-center flex-shrink-0 text-[var(--color-primary)]">
                      {item.type === 'COMMENT' ? <MessageSquare className="w-4 h-4" /> : 
                       item.type === 'STATUS_CHANGE' ? <RefreshCw className="w-4 h-4" /> :
                       <Briefcase className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium text-[var(--color-text-light)]">{item.user.name}</span>{' '}
                        <span className="text-[var(--color-text-light)]/70">{item.description}</span>
                      </p>
                      <p className="text-sm font-medium mt-1 text-[var(--color-primary)]">{item.taskName}</p>
                      <p className="text-xs text-[var(--color-text-light)]/40 mt-2 font-medium">
                        {formatRelativeTime(item.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 flex flex-col items-center justify-center text-[var(--color-text-light)]/50 h-full">
                <Clock className="w-12 h-12 mb-3 opacity-20" />
                <p>No recent activity to show.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar (Quick Links/Members) */}
        <div className="flex flex-col gap-6">
          <div className="border border-[var(--color-border-light)] rounded-2xl bg-white shadow-sm p-6">
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 rounded-xl border border-[var(--color-border-light)] hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-primary)]/5 transition-all flex items-center justify-between group">
                <span className="font-medium text-sm group-hover:text-[var(--color-primary)] transition-colors">Go to Taskboard</span>
                <ArrowRightIcon className="w-4 h-4 text-[var(--color-text-light)]/40 group-hover:text-[var(--color-primary)] transition-colors" />
              </button>
              <button className="w-full text-left px-4 py-3 rounded-xl border border-[var(--color-border-light)] hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-primary)]/5 transition-all flex items-center justify-between group">
                <span className="font-medium text-sm group-hover:text-[var(--color-primary)] transition-colors">Open Chat</span>
                <ArrowRightIcon className="w-4 h-4 text-[var(--color-text-light)]/40 group-hover:text-[var(--color-primary)] transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple internal component
function MetricCard({ title, value, loading, icon, colorClass }: { title: string; value?: number; loading: boolean; icon: React.ReactNode; colorClass: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-[var(--color-border-light)] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-sm text-[var(--color-text-light)]/70">{title}</h3>
        <div className="p-2 bg-slate-50 rounded-lg group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>
      <div className="flex items-baseline">
        {loading ? (
          <div className="h-10 w-16 bg-slate-100 rounded animate-pulse" />
        ) : (
          <p className={`text-4xl font-bold tracking-tight ${colorClass}`}>{value || 0}</p>
        )}
      </div>
    </div>
  );
}

function ArrowRightIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  )
}
