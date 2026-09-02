import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { submitInspectionFindings, fetchApplicationDetails } from '../api';

export default function FieldInspection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loadTest, setLoadTest] = useState('');
  const [eccentricity, setEccentricity] = useState('');
  const [isWithinTolerance, setIsWithinTolerance] = useState(true);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [appData, setAppData] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetchApplicationDetails(id).then(setAppData).catch(console.error);
    }
  }, [id]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await submitInspectionFindings(id || '', {
        loadTest, eccentricity, isWithinTolerance, notes
      });
      navigate(`/applications/${id}`);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const instrument = appData?.instruments?.[0]; // Assume first instrument for demo

  return (
    <div className="max-w-4xl mx-auto space-y-6 w-full pt-4 pb-24">
      {/* Top App Bar inside main area */}
      <div className="flex items-center gap-4 mb-6 sticky top-16 bg-background/90 backdrop-blur-md z-10 py-2">
        <button 
          className="neu-btn w-10 h-10 flex items-center justify-center text-on-surface-variant rounded-full"
          onClick={() => navigate(-1)}
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex flex-col">
          <span className="font-headline-sm text-headline-sm font-extrabold text-primary">Inspection</span>
          <span className="font-label-sm text-label-sm text-on-surface-variant">{id || 'LMO-2023-892A'}</span>
        </div>
      </div>

      <section className="neu-flat rounded-xl p-5 flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-primary font-bold mb-1">
              {instrument?.name || 'Weighing Scale X-400'}
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">business</span>
              {appData?.business_name || 'Apex Retail Markets'}
            </p>
          </div>
          <div className="px-3 py-1 bg-tertiary-container/10 text-tertiary-container rounded-full font-label-sm text-label-sm font-bold neu-flat">
            Pending
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Serial No.</span>
            <span className="font-label-lg text-label-lg font-code">{instrument?.serial || 'SN-8839-KL'}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Class / Type</span>
            <span className="font-label-lg text-label-lg">{instrument?.class || 'Class III'} / {instrument?.type || 'Routine'}</span>
          </div>
        </div>
      </section>

      {/* Measurement Inputs */}
      <section className="flex flex-col gap-4">
        <h3 className="font-headline-sm text-headline-sm font-semibold px-1">Precision Readings</h3>
        <div className="neu-flat rounded-xl p-5 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="font-label-lg text-label-lg text-on-surface pl-1">Load Test (10kg)</label>
            <div className="neu-input-container rounded-lg flex items-center px-4 h-12">
              <input 
                className="neu-input w-full text-on-surface font-body-md placeholder-outline h-full border-none focus:ring-0 outline-none" 
                placeholder="Enter reading" 
                type="number" 
                value={loadTest}
                onChange={(e) => setLoadTest(e.target.value)}
              />
              <span className="font-label-sm text-label-sm text-on-surface-variant ml-2">kg</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label-lg text-label-lg text-on-surface pl-1">Eccentricity Test</label>
            <div className="neu-input-container rounded-lg flex items-center px-4 h-12">
              <input 
                className="neu-input w-full text-on-surface font-body-md placeholder-outline h-full border-none focus:ring-0 outline-none" 
                placeholder="Max deviation" 
                type="number" 
                value={eccentricity}
                onChange={(e) => setEccentricity(e.target.value)}
              />
              <span className="font-label-sm text-label-sm text-on-surface-variant ml-2">g</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg text-on-surface">Within Tolerance</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">± 0.05% margin</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer group">
              <input 
                checked={isWithinTolerance} 
                onChange={() => setIsWithinTolerance(!isWithinTolerance)}
                className="sr-only peer" 
                type="checkbox" 
              />
              <div className="w-14 h-8 bg-surface-container rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-primary after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all neu-recessed peer-checked:bg-primary-container/20"></div>
            </label>
          </div>
        </div>
      </section>

      {/* Media Upload */}
      <section className="flex flex-col gap-4">
        <h3 className="font-headline-sm text-headline-sm font-semibold px-1">Evidence & Files</h3>
        <div className="neu-flat rounded-xl p-5 flex flex-col gap-4">
          <div className="border-2 border-dashed border-outline-variant rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors hover:bg-surface-container bg-surface-container-low">
            <div className="h-12 w-12 rounded-full neu-flat flex items-center justify-center text-primary mb-2">
              <span className="material-symbols-outlined">cloud_upload</span>
            </div>
            <span className="font-label-lg text-label-lg text-on-surface text-center">Tap to upload photos or PDF</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant text-center">Requires geotagged images</span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between p-3 neu-flat rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-md overflow-hidden neu-recessed bg-gray-200">
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold truncate w-32">seal_front_01.jpg</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant text-[10px]">2.4 MB • GPS Tagged</span>
                </div>
              </div>
              <button className="text-error p-2 rounded-full hover:bg-error-container/50 transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">delete</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4 mb-4">
        <div className="neu-flat rounded-xl p-5 flex flex-col gap-2">
          <label className="font-label-lg text-label-lg text-on-surface pl-1">Inspector Notes</label>
          <div className="neu-input-container rounded-lg p-1">
            <textarea 
              className="neu-input w-full text-on-surface font-body-md placeholder-outline resize-none p-3 h-24 border-none outline-none focus:ring-0" 
              placeholder="Add optional remarks..." 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Action Bar */}
      <div className="fixed bottom-0 left-0 md:left-64 right-0 bg-background/80 backdrop-blur-md p-4 shadow-[0_-4px_10px_rgba(220,225,235,0.5)] z-10 border-t border-surface-dim">
        <div className="max-w-4xl mx-auto flex gap-4">
          <button className="flex-1 py-4 neu-btn rounded-xl font-label-lg text-label-lg text-on-surface font-bold">
            Save Draft
          </button>
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="flex-[2] py-4 rounded-xl font-label-lg text-label-lg text-primary font-bold neu-flat transition-all active:scale-95 flex items-center justify-center gap-2 hover:bg-primary-fixed/20 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined">check_circle</span>
            {loading ? 'Submitting...' : 'Submit Findings'}
          </button>
        </div>
      </div>
    </div>
  );
}
