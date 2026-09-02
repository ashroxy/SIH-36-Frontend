import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchApplicationDetails } from '../api';

export default function ApplicationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appData, setAppData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchApplicationDetails(id).then(data => {
        setAppData(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return <div className="p-8 flex items-center justify-center">Loading application details...</div>;
  }

  const statusList = [
    { label: 'Draft', status: 'DRAFT', icon: 'edit_document' },
    { label: 'Submitted', status: 'SUBMITTED', icon: 'send' },
    { label: 'Approved', status: 'APPROVED', icon: 'thumb_up' },
    { label: 'Scheduled', status: 'SCHEDULED', icon: 'calendar_today' },
    { label: 'Assigned', status: 'ASSIGNED_LMO', icon: 'person_outline' },
    { label: 'Inspection', status: 'INSPECTION_IN_PROGRESS', icon: 'assignment' },
    { label: 'Issued', status: 'CERTIFICATE_ISSUED', icon: 'verified' }
  ];

  const currentStatusIndex = statusList.findIndex(s => s.status === appData?.status) || 0;
  // Fallback for mocked 'SCHEDULED' -> index 3
  const activeIndex = appData?.status === 'SCHEDULED' ? 3 : Math.max(0, currentStatusIndex);

  return (
    <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col gap-stack-gap relative">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-3">
            <button className="neu-btn p-2 text-on-surface-variant inline-flex rounded-full" onClick={() => navigate(-1)}>
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            {appData?.id}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1 ml-14">{appData?.type} - {appData?.business_name}</p>
        </div>
        <div className="flex gap-3">
          <span className="px-4 py-1.5 rounded-full neu-extruded font-label-sm text-label-sm text-primary flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary"></span> {appData?.status}
          </span>
        </div>
      </div>

      {/* Top Workflow Stepper */}
      <section className="neu-flat p-padding-card w-full overflow-x-auto">
        <h3 className="font-headline-sm text-headline-sm text-on-surface mb-6">Workflow Status</h3>
        <div className="min-w-[800px] flex items-center justify-between relative px-4 py-4">
          <div className="absolute top-1/2 left-8 right-8 h-1 -translate-y-1/2 neu-recessed z-0"></div>
          <div 
            className="absolute top-1/2 left-8 h-1 -translate-y-1/2 bg-primary z-0 rounded-full transition-all duration-500"
            style={{ width: `${(activeIndex / (statusList.length - 1)) * 100}%` }}
          ></div>
          
          {statusList.map((step, index) => (
            <Step 
              key={step.status}
              active={index === activeIndex} 
              completed={index < activeIndex} 
              label={step.label} 
              icon={step.icon} 
            />
          ))}
        </div>
      </section>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-stack-gap mb-20">
        <section className="neu-flat p-padding-card lg:col-span-1 h-full">
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">storefront</span> Business Info
          </h3>
          <div className="flex flex-col gap-4">
            <InfoItem label="Business Name" value={appData?.business_name} />
            <InfoItem label="Registration Number" value={appData?.registration_number} isCode />
            <InfoItem label="Location" value={appData?.location} />
            <div className="neu-recessed p-4 flex flex-col gap-1">
              <span className="font-label-sm text-label-sm text-outline">Contact Person</span>
              <span className="font-body-md text-body-md text-on-surface">{appData?.contact_person}</span>
              <span className="font-body-md text-body-md text-primary">{appData?.contact_phone}</span>
            </div>
          </div>
        </section>

        <section className="neu-flat p-padding-card lg:col-span-2 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">scale</span> Instruments for Verification
            </h3>
            <span className="neu-recessed px-3 py-1 font-label-sm text-label-sm text-on-surface-variant">{appData?.instruments.length} Items</span>
          </div>
          <div className="flex flex-col gap-4 flex-1">
            {appData?.instruments.map((inst: any, idx: number) => (
              <InstrumentItem 
                key={idx}
                name={inst.name} 
                serial={inst.serial} 
                icon={inst.icon} 
                type={inst.type} 
                typeClass={inst.type === 'Requires Recalibration' ? 'bg-primary-container text-on-primary-container' : undefined} 
              />
            ))}
          </div>
        </section>
      </div>

      {/* Action Bar */}
      <div className="fixed bottom-0 left-0 md:left-64 right-0 bg-background/80 backdrop-blur-md p-4 shadow-[0_-4px_10px_rgba(220,225,235,0.5)] flex justify-end gap-4 z-10 border-t border-surface-dim">
        <button onClick={() => window.print()} className="neu-btn px-6 py-2.5 font-label-lg text-label-lg text-on-surface-variant flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">print</span> Print Summary
        </button>
        <button onClick={() => { if(window.confirm('Are you sure you want to cancel this application?')) { alert('Application Cancelled.'); navigate('/applications'); } }} className="neu-btn px-6 py-2.5 font-label-lg text-label-lg text-error flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">cancel</span> Cancel App
        </button>
        <Link to={`/inspections/${id}`} className="neu-btn px-8 py-2.5 font-label-lg text-label-lg flex items-center gap-2 ml-4 text-primary bg-primary/5 hover:bg-primary/10 transition-colors rounded-lg">
          <span className="material-symbols-outlined text-sm">assignment_turned_in</span> Begin Inspection
        </Link>
      </div>
    </div>
  );
}

function Step({ active, completed, label, icon }: any) {
  if (completed) {
    return (
      <div className="relative z-10 flex flex-col items-center gap-2 w-24 text-center">
        <div className="w-10 h-10 rounded-full bg-primary text-on-primary shadow-md flex items-center justify-center">
          <span className="material-symbols-outlined text-sm">{icon}</span>
        </div>
        <span className="font-label-sm text-label-sm text-on-surface font-bold">{label}</span>
      </div>
    );
  }
  
  if (active) {
    return (
      <div className="relative z-10 flex flex-col items-center gap-2 w-24 text-center">
        <div className="w-10 h-10 rounded-full neu-extruded border-2 border-primary text-primary flex items-center justify-center">
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <span className="font-label-sm text-label-sm text-primary font-bold">{label}</span>
      </div>
    );
  }

  return (
    <div className="relative z-10 flex flex-col items-center gap-2 w-24 text-center opacity-50">
      <div className="w-10 h-10 rounded-full neu-flat text-on-surface-variant flex items-center justify-center">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <span className="font-label-sm text-label-sm text-on-surface-variant">{label}</span>
    </div>
  );
}

function InfoItem({ label, value, isCode }: { label: string, value: string, isCode?: boolean }) {
  return (
    <div className="neu-recessed p-4 flex flex-col gap-1 rounded-lg">
      <span className="font-label-sm text-label-sm text-outline">{label}</span>
      <span className={isCode ? "font-code text-code text-on-surface" : "font-body-md text-body-md text-on-surface font-medium"}>{value}</span>
    </div>
  );
}

function InstrumentItem({ name, serial, icon, type, typeClass }: any) {
  return (
    <div className="neu-extruded p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between rounded-lg">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg neu-recessed flex items-center justify-center text-primary">
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div>
          <h4 className="font-label-lg text-label-lg text-on-surface">{name}</h4>
          <p className="font-body-md text-body-md text-on-surface-variant">Serial: {serial}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <span className="px-3 py-1 rounded-md neu-recessed font-label-sm text-label-sm text-on-surface-variant">Class III</span>
        <span className={`px-3 py-1 rounded-md font-label-sm text-label-sm ${typeClass || 'neu-recessed text-secondary'}`}>{type}</span>
      </div>
    </div>
  );
}
