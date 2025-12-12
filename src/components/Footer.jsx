import { Heart } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p className="footer-text">
                    &copy; {new Date().getFullYear()} Akash Atre. All rights reserved.
                </p>
                <p className="footer-text" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    Made with <Heart size={16} className="heart-icon" /> by Akash Atre
                </p>
            </div>
        </footer>
    );
};

export default Footer;
