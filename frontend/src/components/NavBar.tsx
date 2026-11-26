import type { Role } from '../domain/types';

interface NavBarProps {
    role: Role;
    onLogout: () => void;
}

export default function NavBar({ role, onLogout }: NavBarProps) {
    return (
        <nav className="mx-auto flex w-full max-w-4xl flex-wrap justify-end gap-3 px-4 pt-6">
            {/* Only admins see "Add Location"; it stays disabled until the feature exists */}
            {role === 'admin' && (
                <button type="button" className="button" disabled>
                    Add Location
                </button>
            )}
            <button type="button" className="button button--outline" onClick={onLogout}>
                Logout
            </button>
        </nav>
    );
}
