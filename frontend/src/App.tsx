import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { login } from './domain/API';
import { LoginPage } from './pages/LoginPage';

function App() {
  async function handleLogin(username: string, password: string) {
    try {
      const result = await login(username, password);
      console.log('Login successful:', result.username, result.role);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="relative mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-8">
        {/* Decorative blobs only on wide screens, in the empty margin next to the box */}
        <div className="blob pointer-events-none absolute -left-24 top-16 hidden h-40 w-40 opacity-30 xl:block" aria-hidden="true" />
        <div className="blob pointer-events-none absolute -right-20 bottom-16 hidden h-28 w-28 opacity-20 xl:block" aria-hidden="true" />
        <LoginPage onLogin={handleLogin} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
