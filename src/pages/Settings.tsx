import { useState, useEffect } from 'react';
import { fetchSettings } from '../api';

export default function Settings() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings().then(data => {
      setSettings(data);
      setLoading(false);
    });
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setToastMessage("Settings saved successfully!");
      setTimeout(() => setToastMessage(null), 3000);
    }, 800);
  };

  if (loading) {
    return <div className="p-8 flex items-center justify-center">Loading settings...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col gap-6 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-green-100 text-green-800 px-6 py-3 rounded-full shadow-lg z-50 flex items-center gap-2 font-label-lg transition-all animate-bounce">
          <span className="material-symbols-outlined">check_circle</span>
          {toastMessage}
        </div>
      )}

      <div className="mb-2">
        <h2 className="font-headline-lg text-headline-lg text-primary">Settings</h2>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage your account and system preferences.</p>
      </div>

      <div className="neu-flat rounded-xl p-6 flex flex-col gap-6">
        <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">notifications</span> Notifications
        </h3>
        
        <div className="flex flex-col gap-4 pl-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-label-lg text-label-lg text-on-surface">Email Notifications</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Receive alerts via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer group">
              <input type="checkbox" checked={settings.notifications?.email} onChange={() => setSettings({...settings, notifications: {...settings.notifications, email: !settings.notifications.email}})} className="sr-only peer" />
              <div className="w-14 h-8 bg-surface-container rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-primary after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all neu-recessed peer-checked:bg-primary-container/20"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-label-lg text-label-lg text-on-surface">SMS Notifications</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Receive alerts via SMS</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer group">
              <input type="checkbox" checked={settings.notifications?.sms} onChange={() => setSettings({...settings, notifications: {...settings.notifications, sms: !settings.notifications.sms}})} className="sr-only peer" />
              <div className="w-14 h-8 bg-surface-container rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-primary after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all neu-recessed peer-checked:bg-primary-container/20"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="neu-flat rounded-xl p-6 flex flex-col gap-6">
        <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">security</span> Security
        </h3>
        
        <div className="flex flex-col gap-4 pl-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-label-lg text-label-lg text-on-surface">Two-Factor Authentication</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Add an extra layer of security</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer group">
              <input type="checkbox" checked={settings.two_factor_auth} onChange={() => setSettings({...settings, two_factor_auth: !settings.two_factor_auth})} className="sr-only peer" />
              <div className="w-14 h-8 bg-surface-container rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-primary after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all neu-recessed peer-checked:bg-primary-container/20"></div>
            </label>
          </div>
          <div className="mt-2">
            <button onClick={() => { setToastMessage("Password change instructions sent to email."); setTimeout(() => setToastMessage(null), 3000); }} className="neu-btn px-6 py-2 text-primary font-label-lg rounded-lg">Change Password</button>
          </div>
        </div>
      </div>

      <div className="neu-flat rounded-xl p-6 flex flex-col gap-6">
        <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">palette</span> Preferences
        </h3>
        
        <div className="flex flex-col gap-4 pl-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-label-lg text-label-lg text-on-surface">Theme</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Select interface appearance</p>
            </div>
            <div className="flex gap-2">
               <select 
                 className="neu-input-container rounded-lg px-4 py-2 border-none outline-none font-body-md text-on-surface bg-transparent"
                 value={settings.theme}
                 onChange={(e) => setSettings({...settings, theme: e.target.value})}
               >
                 <option value="light">Light</option>
                 <option value="dark">Dark</option>
                 <option value="system">System Default</option>
               </select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-4 mt-4">
        <button onClick={() => window.history.back()} className="neu-btn px-8 py-3 text-on-surface font-label-lg rounded-lg">Cancel</button>
        <button onClick={handleSave} disabled={isSaving} className="neu-btn px-8 py-3 text-primary font-label-lg font-bold bg-primary/10 rounded-lg flex items-center gap-2">
          {isSaving ? <span className="material-symbols-outlined animate-spin">sync</span> : null}
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
