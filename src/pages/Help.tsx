export default function Help() {
  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col gap-6">
      <div className="mb-2">
        <h2 className="font-headline-lg text-headline-lg text-primary">Help & Support</h2>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">Find answers and get assistance with the verification system.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="neu-flat rounded-2xl p-6 flex flex-col gap-4">
          <div className="w-12 h-12 rounded-full neu-extruded bg-surface-container flex items-center justify-center text-primary mb-2">
            <span className="material-symbols-outlined">menu_book</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">User Manuals</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">Step-by-step guides on how to register instruments, apply for verification, and download certificates.</p>
          <button className="neu-btn px-4 py-2 mt-auto self-start text-primary font-label-sm font-bold bg-primary/5 rounded-lg">Read Guides</button>
        </div>

        <div className="neu-flat rounded-2xl p-6 flex flex-col gap-4">
          <div className="w-12 h-12 rounded-full neu-extruded bg-surface-container flex items-center justify-center text-primary mb-2">
            <span className="material-symbols-outlined">support_agent</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Contact Support</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">Need direct assistance? Reach out to our technical support team for help with your account or applications.</p>
          <button className="neu-btn px-4 py-2 mt-auto self-start text-primary font-label-sm font-bold bg-primary/5 rounded-lg">Raise Ticket</button>
        </div>
      </div>

      <div className="neu-flat rounded-2xl p-8 mt-4">
        <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2 mb-6">
          <span className="material-symbols-outlined text-primary">quiz</span> Frequently Asked Questions
        </h3>
        
        <div className="flex flex-col gap-4">
          <div className="neu-recessed p-4 rounded-xl">
            <h4 className="font-label-lg text-label-lg text-on-surface font-bold mb-2">How long does verification take?</h4>
            <p className="font-body-md text-body-md text-on-surface-variant">Standard verifications are completed within 5-7 business days from the date of application submission, depending on inspector availability.</p>
          </div>
          <div className="neu-recessed p-4 rounded-xl">
            <h4 className="font-label-lg text-label-lg text-on-surface font-bold mb-2">What happens if my instrument fails?</h4>
            <p className="font-body-md text-body-md text-on-surface-variant">If an instrument fails inspection, you will be notified of the reasons. You must repair or recalibrate the instrument and submit a new verification request.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
