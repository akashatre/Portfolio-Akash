import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Linkedin, Github, Mail, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import './About.css';

const About = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });

    const animText = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const animPhoto = {
        hidden: { opacity: 0, scale: 0.98 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <section id="about" className="about-section" ref={ref}>
            <div className="container">
                <div className="about-grid">
                    
                    {/* LEFT COLUMN: Narrative & Info */}
                    <motion.div 
                        className="about-content-col"
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                    >
                        <motion.span className="section-eyebrow" variants={animText}>
                            BACKGROUND
                        </motion.span>
                        
                        <motion.h2 className="about-header" variants={animText}>
                            Turning raw data into visual stories that drive strategic business growth.
                        </motion.h2>
                        
                        <motion.div className="about-narrative" variants={animText}>
                            <p>
                                I am a detail-oriented <strong>Data Analyst &amp; Engineer</strong> currently working at <strong>Thakral One</strong> in Bengaluru. I specialize in building custom ETL pipelines, writing optimized SQL queries, and designing intuitive dashboard dashboards in Power BI.
                            </p>
                            <p>
                                My workflow is centered around data automation and efficiency. I write clean Python scripts to parse, clean, and enrich complex business datasets, and leverage AWS tools to scale deployment. My goal is always to present data in its most digestible format to enable quick decision-making.
                            </p>
                        </motion.div>

                        {/* Metadata Rows */}
                        <motion.div className="about-meta-grid" variants={animText}>
                            <div className="about-meta-row">
                                <span className="about-meta-label">
                                    <MapPin size={15} /> Location
                                </span>
                                <span className="about-meta-value">Bengaluru, India</span>
                            </div>
                            <div className="about-meta-row">
                                <span className="about-meta-label">
                                    <Briefcase size={15} /> Current Role
                                </span>
                                <span className="about-meta-value">Data Analyst at Thakral One</span>
                            </div>
                            <div className="about-meta-row">
                                <span className="about-meta-label">
                                    <GraduationCap size={15} /> Education
                                </span>
                                <span className="about-meta-value">Master of Computer Applications</span>
                            </div>
                        </motion.div>

                        {/* Social Buttons */}
                        <motion.div className="about-socials-row" variants={animText}>
                            <a href="https://www.linkedin.com/in/akashatre" target="_blank" rel="noopener noreferrer" className="about-social-link">
                                <Linkedin size={15} /> LinkedIn
                            </a>
                            <a href="https://github.com/akashatre" target="_blank" rel="noopener noreferrer" className="about-social-link">
                                <Github size={15} /> GitHub
                            </a>
                            <a href="mailto:akashatre0241@gmail.com" className="about-social-link">
                                <Mail size={15} /> Email
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* RIGHT COLUMN: Profile Photo Frame */}
                    <motion.div 
                        className="about-photo-col"
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={animPhoto}
                    >
                        <div className="about-photo-frame-inner">
                            <img src="/profile.png" alt="Akash Atre" className="about-profile-image" />
                            <div className="about-frame-border" />
                            <div className="about-status-tag">
                                <span className="about-status-dot" /> Verified Profile
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default About;
