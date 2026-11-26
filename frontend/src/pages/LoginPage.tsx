import LoginOptions from '../components/login/LoginOptions.tsx';

// Demo credentials from frontend/.env (read once when the module loads)
const ADMINA = {
    username: import.meta.env.VITE_ADMINA_USERNAME,
    password: import.meta.env.VITE_ADMINA_PASSWORD,
};
const NORMALO = {
    username: import.meta.env.VITE_NORMALO_USERNAME,
    password: import.meta.env.VITE_NORMALO_PASSWORD,
};

interface LoginPageProps {
    onLogin: (username: string, password: string) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
    return (
        <section className="card mx-auto my-auto w-full max-w-md rounded-tl-none text-center">
            <h2 className="text-3xl">Welcome!</h2>
            <p className="mt-2">Please log in to see the bike lanes.</p>

            <LoginOptions
                onAdmina={() => onLogin(ADMINA.username, ADMINA.password)}
                onNormalo={() => onLogin(NORMALO.username, NORMALO.password)}
            />
        </section>
    );
}
