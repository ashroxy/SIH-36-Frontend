import React from 'react';

export default function Instruments() {
  return (
    <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col gap-stack-gap">
      {/* Page Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary">Instrument Inventory</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage and track your registered measuring instruments.</p>
        </div>
        <button className="neu-btn px-6 py-3 flex items-center gap-2 text-primary font-label-lg font-bold bg-primary-fixed/20">
          <span className="material-symbols-outlined">add_circle</span>
          Add New Instrument
        </button>
      </div>

      {/* Filters */}
      <div className="neu-recessed p-4 flex flex-col lg:flex-row gap-4 items-center justify-between w-full">
        <div className="relative w-full lg:w-96 flex-shrink-0">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input className="neu-input w-full pl-12 pr-4 py-3 text-body-md font-body-md placeholder-on-surface-variant/70 text-on-surface bg-transparent" placeholder="Search by Serial Number or Type..." type="text" />
        </div>
        <div className="flex flex-wrap gap-3 w-full lg:w-auto items-center">
          <button className="neu-btn px-4 py-2 flex items-center gap-2 text-on-surface-variant font-label-lg text-label-lg active:text-primary">
            <span className="material-symbols-outlined text-[18px]">filter_list</span> Category
          </button>
          <button className="neu-btn px-4 py-2 flex items-center gap-2 text-on-surface-variant font-label-lg text-label-lg active:text-primary">
            <span className="material-symbols-outlined text-[18px]">event</span> Calibration Date
          </button>
          <button className="neu-btn px-4 py-2 flex items-center gap-2 text-on-surface-variant font-label-lg text-label-lg active:text-primary">
            <span className="material-symbols-outlined text-[18px]">check_circle</span> Status
          </button>
        </div>
      </div>

      {/* Data Table Card */}
      <div className="neu-flat overflow-hidden flex-1 flex flex-col">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-surface-dim/50">
                <th className="py-4 px-6 font-label-lg text-label-lg text-on-surface-variant font-semibold">Serial Number</th>
                <th className="py-4 px-6 font-label-lg text-label-lg text-on-surface-variant font-semibold">Type/Category</th>
                <th className="py-4 px-6 font-label-lg text-label-lg text-on-surface-variant font-semibold">Capacity/Class</th>
                <th className="py-4 px-6 font-label-lg text-label-lg text-on-surface-variant font-semibold">Calibration Freq.</th>
                <th className="py-4 px-6 font-label-lg text-label-lg text-on-surface-variant font-semibold">Verification Status</th>
                <th className="py-4 px-6 font-label-lg text-label-lg text-on-surface-variant font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-dim/30">
              {/* Row 1 */}
              <tr className="hover:bg-surface-container-low/50 transition-colors group">
                <td className="py-4 px-6 font-code text-code text-on-surface font-medium">SN-9823-XYZ</td>
                <td className="py-4 px-6">
                  <div className="font-body-md text-body-md text-on-surface font-medium">Electronic Scale</div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant">Non-automatic</div>
                </td>
                <td className="py-4 px-6 font-body-md text-body-md text-on-surface-variant">15kg / Class III</td>
                <td className="py-4 px-6 font-body-md text-body-md text-on-surface-variant">Annual (12 mos)</td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-container/20 text-primary">
                    <span className="w-2 h-2 rounded-full bg-primary"></span> REGISTERED
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="w-8 h-8 rounded-full neu-flat flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors ml-auto opacity-0 group-hover:opacity-100 focus:opacity-100">
                    <span className="material-symbols-outlined text-[18px]">more_vert</span>
                  </button>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="hover:bg-surface-container-low/50 transition-colors group">
                <td className="py-4 px-6 font-code text-code text-on-surface font-medium">FLW-441-A</td>
                <td className="py-4 px-6">
                  <div className="font-body-md text-body-md text-on-surface font-medium">Fuel Dispenser</div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant">Volume Meter</div>
                </td>
                <td className="py-4 px-6 font-body-md text-body-md text-on-surface-variant">50L/min / Class 0.5</td>
                <td className="py-4 px-6 font-body-md text-body-md text-on-surface-variant">Bi-Annual (6 mos)</td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-tertiary-container/20 text-tertiary">
                    <span className="w-2 h-2 rounded-full bg-tertiary"></span> PENDING_VERIFICATION
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="w-8 h-8 rounded-full neu-flat flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors ml-auto opacity-0 group-hover:opacity-100 focus:opacity-100">
                    <span className="material-symbols-outlined text-[18px]">more_vert</span>
                  </button>
                </td>
              </tr>
              {/* Row 3 */}
              <tr className="hover:bg-surface-container-low/50 transition-colors group">
                <td className="py-4 px-6 font-code text-code text-on-surface font-medium">TMP-88-C</td>
                <td className="py-4 px-6">
                  <div className="font-body-md text-body-md text-on-surface font-medium">Thermometer</div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant">Clinical</div>
                </td>
                <td className="py-4 px-6 font-body-md text-body-md text-on-surface-variant">35-42°C / 0.1°C</td>
                <td className="py-4 px-6 font-body-md text-body-md text-on-surface-variant">Annual (12 mos)</td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-tertiary-fixed/40 text-tertiary-container">
                    <span className="material-symbols-outlined text-[14px] animate-spin">sync</span> UNDER_VERIFICATION
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="w-8 h-8 rounded-full neu-flat flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors ml-auto opacity-0 group-hover:opacity-100 focus:opacity-100">
                    <span className="material-symbols-outlined text-[18px]">more_vert</span>
                  </button>
                </td>
              </tr>
              {/* Row 4 */}
              <tr className="hover:bg-surface-container-low/50 transition-colors group bg-surface-container-highest/20">
                <td className="py-4 px-6 font-code text-code text-on-surface font-medium">WGT-1000-B</td>
                <td className="py-4 px-6">
                  <div className="font-body-md text-body-md text-on-surface font-medium">Bridge Scale</div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant">Heavy Duty</div>
                </td>
                <td className="py-4 px-6 font-body-md text-body-md text-on-surface-variant">60 Tons / Class III</td>
                <td className="py-4 px-6 font-body-md text-body-md text-on-surface-variant">Annual (12 mos)</td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span> VERIFIED
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="w-8 h-8 rounded-full neu-flat flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors ml-auto opacity-0 group-hover:opacity-100 focus:opacity-100">
                    <span className="material-symbols-outlined text-[18px]">more_vert</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-surface-dim/30 flex items-center justify-between">
          <span className="font-body-md text-body-md text-on-surface-variant">Showing 1-4 of 24 instruments</span>
          <div className="flex gap-2">
            <button className="w-8 h-8 neu-btn flex items-center justify-center text-on-surface-variant hover:text-primary disabled:opacity-50" disabled>
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button className="w-8 h-8 rounded-full bg-primary text-on-primary shadow-sm flex items-center justify-center font-label-sm font-bold">
                1
            </button>
            <button className="w-8 h-8 neu-btn flex items-center justify-center text-on-surface-variant hover:text-primary font-label-sm font-bold">
                2
            </button>
            <button className="w-8 h-8 neu-btn flex items-center justify-center text-on-surface-variant hover:text-primary">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
