export default function PlaceholderPage({ title, description }: { title: string, description: string }) {
    return (
        <div className="max-w-7xl mx-auto space-y-8 w-full flex-1 flex flex-col items-center justify-center min-h-[50vh]">
            <div className="text-center flex flex-col items-center">
                <div className="w-20 h-20 rounded-full neu-flat flex items-center justify-center text-primary mb-6">
                    <span className="material-symbols-outlined text-4xl">construction</span>
                </div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">{title}</h2>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-md">{description}</p>
                <button className="neu-btn mt-8 px-6 py-3 text-primary font-bold">
                    Go Back
                </button>
            </div>
        </div>
    );
}
