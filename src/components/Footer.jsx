import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import './Footer.css';

const Footer = () => (
    <footer className="footer">
        <div className="footer-inner container">
            <div className="footer-brand">
                <span className="footer-logo">Akash Atre<span style={{color:'var(--accent-color)'}}>.</span></span>
                <p className="footer-sub">Data Analyst · Bengaluru, India</p>
            </div>
            <div className="footer-links">
                <a href="#about">About</a>
                <a href="#skills">Skills</a>
                <a href="#experience">Experience</a>
                <a href="#projects">Projects</a>
                <a href="#contact">Contact</a>
            </div>
            <div className="footer-socials">
                <a href="https://github.com/akashatre" target="_blank" rel="noopener noreferrer"><Github size={18}/></a>
                <a href="https://www.linkedin.com/in/akashatre" target="_blank" rel="noopener noreferrer"><Linkedin size={18}/></a>
                <a href="mailto:akashatre0241@gmail.com"><Mail size={18}/></a>
            </div>
        </div>
        <div className="footer-bottom container">
            <span>© 2026 Akash Atre. All rights reserved.</span>
            <span style={{ fontStyle: 'italic', color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>"Without data, you're just another person with an opinion." — W. Edwards Deming</span>
        </div>
    </footer>
);

export default Footer;
