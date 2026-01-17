import { motion } from 'framer-motion';
import { Linkedin, Github, Mail, Instagram, MapPin, Calendar, Coffee, Code } from 'lucide-react';
import './About.css';

const StatItem = ({ icon, value, label }) => (
    <div className="stat-item">
        <div className="stat-icon-box">{icon}</div>
        <div className="stat-info">
            <span className="stat-value">{value}</span>
            <span className="stat-label">{label}</span>
        </div>
    </div>
);

const About = () => {
    return (
        <section id="about" style={{ background: 'white' }}>
            <div className="container">
                <motion.div
                    className="about-card-centered"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="about-avatar-wrapper">
                        <div className="about-blob-bg"></div>
                        <img src="/profile.png" alt="Akash Atre" className="about-img" />
                    </div>

                    <div className="about-content">
                        <h3>About me</h3>
                        <p className="about-text">
                            I am a Data Engineer and Analyst with a passion for uncovering hidden insights in complex datasets.
                            With a strong foundation in Python, SQL, and Cloud Technologies, I build efficient data pipelines and
                            intuitive dashboards that empower businesses to make informed decisions.
                        </p>

                        {/* New Stats Row */}
                        <div className="about-stats-row">
                            <StatItem icon={<Code size={20} />} value="2+ Years" label="Experience" />
                            <StatItem icon={<Coffee size={20} />} value="10+" label="Projects" />
                            <StatItem icon={<MapPin size={20} />} value="Bengaluru" label="India" />
                        </div>

                        <div className="about-socials">
                            <a href="https://linkedin.com" className="social-icon"><Linkedin size={20} /></a>
                            <a href="https://github.com" className="social-icon"><Github size={20} /></a>
                            <a href="https://instagram.com" className="social-icon"><Instagram size={20} /></a>
                            <a href="mailto:email@example.com" className="social-icon"><Mail size={20} /></a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
