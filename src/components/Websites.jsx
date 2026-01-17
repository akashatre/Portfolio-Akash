import { motion } from 'framer-motion';
import { ExternalLink, Globe, Layout, ShoppingCart, Code } from 'lucide-react';
import { useWebsites } from '../context/WebsiteContext';
import './Websites.css';

const ICON_MAP = {
    "Globe": <Globe size={40} color="var(--text-tertiary)" />,
    "Layout": <Layout size={40} color="var(--text-tertiary)" />,
    "ShoppingCart": <ShoppingCart size={40} color="var(--text-tertiary)" />,
    "Code": <Code size={40} color="var(--text-tertiary)" />
};

const Websites = () => {
    const { websites } = useWebsites();

    if (!websites || websites.length === 0) {
        return null;
    }

    return (
        <section id="websites" style={{ background: 'white' }}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Web Projects</h2>
                    <p className="section-subtitle">Live websites and applications I've built and deployed.</p>
                </div>

                <div className="websites-grid">
                    {websites.map((site, index) => (
                        <motion.div
                            key={site.id || index}
                            className="website-card"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            {/* Browser Header Mockup */}
                            <div className="browser-header">
                                <div className="browser-dot red"></div>
                                <div className="browser-dot yellow"></div>
                                <div className="browser-dot green"></div>
                                <div className="browser-address-bar"></div>
                            </div>

                            {/* Preview Area */}
                            <div className="website-preview">
                                <div className="website-pattern"></div>
                                {ICON_MAP[site.iconName] || <Globe size={40} color="var(--text-tertiary)" />}
                            </div>

                            <div className="website-info">
                                <div className="website-header">
                                    <h3 className="website-title">{site.title}</h3>
                                </div>

                                <p className="website-desc">{site.desc}</p>

                                <div className="website-tags">
                                    {site.tags && site.tags.map((t, i) => (
                                        <span key={i} className="web-tag">{t}</span>
                                    ))}
                                </div>

                                <a
                                    href={site.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="website-link-btn"
                                >
                                    Visit Live Site <ExternalLink size={16} />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Websites;
