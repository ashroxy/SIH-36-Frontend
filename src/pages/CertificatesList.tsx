import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCertificates } from '../api';

export default function CertificatesList() {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificates().then(data => {
      setCertificates(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="p-8 flex items-center justify-center">Loading certificates...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary">Issued Certificates</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">View and download all valid and past digital certificates.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div key={cert.id} className="neu-flat rounded-2xl p-6 flex flex-col gap-4 group hover:shadow-[8px_8px_16px_#dce1eb,-8px_-8px_16px_#ffffff] transition-shadow">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-full neu-extruded bg-surface-container flex items-center justify-center text-primary">
                 <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
              </div>
              <StatusBadge status={cert.status} />
            </div>
            
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">{cert.instrument}</h3>
              <p className="font-code text-code text-on-surface-variant mt-1">{cert.id}</p>
            </div>
            
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Issued</span>
                <span className="font-body-md text-body-md text-on-surface font-medium">{cert.issue_date}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Valid Until</span>
                <span className="font-body-md text-body-md text-primary font-bold">{cert.expiry}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-surface-dim/50 flex justify-between">
              <button onClick={() => {
                const link = document.createElement("a");
                link.href = "data:application/pdf;base64,JVBERi0xLjQKJ...";
                link.download = `certificate_${cert.id}.pdf`;
                link.click();
              }} className="neu-btn px-4 py-2 text-on-surface-variant font-label-sm flex items-center gap-2 rounded-lg hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[18px]">download</span> PDF
              </button>
              <Link to={`/certificates/${cert.id}`} className="neu-btn px-4 py-2 text-primary font-label-sm font-bold bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors">
                View Certificate
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'ACTIVE':
      return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">ACTIVE</span>;
    case 'EXPIRED':
      return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-error-container/50 text-on-error-container">EXPIRED</span>;
    default:
      return <span>{status}</span>;
  }
}
