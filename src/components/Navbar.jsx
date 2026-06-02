import { useState, useEffect, useRef } from 'react';
import { Menu, X, Lock, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const NAV_LINKS = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Websites', href: '#websites' },
    { name: 'Contact', href: '#contact' },
];

const SECTION_IDS = NAV_LINKS.map(l => l.href.slice(1));

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const { theme, toggleTheme } = useTheme();
    const [resumeLink] = useState(() => {
        return localStorage.getItem('portfolio_resume_link') || "https://drive.google.com/file/d/14ahVsI7Z_BAmQBa1Y6vOIFHQAYhRFojo/view?usp=sharing";
    });

    // Scroll shadow
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Active section via IntersectionObserver
    useEffect(() => {
        const observers = [];
        SECTION_IDS.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setActiveSection(id);
                },
                { threshold: 0.4 }
            );
            obs.observe(el);
            observers.push(obs);
        });
        return () => observers.forEach(o => o.disconnect());
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <a href="#home" className="logo" style={{ display: 'flex', alignItems: 'center' }}>
                    <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                        {/* Outer border in beige */}
                        <circle cx="20" cy="20" r="18" stroke="var(--primary-color)" strokeWidth="1.5" opacity="0.8" />
                        {/* Translucent geometric cloud body */}
                        <path d="M14.5 24.5 C12.5 24.5 11 23 11 21 C11 19.2 12.2 17.8 14 17.5 C14.5 14.5 17 12.5 20 12.5 C23 12.5 25.5 14.5 26 17.5 C27.8 17.8 29 19.2 29 21 C29 23 27.5 24.5 25.5 24.5 H14.5 Z" fill="var(--text-primary)" opacity="0.15" />
                        {/* Cloud outline stroke */}
                        <path d="M14.5 24.5 C12.5 24.5 11 23 11 21 C11 19.2 12.2 17.8 14 17.5 C14.5 14.5 17 12.5 20 12.5 C23 12.5 25.5 14.5 26 17.5 C27.8 17.8 29 19.2 29 21 C29 23 27.5 24.5 25.5 24.5 H14.5 Z" stroke="var(--text-primary)" strokeWidth="1.8" strokeLinejoin="round" />
                        {/* Twinkling star above cloud */}
                        <path d="M25 11.5 L26 13 L27.5 13.5 L26 14 L25 15.5 L24 14 L22.5 13.5 L24 13 Z" fill="var(--accent-color)" />
                    </svg>
                </a>

                {/* Desktop Menu */}
                <div className="nav-menu">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href={resumeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                        style={{ fontSize: '0.9rem', padding: '0.6rem 1.2rem' }}
                    >
                        Resume
                    </a>



                    <Link to="/login" className="nav-link" aria-label="Admin Login">
                        <Lock size={18} />
                    </Link>
                </div>

                {/* Mobile Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mobile-menu"
                    >
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href={resumeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn"
                            style={{ textAlign: 'center' }}
                        >
                            Resume
                        </a>
                        <Link
                            to="/login"
                            onClick={() => setIsOpen(false)}
                            className="nav-link"
                            style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}
                        >
                            <Lock size={18} /> Admin
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
