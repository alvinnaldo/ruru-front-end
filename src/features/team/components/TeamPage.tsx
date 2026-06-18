import { useState } from 'react';
import { useTeamMembers } from '../hooks/useTeam';
import { Search, UserPlus, MoreHorizontal, Filter, Shield, User, Clock } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export function TeamPage() {
  const { data: members, isLoading } = useTeamMembers();
  const [search, setSearch] = useState('');

  const filteredMembers = members?.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.email.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Online': return 'bg-green-500';
      case 'Busy': return 'bg-amber-500';
      default: return 'bg-slate-300';
    }
  };

  const formatRelativeTime = (dateString: string) => {
    const diff = new Date().getTime() - new Date(dateString).getTime();
    const diffMins = Math.round(diff / (1000 * 60));
    const diffHours = Math.round(diff / (1000 * 60 * 60));
    const diffDays = Math.round(diff / (1000 * 60 * 60 * 24));
    
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="h-full flex flex-col max-w-6xl mx-auto w-full p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pt-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-light)]">Team Directory</h1>
          <p className="text-[var(--color-text-light)]/60 mt-1">Manage workspace members and their roles.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="primary">
            <UserPlus className="w-4 h-4 mr-2" /> Invite Member
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-light)]/40" />
          <input 
            type="text" 
            placeholder="Search members..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-[var(--color-border-light)] bg-white focus:outline-none focus:border-[var(--color-primary)] transition-colors shadow-sm"
          />
        </div>
        <Button variant="outline" className="bg-white">
          <Filter className="w-4 h-4 mr-2" /> Filters
        </Button>
      </div>

      {/* Data Table */}
      <div className="flex-1 min-h-0 bg-white border border-[var(--color-border-light)] rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-[var(--color-border-light)] text-[var(--color-text-light)]/60 font-medium sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4">Member</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Active</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-light)]">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-[var(--color-text-light)]/40">
                    <div className="animate-pulse">Loading members...</div>
                  </td>
                </tr>
              ) : filteredMembers?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-[var(--color-text-light)]/40">
                    No members found matching "{search}"
                  </td>
                </tr>
              ) : (
                filteredMembers?.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 flex items-center justify-center font-bold">
                            {member.name.substring(0, 2).toUpperCase()}
                          </div>
                          <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${getStatusColor(member.status)}`}></span>
                        </div>
                        <div>
                          <p className="font-medium text-[var(--color-text-light)]">{member.name}</p>
                          <p className="text-xs text-[var(--color-text-light)]/60">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        {member.role === 'Admin' ? <Shield className="w-4 h-4 text-[var(--color-primary)]" /> : 
                         member.role === 'Guest' ? <Clock className="w-4 h-4 text-[var(--color-text-light)]/40" /> :
                         <User className="w-4 h-4 text-[var(--color-text-light)]/60" />}
                        <span className={member.role === 'Admin' ? 'font-medium text-[var(--color-primary)]' : 'text-[var(--color-text-light)]/80'}>
                          {member.role}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        member.status === 'Online' ? 'bg-green-50 text-green-700 border-green-200' :
                        member.status === 'Busy' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-slate-50 text-slate-600 border-slate-200'
                      }`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[var(--color-text-light)]/60 text-sm">
                      {member.status === 'Online' ? 'Now' : formatRelativeTime(member.lastActive)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-black/5 rounded-md text-[var(--color-text-light)]/50 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
