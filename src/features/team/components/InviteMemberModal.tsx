import { useState } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Link, Mail } from 'lucide-react';

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InviteMemberModal({ isOpen, onClose }: InviteMemberModalProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'Member' | 'Observer'>('Member');
  const [isSending, setIsSending] = useState(false);

  const handleSendEmail = () => {
    if (!email) return;
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      onClose();
      setEmail('');
    }, 1000);
  };

  const handleGenerateLink = () => {
    console.log(`Generated link for ${role}`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Invite to Workspace" maxWidth="max-w-md">
      <div className="space-y-6">
        
        {/* Role Selector */}
        <div className="flex gap-4">
          <label className={`flex-1 flex items-center justify-center py-3 border rounded-xl cursor-pointer transition-colors ${role === 'Member' ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 text-[var(--color-primary)]' : 'border-[var(--color-border-light)] text-[var(--color-text-light)]/60 hover:bg-slate-50'}`}>
            <input type="radio" name="role" value="Member" checked={role === 'Member'} onChange={() => setRole('Member')} className="sr-only" />
            <span className="font-semibold text-sm">Member</span>
          </label>
          <label className={`flex-1 flex items-center justify-center py-3 border rounded-xl cursor-pointer transition-colors ${role === 'Observer' ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 text-[var(--color-primary)]' : 'border-[var(--color-border-light)] text-[var(--color-text-light)]/60 hover:bg-slate-50'}`}>
            <input type="radio" name="role" value="Observer" checked={role === 'Observer'} onChange={() => setRole('Observer')} className="sr-only" />
            <span className="font-semibold text-sm">Observer</span>
          </label>
        </div>

        <div className="text-sm text-[var(--color-text-light)]/70 pb-4 border-b border-[var(--color-border-light)]">
          {role === 'Member' ? 'Members can edit and create content in the workspace.' : 'Observers can view content but cannot make changes.'}
        </div>

        {/* Email Invite */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-[var(--color-text-light)]">Invite via Email</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-light)]/40" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="colleague@company.com" 
                className="w-full pl-9 pr-3 py-2 border border-[var(--color-border-light)] rounded-lg text-sm focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
              />
            </div>
            <Button variant="primary" onClick={handleSendEmail} disabled={!email || isSending}>
              {isSending ? 'Sending...' : 'Send'}
            </Button>
          </div>
        </div>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-[var(--color-border-light)]"></div>
          <span className="flex-shrink-0 mx-4 text-[var(--color-text-light)]/40 text-xs font-medium uppercase">OR</span>
          <div className="flex-grow border-t border-[var(--color-border-light)]"></div>
        </div>

        {/* Link Invite */}
        <div className="space-y-3 pb-2">
          <label className="text-sm font-semibold text-[var(--color-text-light)]">Invite via Link</label>
          <Button variant="outline" className="w-full py-2 flex justify-center" onClick={handleGenerateLink}>
            <Link className="w-4 h-4 mr-2" /> Generate Join Link
          </Button>
        </div>

      </div>
    </Modal>
  );
}
