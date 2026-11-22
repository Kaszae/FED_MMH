interface LoginPageProps {
  onLogin: (username: string, password: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  return (
    <section className="card mx-auto my-auto w-full max-w-md rounded-tl-none text-center">
      <h2 className="text-3xl">Welcome!</h2>
      <p className="mt-2">Please log in to see the bike lanes.</p>

      <div className="mt-8 flex flex-col gap-4">
        <button
          type="button"
          className="button"
          onClick={() =>
            onLogin(import.meta.env.VITE_ADMINA_USERNAME, import.meta.env.VITE_ADMINA_PASSWORD)
          }
        >
          Login as admina
        </button>
        <button
          type="button"
          className="button button--outline"
          onClick={() =>
            onLogin(import.meta.env.VITE_NORMALO_USERNAME, import.meta.env.VITE_NORMALO_PASSWORD)
          }
        >
          Login as normalo
        </button>
      </div>
    </section>
  );
}
