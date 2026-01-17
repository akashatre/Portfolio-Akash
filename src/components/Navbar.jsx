import { useState, useEffect } from 'react';
import { Menu, X, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Skills', href: '#skills' },
        { name: 'Experience', href: '#experience' },
        { name: 'Projects', href: '#projects' },
        { name: 'Websites', href: '#websites' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <a href="#home" className="logo">
                    <span>Akash Atre<span className="accent">.</span></span>
                </a>

                {/* Desktop Menu */}
                <div className="nav-menu">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="nav-link">
                            {link.name}
                        </a>
                    ))}
                    <a href="https://drive.google.com/file/d/14ahVsI7Z_BAmQBa1Y6vOIFHQAYhRFojo/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn" style={{ fontSize: '0.9rem', padding: '0.6rem 1.2rem' }}>
                        Resume
                    </a>
                    <Link to="/login" className="nav-link" aria-label="Admin Login">
                        <Lock size={18} />
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mobile-menu"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="nav-link"
                            >
                                {link.name}
                            </a>
                        ))}
                        <a href="https://drive.google.com/file/d/14ahVsI7Z_BAmQBa1Y6vOIFHQAYhRFojo/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn" style={{ textAlign: 'center' }}>
                            Resume
                        </a>
                        <Link to="/login" onClick={() => setIsOpen(false)} className="nav-link" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                            <Lock size={18} /> Admin
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
