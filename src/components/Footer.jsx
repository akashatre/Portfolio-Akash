import { motion } from 'framer-motion';
import { Instagram, Linkedin, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-socials" style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem' }}>
                    <a href="https://instagram.com" style={{ color: 'var(--text-primary)' }}><Instagram size={24} /></a>
                    <a href="https://linkedin.com" style={{ color: 'var(--text-primary)' }}><Linkedin size={24} /></a>
                    <a href="mailto:email@example.com" style={{ color: 'var(--text-primary)' }}><Mail size={24} /></a>
                </div>
                <div className="footer-copyright" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                    <p className="footer-text" style={{ margin: 0 }}>
                        &copy; 2026 Akash Atre
                    </p>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                        Built with curiosity & code.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
