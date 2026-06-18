import { useTimelineEvents } from '../hooks/useTimeline';
import type { TimelineEvent } from '../api/timelineApi';
import { Flag, CheckCircle2, Rocket, RefreshCw, CalendarPlus } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export function TimelinePage() {
  const { data: events, isLoading } = useTimelineEvents();

  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'milestone': return <Flag className="w-5 h-5 text-purple-500" />;
      case 'task': return <CheckCircle2 className="w-5 h-5 text-blue-500" />;
      case 'launch': return <Rocket className="w-5 h-5 text-orange-500" />;
      case 'update': return <RefreshCw className="w-5 h-5 text-green-500" />;
    }
  };

  const getEventBg = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'milestone': return 'bg-purple-100 border-purple-200';
      case 'task': return 'bg-blue-100 border-blue-200';
      case 'launch': return 'bg-orange-100 border-orange-200';
      case 'update': return 'bg-green-100 border-green-200';
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto w-full p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pt-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-light)]">Project Timeline</h1>
          <p className="text-[var(--color-text-light)]/60 mt-1">A chronological feed of all project milestones and updates.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="primary">
            <CalendarPlus className="w-4 h-4 mr-2" /> New Event
          </Button>
        </div>
      </div>

      {/* Timeline Feed */}
      <div className="flex-1 min-h-0 bg-white border border-[var(--color-border-light)] rounded-2xl shadow-sm p-8 overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-40 text-[var(--color-text-light)]/40 animate-pulse">
            Loading timeline events...
          </div>
        ) : (
          <div className="relative">
            {/* The Vertical Line */}
            <div className="absolute left-8 top-4 bottom-4 w-px bg-[var(--color-border-light)]"></div>
            
            <div className="space-y-8">
              {(events || []).map((event) => (
                <div key={event.id} className="relative flex gap-6 group">
                  {/* Timeline Dot/Icon */}
                  <div className={`w-16 flex flex-col items-center flex-shrink-0 relative z-10`}>
                    <div className={`w-12 h-12 rounded-full border-2 bg-white flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm ${getEventBg(event.type)}`}>
                      {getEventIcon(event.type)}
                    </div>
                  </div>
                  
                  {/* Event Content Card */}
                  <div className="flex-1 bg-slate-50 border border-[var(--color-border-light)] rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border bg-white ${getEventBg(event.type).replace('100', '50')}`}>
                          {event.type}
                        </span>
                        <span className="text-xs font-medium text-[var(--color-text-light)]/40">{formatDate(event.date)}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--color-text-light)] mb-1">{event.title}</h3>
                    <p className="text-[var(--color-text-light)]/70 text-sm mb-4 leading-relaxed">{event.description}</p>
                    
                    <div className="flex items-center gap-2 mt-auto">
                      <div className="w-6 h-6 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center text-[10px] font-bold border border-[var(--color-primary)]/20">
                        {event.author.name.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="text-xs font-medium text-[var(--color-text-light)]/60">{event.author.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
