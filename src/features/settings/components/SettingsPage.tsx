import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User, Shield, Bell, Camera, Save, Loader2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

// Password Validation logic from existing auth reqs: min 8, 1 number, 1 capital letter.
const settingsSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').optional(),
  email: z.string().email('Invalid email address').optional(),
  bio: z.string().optional(),
  currentPassword: z.string().optional(),
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least 1 capital letter')
    .regex(/[0-9]/, 'Password must contain at least 1 number')
    .or(z.literal('')),
  confirmPassword: z.string().optional()
}).refine((data) => {
  if (data.newPassword && data.newPassword !== data.confirmPassword) {
    return false;
  }
  return true;
}, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

type SettingsValues = z.infer<typeof settingsSchema>;

type TabId = 'profile' | 'security' | 'notifications';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<SettingsValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      fullName: 'Alvin Naldo',
      email: 'alvin@example.com',
      bio: 'Software Engineer & Project Manager.',
      newPassword: '',
      confirmPassword: '',
      currentPassword: ''
    }
  });

  const onSubmit = (data: SettingsValues) => {
    setIsSaving(true);
    setSuccessMsg('');
    
    // Mock save delay
    setTimeout(() => {
      console.log('Saved settings:', data);
      setIsSaving(false);
      setSuccessMsg('Settings saved successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col min-w-0 relative bg-slate-50/50">
      <div className="flex-1 overflow-y-auto p-6 pb-32">
        <div className="max-w-5xl mx-auto w-full">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-light)]">Settings</h1>
            <p className="text-[var(--color-text-light)]/60 mt-1">Manage your account preferences and security.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="w-full lg:w-64 flex-shrink-0">
              <nav className="flex flex-col space-y-1">
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'profile' ? 'bg-white shadow-sm text-[var(--color-primary)] border border-[var(--color-border-light)]' : 'text-[var(--color-text-light)]/70 hover:bg-black/5 hover:text-[var(--color-text-light)]'}`}
                >
                  <User className="w-4 h-4 mr-3" /> Profile
                </button>
                <button 
                  onClick={() => setActiveTab('security')}
                  className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'security' ? 'bg-white shadow-sm text-[var(--color-primary)] border border-[var(--color-border-light)]' : 'text-[var(--color-text-light)]/70 hover:bg-black/5 hover:text-[var(--color-text-light)]'}`}
                >
                  <Shield className="w-4 h-4 mr-3" /> Security
                </button>
                <button 
                  onClick={() => setActiveTab('notifications')}
                  className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'notifications' ? 'bg-white shadow-sm text-[var(--color-primary)] border border-[var(--color-border-light)]' : 'text-[var(--color-text-light)]/70 hover:bg-black/5 hover:text-[var(--color-text-light)]'}`}
                >
                  <Bell className="w-4 h-4 mr-3" /> Notifications
                </button>
              </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
              <form id="settings-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Profile Section */}
                {activeTab === 'profile' && (
                  <div className="bg-white border border-[var(--color-border-light)] rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-6">Public Profile</h2>
                    
                    <div className="flex items-center gap-6 mb-8">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center text-2xl font-bold border-2 border-[var(--color-primary)]/20">
                          AN
                        </div>
                        <button type="button" className="absolute bottom-0 right-0 p-2 bg-white border border-[var(--color-border-light)] rounded-full text-[var(--color-text-light)]/70 hover:text-[var(--color-primary)] shadow-sm transition-colors">
                          <Camera className="w-4 h-4" />
                        </button>
                      </div>
                      <div>
                        <h3 className="font-medium text-sm mb-1">Profile Picture</h3>
                        <p className="text-xs text-[var(--color-text-light)]/50 mb-3">JPG, GIF or PNG. Max size of 5MB.</p>
                        <div className="flex gap-3">
                          <button type="button" className="text-sm font-medium text-[var(--color-primary)] hover:underline">Upload new</button>
                          <button type="button" className="text-sm font-medium text-red-500 hover:underline">Remove</button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="text-sm font-medium text-[var(--color-text-light)]/80">Full Name</label>
                          <input 
                            {...register('fullName')} 
                            type="text" 
                            className="w-full px-3 py-2 rounded-lg border border-[var(--color-border-light)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all bg-transparent"
                          />
                          {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm font-medium text-[var(--color-text-light)]/80">Email Address</label>
                          <input 
                            {...register('email')} 
                            type="email" 
                            className="w-full px-3 py-2 rounded-lg border border-[var(--color-border-light)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all bg-transparent"
                          />
                          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                        </div>
                      </div>
                      
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[var(--color-text-light)]/80">Bio</label>
                        <textarea 
                          {...register('bio')} 
                          rows={4}
                          placeholder="Tell us a little bit about yourself"
                          className="w-full px-3 py-2 rounded-lg border border-[var(--color-border-light)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all bg-transparent resize-y"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Section */}
                {activeTab === 'security' && (
                  <div className="bg-white border border-[var(--color-border-light)] rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-2">Change Password</h2>
                    <p className="text-sm text-[var(--color-text-light)]/60 mb-6">Update your password associated with your account.</p>
                    
                    <div className="space-y-5 max-w-md">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[var(--color-text-light)]/80">Current Password</label>
                        <input 
                          {...register('currentPassword')} 
                          type="password" 
                          className="w-full px-3 py-2 rounded-lg border border-[var(--color-border-light)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all bg-transparent"
                        />
                      </div>
                      
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[var(--color-text-light)]/80">New Password</label>
                        <input 
                          {...register('newPassword')} 
                          type="password" 
                          placeholder="Min 8 chars, 1 number, 1 capital"
                          className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 transition-all bg-transparent ${errors.newPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-[var(--color-border-light)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]'}`}
                        />
                        {errors.newPassword && <p className="text-red-500 text-xs font-medium">{errors.newPassword.message}</p>}
                      </div>
                      
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[var(--color-text-light)]/80">Confirm New Password</label>
                        <input 
                          {...register('confirmPassword')} 
                          type="password" 
                          className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 transition-all bg-transparent ${errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-[var(--color-border-light)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]'}`}
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-xs font-medium">{errors.confirmPassword.message}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications Section */}
                {activeTab === 'notifications' && (
                  <div className="bg-white border border-[var(--color-border-light)] rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-3 border-b border-[var(--color-border-light)]/50">
                        <div>
                          <p className="font-medium text-sm">Email Notifications</p>
                          <p className="text-xs text-[var(--color-text-light)]/60">Receive daily summaries and important updates.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <p className="font-medium text-sm">Push Notifications</p>
                          <p className="text-xs text-[var(--color-text-light)]/60">Receive real-time alerts when you're mentioned.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
                
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Bottom Save Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[var(--color-border-light)] p-4 px-6 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="text-sm font-medium text-green-600">
            {successMsg && <span className="animate-in fade-in slide-in-from-bottom-2">{successMsg}</span>}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" type="button" onClick={() => window.location.reload()}>Discard</Button>
            <Button variant="primary" form="settings-form" type="submit" disabled={isSaving}>
              {isSaving ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
              ) : (
                <><Save className="w-4 h-4 mr-2" /> Save Changes</>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
