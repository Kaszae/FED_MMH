interface LoginOptionsProps {
    onAdmina: () => void;
    onNormalo: () => void;
}

export default function LoginOptions({ onAdmina, onNormalo }: LoginOptionsProps) {
    return (
        <div className="mt-8 flex flex-col gap-4">
            <button type="button" className="button" onClick={onAdmina}>
                Login as admina
            </button>
            <button type="button" className="button button--outline" onClick={onNormalo}>
                Login as normalo
            </button>
        </div>
    );
}
