import { useState, useEffect } from 'react';
import { fetchBusinessProfile } from '../api';

export default function Business() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState<any>(null);

  useEffect(() => {
    fetchBusinessProfile().then(data => {
      setProfile(data);
      setEditForm(data);
      setLoading(false);
    });
  }, []);

  const handleSave = () => {
    setProfile(editForm);
    setIsEditModalOpen(false);
  };

  if (loading) {
    return <div className="p-8 flex items-center justify-center">Loading business profile...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto w-full flex flex-col gap-6 relative">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary">Business Profile</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage your business registration details and contacts.</p>
        </div>
        <button onClick={() => setIsEditModalOpen(true)} className="neu-btn px-6 py-3 rounded-full flex items-center gap-2 text-primary font-label-lg text-label-lg hover:bg-primary/5 transition-colors">
          <span className="material-symbols-outlined">edit</span> Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 flex flex-col gap-6">
          <div className="neu-flat rounded-2xl p-8 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 rounded-full neu-extruded bg-surface-container flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>storefront</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">{profile.business_name}</h3>
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
              <span className="material-symbols-outlined text-[14px]">verified</span> {profile.status}
            </div>
          </div>
          
          <div className="neu-flat rounded-2xl p-6">
             <h4 className="font-label-lg text-label-lg text-on-surface mb-4 border-b border-surface-dim pb-2">Quick Actions</h4>
             <ul className="flex flex-col gap-2">
               <li><button className="w-full text-left neu-btn px-4 py-2 rounded-lg text-primary flex items-center gap-2 hover:bg-primary/5"><span className="material-symbols-outlined text-sm">add_circle</span> Add Branch</button></li>
               <li><button className="w-full text-left neu-btn px-4 py-2 rounded-lg text-primary flex items-center gap-2 hover:bg-primary/5"><span className="material-symbols-outlined text-sm">group_add</span> Add Representative</button></li>
               <li><button className="w-full text-left neu-btn px-4 py-2 rounded-lg text-primary flex items-center gap-2 hover:bg-primary/5"><span className="material-symbols-outlined text-sm">cloud_upload</span> Upload Documents</button></li>
             </ul>
          </div>
        </div>

        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="neu-flat rounded-2xl p-8">
            <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">info</span> Registration Details
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="neu-recessed p-4 rounded-xl flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Registration No.</span>
                <span className="font-code text-code text-on-surface font-semibold">{profile.registration_no}</span>
              </div>
              <div className="neu-recessed p-4 rounded-xl flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Tax ID / GSTIN</span>
                <span className="font-code text-code text-on-surface font-semibold">{profile.tax_id}</span>
              </div>
              <div className="neu-recessed p-4 rounded-xl flex flex-col sm:col-span-2">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Registered Address</span>
                <span className="font-body-lg text-body-lg text-on-surface">{profile.address}</span>
              </div>
            </div>
          </div>

          <div className="neu-flat rounded-2xl p-8">
            <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">contacts</span> Contact Information
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="neu-recessed p-4 rounded-xl flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Primary Owner</span>
                <span className="font-body-lg text-body-lg text-on-surface">{profile.owner}</span>
              </div>
              <div className="neu-recessed p-4 rounded-xl flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Phone Number</span>
                <span className="font-body-lg text-body-lg text-on-surface">{profile.phone}</span>
              </div>
              <div className="neu-recessed p-4 rounded-xl flex flex-col sm:col-span-2">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Email Address</span>
                <span className="font-body-lg text-body-lg text-on-surface">{profile.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="neu-flat rounded-2xl w-full max-w-xl p-6 bg-background max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Edit Business Profile</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="w-8 h-8 flex items-center justify-center text-on-surface-variant neu-btn rounded-full">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-label-sm font-label-sm text-on-surface-variant mb-1">Business Name</label>
                <input 
                  type="text" 
                  value={editForm?.business_name} 
                  onChange={(e) => setEditForm({...editForm, business_name: e.target.value})}
                  className="w-full neu-input-container rounded-lg px-4 py-2 text-body-md outline-none focus:ring-2 focus:ring-primary/20" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-label-sm font-label-sm text-on-surface-variant mb-1">Phone Number</label>
                  <input 
                    type="text" 
                    value={editForm?.phone} 
                    onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                    className="w-full neu-input-container rounded-lg px-4 py-2 text-body-md outline-none focus:ring-2 focus:ring-primary/20" 
                  />
                </div>
                <div>
                  <label className="block text-label-sm font-label-sm text-on-surface-variant mb-1">Email Address</label>
                  <input 
                    type="email" 
                    value={editForm?.email} 
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    className="w-full neu-input-container rounded-lg px-4 py-2 text-body-md outline-none focus:ring-2 focus:ring-primary/20" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-label-sm font-label-sm text-on-surface-variant mb-1">Registered Address</label>
                <textarea 
                  value={editForm?.address} 
                  onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                  className="w-full neu-input-container rounded-lg px-4 py-2 text-body-md outline-none focus:ring-2 focus:ring-primary/20 resize-none h-24" 
                />
              </div>
              <div className="mt-4 flex justify-end gap-3">
                <button onClick={() => setIsEditModalOpen(false)} className="px-6 py-2 neu-btn text-on-surface-variant font-label-lg rounded-lg">Cancel</button>
                <button onClick={handleSave} className="px-6 py-2 neu-btn text-primary bg-primary/10 font-label-lg font-bold rounded-lg hover:bg-primary/20">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
