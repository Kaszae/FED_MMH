export default function Header() {
    return (
        <header data-testid="app-header" className="bg-leaf-ink shadow">
            <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-3">
                <img src="/logo.svg" alt="Zephyr Logo" className="h-10 w-10" />
                <h1 className="text-2xl text-linen sm:text-3xl">Zephyr</h1>
            </div>
        </header>
    );
}
