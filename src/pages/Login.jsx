import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

const ADMIN_PASSWORD = "Meaks@0241"; // <--- CHANGE YOUR PASSWORD HERE

const Login = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/admin');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'var(--bg-color)',
            overflow: 'hidden',
        }}>
            <motion.div
                className="bento-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                    padding: '3rem',
                    width: '100%',
                    maxWidth: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    background: 'var(--surface-color)',
                    borderColor: 'var(--border-color)'
                }}
            >
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        background: 'var(--surface-highlight)',
                        padding: '1rem',
                        borderRadius: '50%',
                        display: 'inline-flex',
                        marginBottom: '1rem',
                        color: 'var(--accent-primary)'
                    }}>
                        <Lock size={32} />
                    </div>
                    <h2 style={{ color: 'var(--text-primary)' }}>Admin Access</h2>
                </div>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: 'var(--bg-color)',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-sm)',
                                color: 'var(--text-primary)',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                        />
                    </div>

                    {error && <p style={{ color: 'var(--accent-secondary)', fontSize: '0.9rem', textAlign: 'center' }}>{error}</p>}

                    <button type="submit" className="btn" style={{ width: '100%', justifyContent: 'center' }}>
                        Login
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        style={{
                            background: 'none',
                            border: 'none',
                            marginTop: '1rem',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            color: 'var(--text-secondary)'
                        }}
                    >
                        &larr; Back to Portfolio
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
