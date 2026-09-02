import { useState, useEffect } from 'react';
import { fetchApplications } from '../api';
import { Link } from 'react-router-dom';

export default function Applications() {
    const [applications, setApplications] = useState<any[]>([]);

    useEffect(() => {
        fetchApplications().then(setApplications).catch(console.error);
    }, []);

    return (
        <div className="max-w-7xl mx-auto space-y-8 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface">Applications</h2>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage all verification applications.</p>
                </div>
                <button className="neu-btn bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-lg text-label-lg flex items-center gap-2">
                    <span className="material-symbols-outlined">add_circle</span>
                    New Application
                </button>
            </div>

            <div className="neu-flat p-padding-card">
                <div className="overflow-x-auto pb-4">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr className="text-on-surface-variant font-label-sm text-label-sm border-b border-surface-container-high">
                                <th className="pb-3 px-4 font-semibold uppercase tracking-wider">App ID</th>
                                <th className="pb-3 px-4 font-semibold uppercase tracking-wider">Type</th>
                                <th className="pb-3 px-4 font-semibold uppercase tracking-wider">Status</th>
                                <th className="pb-3 px-4 font-semibold uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-body-md text-on-surface">
                            {applications.map((app) => (
                                <tr key={app.id} className="border-b border-surface-container-highest/50 hover:bg-surface-container-low/50 transition-colors">
                                    <td className="py-4 px-4 font-code text-primary">{app.id}</td>
                                    <td className="py-4 px-4">{app.type || 'New Verification'}</td>
                                    <td className="py-4 px-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-surface-variant/10 text-on-surface-variant border border-surface-variant/20">
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        <Link to={`/applications/${app.id}`} className="neu-btn p-2 text-on-surface-variant rounded-md inline-flex items-center justify-center">
                                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
