interface HeaderProps {
    // Only set after login
    firstname?: string;
}

export default function Header({ firstname }: HeaderProps) {
    return (
        <header data-testid="app-header" className="bg-leaf-ink shadow">
            <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-3">
                <img src="/logo.svg" alt="Zephyr Logo" className="h-10 w-10" />
                <h1 className="text-2xl text-linen sm:text-3xl">Zephyr</h1>
                {firstname && (
                    <p data-testid="greeting" className="ml-auto text-linen">
                        Hello, {firstname}!
                    </p>
                )}
            </div>
        </header>
    );
}
