import Footer from './components/Footer';
import Header from './components/Header';
import NavBar from './components/NavBar';
import { login } from './domain/API';
import LoginPage from './pages/LoginPage';
import { useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import type { LoginResponse } from './domain/types';
import { decodeToken } from './domain/token';
import LocationsPage from './pages/LocationsPage.tsx';

function App() {
    // null = not logged in; holds token, username and role after a successful login
    const [auth, setAuth] = useState<LoginResponse | null>(null);
    const navigate = useNavigate();
    // Derived from the token on every render, so no extra state is needed
    const firstname = auth ? decodeToken(auth.token).firstname : undefined;

    async function handleLogin(username: string, password: string) {
        try {
            const result = await login(username, password);
            setAuth(result);
            navigate('/locations', { replace: true });
        } catch (error) {
            console.error(error);
        }
    }

    function handleLogout() {
        setAuth(null);
        navigate('/', { replace: true });
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Header firstname={firstname} />
            {/* The nav bar exists only after login */}
            {auth && <NavBar role={auth.role} onLogout={handleLogout} />}
            <main className="relative mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-8">
                {/* Decorative blobs only on wide screens, in the empty margin next to the box */}
                <div
                    className="blob pointer-events-none absolute -left-24 top-16 hidden h-40 w-40 opacity-30 xl:block"
                    aria-hidden="true"
                />
                <div
                    className="blob pointer-events-none absolute -right-20 bottom-16 hidden h-28 w-28 opacity-20 xl:block"
                    aria-hidden="true"
                />
                <Routes>
                    <Route
                        path="/"
                        element={
                            // 'Replace' replaces the old URI
                            auth ? <Navigate to="/locations" replace /> : <LoginPage onLogin={handleLogin} />
                        }
                    />
                    <Route
                        path="/locations"
                        element={
                            // Protected route: without a login, back to the start page
                            auth ? <LocationsPage /> : <Navigate to="/" replace />
                        }
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
