import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProjectProvider } from './context/ProjectContext';
import { WebsiteProvider } from './context/WebsiteContext';
import { ThemeProvider } from './context/ThemeContext';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Admin = lazy(() => import('./pages/Admin'));

const PageLoader = () => (
    <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-color)',
        color: 'var(--text-secondary)',
        gap: '0.75rem',
        fontFamily: 'Nunito, sans-serif',
        fontSize: '0.95rem'
    }}>
        <div style={{
            width: '24px', height: '24px',
            border: '2px solid var(--border-color)',
            borderTopColor: 'var(--primary-color)',
            borderRadius: '50%',
            animation: 'spin 0.7s linear infinite'
        }} />
        Loading...
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
);

function App() {
    return (
        <ThemeProvider>
            <ProjectProvider>
                <WebsiteProvider>
                    <BrowserRouter>
                        <Suspense fallback={<PageLoader />}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/admin" element={<Admin />} />
                            </Routes>
                        </Suspense>
                    </BrowserRouter>
                </WebsiteProvider>
            </ProjectProvider>
        </ThemeProvider>
    );
}

export default App;
