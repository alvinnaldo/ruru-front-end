import { useInvitations } from '../hooks/useInvitations';
import { Check, X, Mail } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export function InvitationsPage() {
  const { data: invitations, isLoading } = useInvitations();

  return (
    <div className="h-full flex flex-col max-w-5xl mx-auto w-full p-6">
      <div className="mb-8 pt-4">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-light)]">Invitations</h1>
        <p className="text-[var(--color-text-light)]/60 mt-1">Manage your pending workspace invites.</p>
      </div>

      <div className="flex-1 min-h-0">
        {isLoading ? (
          <div className="flex justify-center items-center h-40 text-[var(--color-text-light)]/40 animate-pulse">
            Loading invitations...
          </div>
        ) : invitations && invitations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {invitations.map((invite) => (
              <div key={invite.id} className="bg-white border border-[var(--color-border-light)] rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-[var(--color-text-light)] truncate">{invite.workspaceName}</h3>
                    <p className="text-xs text-[var(--color-text-light)]/60 truncate">Invited by {invite.inviterName}</p>
                  </div>
                </div>
                
                <div className="bg-slate-50 border border-[var(--color-border-light)] rounded-lg p-3 mb-5">
                  <p className="text-sm font-medium text-[var(--color-text-light)]/80">Role: <span className="text-[var(--color-primary)]">{invite.role}</span></p>
                </div>
                
                <div className="mt-auto flex gap-2">
                  <Button variant="outline" className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300">
                    <X className="w-4 h-4 mr-1" /> Decline
                  </Button>
                  <Button variant="primary" className="flex-1 bg-green-600 hover:bg-green-700">
                    <Check className="w-4 h-4 mr-1" /> Accept
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[var(--color-border-light)] rounded-xl p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-slate-400">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--color-text-light)] mb-1">No Pending Invitations</h3>
            <p className="text-[var(--color-text-light)]/60 max-w-sm">You're all caught up! You don't have any pending requests to join new workspaces.</p>
          </div>
        )}
      </div>
    </div>
  );
}
